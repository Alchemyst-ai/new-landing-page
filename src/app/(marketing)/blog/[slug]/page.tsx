import { CTA } from "@/components/sections/cta";
import { getPost, getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogHeader from "@/components/blog-header";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  let post = await getPost(params.slug);
  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  // Get popular blogs (for now, just getting all blogs and taking the first 5)
  const allPosts = await getBlogPosts();
  const popularPosts = allPosts
    .filter(p => p.slug !== post.metadata.slug) // Exclude current post
    .slice(0, 5);

  return (
    <section id="blog" className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${siteConfig.url}${post.metadata.image}`
              : `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
            url: `${siteConfig.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: post.metadata.author,
            },
          }),
        }}
      />

      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content - 70% */}
          <div className="w-full lg:w-[70%] px-4 sm:px-6 lg:px-8">
            <BlogHeader
              title={post.metadata.title}
              category={post.metadata.category || "Trading"}
              subcategory={post.metadata.subcategory || "Market Analysis"}
              publishedAt={post.metadata.publishedAt}
              author={{
                name: post.metadata.author,
                image: "/author.jpg"
              }}
              reviewer={{
                name: "Shivam Gaba",
                image: "/reviewer.jpg"
              }}
              featuredImage={post.metadata.image}
            />

            <div className="py-12">
              <article
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.source }}
              ></article>
            </div>
          </div>

          {/* Right Sidebar - 30% */}
          <div className="hidden lg:flex lg:flex-col lg:w-[30%] px-4 sm:px-6 lg:px-8">
            {/* Advertisement Section */}
            <div className="sticky top-24 space-y-8">
              <div className="bg-card rounded-xl overflow-hidden border">
                {/* Ad Header with Logo */}
                <div className="p-4 border-b">
                  <Image
                    src="/public/logo.png"
                    alt="HDFC Sky"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                
                {/* Ad Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Macro</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    For active investors seeking swing trade ideas and a macro strategy
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <span className="text-muted-foreground line-through text-sm">$54.95</span>
                      <span className="text-3xl font-bold text-foreground ml-2">$43.96</span>
                      <span className="text-muted-foreground text-sm ml-2">Monthly</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground line-through text-sm">$659.40</span>
                      <span className="text-xl font-semibold text-foreground ml-2">$527.52</span>
                      <span className="text-muted-foreground text-sm ml-2">Annually</span>
                    </div>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2">You save $144.00 a year</p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-card-foreground">
                      <span className="text-red-600 dark:text-red-400 mr-3 text-lg">✓</span>
                      Real-time Trade Alerts
                    </div>
                    <div className="flex items-center text-card-foreground">
                      <span className="text-red-600 dark:text-red-400 mr-3 text-lg">✓</span>
                      Premium Video Market Updates
                    </div>
                    <div className="flex items-center text-card-foreground">
                      <span className="text-red-600 dark:text-red-400 mr-3 text-lg">✓</span>
                      Forecasting Models
                    </div>
                    <div className="flex items-center text-card-foreground">
                      <span className="text-red-600 dark:text-red-400 mr-3 text-lg">✓</span>
                      Trading Educational Content
                    </div>
                    <div className="flex items-center text-card-foreground">
                      <span className="text-red-600 dark:text-red-400 mr-3 text-lg">✓</span>
                      Covering Stocks, ETFs, Commodities
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg">
                    Subscribe
                  </button>

                  {/* Footer */}
                  <p className="text-center text-muted-foreground text-sm mt-4">
                    Access membership via our website and mobile app
                  </p>
                </div>
              </div>

              {/* Popular Blogs Section */}
              <div className="bg-card rounded-xl overflow-hidden p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Popular Articles</h3>
                <div className="space-y-6">
                  {popularPosts.map((post, index) => (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="text-foreground group-hover:text-primary transition-colors font-medium mb-1">
                            {post.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.summary}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CTA />
    </section>
  );
}
