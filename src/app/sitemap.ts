import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/staticContent";
import { fetchAllBlogPosts } from "@/lib/strapi";

export const revalidate = 300;

const COMPARE_ROUTES = [
  "/compare/alchemyst-ai-vs-mem0",
  "/compare/alchemyst-ai-vs-zep",
  "/compare/alchemyst-ai-vs-palantir",
  "/compare/alchemyst-ai-vs-databricks",
  "/compare/alchemyst-ai-vs-snowflake-cortex",
  "/compare/alchemyst-ai-vs-glean",
  "/compare/mem0-vs-zep-vs-letta",
  "/compare/memvid-vs-alchemyst-agent-memory",
  "/compare/supermemory-vs-alchemyst",
  "/compare/letta-vs-alchemyst-llm-memory",
  "/compare/langchain-memory-vs-alchemyst",
  "/compare/cognee-vs-alchemyst-knowledge-graph",
  "/compare/openai-memory-vs-deterministic-context",
  "/compare/claude-memory-vs-alchemyst",
];

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
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/developers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cli`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/openapi.json`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/mcp`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
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
      url: `${BASE_URL}/creators-program`,
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
    ...COMPARE_ROUTES.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || now),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogRoutes];
}
