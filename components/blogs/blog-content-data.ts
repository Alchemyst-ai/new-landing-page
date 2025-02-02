import { BlogContent } from "../types/blog-content";

export async function fetchBlogs(): Promise<BlogContent[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4163/api/blogs";

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch blogs");

    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}