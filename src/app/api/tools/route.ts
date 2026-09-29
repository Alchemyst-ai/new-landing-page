import { contextSearchSchema, searchContext } from "@/lib/tools/context-search";
import { searchWeb, webSearchSchema } from "@/lib/tools/web-search";
import { NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 30;
const schema = z.discriminatedUnion("tool", [
  z.object({ tool: z.literal("contextSearch"), input: contextSearchSchema }),
  z.object({ tool: z.literal("webSearch"), input: webSearchSchema }),
]);
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      {
        error:
          "Provide a supported tool and a query between 5 and 2000 characters.",
      },
      { status: 400 },
    );
  const { tool, input } = parsed.data;
  if (tool === "contextSearch" && !process.env.ALCHEMYSTAI_API_KEY)
    return NextResponse.json(
      { error: "Company search is not available yet." },
      { status: 503 },
    );
  try {
    if (tool === "contextSearch") {
      const response = await searchContext(input);
      const contexts = (response.contexts ?? [])
        .filter((entry) => (entry.score ?? 0.5) > 0.1)
        .slice(0, 10);
      return NextResponse.json(
        { tool, contexts },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json(
      { tool, ...(await searchWeb(input)) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Search is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
