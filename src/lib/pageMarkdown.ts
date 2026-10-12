/**
 * pageMarkdown.ts
 *
 * Single code path for turning a public rendered page into Markdown.
 * Used by both /api/markdown (per-page `.md` equivalents) and /llms-full.txt
 * (depth-first full-site crawl), so the two outputs can never drift apart.
 */

import { NodeHtmlMarkdown } from "node-html-markdown";
import { pricingFaqMarkdown, pricingMarkdown, pricingTiersMarkdown } from "@/lib/pricingMarkdown";

/**
 * Blocks whose rendered HTML is swapped for purpose-built Markdown, keyed by
 * the value of a `data-markdown-pricing` attribute on a <div>.
 */
const PRICING_BLOCKS: Record<string, () => string> = {
  calculator: pricingMarkdown,
  tiers: pricingTiersMarkdown,
  faq: pricingFaqMarkdown,
};

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
        // `data-markdown-skip`: purely visual recaps, omitted from Markdown.
        div: ({ node, base }) => {
          if (node.hasAttribute("data-markdown-skip")) return { ignore: true };
          const block = PRICING_BLOCKS[node.getAttribute("data-markdown-pricing") ?? ""];
          return block
            ? { content: block(), recurse: false, surroundingNewlines: 2 }
            : { ...base };
        },
      },
    );

    return { ok: true, markdown };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
