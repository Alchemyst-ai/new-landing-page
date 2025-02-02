import { BlogContent } from "@/app/types/blog-content";
import { getBlogContents } from "../utils";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: any) {
    try {
        console.log("Received params = ", params)
        const blogs: BlogContent[] = getBlogContents() ?? [];
        const blog = blogs.find(blog => blog.redirectLink.endsWith(params.slugId));

        return !!blog ? NextResponse.json(blog, { status: 200 }) : NextResponse.json({ error: "Blog not found" }, { status: 404 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}