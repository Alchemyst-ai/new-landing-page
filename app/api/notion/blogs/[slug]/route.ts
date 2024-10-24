// app/api/notion/blogs/[slug]/route.ts
import { NextResponse } from 'next/server';
import { fetchBySlug, fetchPageBlocks, getPage, getPageContent } from '../../../../lib/notion';

interface Params {
  params: { slug: string };
}

// Fetch a single blog post by ID
export const GET = async (_: Request, { params }: Params) => {

    console.log(params.slug, "params.slug")
    
  try {
    // const post = await getPage(params.slug);
    // const content = await getPageContent(params.slug);

    const post = await fetchBySlug(params.slug);
    let content;
    if(post) {
         content = await fetchPageBlocks(post.id);
        console.log(content, "content")
    }

    console.log(post, "post and content")

    return NextResponse.json({ post, content }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching post with slug ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch the blog post' },
      { status: 500 }
    );
  }
};
