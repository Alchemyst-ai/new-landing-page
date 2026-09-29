import "server-only";
import AlchemystAI from "@alchemystai/sdk";
import { z } from "zod";

export const contextSearchSchema = z.object({
  query: z.string().trim().min(5).max(2000),
});

export async function searchContext(
  input: z.infer<typeof contextSearchSchema>,
) {
  const { query } = contextSearchSchema.parse(input);
  if (!process.env.ALCHEMYSTAI_API_KEY)
    throw new Error("Context search is not configured.");
  const client = new AlchemystAI({ apiKey: process.env.ALCHEMYSTAI_API_KEY });
  // This public site can search only the company's public context group.
  return client.v1.context.search(
    {
      query,
      minimum_similarity_threshold: 0.5,
      similarity_threshold: 0.9,
      body_metadata: { groupName: ["alchemyst-ai"] },
    },
    { timeout: 20_000, maxRetries: 0 },
  );
}
