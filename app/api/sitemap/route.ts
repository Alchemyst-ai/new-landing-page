import { NextRequest, NextResponse } from "next/server";
import { toXML } from 'jstoxml';
import { ProcessedFile } from "@/app/types/blog-api";

export const GET = async (req: NextRequest) => {
    const baseUrl = process.env.BLOGS_BASE_URL ?? 'http://localhost:4163'
    let rawBlogs: ProcessedFile[] = [];
    try {
        const apiResults = await fetch(`${baseUrl}/api/blogs`);

        if (apiResults.status !== 200) {
            return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
        }

        rawBlogs = await apiResults.json();
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
    const blogs = rawBlogs.map(blog => ({
        url: {
            loc: `${baseUrl}${blog.redirectLink}`,
            lastmod: new Date(blog.lastModified).toISOString(),
            changefreq: 'weekly',
            priority: '0.8'
        }
    }))

    const xmlObject = { urlset: blogs }

    let xml = toXML(xmlObject, { header: true, indent: '  ' });
    xml = xml.replace(/<urlset>/g, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">').replaceAll("&nbsp;", " ");

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}