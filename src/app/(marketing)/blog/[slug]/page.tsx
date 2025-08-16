import { CTA } from "@/components/sections/cta";
import { getPost, getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogHeader from "@/components/blog-header";
import Image from "next/image";
import Link from "next/link";
import SummarySection from "@/components/summary-section";
import AboutSection from "@/components/about-section";
import AuthorBioCard from "@/components/author-bio-card";
import TableOfContentsClient from "@/components/table-of-contents-client";
import CommentsSection from "@/components/comments-section";

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

  // Get recent posts (excluding current post)
  const allPosts = await getBlogPosts();
  const recentPosts = allPosts
    .filter(p => p.slug !== post.metadata.slug) // Exclude current post
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  // Construct full URL for sharing
  const fullUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <section id="blog" className="bg-background min-h-screen pb-24">  {/* Added bottom padding */}
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

      <div className="max-w-screen-3xl mr-32 ml-28">
        <div className="flex flex-col xl:flex-row xl:gap-6">
          {/* Left Sidebar - Table of Contents - Desktop Only */}
          <div className="hidden xl:block xl:w-1/5 xl:flex-shrink-0 pr-2">
            <TableOfContentsClient
              content={post.source}
              title={post.metadata.title}
              url={fullUrl}
            />
          </div>

          {/* Main Content - 50% */}
          <div className="w-full xl:w-3/5 xl:flex-shrink-0 px-4 sm:px-6 lg:px-8">
            <BlogHeader
              title={post.metadata.title}
              category={post.metadata.category || "Trading"}
              subcategory={post.metadata.subcategory || "Market Analysis"}
              publishedAt={post.metadata.publishedAt}
              author={{
                name: post.metadata.author,
                image: post.metadata.authorImage || "/logo.png"
              }}
              reviewer={{
                name: post.metadata.reviewer || "",
                image: post.metadata.reviewerImage || "/logo.png"
              }}
              featuredImage={post.metadata.image}
            />

            {/* Summary Box - Moved to top */}
            <SummarySection summary={post.metadata.summary} />

            {/* About Section */}
            <AboutSection />

            {/* Mobile Advertisement - Show on mobile after About section */}
            <div className="xl:hidden mt-8 mb-8 px-4 sm:px-6">
              <div className="flex justify-center">
                <Image
                  src="/ad.png"
                  alt="Advertisement"
                  width={300}
                  height={400}
                  className="w-full max-w-sm h-auto object-cover rounded-xl border"
                  style={{ maxHeight: '50vh' }}
                />
              </div>
            </div>

            <div className="py-12">
              <article
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.source }}
              ></article>
            </div>

            {/* Author/Reviewer Bio Cards */}
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <AuthorBioCard
                name={post.metadata.author}
                role={post.metadata.authorRole || "Author"}
                image={post.metadata.authorImage}
                bio={post.metadata.authorBio}
              />
              {(
                !!post.metadata.reviewer ||
                !!post.metadata.reviewerBio ||
                !!post.metadata.reviewerImage
              ) && (
                  <AuthorBioCard
                    name={post.metadata.reviewer || ""}
                    role={post.metadata.reviewerRole || "Reviewer"}
                    image={post.metadata.reviewerImage}
                    bio={post.metadata.reviewerBio}
                  />
                )}
            </div>

            {/* Mobile Table of Contents - Show after author bio on mobile */}
            <div className="xl:hidden mt-8">
              <TableOfContentsClient
                content={post.source}
                title={post.metadata.title}
                url={fullUrl}
              />
            </div>

            {/* Comments Section */}
            <CommentsSection postSlug={post.slug} />
          </div>

          {/* Right Sidebar - 25% */}
          <div className="hidden xl:flex xl:flex-col xl:w-1/5 xl:flex-shrink-0 pl-2 pr-4 mt-12">
            {/* Advertisement Section */}
            <div className="sticky top-24 space-y-8">
              {/* Advertisement Image */}
              <div className="rounded-xl overflow-hidden border">
                <Image
                  src="/ad.png"
                  alt="Advertisement"
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '50vh' }}
                />
              </div>

              {/* Recent Posts Section */}
              <div className="bg-card rounded-xl border p-6 divide-y divide-muted">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Recent Posts
                </h3>
                <div className="divide-y divide-muted">
                  {recentPosts.map((recentPost, index) => (
                    <Link
                      key={recentPost.slug}
                      href={`/blog/${recentPost.slug}`}
                      className="group block py-3 first:pt-4 last:pb-4 hover:bg-muted/5 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="text-sm font-bold text-primary group-hover:text-primary/80 mt-1 min-w-[24px]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                              {recentPost.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <time className="text-xs text-muted-foreground">
                                {new Date(recentPost.publishedAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </time>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {recentPost.category || "Trading"}
                              </span>
                            </div>
                            {/* <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed pl-[32px]">
                              {recentPost.summary}
                            </p> */}
                          </div>
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

      <div className="mt-24">  {/* Added top margin to CTA */}
        <CTA />
      </div>
    </section>
  );
}
