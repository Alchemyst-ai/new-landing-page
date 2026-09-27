/**
 * Next.js Edge Middleware (proxy.ts - Next.js 16 convention)
 *
 * 1. Proxies subdomain paths to their respective origins.
 *    Convention: any entry in PROXIED_SUBDOMAINS can be accessed as
 *    X.getalchemystai.com OR getalchemystai.com/X
 *    Each subdomain can define additional root-level assets to proxy.
 *
 * 2. Rewrites /*.html.md requests to /llms.txt?path=<pathname>
 *    so per-page markdown is served by the App Router llms.txt handler.
 *
 * 3. Accept: text/markdown negotiation (acceptmarkdown.com):
 *    serves markdown from /api/markdown?path=<pathname> with
 *    Content-Type: text/markdown and Vary: Accept.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BASE_DOMAIN = "new.getalchemystai.com";

interface ProxiedSubdomain {
  subdomain: string;
  // Additional root-level paths on the target to proxy (e.g. /pixel-art.gif)
  extraPaths?: string[];
}

const PROXIED_SUBDOMAINS: ProxiedSubdomain[] = [
  {
    subdomain: "labs",
    extraPaths: ["/pixel-art.gif"],
  },
  // Add more later:
  // { subdomain: "press" },
];

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

async function proxyTo(
  request: NextRequest,
  targetOrigin: string,
  targetPath: string,
  publicPrefix: string
): Promise<NextResponse> {
  const target = new URL(targetPath, targetOrigin);
  target.search = request.nextUrl.search;

  try {
    const res = await fetch(target, {
      headers: {
        ...Object.fromEntries(request.headers),
        host: new URL(targetOrigin).host,
      },
      method: request.method,
      body: ["GET", "HEAD"].includes(request.method) ? null : request.body,
      // @ts-expect-error -- duplex required for streaming body
      duplex: "half",
    });

    const contentType = res.headers.get("content-type") || "";

    // Keep upstream redirects under the public subdomain path. Otherwise a
    // Location: /next route escapes /<subdomain> and lands on the main site.
    const headers = new Headers(res.headers);
    const location = headers.get("location");
    if (location?.startsWith("/") && !location.startsWith("//")) {
      headers.set("location", `${publicPrefix}${location}`);
    }

    if (contentType.includes("text/html")) {
      let html = await res.text();
      // Rewrite root-relative asset URLs to point to the target origin
      html = html.replaceAll("/_next/", `${targetOrigin}/_next/`);
      return new NextResponse(html, {
        status: res.status,
        headers,
      });
    }

    return new NextResponse(res.body, {
      status: res.status,
      headers,
    });
  } catch {
    return new NextResponse("Bad Gateway", { status: 502 });
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname.toLowerCase();

  // Check if request is coming from a proxied subdomain directly
  for (const { subdomain, extraPaths = [] } of PROXIED_SUBDOMAINS) {
    const origin = `https://${subdomain}.${BASE_DOMAIN}`;

    // x.getalchemystai.com/:path → getalchemystai.com/x/:path
    if (hostname === `${subdomain}.${BASE_DOMAIN}`) {
      const target = new URL(`/${subdomain}${pathname}`, `https://${BASE_DOMAIN}`);
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 301);
    }

    // getalchemystai.com/x/:path → proxy to x.getalchemystai.com/:path
    if (pathname === `/${subdomain}` || pathname.startsWith(`/${subdomain}/`)) {
      const targetPath = pathname.replace(new RegExp(`^/${subdomain}`), "") || "/";
      return proxyTo(request, origin, targetPath, `/${subdomain}`);
    }

    // Extra root-level paths
    if (extraPaths.includes(pathname)) {
      return proxyTo(request, origin, pathname, "");
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
