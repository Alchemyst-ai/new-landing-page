import { NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";

export const runtime = "edge";

export async function GET(request: Request) {
  const { country } = geolocation(request);
  console.log("Detected country in API:", country);
  return NextResponse.json({ country });
}
