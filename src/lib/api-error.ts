import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "not_found"
  | "article_not_found"
  | "validation_failed"
  | "upstream_failed"
  | "internal_error"
  | "method_not_allowed";

export function jsonError(
  opts: {
    title: string;
    detail: string;
    code: ApiErrorCode | string;
    status: number;
    resolution: string;
  }
) {
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
    headers: { "Content-Type": "application/problem+json" },
  });
}

export function notFoundError(resource = "Resource") {
  return jsonError({
    title: `${resource} not found`,
    detail: `No ${resource.toLowerCase()} matches the request. Check the identifier and retry, or browse /openapi.json for valid operations.`,
    code: `${resource.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_not_found`,
    status: 404,
    resolution: "Verify the path/ID, see /openapi.json, /llms.txt, or /sitemap.xml for valid routes.",
  });
}
