import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/sections/CTASection";
import TableOfContents from "@/components/TableOfContents";

import SectionHeader from "@/components/brand/SectionHeader";
import { FadeUp, FigureReveal, RevealText } from "@/components/motion/primitives";
import {
    blogPostCoverUrl,
    blogPostRawHtml,
    estimateReadTime,
    fetchAllBlogSlugs,
    fetchBlogPostBySlug,
    fetchRecentBlogPosts,
    formatDate,
    type StrapiBlogPost,
} from "@/lib/strapi";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

const SITE_URL = "https://getalchemystai.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const coverUrl = blogPostCoverUrl(post);
  const description = post.description ?? post.about;

  return {
    title: post.title,
    description,
    category: post.category?.name ?? "Blog",
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: `${SITE_URL}/blog/${slug}`,
      authors: post.author ? [post.author.name] : undefined,
      images: coverUrl ? [{ url: coverUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}

/** Relative-time helper, e.g. "1w ago", to match the live "(1w ago)" suffix. */
function timeAgo(dateStr: string): string {
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const day = 86_400_000;
  const days = Math.floor(diff / day);
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function categoryLabel(post: StrapiBlogPost): string | null {
  return post.category?.name ?? null;
}

function categoryHref(post: StrapiBlogPost): string {
  const slug = post.category?.slug ?? post.category?.name?.toLowerCase().replace(/\s+/g, "-");
  return slug ? `/blog?category=${slug}` : "/blog";
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await fetchBlogPostBySlug(slug);
  if (!post) notFound();

  const html = blogPostRawHtml(post);
  const readTime = post.readTime ?? (html ? estimateReadTime(html) : 3);
  const coverUrl = blogPostCoverUrl(post);
  const fullUrl = `${SITE_URL}/blog/${post.slug}`;
  const category = categoryLabel(post);
  const description = post.description ?? "";

  // Recent posts for the "Recently Published" grid, excluding the current one.
  const recentPosts = (await fetchRecentBlogPosts(7))
    .filter((p) => p.slug !== post.slug)
    .slice(0, 6);

  return (
    <>
      <Navbar />

      {/* JSON-LD structured data - BlogPosting schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          // Per Next.js JSON-LD guidance, scrub `<` to its unicode escape to
          // prevent XSS via CMS-sourced strings, since JSON.stringify alone
          // does not sanitize HTML.
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            description: description || post.about,
            image: coverUrl ?? `${SITE_URL}/og-image.png`,
            url: fullUrl,
            mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
            author: {
              "@type": "Person",
              name: post.author?.name ?? "Alchemyst AI",
            },
            publisher: {
              "@type": "Organization",
              name: "Alchemyst AI",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.png`,
              },
            },
            ...(post.reviewer?.name
              ? { reviewer: { "@type": "Person", name: post.reviewer.name } }
              : {}),
          }).replace(/</g, "\\u003c"),
        }}
      />

      <main className="relative min-h-screen bg-[#FDFBF7]">
        <div aria-hidden className="plate-grid plate-grid-top absolute inset-x-0 top-0 h-[640px]" />
        <div className="container blog-post-grid blog-wide relative pt-28 md:pt-36 pb-16">
          {/* ── Left: sticky Table of Contents ── */}
          <aside className="blog-toc-desktop">
            <div className="sticky top-28">
              <TableOfContents
                content={html}
                title={post.title}
                url={fullUrl}
                containerId="article-content"
              />
            </div>
          </aside>

          {/* ── Main column ── */}
          <article className="min-w-0">
            <FadeUp standalone distance={12}>
              <Breadcrumbs
                currentPath={`/blog/${post.slug}`}
                items={[
                  { name: "Blog", path: "/blog" },
                  ...(category ? [{ name: category, path: categoryHref(post) }] : []),
                  { name: post.title },
                ]}
              />
            </FadeUp>

            {category && (
              <FadeUp standalone distance={10} delay={0.05} className="mb-6">
                <Link
                  href={categoryHref(post)}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#B45309]/20 bg-[#B45309]/[0.07] px-3 py-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#B45309] transition-colors hover:bg-[#B45309]/[0.12]"
                >
                  <span aria-hidden className="h-[5px] w-[5px] bg-current" />
                  {category}
                </Link>
              </FadeUp>
            )}

            <RevealText
              as="h1"
              onMount
              delay={0.08}
              stagger={0.03}
              className="mb-6 max-w-[24ch] text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#4A3B33] text-balance"
            >
              {post.title}
            </RevealText>

            {description && (
              <FadeUp standalone delay={0.2}>
                <p className="mb-8 max-w-[68ch] text-[1.125rem] leading-[1.7] text-[#57534E]">{description}</p>
              </FadeUp>
            )}

            {/* Author / reviewer / read-time credit row */}
            <FadeUp standalone delay={0.25}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-[#E4D9BC]/80 py-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#78716C]">
                {post.author?.name && (
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="h-[5px] w-[5px] bg-[#E4C090]" />
                    Written by{" "}
                    <Link
                      href={`/blog?author=${encodeURIComponent(post.author.name)}`}
                      className="font-semibold text-[#4A3B33] transition-colors hover:text-[#B45309]"
                    >
                      {post.author.name}
                    </Link>
                  </span>
                )}
                {post.reviewer?.name && (
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="h-[5px] w-[5px] bg-[#E4C090]" />
                    Reviewed by{" "}
                    <Link
                      href={`/blog?author=${encodeURIComponent(post.reviewer.name)}`}
                      className="font-semibold text-[#4A3B33] transition-colors hover:text-[#B45309]"
                    >
                      {post.reviewer.name}
                    </Link>
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {readTime} min read
                </span>
                <span className="inline-flex items-center gap-2">
                  Published at {formatDate(post.publishedAt)}
                  {timeAgo(post.publishedAt) ? ` (${timeAgo(post.publishedAt)})` : ""}
                </span>
              </div>
            </FadeUp>

            {/* Featured cover image */}
            {coverUrl && (
              <FigureReveal delay={0.2} className="mt-10">
                  <div className="overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-[#F1E9DA]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coverUrl} alt={post.title} className="block h-auto w-full object-cover" />
                  </div>
              </FigureReveal>
            )}

            {/* Summary card */}
            {post.about && (
              <FadeUp standalone>
                <section className="relative mt-10 rounded-[var(--radius)] border border-[#E4D9BC] bg-[#F8F4EE] p-7">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] bg-[#B45309]" />
                  <h2 className="mb-3 flex items-center gap-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                    Summary
                  </h2>
                  <p className="whitespace-pre-line text-[1rem] leading-[1.75] text-[#57534E]">{post.about}</p>
                </section>
              </FadeUp>
            )}

            {/* Mobile collapsible TOC */}
            <details className="blog-toc-mobile group mt-8">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-4 py-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#57534E]">
                Table of Contents
                <svg className="transition-transform duration-300 group-open:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="mt-4">
                <TableOfContents
                  content={html}
                  title={post.title}
                  url={fullUrl}
                  containerId="article-content"
                  showShare={false}
                />
              </div>
            </details>

            {/* Article body */}
            {html ? (
              <div
                id="article-content"
                className="prose-blog-dark prose-brand mt-12"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="py-16 text-center text-[#78716C]">Content not available.</p>
            )}

            {/* Back link */}
            <div className="mt-16 border-t border-[#E4D9BC] pt-8">
              <Link href="/blog" className="link-brand inline-flex items-center gap-2 text-[0.9375rem] font-bold">
                ← Back to Blog
              </Link>
            </div>
          </article>
        </div>

        {/* ── Recently Published ── */}
        {recentPosts.length > 0 && (
          <section className="border-t border-[#E4D9BC] bg-[#F8F4EE] py-20 md:py-24">
            <div className="container blog-wide">
              <SectionHeader align="left" title="Recently Published" className="!mb-10" />
              <div className="blog-recent-grid">
                {recentPosts.map((p, i) => {
                  const cover = blogPostCoverUrl(p);
                  const rt = p.readTime ?? (p.test ? estimateReadTime(p.test) : 5);
                  return (
                    <FadeUp standalone key={p.slug} delay={(i % 3) * 0.07} className="h-full">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)]"
                      >
                        {cover && (
                          <div className="aspect-[16/9] overflow-hidden bg-[#F1E9DA]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cover}
                              alt={p.title}
                              className="block h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-2.5 p-6">
                          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#78716C]">
                            {p.category?.name ? `${p.category.name} / ` : ""}
                            {formatDate(p.publishedAt)} / {rt} min read
                          </div>
                          <h3 className="text-[1.0625rem] font-bold leading-[1.35] text-[#4A3B33]">{p.title}</h3>
                          {p.description && (
                            <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-[#57534E]">{p.description}</p>
                          )}
                        </div>
                      </Link>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA (dark chapter, flows into the footer) ── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
