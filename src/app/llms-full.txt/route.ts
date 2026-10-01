/**
 * /llms-full.txt - complete markdown dump for LLM ingestion
 *
 * Depth-first crawl of every content route (parent page, then its children,
 * top-level routes alphabetical), each converted with the same HTML to
 * Markdown mechanism that serves per-page `.md` equivalents. The blog
 * section is appended at the end. Per-page failures degrade to a one-line
 * note instead of failing the whole file.
 *
 * Revalidates every 5 minutes via ISR.
 */

import { BASE_URL, SITE_TITLE } from "@/lib/staticContent";
import { fetchPageMarkdown } from "@/lib/pageMarkdown";
import {
  BLOG_INDEX,
  BLOG_STATIC_SLUG,
  DFS_ROUTES,
} from "@/lib/siteRoutes";
import {
  blogPostUrl,
  fetchAllBlogPosts,
  formatDate,
  type StrapiBlogPost,
} from "@/lib/strapi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

/** Bounded concurrency so the crawl cannot fan out without limit. */
const CONCURRENCY = 6;

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    },
  );
  await Promise.all(workers);
  return results;
}

async function convertPage(
  origin: string,
  path: string,
): Promise<{ path: string; body: string | null }> {
  const result = await fetchPageMarkdown(origin, path);
  if (!result.ok) return { path, body: null };
  const body = result.markdown.trim();
  return { path, body: body ? body : null };
}

export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const lines: string[] = [];

  lines.push(`# ${SITE_TITLE} - Full Content Dump`);
  lines.push(`> Generated at: ${new Date().toISOString()}`);
  lines.push(`> Source: ${BASE_URL}`);
  lines.push("");

  // ── Depth-first walk: parent page, then its children ──────────────────────
  const pages = await mapLimit(DFS_ROUTES, CONCURRENCY, (path) =>
    convertPage(origin, path),
  );

  for (const { path, body } of pages) {
    lines.push("---");
    lines.push("");
    lines.push(`## ${BASE_URL}${path}`);
    lines.push("");
    lines.push(body ?? `> Content temporarily unavailable for ${path}.`);
    lines.push("");
  }

  // ── Blog section, appended at the end ─────────────────────────────────────
  // Same converter mechanism as /blog/<slug>.md; Strapi supplies the slug
  // list plus per-post metadata headers.
  lines.push("---");
  lines.push("");
  lines.push("# Blog - Alchemyst AI");
  lines.push("");

  const posts = await fetchAllBlogPosts();
  const bySlug = new Map<string, StrapiBlogPost>(
    posts.map((post) => [post.slug, post]),
  );
  const slugs = posts.map((post) => post.slug).filter(Boolean);
  if (!slugs.includes(BLOG_STATIC_SLUG)) slugs.push(BLOG_STATIC_SLUG);

  const blogPaths = [BLOG_INDEX, ...slugs.map((slug) => `/blog/${slug}`)];
  const blogPages = await mapLimit(blogPaths, CONCURRENCY, (path) =>
    convertPage(origin, path),
  );

  for (const { path, body } of blogPages) {
    const slug = path.replace(/^\/blog\/?/, "") || null;
    const post = slug ? bySlug.get(slug) : undefined;
    lines.push("---");
    lines.push("");
    if (post) {
      lines.push(`# ${post.title}`);
      lines.push("");
      lines.push(`- **URL:** ${blogPostUrl(post)}`);
      lines.push(`- **Slug:** ${post.slug ?? "-"}`);
      lines.push(
        `- **Published:** ${post.publishedAt ? formatDate(post.publishedAt) : "-"}`,
      );
      lines.push(
        `- **Last updated:** ${post.updatedAt ? formatDate(post.updatedAt) : "-"}`,
      );
      if (post.author) lines.push(`- **Author:** ${post.author.name}`);
      if (post.category) lines.push(`- **Category:** ${post.category.name}`);
      lines.push("");
    } else {
      lines.push(`## ${BASE_URL}${path}`);
      lines.push("");
    }
    lines.push(body ?? `> Content temporarily unavailable for ${path}.`);
    lines.push("");
  }

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
