export interface BlogContent {
  id: string;
  title: string;
  image: string;
  authorImage?: string;
  authorName: string;
  blogCategory: string;
  dateOfBlog: string;
  readTime: string;
  redirectLink: string;
  content: string;
}

export async function fetchBlogs(): Promise<BlogContent[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/blogs";

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch blogs");

    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}