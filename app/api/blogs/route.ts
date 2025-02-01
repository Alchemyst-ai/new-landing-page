import { getBlogContents } from "@/actions";
import { NextResponse } from "next/server";

export function GET() {
  try {
    const blogs = getBlogContents();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}