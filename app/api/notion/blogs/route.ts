// app/api/notion/blogs/route.ts
import { NextResponse } from 'next/server';
import { fetchPages, getDatabase } from '../../../lib/notion';

// Fetch all blog posts
export const GET = async () => {
  try {
    const blogs = await fetchPages();
    return NextResponse.json(blogs, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
};
