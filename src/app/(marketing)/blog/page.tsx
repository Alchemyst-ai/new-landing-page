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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Website Header - this is handled by your layout.tsx */}
      
      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex text-sm">
          <Link href="/" className="text-gray-400 hover:text-white">
            {siteConfig.name}
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-white">Blog</span>
        </nav>
      </div>

      {/* Blog Header */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Latest Market Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay ahead with our expert analysis, trading strategies, and market updates
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="min-h-[50vh] bg-white/5 backdrop-blur-xl border-t border-white/10">
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
