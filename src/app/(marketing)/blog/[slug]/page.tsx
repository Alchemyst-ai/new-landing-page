import BlogHeader from "@/components/blog-header";
import DisqusComments from "@/components/disqus-comments";
import { CTA } from "@/components/sections/cta";
import SimpleCommentCount from "@/components/simple-comment-count";
import SummarySection from "@/components/summary-section";
import TableOfContentsClient from "@/components/table-of-contents-client";
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/articles/${params.slug}`, { cache: "no-store" });
  const json = await res.json();
  const item = (json?.data?.[0]) || {};
  const title = item.title || "Article";
  const publishedTime = item.publishedAt || new Date().toISOString();
  const description = item.description || "";
  const image = `${siteConfig.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${siteConfig.url}/blog/${params.slug}`,
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/articles/${params.slug}`, { cache: "no-store" });
  const json = await res.json();
  const item = (json?.data?.[0]) || null;
  if (!item) {
    notFound();
  }
  const updatedOn = item.updatedAt || item.publishedAt;

  // Fetch recent articles from Strapi and exclude current one
  const listRes = await fetch(`${baseUrl}/api/articles`, { cache: "no-store" });
  const listJson = await listRes.json();
  const recentPosts = (listJson?.data ?? [])
    .filter((p: any) => p.slug !== item.slug)
    .sort((a: any, b: any) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    .slice(0, 5);

  const fullUrl = `${siteConfig.url}/blog/${item.slug}`;

  return (
    <section id="blog" className="bg-background min-h-screen pb-24">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: item.title,
            datePublished: item.publishedAt,
            dateModified: item.publishedAt,
            description: item.description,
            image: `${siteConfig.url}/og?title=${encodeURIComponent(item.title)}`,
            url: `${siteConfig.url}/blog/${item.slug}`,
            author: {
              "@type": "Person",
              name: "",
            },
          }),
        }}
      />

      <div className="max-w-screen -mt-10 xl:max-w-screen-3xl mx-4 sm:mx-6 lg:mx-8 xl:ml-12 xl:mr-24">
        <div className="flex flex-col xl:flex-row xl:gap-6">
          <div className="hidden xl:block xl:w-1/5 xl:flex-shrink-0 -mt-10 pl-4 pr-2">
            <TableOfContentsClient
              content={item.test}
              title={item.title}
              url={fullUrl}
              containerId="article-content"
            />
          </div>

          <div className="w-full xl:w-3/5 xl:flex-shrink-0 px-4 sm:px-6 lg:px-8">
            <BlogHeader
              title={item.title}
              category={item?.category?.name || "Blog"}
              subcategory={item?.category?.slug || "Article"}
              publishedAt={item.publishedAt}
              author={{
                name: item?.author?.name || "",
                image: "/logo.png"
              }}
              reviewer={{
                name: item?.reviewer?.name || "",
                image: "/logo.png"
              }}
              featuredImage={item.image || undefined}
              readTime={item.readTime}
            />

            <div className="mb-4 text-sm text-muted-foreground px-4 sm:px-6 lg:px-8">
              Updated on {formatDate(updatedOn)}
            </div>

            {false && (
              <div className="mb-4 text-sm text-muted-foreground ">
                {0} min read
                {false && (
                  <span className="ml-2">
                    • Last updated: {new Date().toLocaleDateString()}
                  </span>
                )}
              </div>
            )}

            <SummarySection summary={item.description || ""} />

            <div className="xl:hidden mt-6 mb-8 mx-3">
              <details>
                <summary className="flex items-center justify-between bg-card px-4 py-3 rounded-lg border cursor-pointer">
                  <span className="font-semibold text-foreground">Table of Contents</span>
                </summary>
                <div className="mt-3">
                  <TableOfContentsClient
                    content={item.test}
                    title={item.title}
                    url={fullUrl}
                    containerId="article-content"
                  />
                </div>
              </details>
            </div>

            {/* <AboutSection /> */}

            {/* <div className="xl:hidden mt-8 mb-8 px-4 sm:px-6">
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
            </div> */}

            <div className="py-12 px-4 sm:px-6 lg:px-8">
              <article id="article-content"
                className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-5xl"
                dangerouslySetInnerHTML={{ __html: item.test || "" }}
              ></article>
            </div>

            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author card hidden for Strapi content without author fields */}
              {/* Reviewer card hidden */}
            </div>

            <DisqusComments
              postSlug={item.slug}
              postTitle={item.title}
              postUrl={fullUrl}
            />
          </div>

          {/* <div className="hidden xl:flex xl:flex-col xl:w-1/5 xl:flex-shrink-0 pl-4 pr-2 mr-2">
            <div className="sticky top-24 space-y-8">
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
          </div> */}
        </div>
      </div>

      <div className="border-t border-muted mt-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">Recently Published</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post: any, idx: number) => {
              console.log("Post image = ", post.image)
              return (
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
                      <span>{post?.category?.name || "Blog"}</span>
                      <span>•</span>
                      <time>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : ''}
                      </time>
                      <span>•</span>
                      <SimpleCommentCount postSlug={post.slug} postTitle={post.title} />
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.description || ''}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 md:mt-24">
        <CTA />
      </div>
    </section>
  );
}
