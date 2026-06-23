import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TableOfContents from "@/components/TableOfContents";
import {
  blogPostRawHtml,
  estimateReadTime,
  fetchAllBlogSlugs,
  fetchBlogPostBySlug,
  fetchRecentBlogPosts,
  formatDate,
  type StrapiBlogPost,
} from "@/lib/strapi";
import type { Metadata } from "next";
import Image from "next/image";
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

  const coverUrl = post.cover?.formats?.large?.url ?? post.cover?.url;
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await fetchBlogPostBySlug(slug);
  if (!post) notFound();

  const html = blogPostRawHtml(post);
  const readTime = html ? estimateReadTime(html) : 3;
  const coverUrl = post.cover?.formats?.large?.url ?? post.cover?.url;
  const fullUrl = `${SITE_URL}/blog/${post.slug}`;

  // Recent posts for the "Recently Published" grid, excluding the current one.
  const recentPosts = (await fetchRecentBlogPosts(7))
    .filter((p) => p.slug !== post.slug)
    .slice(0, 6);

  return (
    <>
      <Navbar />

      {/* JSON-LD structured data — mirrors the reference BlogPosting schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            description: post.description ?? post.about,
            image: coverUrl ?? `${SITE_URL}/og-image.png`,
            url: fullUrl,
            author: {
              "@type": "Person",
              name: post.author?.name ?? "Alchemyst AI",
            },
          }),
        }}
      />

      <main>
        {/* ── Hero ── */}
        <section
          style={{
            background: "#0F172A",
            paddingTop: "100px",
            paddingBottom: "60px",
          }}
        >
          <div className="container" style={{ maxWidth: "800px" }}>
            {/* Breadcrumb */}
            <nav
              style={{
                marginBottom: "24px",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.875rem",
                color: "#64748B",
              }}
            >
              <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>
                Home
              </Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <Link href="/blog" style={{ color: "#64748B", textDecoration: "none" }}>
                Blog
              </Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "#94A3B8" }}>{post.title}</span>
            </nav>

            {post.category && (
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#F49025",
                  background: "rgba(244,144,37,0.15)",
                  borderRadius: "4px",
                  padding: "3px 10px",
                  marginBottom: "20px",
                }}
              >
                {post.category.name}
              </span>
            )}

            <h1
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              {post.title}
            </h1>

            {(post.description ?? post.about) && (
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.65,
                  color: "#94A3B8",
                  marginBottom: "28px",
                }}
              >
                {post.description ?? post.about}
              </p>
            )}

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.875rem",
                color: "#64748B",
              }}
            >
              {post.author && (
                <span style={{ color: "#94A3B8", fontWeight: 600 }}>
                  {post.author.name}
                </span>
              )}
              {post.author && <span>·</span>}
              <span>{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </section>

        {/* ── Cover image ── */}
        {coverUrl && (
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 24px",
              marginTop: "-1px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src={coverUrl}
                alt={post.cover?.alternativeText ?? post.title}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          </div>
        )}

        {/* ── Body: TOC sidebar + article (mirrors reference 3-column shell) ── */}
        <section style={{ background: "#F7F4EE", padding: "64px 0 100px" }}>
          <div
            className="blog-shell"
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              gap: "48px",
              alignItems: "flex-start",
            }}
          >
            {/* Sticky TOC sidebar (desktop only) */}
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

            {/* Main column */}
            <div style={{ flex: "1 1 0%", minWidth: 0, maxWidth: "760px" }}>
              {/* Summary section */}
              {post.about && (
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,23,42,0.08)",
                    borderRadius: "12px",
                    padding: "24px 28px",
                    marginBottom: "40px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#F49025",
                      marginBottom: "12px",
                    }}
                  >
                    Summary
                  </p>
                  <p
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: "1rem",
                      lineHeight: 1.65,
                      color: "#475569",
                    }}
                  >
                    {post.about}
                  </p>
                </div>
              )}

              {/* Mobile collapsible TOC */}
              <details className="blog-toc-mobile" style={{ marginBottom: "32px" }}>
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,23,42,0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 600,
                    color: "#0F172A",
                  }}
                >
                  Table of Contents
                </summary>
                <div style={{ marginTop: "16px", paddingLeft: "4px" }}>
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
                <article
                  id="article-content"
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    color: "#64748B",
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
                  borderTop: "1px solid rgba(15,23,42,0.1)",
                }}
              >
                <Link
                  href="/blog"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
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
            </div>
          </div>
        </section>

        {/* ── Recently Published ── */}
        {recentPosts.length > 0 && (
          <section
            style={{
              background: "#0F172A",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "80px 0",
            }}
          >
            <div className="container">
              <h2
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                Recently Published
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "28px",
                }}
              >
                {recentPosts.map((p: StrapiBlogPost) => {
                  const cover = p.cover?.formats?.large?.url ?? p.cover?.url;
                  const rt = p.test ? estimateReadTime(blogPostRawHtml(p)) : 3;
                  return (
                    <Link
                      key={p.documentId}
                      href={`/blog/${p.slug}`}
                      className="recent-card"
                      style={{
                        display: "block",
                        background: "#0A0F1E",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        textDecoration: "none",
                        transition: "border-color 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16/9",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={cover || "/og-image.png"}
                          alt={p.cover?.alternativeText ?? p.title}
                          fill
                          className="recent-card-img"
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div style={{ padding: "20px 22px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "8px",
                            fontFamily: "'Satoshi', sans-serif",
                            fontSize: "0.75rem",
                            color: "#64748B",
                            marginBottom: "10px",
                          }}
                        >
                          <span>{p.category?.name || "Blog"}</span>
                          <span>•</span>
                          <time>{p.publishedAt ? formatDate(p.publishedAt) : ""}</time>
                          <span>•</span>
                          <span>{rt} min read</span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "'Satoshi', sans-serif",
                            fontSize: "1.0625rem",
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: "#FFFFFF",
                            marginBottom: "8px",
                          }}
                        >
                          {p.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'Satoshi', sans-serif",
                            fontSize: "0.875rem",
                            lineHeight: 1.55,
                            color: "#94A3B8",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {p.description ?? p.about ?? ""}
                        </p>
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

      <style>{`
        .blog-toc-desktop {
          display: none;
        }
        .blog-toc-mobile {
          display: block;
        }
        @media (min-width: 1024px) {
          .blog-toc-desktop {
            display: block;
            width: 240px;
            flex-shrink: 0;
          }
          .blog-toc-mobile {
            display: none;
          }
        }
        .recent-card:hover {
          border-color: rgba(244,144,37,0.5);
          transform: translateY(-2px);
        }
        .recent-card:hover .recent-card-img {
          transform: scale(1.05);
        }
        .recent-card-img {
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
}
