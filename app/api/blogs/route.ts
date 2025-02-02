import { BlogContent } from "@/components/types/blog-content";
import { getBlogContents } from "./utils";
import { NextResponse } from "next/server";

export function GET() {
  try {
    const blogs: BlogContent[] = getBlogContents() ?? [];
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}