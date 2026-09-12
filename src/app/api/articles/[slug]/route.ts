import { jsonError, withApiHeaders } from "@/lib/api-error";
import { blogPostFullText, fetchBlogPostBySlug } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug || slug.length > 200) {
    return jsonError({
      title: "Invalid article slug",
      detail: "Slug must be 1-200 chars, URL-safe.",
      code: "validation_failed",
      status: 422,
      resolution: "Check /api/articles for valid slugs, or see /openapi.json.",
    });
  }
  try {
    const post = await fetchBlogPostBySlug(slug);
    if (!post) {
      return jsonError({
        title: "Article not found",
        detail: `No article matches slug "${slug}".`,
        code: "article_not_found",
        status: 404,
        resolution: "List valid slugs via GET /api/articles, or browse /blog.",
      });
    }
    const res = NextResponse.json(
      {
        data: {
          slug: post.slug,
          title: post.title,
          description: post.description ?? post.about ?? "",
          author: post.author?.name ?? null,
          category: post.category?.name ?? null,
          publishedAt: post.publishedAt ?? null,
          updatedAt: post.updatedAt ?? null,
          url: `https://getalchemystai.com/blog/${post.slug}`,
          bodyMarkdown: blogPostFullText(post).slice(0, 20000),
        },
      },
      { status: 200 }
    );
    return withApiHeaders(res);
  } catch (err) {
    console.error("[api/articles/slug] upstream error", err);
    return jsonError({
      title: "Upstream CMS unavailable",
      detail: "Could not fetch article from Strapi CMS.",
      code: "upstream_failed",
      status: 500,
      resolution: "Retry after 60s, or browse /blog for cached content.",
    });
  }
}
