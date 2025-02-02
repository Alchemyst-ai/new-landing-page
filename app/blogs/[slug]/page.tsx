import BlogPageComponent from "@/components/blogs/BlogPageComponent";
import { Blog, BlogContent } from "@/app/types/blog-content";
import { Metadata } from "next";

const fetchData = async (slug: string): Promise<BlogContent | undefined> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4163"}/api/blogs/${slug}`);
  if (res.ok) {
    return await res.json();
  }
  return undefined;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await fetchData(params.slug);

  if (!response) {
    return {
      title: "Blog not found",
      description: "Blog not found",
      keywords: [],
    };
  }

  const { title, keywords, content } = response;

  return {
    title,
    description: content.slice(0, 100),
    keywords,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await fetchData(params.slug);

  return <BlogPageComponent data={data} />;
}