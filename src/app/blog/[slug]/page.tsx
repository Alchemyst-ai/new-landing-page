import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchBlogPostBySlug,
  fetchAllBlogSlugs,
  blogPostRawHtml,
  estimateReadTime,
  formatDate,
} from "@/lib/strapi";

export const revalidate = 300;

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

  return {
    title: post.title,
    description: post.description ?? post.about,
    openGraph: {
      title: post.title,
      description: post.description ?? post.about,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: coverUrl ? [{ url: coverUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? post.about,
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

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
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

            {/* Category */}
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

        {/* Cover image */}
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

        {/* Article body */}
        <section style={{ background: "#F7F4EE", padding: "64px 0 100px" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            {html ? (
              <article
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
            <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(15,23,42,0.1)" }}>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
