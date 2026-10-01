import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/staticContent";
import { fetchPageMarkdown } from "@/lib/pageMarkdown";

export const dynamic = "force-dynamic";

// Restrict conversion to public pages: never fetch APIs, assets, or proxy services.
const PUBLIC_PAGES = new Set([
  "/", "/about", "/contact", "/privacy", "/security", "/pricing",
  "/developers", "/cli", "/thesis", "/terms-of-use", "/case-study",
  "/creators-program", "/blog", "/compare", "/use-cases",
  "/benchmarks", "/careers",
]);
const ALIASES: Record<string, string> = {
  "/about-us": "/about",
  "/privacy-policy": "/privacy",
  "/terms": "/terms-of-use",
};

function markdownResponse(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": status === 200
        ? "public, s-maxage=300, stale-while-revalidate=60"
        : "no-store",
      ...(status !== 200 ? { "X-Robots-Tag": "noindex" } : {}),
    },
  });
}

function notFoundMarkdown() {
  return markdownResponse(
    `# Page not found\n\nThis page has no Markdown equivalent. Browse the [site guide](${BASE_URL}/llms.txt) or [homepage](${BASE_URL}/).\n`,
    404,
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawPath = (req.headers.get("x-markdown-page") || url.searchParams.get("path") || "/").split(/[?#]/)[0];
  const path = rawPath.replace(/\/$/, "") || "/";
  const normalized = ALIASES[path] ?? path;

  if (
    !PUBLIC_PAGES.has(normalized) &&
    !/^\/(blog|compare|use-cases)\/[a-zA-Z0-9_-]+$/.test(normalized)
  ) {
    return notFoundMarkdown();
  }

  const result = await fetchPageMarkdown(url.origin, normalized);
  if (!result.ok) {
    if (result.reason === "not-found") return notFoundMarkdown();
    return markdownResponse(
      "# Content temporarily unavailable\n\nThe page could not be converted to Markdown. Please try again shortly.\n",
      503,
    );
  }

  return markdownResponse(`> Source: ${BASE_URL}${normalized}\n\n${result.markdown}\n`);
}
