/**
 * Next.js Edge Middleware (proxy.ts - Next.js 16 convention)
 *
 * 1. Proxies /labs/* to labs.getalchemystai.com
 * 2. Rewrites /*.html.md requests to /llms.txt?path=<pathname>
 *    so per-page markdown is served by the App Router llms.txt handler.
 * 3. Accept: text/markdown negotiation (acceptmarkdown.com):
 *    serves markdown from /api/markdown?path=<pathname> with
 *    Content-Type: text/markdown and Vary: Accept.
 *    No visual/HTML change: only affects agents explicitly requesting markdown.
 *
 * /llms.txt and /llms-full.txt are handled directly by their own
 * App Router route handlers and do not need middleware interception.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LABS_ORIGIN = "https://labs.getalchemystai.com";

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

  // Proxy /labs/* to labs.getalchemystai.com
  if (pathname === "/labs" || pathname.startsWith("/labs/")) {
    const newPath = pathname.replace(/^\/labs/, "") || "/";
    const target = new URL(newPath, LABS_ORIGIN);
    target.search = request.nextUrl.search;

    try {
      const res = await fetch(target, {
        headers: {
          ...Object.fromEntries(request.headers),
          host: "labs.getalchemystai.com",
        },
        method: request.method,
        body: ["GET", "HEAD"].includes(request.method) ? null : request.body,
        // @ts-expect-error -- duplex required for streaming body
        duplex: "half",
      });

      const contentType = res.headers.get("content-type") || "";

      // For HTML responses, rewrite asset URLs so /_next/ points back to labs origin
      if (contentType.includes("text/html")) {
        let html = await res.text();
        html = html.replaceAll(
          "/_next/",
          `${LABS_ORIGIN}/_next/`
        );
        return new NextResponse(html, {
          status: res.status,
          headers: {
            "content-type": contentType,
          },
        });
      }

      return new NextResponse(res.body, {
        status: res.status,
        headers: res.headers,
      });
    } catch (e) {
      return new NextResponse("Bad Gateway", { status: 502 });
    }
  }

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