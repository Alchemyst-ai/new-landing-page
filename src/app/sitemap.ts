import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/staticContent";
import { fetchAllBlogPosts } from "@/lib/strapi";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await fetchAllBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/thesis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/alchemyst-ai-vs-mem0`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/alchemyst-ai-vs-zep`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/alchemyst-ai-vs-palantir`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/alchemyst-ai-vs-databricks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/alchemyst-ai-vs-snowflake-cortex`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/alchemyst-ai-vs-glean`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogComparisonRoutes: MetadataRoute.Sitemap = [
    "/blog/memvid-vs-alchemyst-agent-memory",
    "/blog/supermemory-vs-alchemyst",
    "/blog/letta-vs-alchemyst-llm-memory",
    "/blog/langchain-memory-vs-alchemyst",
    "/blog/cognee-vs-alchemyst-knowledge-graph",
    "/blog/openai-memory-vs-deterministic-context",
    "/blog/claude-memory-vs-alchemyst",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || now),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogComparisonRoutes, ...blogRoutes];
}
