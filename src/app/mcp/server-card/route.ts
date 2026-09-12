import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      name: "alchemyst-context",
      title: "Alchemyst AI Context Layer",
      description:
        "Streamable HTTP MCP server card for Alchemyst AI docs and API.",
      version: "1.0.0",
      url: "https://getalchemystai.com/mcp",
      transport: "streamable-http",
      tools: ["alchemyst_search_docs", "alchemyst_list_articles", "alchemyst_get_openapi"],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
