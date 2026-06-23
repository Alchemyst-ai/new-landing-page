import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
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

const SANS = "'Satoshi', sans-serif";

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

      {/* JSON-LD structured data — BlogPosting schema */}
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

      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh" }}>
        <div
          className="container blog-post-grid blog-wide"
          style={{ paddingTop: "104px", paddingBottom: "64px" }}
        >
          {/* ── Left: sticky Table of Contents ── */}
          <aside className="blog-toc-desktop">
            <div style={{ position: "sticky", top: "96px" }}>
              <TableOfContents
                content={html}
                title={post.title}
                url={fullUrl}
                containerId="article-content"
              />
            </div>
          </aside>

          {/* ── Main column ── */}
          <article style={{ minWidth: 0 }}>
            {/* Breadcrumb trail + BreadcrumbList schema */}
            <Breadcrumbs
              currentPath={`/blog/${post.slug}`}
              items={[
                { name: "Blog", path: "/blog" },
                ...(category ? [{ name: category, path: categoryHref(post) }] : []),
                { name: post.title },
              ]}
            />

            {/* Title */}
            <h1
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              {post.title}
            </h1>

            {/* Description */}
            {description && (
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  color: "#A1A1A1",
                  marginBottom: "16px",
                }}
              >
                {description}
              </p>
            )}

            {/* Category pill */}
            {category && (
              <Link
                href={categoryHref(post)}
                style={{ textDecoration: "none", display: "inline-block", marginBottom: "24px" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: SANS,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#F49025",
                    background: "rgba(244,144,37,0.12)",
                    borderRadius: "9999px",
                    padding: "3px 10px",
                  }}
                >
                  {category}
                </span>
              </Link>
            )}

            {/* Featured cover image */}
            {coverUrl && (
              <div
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  marginBottom: "24px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl}
                  alt={post.title}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Author / reviewer / read-time credit row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "16px 20px",
                fontFamily: SANS,
                fontSize: "0.875rem",
                color: "#A1A1A1",
              }}
            >
              {post.author?.name && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt={post.author.name}
                    width={24}
                    height={24}
                    style={{ borderRadius: "9999px" }}
                  />
                  <span>
                    Written by{" "}
                    <Link
                      href={`/blog?author=${encodeURIComponent(post.author.name)}`}
                      style={{ color: "#FFFFFF", fontWeight: 500, textDecoration: "none" }}
                    >
                      {post.author.name}
                    </Link>
                  </span>
                </span>
              )}

              {post.reviewer?.name && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt={post.reviewer.name}
                    width={24}
                    height={24}
                    style={{ borderRadius: "9999px" }}
                  />
                  <span>
                    Reviewed by{" "}
                    <Link
                      href={`/blog?author=${encodeURIComponent(post.reviewer.name)}`}
                      style={{ color: "#FFFFFF", fontWeight: 500, textDecoration: "none" }}
                    >
                      {post.reviewer.name}
                    </Link>
                  </span>
                </span>
              )}

              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {readTime} min read
              </span>
            </div>

            {/* Published date line */}
            <div
              style={{
                fontFamily: SANS,
                fontSize: "0.875rem",
                color: "#A1A1A1",
                marginTop: "10px",
              }}
            >
              Published at {formatDate(post.publishedAt)}
              {timeAgo(post.publishedAt) ? ` (${timeAgo(post.publishedAt)})` : ""}
            </div>

            {/* Summary card */}
            {post.about && (
              <section
                style={{
                  marginTop: "32px",
                  background: "#1B1B1B",
                  border: "1px solid #272727",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <h2
                  style={{
                    fontFamily: SANS,
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  Summary
                </h2>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "#A1A1A1",
                    whiteSpace: "pre-line",
                  }}
                >
                  {post.about}
                </p>
              </section>
            )}

            {/* Mobile collapsible TOC */}
            <details className="blog-toc-mobile" style={{ marginTop: "32px" }}>
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  cursor: "pointer",
                  fontFamily: SANS,
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                Table of Contents
              </summary>
              <div style={{ marginTop: "16px" }}>
                <TableOfContents
                  content={html}
                  title={post.title}
                  url={fullUrl}
                  containerId="article-content"
                />
              </div>
            </details>

            {/* Article body */}
            {html ? (
              <div
                id="article-content"
                className="prose-blog-dark"
                style={{ marginTop: "40px" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p
                style={{
                  fontFamily: SANS,
                  color: "#A1A1A1",
                  textAlign: "center",
                  padding: "60px 0",
                }}
              >
                Content not available.
              </p>
            )}

            {/* Back link */}
            <div
              style={{
                marginTop: "64px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Link
                href="/blog"
                style={{
                  fontFamily: SANS,
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#F49025",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ← Back to Blog
              </Link>
            </div>
          </article>
        </div>

        {/* ── Recently Published ── */}
        {recentPosts.length > 0 && (
          <section
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "72px 0",
            }}
          >
            <div className="container blog-wide">
              <h2
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "32px",
                }}
              >
                Recently Published
              </h2>
              <div className="blog-recent-grid">
                {recentPosts.map((p) => {
                  const cover = blogPostCoverUrl(p);
                  const rt = p.readTime ?? (p.test ? estimateReadTime(p.test) : 5);
                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="blog-recent-card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#1B1B1B",
                        border: "1px solid #272727",
                        borderRadius: "12px",
                        overflow: "hidden",
                        textDecoration: "none",
                      }}
                    >
                      {cover && (
                        <div style={{ aspectRatio: "16 / 9", overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cover}
                            alt={p.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        </div>
                      )}
                      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div
                          style={{
                            fontFamily: SANS,
                            fontSize: "0.75rem",
                            color: "#A1A1A1",
                          }}
                        >
                          {p.category?.name ? `${p.category.name} • ` : ""}
                          {formatDate(p.publishedAt)} • {rt} min read
                        </div>
                        <h3
                          style={{
                            fontFamily: SANS,
                            fontSize: "1.0625rem",
                            fontWeight: 600,
                            lineHeight: 1.35,
                            color: "#FFFFFF",
                            margin: 0,
                          }}
                        >
                          {p.title}
                        </h3>
                        {p.description && (
                          <p
                            style={{
                              fontFamily: SANS,
                              fontSize: "0.875rem",
                              lineHeight: 1.55,
                              color: "#A1A1A1",
                              margin: 0,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {p.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
