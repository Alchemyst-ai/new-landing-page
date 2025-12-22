import type { CardPost } from "@/components/blog-card";
import BlogCardWithComments from "@/components/blog-card-with-comments";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog - The Alchemyst AI Blog",
  description: `Journaling how we make Alchemyst AI the best and most trusted context layer in the world.`,
  image: '/banner.jpeg',
  twitter: {
    card: 'summary_large_image',
    title: "Blog - The Alchemyst AI Blog",
    description: `Journaling how we make Alchemyst AI the best and most trusted context layer in the world.`,
    images: ['/banner.jpeg'],
  },
});

export default async function Blog() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/articles`, { cache: "no-store" });
  const json = await res.json();
  const items = (json?.data ?? []) as Array<any>;

  const articles: CardPost[] = items
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      summary: item.description || "",
      publishedAt: item.publishedAt || new Date().toISOString(),
      image: item.image || undefined,
      readTime: item.readTime
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

    // console.log("Blog data = ", articles)
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            The Alchemyst AI Blog
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Stay ahead of the curve using context and agentic use cases
          </p>
        </div>
      </div>

      <div className="min-h-[50vh] bg-background border-t border-muted">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {articles.length > 0 ? (
            <>
              <div className="mb-8 sm:mb-12">
                <BlogCardWithComments data={articles[0]} priority featured />
              </div>
              {articles.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {articles.slice(1).map((data, idx) => (
                    <BlogCardWithComments key={data.slug} data={data} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">We&apos;re working on some amazing content for you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
