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

      {/* Updated container margins for mobile */}
      <div className="max-w-screen -mt-10 xl:max-w-screen-3xl mx-4 sm:mx-6 lg:mx-8 xl:ml-12 xl:mr-24">
        <div className="flex flex-col xl:flex-row xl:gap-6">
          {/* Left Sidebar - Table of Contents - Desktop Only */}
          <div className="hidden xl:block xl:w-1/5 xl:flex-shrink-0 -mt-10 pl-4 pr-2">
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

            {/* Mobile Table of Contents - below summary on mobile, collapsed by default */}
            <div className="xl:hidden mt-6 mb-8">
              <details>
                <summary className="flex items-center justify-between bg-card px-4 py-3 rounded-lg border cursor-pointer">
                  <span className="font-semibold text-foreground">Table of Contents</span>
                </summary>
                <div className="mt-3">
                  <TableOfContentsClient
                    content={post.source}
                    title={post.metadata.title}
                    url={fullUrl}
                  />
                </div>
              </details>
            </div>

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
                className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none"
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


            {/* Comments Section */}
            <CommentsSection postSlug={post.slug} />
          </div>

          {/* Right Sidebar - Advertisement Only */}
          <div className="hidden xl:flex xl:flex-col xl:w-1/5 xl:flex-shrink-0 pl-4 pr-2 mr-2">
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
                  style={{ maxHeight: '100vh' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Published Section */}
      <div className="border-t border-muted mt-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">Recently Published</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, idx) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block bg-card rounded-xl border p-4 hover:border-primary transition-colors"
              >
                <div className="aspect-[16/9] relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/demo.png"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.category || "Trading"}</span>
                    <span>•</span>
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 md:mt-24">  {/* Added top margin to CTA */}
        <CTA />
      </div>
    </section>
  );
}
