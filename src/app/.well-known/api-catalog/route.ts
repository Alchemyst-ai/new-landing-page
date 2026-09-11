import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const catalog = {
    specVersion: "1.0",
    apis: [
      {
        id: "alchemyst-public-api",
        title: "Alchemyst AI Landing Site Public API",
        description: "Blog, careers, leads, and tools.",
        serviceDesc: "https://getalchemystai.com/openapi.json",
        catalogUrl: "https://getalchemystai.com/.well-known/api-catalog",
      },
    ],
  };
  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
      Link: '<https://getalchemystai.com/.well-known/api-catalog>; rel="api-catalog", <https://getalchemystai.com/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      "Access-Control-Allow-Origin": "*",
      Vary: "Accept",
    },
  });
}
