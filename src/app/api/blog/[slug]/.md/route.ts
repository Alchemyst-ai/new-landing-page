import { blogPostFullText, fetchBlogPostBySlug } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) {
    return new NextResponse("Not found", { status: 404 });
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

  return new NextResponse(metadata + postContent.trim(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
    status: 200,
  });
}
