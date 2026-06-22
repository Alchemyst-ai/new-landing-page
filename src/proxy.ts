/**
 * Next.js Edge Middleware (proxy.ts — Next.js 16 convention)
 *
 * Rewrites /*.html.md requests to /llms.txt?path=<pathname>
 * so per-page markdown is served by the App Router llms.txt handler.
 *
 * /llms.txt and /llms-full.txt are handled directly by their own
 * App Router route handlers and do not need middleware interception.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rewrite /*.html.md to the llms.txt route handler with path param
  if (pathname.endsWith(".html.md")) {
    const url = request.nextUrl.clone();
    url.pathname = "/llms.txt";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Only intercept .html.md paths; /llms.txt and /llms-full.txt are App Router routes
  matcher: ["/:path*.html.md"],
};
