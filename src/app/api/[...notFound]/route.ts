import { jsonError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonError({
    title: "API route not found",
    detail:
      "No API route matches this path. See /openapi.json for valid operations (listArticles, getArticleBySlug, getApiStatus, createLead).",
    code: "not_found",
    status: 404,
    resolution:
      "Verify the path, see /openapi.json, /llms.txt, or /sitemap.xml for valid routes.",
  });
}

export async function POST() {
  return jsonError({
    title: "API route not found",
    detail:
      "No API route matches this path. See /openapi.json for valid operations.",
    code: "not_found",
    status: 404,
    resolution: "Verify the path and method, see /openapi.json for valid routes.",
  });
}

export async function PUT() {
  return jsonError({
    title: "Method not allowed",
    detail: "This API path does not support PUT. See /openapi.json for valid methods.",
    code: "method_not_allowed",
    status: 405,
    resolution: "Use GET or POST as documented in /openapi.json.",
  });
}

export async function DELETE() {
  return jsonError({
    title: "Method not allowed",
    detail: "This API path does not support DELETE. See /openapi.json.",
    code: "method_not_allowed",
    status: 405,
    resolution: "Use GET or POST as documented in /openapi.json.",
  });
}

export async function PATCH() {
  return jsonError({
    title: "Method not allowed",
    detail: "This API path does not support PATCH. See /openapi.json.",
    code: "method_not_allowed",
    status: 405,
    resolution: "Use GET or POST as documented in /openapi.json.",
  });
}
