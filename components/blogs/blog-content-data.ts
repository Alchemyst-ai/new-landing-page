import { BlogContent } from "../types/blog-content";

export async function fetchBlogs(): Promise<BlogContent[]> {
  try {
    const response = await fetch("/api/blogs");
    if (!response.ok) throw new Error("Failed to fetch blogs");

    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}