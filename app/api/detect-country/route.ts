import { NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";

export const runtime = "edge";

// This API endpoint returns the detected country based on the header of the request
export async function GET(request: Request) {
  const { country } = geolocation(request);
  console.log("Detected country in API:", country);
  return NextResponse.json({ country });
}
