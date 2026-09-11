import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      $schema:
        "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
      name: "io.github.alchemyst-ai/context",
      title: "Alchemyst AI Context Layer",
      description:
        "Query Alchemyst institutional context, search docs, and inspect API operations via MCP tools. Tool-only server (no resources) for agent readability.",
      version: "1.0.0",
      websiteUrl: "https://getalchemystai.com/",
      repository: {
        source: "github",
        url: "https://github.com/Alchemyst-ai/new-landing-page",
      },
      remotes: [
        {
          type: "streamable-http",
          url: "https://getalchemystai.com/mcp",
          supportedProtocolVersions: ["2025-11-25", "2025-06-18", "2024-11-05"],
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
