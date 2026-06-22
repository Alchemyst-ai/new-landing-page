import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  blogPostRawHtml,
  estimateReadTime,
  fetchAllBlogPosts,
  formatDate,
  type StrapiBlogPost,
} from "@/lib/strapi";
import type { Metadata } from "next";
import { default as Image, default as Link } from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on semantic drift, context engineering, and building reliable agentic AI systems.",
};

function BlogCard({ post }: { post: StrapiBlogPost }) {
  const coverUrl = post.cover?.formats?.large?.url ?? post.cover?.url;
  const readTime = post.test ? estimateReadTime(blogPostRawHtml(post)) : 3;

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        display: "block",
        background: "#FFFFFF",
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        textDecoration: "none",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      className="blog-card"
    >
      {coverUrl && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <Image
            src={coverUrl}
            alt={post.cover?.alternativeText ?? post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div style={{ padding: "24px" }}>
        {post.category && (
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#F49025",
              background: "rgba(244,144,37,0.1)",
              borderRadius: "4px",
              padding: "3px 8px",
              marginBottom: "12px",
            }}
          >
            {post.category.name}
          </span>
        )}
        <h2
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#0F172A",
            marginBottom: "10px",
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "#475569",
            marginBottom: "16px",
          }}
        >
          {post.description ?? post.about}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.8125rem",
            color: "#94A3B8",
            fontFamily: "'Satoshi', sans-serif",
          }}
        >
          {post.author && <span>{post.author.name}</span>}
          {post.author && <span>·</span>}
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await fetchAllBlogPosts();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "#0F172A",
            paddingTop: "120px",
            paddingBottom: "80px",
            textAlign: "center",
          }}
        >
          <div className="container" style={{ maxWidth: "720px" }}>
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#F49025",
                marginBottom: "16px",
              }}
            >
              Blog
            </p>
            <h1
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Thinking on context and AI
            </h1>
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                color: "#94A3B8",
              }}
            >
              {posts.length} article{posts.length !== 1 ? "s" : ""} on semantic drift, context
              engineering, and building reliable agentic AI systems.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section style={{ background: "#F7F4EE", padding: "80px 0" }}>
          <div className="container">
            {posts.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#94A3B8",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "1rem",
                  padding: "80px 0",
                }}
              >
                No posts yet. Check back soon.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "28px",
                }}
              >
                {posts.map((post) => (
                  <BlogCard key={post.documentId} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .blog-card:hover {
          box-shadow: 0 8px 32px rgba(15,23,42,0.12);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
