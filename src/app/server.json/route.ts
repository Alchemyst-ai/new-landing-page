import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      $schema:
        "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
      name: "io.github.alchemyst-ai/context",
      title: "Alchemyst AI Context Layer",
      description:
        "Query Alchemyst institutional context, search docs, and inspect API operations via MCP tools.",
      version: "1.0.0",
      websiteUrl: "https://getalchemystai.com/",
      remotes: [
        {
          type: "streamable-http",
          url: "https://getalchemystai.com/mcp",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
