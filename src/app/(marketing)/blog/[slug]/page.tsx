import { CTA } from "@/components/sections/cta";
import { getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogHeader from "@/components/blog-header";
import SummarySection from "@/components/summary-section";
import AuthorBioCard from "@/components/author-bio-card";
import TableOfContentsClient from "@/components/table-of-contents-client";

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

      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="hidden xl:block xl:w-1/4 xl:flex-shrink-0 px-4">
            <TableOfContentsClient content={post.source} />
          </div>

          {/* Main Content - 50% */}
          <div className="w-full xl:w-1/2 xl:flex-shrink-0 px-4 sm:px-6 lg:px-8">
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

            <div className="py-12">
              <article
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.source }}
              ></article>
            </div>

            {/* Summary Box */}
            <SummarySection summary={post.metadata.summary} />

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
          </div>

          {/* Right Sidebar - 25% */}
          <div className="hidden xl:flex xl:flex-col xl:w-1/4 xl:flex-shrink-0 px-4 mt-12">
            {/* Advertisement Section */}
            <div className="sticky top-24 space-y-8">
              {/* Advertisement Placeholder */}
              <div className="bg-muted/20 rounded-xl border-2 border-dashed border-muted flex items-center justify-center h-[800px]">
                <div className="text-center p-8">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 mx-auto text-muted-foreground mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">Advertisement</h3>
                  <p className="text-sm text-muted-foreground/70">Long banner ad placement</p>
                  <p className="text-xs text-muted-foreground/50 mt-2">300 x 800px</p>
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
