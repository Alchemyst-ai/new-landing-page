import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      name: "alchemyst-context",
      title: "Alchemyst AI Context Layer MCP",
      description:
        "AI agent catalog for Alchemyst AI: MCP tools, OpenAPI, SDKs, and llms.txt.",
      version: "1.0.0",
      mcp: { url: "https://getalchemystai.com/mcp", transport: "streamable-http" },
      openapi: "https://getalchemystai.com/openapi.json",
      docs: "https://docs.getalchemystai.com",
      llmsTxt: "https://getalchemystai.com/llms.txt",
      contact: "founders@getalchemystai.com",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
