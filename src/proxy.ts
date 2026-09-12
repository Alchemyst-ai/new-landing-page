/**
 * Next.js Edge Middleware (proxy.ts - Next.js 16 convention)
 *
 * 1. Rewrites /*.html.md requests to /llms.txt?path=<pathname>
 *    so per-page markdown is served by the App Router llms.txt handler.
 * 2. Accept: text/markdown negotiation (acceptmarkdown.com):
 *    serves markdown from /api/markdown?path=<pathname> with
 *    Content-Type: text/markdown and Vary: Accept.
 *    No visual/HTML change — only affects agents explicitly requesting markdown.
 *
 * /llms.txt and /llms-full.txt are handled directly by their own
 * App Router route handlers and do not need middleware interception.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const MARKDOWN_SKIP_PREFIXES = [
  "/_next",
  "/api/markdown",
  "/api/",
  "/llms.txt",
  "/llms-full.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/openapi.json",
  "/favicon.ico",
  "/mcp",
  "/server.json",
  "/.well-known",
];

const STATIC_EXT =
  /\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|map|woff2?|ttf|mp3|mp4|txt|xml|json)$/i;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rewrite /*.html.md to the llms.txt route handler with path param
  if (pathname.endsWith(".html.md")) {
    const url = request.nextUrl.clone();
    url.pathname = "/llms.txt";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  const accept = request.headers.get("accept") || "";
  const wantsMarkdown =
    accept.includes("text/markdown") || accept.includes("text/x-markdown");

  if (wantsMarkdown) {
    if (MARKDOWN_SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    if (STATIC_EXT.test(pathname)) {
      return NextResponse.next();
    }
    // Fetch markdown from the Route Handler and return directly from the
    // edge so the final response carries a clean `Vary: Accept` without
    // Next's RSC `Vary: rsc, ...` (which would otherwise overwrite/combine
    // and break acceptmarkdown.com CDN semantics). No HTML/visual change.
    try {
      const mdUrl = request.nextUrl.clone();
      mdUrl.pathname = "/api/markdown";
      mdUrl.searchParams.set("path", pathname);
      const mdRes = await fetch(mdUrl, {
        headers: { Accept: "text/markdown" },
      });
      const body = await mdRes.text();
      return new NextResponse(body, {
        status: mdRes.status,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept, Accept-Encoding",
          "Cache-Control":
            mdRes.headers.get("Cache-Control") ||
            "public, s-maxage=300, stale-while-revalidate=60",
          ...(mdRes.status === 404 ? { "X-Robots-Tag": "noindex" } : {}),
        },
      });
    } catch {
      const url = request.nextUrl.clone();
      url.pathname = "/api/markdown";
      url.searchParams.set("path", pathname);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
