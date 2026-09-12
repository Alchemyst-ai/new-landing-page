import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      name: "alchemyst-context",
      title: "Alchemyst AI Context Layer",
      description:
        "Streamable HTTP MCP server for Alchemyst AI docs and public API.",
      transport: "streamable-http",
      url: "https://getalchemystai.com/mcp",
      version: "1.0.0",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
