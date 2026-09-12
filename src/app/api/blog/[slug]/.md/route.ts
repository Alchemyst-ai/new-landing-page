import { jsonError, withApiHeaders } from "@/lib/api-error";
import { blogPostFullText, fetchBlogPostBySlug } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) {
    const accept = req.headers.get("accept") || "";
    if (accept.includes("application/json") || accept.includes("application/problem+json")) {
      return jsonError({
        title: "Article not found",
        detail: `No article matches slug "${slug}".`,
        code: "article_not_found",
        status: 404,
        resolution: "List valid slugs via GET /api/articles, or browse /blog.",
      });
    }
    return new NextResponse("Not found", {
      status: 404,
      headers: { "API-Version": "v1" },
    });
  }

  const postContent = blogPostFullText(post);
  const { author, about, title, cover,publishedAt} = post;

  const metadata = `---
title: ${title}
description: ${about}
author: ${author?.name}
cover: ${cover?.url}
published_at: ${publishedAt}
---

# ${title}

`

  return withApiHeaders(
    new NextResponse(metadata + postContent.trim(), {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
      status: 200,
    })
  );
}
