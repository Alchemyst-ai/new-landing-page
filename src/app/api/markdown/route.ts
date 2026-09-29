import { NextResponse } from "next/server";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { pricingMarkdown } from "@/lib/pricingMarkdown";
import { BASE_URL } from "@/lib/staticContent";

export const dynamic = "force-dynamic";

// Restrict conversion to public pages: never fetch APIs, assets, or proxy services.
const PUBLIC_PAGES = new Set([
  "/", "/about", "/contact", "/privacy", "/security", "/pricing",
  "/developers", "/cli", "/thesis", "/terms-of-use", "/case-study",
  "/creators-program", "/blog", "/compare", "/use-cases",
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

  try {
    // Explicit HTML negotiation prevents recursion through the Markdown proxy.
    // No cookies or authorization headers are forwarded to this public fetch.
    const response = await fetch(new URL(normalized, url.origin), {
      headers: { Accept: "text/html" },
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    if (response.status === 404) return notFoundMarkdown();
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
      throw new Error("Public page did not return HTML");
    }

    const html = await response.text();
    const content = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
      ?? html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]
      ?? html;
    const markdown = NodeHtmlMarkdown.translate(content, {
      ignore: ["script", "style", "noscript", "nav", "footer", "svg", "button"],
    }, {
      div: ({ node, base }) => node.getAttribute("data-markdown-pricing") === "calculator"
        ? { content: pricingMarkdown(), recurse: false, surroundingNewlines: 2 }
        : { ...base },
    });

    return markdownResponse(`> Source: ${BASE_URL}${normalized}\n\n${markdown}\n`);
  } catch {
    return markdownResponse(
      "# Content temporarily unavailable\n\nThe page could not be converted to Markdown. Please try again shortly.\n",
      503,
    );
  }
}
