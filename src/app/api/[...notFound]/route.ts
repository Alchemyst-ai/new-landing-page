import { jsonError } from "@/lib/api-error";

function handler() {
  return jsonError({
    title: "API route not found",
    detail:
      "No API operation matches this path and method. See /openapi.json for the full operation catalog.",
    code: "not_found",
    status: 404,
    resolution:
      "Check /openapi.json for valid paths (e.g. GET /api/articles, GET /api/careers), or see /llms.txt and /sitemap.xml.",
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;
