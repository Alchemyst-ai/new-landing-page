import BlogCard from "@/components/blog-card";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Blog - Latest Market Insights & Trading Strategies",
  description: `Latest market insights, trading strategies, and updates from ${siteConfig.name}.`,
});

export default async function Blog() {
  const allPosts = await getBlogPosts();

  const articles = await Promise.all(
    allPosts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Website Header - this is handled by your layout.tsx */}
      
      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            {siteConfig.name}
          </Link>
          <span className="mx-2 text-muted-foreground">&gt;</span>
          <span className="text-foreground">Blog</span>
        </nav>
      </div>

      {/* Blog Header */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Latest Market Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with our expert analysis, trading strategies, and market updates
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="min-h-[50vh] bg-background border-t border-muted">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Post - Latest post gets special treatment */}
          {articles.length > 0 && (
            <div className="mb-12">
              <BlogCard data={articles[0]} priority featured />
            </div>
          )}

          {/* Rest of the posts in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((data, idx) => (
              <BlogCard key={data.slug} data={data} priority={idx <= 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
