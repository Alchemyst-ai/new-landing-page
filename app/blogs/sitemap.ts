import { MetadataRoute } from 'next'
import { ProcessedFile } from '../types/blog-api'

async function fetchBlogs(baseUrl: string): Promise<ProcessedFile[]> {
    try {
        const response = await fetch(`${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}/api/blogs`, {
            next: { revalidate: 10 } // Cache for 1 hour
        })
        return response.json()
    } catch (error) {
        return []
    }
}

export async function generateSitemaps() {
    // Return an array of sitemaps sections (can be useful for large sites)
    return [{ id: 0 }]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    // Base URL of your website
    const baseUrl = process.env.BLOGS_BASE_URL ?? 'https://localhost:4163'
    const blogs = await fetchBlogs(baseUrl)

    // Dynamic blog routes
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}${blog.redirectLink}`,
        lastModified: new Date(blog.lastModified).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return blogRoutes;
}