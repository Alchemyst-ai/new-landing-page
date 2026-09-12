import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "not_found"
  | "article_not_found"
  | "validation_failed"
  | "upstream_failed"
  | "internal_error"
  | "method_not_allowed"
  | "rate_limited";

function rateLimitHeaders(): Record<string, string> {
  return {
    "RateLimit-Policy": '120;w=60;comment="public read: 120 req/min per IP"',
    "RateLimit-Limit": "120",
    "RateLimit-Remaining": "119",
    "RateLimit-Reset": "60",
    "API-Version": "v1",
  };
}

export function jsonError(opts: {
  title: string;
  detail: string;
  code: ApiErrorCode | string;
  status: number;
  resolution: string;
}) {
  const body = {
    type: "about:blank",
    title: opts.title,
    status: opts.status,
    detail: opts.detail,
    code: opts.code,
    resolution: opts.resolution,
  };
  return NextResponse.json(body, {
    status: opts.status,
    headers: {
      "Content-Type": "application/problem+json",
      ...rateLimitHeaders(),
    },
  });
}

export function notFoundError(resource = "Resource") {
  return jsonError({
    title: `${resource} not found`,
    detail: `No ${resource.toLowerCase()} matches the request. Check the identifier and retry, or browse /openapi.json for valid operations.`,
    code: `${resource.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_not_found`,
    status: 404,
    resolution:
      "Verify the path/ID, see /openapi.json, /llms.txt, or /sitemap.xml for valid routes.",
  });
}

export function withApiHeaders(res: NextResponse): NextResponse {
  const headers = rateLimitHeaders();
  for (const [k, v] of Object.entries(headers)) {
    res.headers.set(k, v);
  }
  return res;
}
