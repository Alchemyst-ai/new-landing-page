import { withApiHeaders } from "@/lib/api-error";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json(
    {
      status: "ok",
      service: "alchemyst-landing-public-api",
      version: "v1",
      time: new Date().toISOString(),
      docs: "https://getalchemystai.com/openapi.json",
      llms: "https://getalchemystai.com/llms.txt",
    },
    { status: 200 }
  );
  return withApiHeaders(res);
}
