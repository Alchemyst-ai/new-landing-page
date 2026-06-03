import type { CardPost } from "@/components/blog-card";
import BlogCardWithComments from "@/components/blog-card-with-comments";
import { constructMetadata, estimateReadTimeFromHtml } from "@/lib/utils";
import Link from "next/link";

interface Article {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  about: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  test?: string;
  cover?: { url?: string };
  author?: { name: string; email: string };
  reviewer?: { name: string; email: string } | null;
  category?: { name: string; slug: string };
  readTime?: number;
}

export const metadata = constructMetadata({
  title: "Blog - The Alchemyst AI Blog",
  description: `Journaling how we make Alchemyst AI the best and most trusted context layer in the world.`,
  image: '/banner.jpeg',
  twitter: {
    card: 'summary_large_image',
    title: "Blog - The Alchemyst AI Blog",
    description: `Journaling how we make Alchemyst AI the best and most trusted context layer in the world.`,
    images: ['/banner.jpeg'],
  },
});

const PAGE_SIZE = 12; // page 1 = 13 (featured + 12), page 2+ = 12

interface FetchFilters {
  category?: string;   // category slug
  author?: string;     // author name
  reviewer?: string;   // reviewer name
}

async function fetchAllArticles(filters: FetchFilters = {}): Promise<Article[]> {
  const rawBase = process.env.STRAPI_API_URL || "";
  const baseUrl = rawBase.replace(/\/+$/, "");
  const token = process.env.STRAPI_API_TOKEN || "";
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let strapiPage = 1;
  const all: Article[] = [];

  while (true) {
    const qs = new URLSearchParams();
    qs.set("populate[0]", "author");
    qs.set("populate[1]", "reviewer");
    qs.set("populate[2]", "category");
    qs.set("populate[3]", "cover");
    qs.set("pagination[page]", String(strapiPage));
    qs.set("pagination[pageSize]", "25");
    qs.set("sort", "publishedAt:desc");

    if (filters.category) qs.set("filters[category][slug][$eq]", filters.category);
    if (filters.author)   qs.set("filters[author][name][$eq]", filters.author);
    if (filters.reviewer) qs.set("filters[reviewer][name][$eq]", filters.reviewer);

    const url = `${baseUrl}/api/articles?${qs}`;
    const res = await fetch(url, { headers, next: { revalidate: 1800 } });
    if (!res.ok) break;
    const json = await res.json();
    const items: Article[] = Array.isArray(json?.data) ? json.data : [];
    all.push(...items);
    const meta = json?.meta?.pagination;
    if (!meta || strapiPage >= meta.pageCount) break;
    strapiPage++;
  }

  return all;
}

export default async function Blog({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category as string | undefined;
  const author = resolvedParams.author as string | undefined;
  const reviewer = resolvedParams.reviewer as string | undefined;
  const currentPage = Math.max(1, parseInt((resolvedParams.page as string) || "1", 10));

  const allArticles = await fetchAllArticles({ category, author, reviewer });

  // Page 1 gets 13 articles (1 featured + 12 grid), subsequent pages get 12
  const firstPageSize = PAGE_SIZE + 1;
  const total = allArticles.length;
  const totalPages = total <= firstPageSize ? 1 : 1 + Math.ceil((total - firstPageSize) / PAGE_SIZE);

  const start = currentPage === 1 ? 0 : firstPageSize + (currentPage - 2) * PAGE_SIZE;
  const pageSize = currentPage === 1 ? firstPageSize : PAGE_SIZE;
  const pageArticles = allArticles.slice(start, start + pageSize);

  const articles: CardPost[] = pageArticles.map((item) => ({
    title: item.title,
    slug: item.slug,
    summary: item.about || "",
    description: item.description,
    publishedAt: item.publishedAt || new Date().toISOString(),
    image: item.cover?.url || undefined,
    readTime: item.readTime ?? estimateReadTimeFromHtml(item.test || ""),
    category: item.category,
    author: item.author ?? null,
    reviewer: item.reviewer ?? null,
  }));

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (reviewer) params.set("reviewer", reviewer);
    params.set("page", String(p));
    return `/blog?${params}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            {category ? `${category} - ` : ""}
            {author ? `By ${author} - ` : ""}
            {reviewer ? `Reviewed by ${reviewer} - ` : ""}
            The Alchemyst AI Blog
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Journaling how we make Alchemyst AI the best and most trusted context layer in the world.
          </p>
        </div>
      </div>

      <div className="min-h-[50vh] bg-background border-t border-muted">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {articles.length > 0 ? (
            <>
              {currentPage === 1 && (
                <div className="mb-8 sm:mb-12">
                  <BlogCardWithComments data={articles[0]} priority featured />
                </div>
              )}
              {(currentPage > 1 || articles.length > 1) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {(currentPage === 1 ? articles.slice(1) : articles).map((data) => (
                    <BlogCardWithComments key={data.slug} data={data} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {currentPage > 1 && (
                    <Link
                      href={buildHref(currentPage - 1)}
                      className="px-4 py-2 rounded-md border border-muted text-sm font-medium hover:bg-muted transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={buildHref(p)}
                      className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-foreground text-background border-foreground"
                          : "border-muted hover:bg-muted"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={buildHref(currentPage + 1)}
                      className="px-4 py-2 rounded-md border border-muted text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No posts found</h2>
              <p className="text-muted-foreground mb-6">
                {author ? `No blogs written by ${author}.` : reviewer ? `No blogs reviewed by ${reviewer}.` : "We're working on some amazing content for you."}
              </p>
              <Link href="/blog" className="text-sm font-medium underline">← Back to all posts</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
