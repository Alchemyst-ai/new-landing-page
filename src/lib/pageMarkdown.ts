/**
 * pageMarkdown.ts
 *
 * Single code path for turning a public rendered page into Markdown.
 * Used by both /api/markdown (per-page `.md` equivalents) and /llms-full.txt
 * (depth-first full-site crawl), so the two outputs can never drift apart.
 */

import { NodeHtmlMarkdown } from "node-html-markdown";
import { pricingMarkdown } from "@/lib/pricingMarkdown";

export type PageMarkdownResult =
  | { ok: true; markdown: string }
  | { ok: false; reason: "not-found" | "unavailable" };

/**
 * Fetch a page as HTML (explicit negotiation avoids recursion through the
 * Markdown proxy; no cookies or authorization headers are forwarded) and
 * convert its `<main>` content to Markdown.
 */
export async function fetchPageMarkdown(
  origin: string,
  path: string,
): Promise<PageMarkdownResult> {
  try {
    const response = await fetch(new URL(path, origin), {
      headers: { Accept: "text/html" },
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    if (response.status === 404) return { ok: false, reason: "not-found" };
    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("text/html")
    ) {
      return { ok: false, reason: "unavailable" };
    }

    const html = await response.text();
    const content =
      html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
      html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ??
      html;
    const markdown = NodeHtmlMarkdown.translate(
      content,
      {
        ignore: ["script", "style", "noscript", "nav", "footer", "svg", "button"],
      },
      {
        div: ({ node, base }) =>
          node.getAttribute("data-markdown-pricing") === "calculator"
            ? { content: pricingMarkdown(), recurse: false, surroundingNewlines: 2 }
            : { ...base },
      },
    );

    return { ok: true, markdown };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
