/**
 * siteRoutes.ts
 *
 * Depth-first route registry for /llms-full.txt: each parent page followed by
 * its child pages, top-level routes alphabetical. Dynamic child slugs come
 * from the same sources as generateStaticParams, so the crawl can never miss
 * a page that exists on disk. Blog routes are excluded here on purpose: the
 * blog section is appended at the end of llms-full.txt.
 */

import { CASE_STUDIES } from "@/lib/caseStudies";
import { USE_CASES } from "@/lib/useCases";

// Static compare slugs on disk (src/app/compare/*/page.tsx), alphabetical.
const COMPARE_SLUGS = [
  "alchemyst-ai-vs-databricks",
  "alchemyst-ai-vs-glean",
  "alchemyst-ai-vs-mem0",
  "alchemyst-ai-vs-palantir",
  "alchemyst-ai-vs-snowflake-cortex",
  "alchemyst-ai-vs-zep",
  "alchemyst-vs-openai-dreaming",
  "claude-auto-memory-vs-portable-context",
  "claude-memory-vs-alchemyst",
  "cognee-vs-alchemyst-knowledge-graph",
  "langchain-memory-vs-alchemyst",
  "letta-vs-alchemyst-llm-memory",
  "mem0-vs-zep-vs-letta",
  "memvid-vs-alchemyst-agent-memory",
  "openai-memory-vs-deterministic-context",
  "supermemory-vs-alchemyst",
  "team-context-vs-siloed-memory",
];

/** Depth-first content routes, blog excluded (appended at the end). */
export const DFS_ROUTES: string[] = [
  "/",
  "/about",
  "/benchmarks",
  "/careers",
  "/case-study",
  ...CASE_STUDIES.map((cs) => `/case-study/${cs.slug}`),
  "/cli",
  "/compare",
  ...COMPARE_SLUGS.map((slug) => `/compare/${slug}`),
  "/contact",
  "/creators-program",
  "/developers",
  "/pricing",
  "/privacy",
  "/security",
  "/terms-of-use",
  "/thesis",
  "/use-cases",
  ...USE_CASES.map((uc) => `/use-cases/${uc.slug}`),
];

/** Blog index page, crawled first in the trailing blog section. */
export const BLOG_INDEX = "/blog";

/** Static flagship guide; appended to the blog tail when absent from Strapi. */
export const BLOG_STATIC_SLUG = "how-to-add-persistent-memory-to-ai-agents";
