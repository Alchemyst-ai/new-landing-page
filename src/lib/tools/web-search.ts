import "server-only";
import { z } from "zod";

export const webSearchSchema = z.object({
  query: z.string().trim().min(5).max(2000),
  type: z
    .enum(["general", "images", "videos", "news"])
    .optional()
    .default("general"),
});
interface SearchResult {
  title: string;
  url: string;
  content: string;
}
export async function searchWeb(
  input: z.input<typeof webSearchSchema>,
): Promise<{ query: string; results: SearchResult[] }> {
  const { query, type } = webSearchSchema.parse(input);
  const params = new URLSearchParams({ query, categories: type });
  // Same search provider used by Labs; no calls to the Labs application.
  const response = await fetch(
    `https://websearch.miyami.tech/search-api?${params}`,
    {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error("Web search is temporarily unavailable.");
  const data = await response.json();
  return {
    query,
    results: Array.isArray(data.results) ? data.results.slice(0, 8) : [],
  };
}
