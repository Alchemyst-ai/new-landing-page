import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      specVersion: "1.0",
      entries: [
        {
          identifier: "urn:air:getalchemystai.com:mcp:alchemyst-context",
          type: "application/mcp-server-card+json",
          url: "https://getalchemystai.com/mcp/server-card",
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
