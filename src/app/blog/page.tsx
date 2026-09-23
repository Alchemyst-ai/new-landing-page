import { Arrow, Section, Ticks } from "@/components/brand";
import { FadeUp } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import {
  blogPostRawHtml,
  estimateReadTime,
  fetchAllBlogPosts,
  formatDate,
  type StrapiBlogPost,
} from "@/lib/strapi";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on semantic drift, context engineering, and building reliable agentic AI systems.",
  alternates: { canonical: "https://getalchemystai.com/blog" },
};

function BlogCard({ post, featured = false }: { post: StrapiBlogPost; featured?: boolean }) {
  const coverUrl = post.cover?.formats?.large?.url ?? post.cover?.url;
  const readTime = post.test ? estimateReadTime(blogPostRawHtml(post)) : 3;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group/btn group relative flex h-full overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[3px] hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)] ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <Ticks />
      {coverUrl && (
        <div
          className={`relative overflow-hidden bg-[#F1E9DA] ${
            featured ? "aspect-[16/9] md:aspect-auto md:w-[56%] md:min-h-[360px]" : "aspect-[16/9]"
          }`}
        >
          <Image
            src={coverUrl}
            alt={post.cover?.alternativeText ?? post.title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]"
            sizes={featured ? "(max-width: 768px) 100vw, 700px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col ${featured ? "p-8 md:p-10 lg:p-12 justify-center" : "p-7"}`}>
        {post.category && (
          <span className="mb-4 inline-flex w-fit items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
            <span aria-hidden className="h-[5px] w-[5px] bg-[#B45309]" />
            {post.category.name}
          </span>
        )}
        <h2
          className={`mb-3 font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33] text-balance ${
            featured ? "text-[1.5rem] md:text-[1.875rem]" : "text-[1.1875rem]"
          }`}
        >
          {post.title}
        </h2>
        <p className={`mb-6 text-[0.9375rem] leading-[1.7] text-[#57534E] ${featured ? "" : "line-clamp-3"}`}>
          {post.description ?? post.about}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#F1E9DA] pt-5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#78716C]">
            {post.author && <span>{post.author.name}</span>}
            {post.author && <span aria-hidden className="text-[#D6D3D1]">/</span>}
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden className="text-[#D6D3D1]">/</span>
            <span>{readTime} min read</span>
          </div>
          <span className="text-[#B45309]">
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await fetchAllBlogPosts();
  const [first, ...rest] = posts;

  return (
    <PageShell>
      <PageHero
        width="wide"
        crumbs={[{ name: "Blog" }]}
        currentPath="/blog"
        eyebrow="Blog"
        title="Thinking on context and AI"
        lead={`${posts.length} article${posts.length !== 1 ? "s" : ""} on semantic drift, context engineering, and building reliable agentic AI systems.`}
      />

      <Section tone="sand" bordered>
        {posts.length === 0 ? (
          <p className="py-20 text-center text-[#78716C]">No posts yet. Check back soon.</p>
        ) : (
          <>
            <FadeUp standalone className="mb-6 md:mb-8">
              <BlogCard post={first} featured />
            </FadeUp>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {rest.map((post, i) => (
                <FadeUp standalone key={post.documentId} delay={(i % 3) * 0.07} className="h-full">
                  <BlogCard post={post} />
                </FadeUp>
              ))}
            </div>
          </>
        )}
      </Section>
    </PageShell>
  );
}
