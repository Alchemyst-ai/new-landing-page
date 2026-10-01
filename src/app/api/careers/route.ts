// GET /api/careers
//
// Returns the current open roles sourced from Tally forms. Returns an empty
// list when TALLY_API_KEY is unset or Tally is unreachable, so the public
// endpoint never fails hard.

import { withApiHeaders } from "@/lib/api-error";
import { fetchTallyJobs } from "@/lib/tally";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await fetchTallyJobs();
  const res = NextResponse.json(result, { status: 200 });
  return withApiHeaders(res);
}
