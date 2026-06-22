/**
 * Strapi CMS client for Alchemyst AI blog
 *
 * Environment variables (set in .env.local or deployment secrets):
 *   STRAPI_API_URL    — e.g. https://cms.getalchemystai.com
 *   STRAPI_API_TOKEN  — Strapi API token (leave empty if endpoint is public)
 *
 * Actual Strapi response shape (flat, not nested under `attributes`):
 * {
 *   data: [{
 *     id, documentId, title, description, about, slug,
 *     test,           ← full HTML body (primary content field)
 *     createdAt, updatedAt, publishedAt,
 *     cover: { id, documentId, url, formats: { large, medium, small, thumbnail } },
 *     author: { id, documentId, name, email },
 *     reviewer: null | { id, documentId, name, email },
 *     category: { id, documentId, name, slug, description }
 *   }],
 *   meta: { pagination: { start, limit, total } }
 * }
 */

const STRAPI_BASE_URL =
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_BASE_URL ||
  "https://cms.getalchemystai.com";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  description: string;
  about: string;
  slug: string;
  /** Full HTML body — the primary content field */
  test?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    formats?: {
      large?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      thumbnail?: { url: string; width: number; height: number };
    };
  };
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
  };
  reviewer?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
  } | null;
  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string | null;
  };
}

interface StrapiListResponse {
  data: StrapiBlogPost[];
  meta: { pagination: { start: number; limit: number; total: number } };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const POPULATE =
  "populate[0]=author&populate[1]=reviewer&populate[2]=category&populate[3]=cover";

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  return headers;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Short plain-text description (≤160 chars) for llms.txt */
export function blogPostDescription(post: StrapiBlogPost): string {
  if (post.description) return post.description.slice(0, 160);
  if (post.about) return post.about.slice(0, 160);
  if (post.test) return stripHtml(post.test).slice(0, 160);
  return "Read on the Alchemyst AI blog.";
}

/** Full plain text (HTML stripped) for llms-full.txt */
export function blogPostFullText(post: StrapiBlogPost): string {
  if (post.test) return stripHtml(post.test);
  if (post.description) return post.description;
  return "";
}

/** Raw HTML body exactly as Strapi returns it — for rendering blog post pages */
export function blogPostRawHtml(post: StrapiBlogPost): string {
  return post.test ?? post.description ?? "";
}

/** Canonical public URL for a blog post */
export function blogPostUrl(post: StrapiBlogPost): string {
  return `https://getalchemystai.com/blog/${post.slug}`;
}

// ─── Fetch functions ──────────────────────────────────────────────────────────

/** Fetch all published blog posts, paginating through all pages */
export async function fetchAllBlogPosts(): Promise<StrapiBlogPost[]> {
  const allPosts: StrapiBlogPost[] = [];
  const pageSize = 25;
  let start = 0;
  let total = Infinity;

  while (start < total) {
    const url = `${STRAPI_BASE_URL}/api/articles?${POPULATE}&pagination[start]=${start}&pagination[limit]=${pageSize}&sort=publishedAt:desc`;
    try {
      const res = await fetch(url, {
        headers: buildHeaders(),
        next: { revalidate: 300 },
      });
      if (!res.ok) {
        console.error(`[strapi] ${res.status} ${res.statusText}`);
        break;
      }
      const json: StrapiListResponse = await res.json();
      allPosts.push(...json.data);
      total = json.meta.pagination.total;
      start += pageSize;
      if (json.data.length < pageSize) break;
    } catch (err) {
      console.error("[strapi] fetch error:", err);
      break;
    }
  }
  return allPosts;
}

/** Fetch a limited number of recent posts for preview sections */
export async function fetchRecentBlogPosts(limit = 6): Promise<StrapiBlogPost[]> {
  const url = `${STRAPI_BASE_URL}/api/articles?${POPULATE}&pagination[start]=0&pagination[limit]=${limit}&sort=publishedAt:desc`;
  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json: StrapiListResponse = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

/** Fetch a single blog post by slug */
export async function fetchBlogPostBySlug(
  slug: string
): Promise<StrapiBlogPost | null> {
  const url = `${STRAPI_BASE_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&${POPULATE}&pagination[limit]=1`;
  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json: StrapiListResponse = await res.json();
    return json.data[0] ?? null;
  } catch {
    return null;
  }
}

/** Fetch all slugs for generateStaticParams */
export async function fetchAllBlogSlugs(): Promise<string[]> {
  const posts = await fetchAllBlogPosts();
  return posts.map((p) => p.slug).filter(Boolean);
}
