/**
 * /llms-full.txt — complete markdown dump for LLM ingestion
 *
 * Two sections:
 *   1. STATIC  — full landing page content in markdown (from staticContent.ts)
 *   2. DYNAMIC — full blog post content fetched live from Strapi CMS
 *
 * Blog post HTML is sourced from the `test` field in each Strapi post,
 * which contains the full HTML body. HTML tags are stripped to produce
 * clean plain text for LLM consumption.
 *
 * Revalidates every 5 minutes via ISR.
 */

import { NextResponse } from "next/server";
import { SITE_TITLE, BASE_URL, FULL_STATIC_CONTENT } from "@/lib/staticContent";
import {
  fetchAllBlogPosts,
  blogPostUrl,
  blogPostDescription,
  blogPostFullText,
  formatDate,
} from "@/lib/strapi";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function GET() {
  // ── 1. Fetch dynamic Strapi blog posts ──────────────────────────────────
  const posts = await fetchAllBlogPosts();

  // ── 2. Build the full markdown document ─────────────────────────────────
  const lines: string[] = [];

  // Header
  lines.push(`# ${SITE_TITLE} — Full Content Dump`);
  lines.push(`> Generated at: ${new Date().toISOString()}`);
  lines.push(`> Source: ${BASE_URL}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ── Section 1: Static landing page content ──────────────────────────────
  lines.push("## SECTION 1 — Static Landing Page Content");
  lines.push("");
  lines.push(FULL_STATIC_CONTENT.trim());
  lines.push("");
  lines.push("---");
  lines.push("");

  // ── Section 2: Dynamic Strapi blog posts ────────────────────────────────
  lines.push("## SECTION 2 — Blog Posts (Dynamic, from Strapi CMS)");
  lines.push("");

  if (posts.length === 0) {
    lines.push(
      "> No blog posts available at this time. " +
        "Check that STRAPI_API_URL and STRAPI_API_TOKEN are configured correctly."
    );
  } else {
    lines.push(`${posts.length} posts retrieved from Strapi CMS.`);
    lines.push("");

    for (const post of posts) {
      lines.push(`### ${post.title}`);
      lines.push("");
      lines.push(`- **URL:** ${blogPostUrl(post)}`);
      lines.push(`- **Slug:** ${post.slug ?? "—"}`);
      lines.push(`- **Published:** ${post.publishedAt ? formatDate(post.publishedAt) : "—"}`);
      lines.push(`- **Last updated:** ${post.updatedAt ? formatDate(post.updatedAt) : "—"}`);
      if (post.author) lines.push(`- **Author:** ${post.author.name}`);
      if (post.category) lines.push(`- **Category:** ${post.category.name}`);
      lines.push("");

      // Summary
      const desc = blogPostDescription(post);
      if (desc) {
        lines.push(`**Summary:** ${desc}`);
        lines.push("");
      }

      // Full body: sourced from the `test` field (full HTML), stripped to plain text
      const fullText = blogPostFullText(post);
      if (fullText) {
        lines.push("**Full Content:**");
        lines.push("");
        lines.push(fullText);
        lines.push("");
      }

      lines.push("---");
      lines.push("");
    }
  }

  const body = lines.join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
