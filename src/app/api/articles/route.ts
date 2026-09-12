import { jsonError, withApiHeaders } from "@/lib/api-error";
import { fetchAllBlogPosts } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const search = (url.searchParams.get("search") || "").toLowerCase();
    let limit = 10;
    if (limitParam) {
      const parsed = parseInt(limitParam, 10);
      if (!Number.isNaN(parsed)) limit = Math.min(Math.max(parsed, 1), 50);
    }

    const posts = await fetchAllBlogPosts();
    let filtered = posts;
    if (search) {
      filtered = posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search) ||
          p.about?.toLowerCase().includes(search)
      );
    }
    const data = filtered.slice(0, limit).map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description?.slice(0, 160) ?? p.about?.slice(0, 160) ?? "",
      author: p.author?.name ?? null,
      category: p.category?.name ?? null,
      publishedAt: p.publishedAt ?? null,
      url: `https://getalchemystai.com/blog/${p.slug}`,
    }));

    const res = NextResponse.json({ data, total: filtered.length }, { status: 200 });
    return withApiHeaders(res);
  } catch (err) {
    console.error("[api/articles] upstream error", err);
    return jsonError({
      title: "Upstream CMS unavailable",
      detail: "Could not fetch articles from Strapi CMS. Retry shortly.",
      code: "upstream_failed",
      status: 500,
      resolution: "Retry after 60s, or browse /blog and /llms.txt for cached content.",
    });
  }
}
