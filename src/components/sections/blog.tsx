import BlogCard from "@/components/blog-card";
import { Section } from "@/components/section";
import type { CardPost } from "@/components/blog-card";

export async function Blog() {
  const res = await fetch("/api/articles");
  const json = await res.json();
  const items = json.data as Array<any>;

  const allPosts: CardPost[] = items.map((item) => ({
    title: item.title,
    slug: item.slug,
    summary: item.description || "",
    publishedAt: item.publishedAt || new Date().toISOString(),
    image: undefined,
  }));

  return (
    <Section id="blog" title="Blog">
      <div className="grid grid-cols-1 lg:grid-cols-3 border border-b-0">
        {allPosts.map((data, idx) => (
          <BlogCard key={data.slug} data={data} priority={idx <= 1} />
        ))}
      </div>
    </Section>
  );
}