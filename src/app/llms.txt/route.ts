/**
 * /llms.txt - spec-compliant LLM manifest
 *
 * Two sections:
 *   1. STATIC  - landing page content defined in src/lib/staticContent.ts
 *   2. DYNAMIC - blog posts fetched live from Strapi CMS
 *
 * Implemented as a plain Next.js Route Handler (no autoDiscovery) to avoid
 * the Next.js 15 + React 19 Pages Router prerender bug triggered by
 * next-llms-txt's babel-based file scanning.
 *
 * Revalidates every 5 minutes via ISR so the blog section stays fresh.
 */
import {
    BASE_URL,
    SITE_DESCRIPTION,
    SITE_TITLE,
    STATIC_SECTIONS,
} from "@/lib/staticContent";
import { blogPostDescription, blogPostUrl, fetchAllBlogPosts, type StrapiBlogPost } from "@/lib/strapi";
import { NextResponse } from "next/server";

// Force dynamic so Strapi data is always fetched (ISR via fetch cache)
export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

/**
 * Formats a single section into llms.txt spec format:
 *
 *   ## Section Title
 *   - [Item Title](url): description
 */
function formatSection(section: {
  title: string;
  items: { title: string; url: string; description?: string }[];
}): string {
  const lines: string[] = [`## ${section.title}`, ""];
  for (const item of section.items) {
    const desc = item.description ? `: ${item.description}` : "";
    lines.push(`- [${item.title}](${item.url})${desc}`);
  }
  return lines.join("\n");
}

export async function GET() {
  // ── 1. Fetch dynamic Strapi blog posts ──────────────────────────────────
  const posts = await fetchAllBlogPosts();

  const blogSection = {
    title: "Blog - Alchemyst AI",
    items: posts.map((post: StrapiBlogPost) => ({
      title: post.title,
      url: blogPostUrl(post),
      description: blogPostDescription(post),
    })),
  };

  // ── 2. Build all sections (static first, then dynamic) ──────────────────
  const allSections = [
    ...STATIC_SECTIONS,
    ...(blogSection.items.length > 0 ? [blogSection] : []),
  ];

  // ── 3. Compose the llms.txt document ────────────────────────────────────
  const lines: string[] = [];

  // Header block (llms.txt spec)
  lines.push(`# ${SITE_TITLE}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(`> Source: ${BASE_URL}`);
  lines.push("");

  for (const section of allSections) {
    lines.push(formatSection(section));
    lines.push("");
  }

  const body = lines.join("\n").trimEnd() + "\n";

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
