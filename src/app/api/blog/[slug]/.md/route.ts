import { blogPostFullText, fetchBlogPostBySlug } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const {slug} = await params;
  // You can now use the slug variable.
    console.log("Slug = ", slug);
    const post = await fetchBlogPostBySlug(slug);
    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    const postContent = blogPostFullText(post);

    return new NextResponse(postContent, {
      headers: {
        "Content-type": "text/markdown"
      },
      status: 200
    });
}