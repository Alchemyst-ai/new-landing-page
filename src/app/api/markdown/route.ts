import { NextResponse } from "next/server";
import { FULL_STATIC_CONTENT, SITE_TITLE, SITE_DESCRIPTION, BASE_URL } from "@/lib/staticContent";

export const dynamic = "force-static";

function baseMarkdown(title: string, body: string) {
  return `# ${title}\n\n> ${SITE_DESCRIPTION}\n\n> Source: ${BASE_URL}\n\n${body}\n`;
}

const KNOWN: Record<string, { title: string; body: string }> = {
  "/": {
    title: SITE_TITLE,
    body: FULL_STATIC_CONTENT,
  },
  "/about": {
    title: "About Alchemyst AI",
    body: `Alchemyst AI by XAlchemyst Technologies Pvt. Ltd. builds the institutional context backbone for AI agents.\n\n## What we build\n\nSingle API with context arithmetic over an institutional knowledge graph. Sub-300ms p95, 99.7% fewer hallucinations, full traces.\n\n## Contact\n\n- Email: founders@getalchemystai.com\n- Address: 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, West Bengal 700048, India\n- Links: [/contact](${BASE_URL}/contact) [/privacy](${BASE_URL}/privacy) [/sitemap.xml](${BASE_URL}/sitemap.xml) [/llms.txt](${BASE_URL}/llms.txt)`,
  },
  "/about-us": {
    title: "About Alchemyst AI",
    body: `See canonical [/about](${BASE_URL}/about) for the full story. Alchemyst AI is the verifiable context layer for agents with persistent memory and auditable traces.`,
  },
  "/contact": {
    title: "Contact Alchemyst AI",
    body: `Fastest: founders@getalchemystai.com (support, sales, security, privacy). Reply within 2 business days.\n\n## Address\n\nXalchemyst Technologies Pvt. Ltd., 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, West Bengal 700048, India.\n\n## Indexes\n\n- [/](${BASE_URL}/) [/about](${BASE_URL}/about) [/privacy](${BASE_URL}/privacy) [/sitemap.xml](${BASE_URL}/sitemap.xml) [/llms.txt](${BASE_URL}/llms.txt) [/docs](${BASE_URL}/docs)`,
  },
  "/privacy": {
    title: "Privacy Notice",
    body: `Privacy Notice for Xalchemyst Technologies Pvt. Ltd. Last updated 26 Nov 2024. Contact founders@getalchemystai.com.\n\nWe process account, billing (via Razorpay), telemetry, and support data only with valid basis. Retention max 36 months past termination. Rights: access, correct, delete, withdraw consent. Full policy at [/privacy-policy](${BASE_URL}/privacy-policy).`,
  },
  "/privacy-policy": {
    title: "Privacy Notice",
    body: `Full privacy policy lives at [/privacy](${BASE_URL}/privacy) (summary) and [/privacy-policy](${BASE_URL}/privacy-policy) (HTML). Contact founders@getalchemystai.com.`,
  },
  "/pricing": {
    title: "Pricing",
    body: `Free tier 5M tokens. Starter, Accelerate, Supercharge, Enterprise. Calculator at ${BASE_URL}/pricing.`,
  },
  "/docs": {
    title: "Documentation",
    body: `Docs at ${BASE_URL}/docs (Mintlify). API spec at ${BASE_URL}/openapi.json. LLM index at ${BASE_URL}/llms.txt.`,
  },
  "/cli": {
    title: "CLI",
    body: `Official CLI: npm install @alchemystai/sdk (https://www.npmjs.com/package/@alchemystai/sdk) and pip install alchemystai (https://pypi.org/project/alchemystai/). Guide at ${BASE_URL}/cli and ${BASE_URL}/docs/example-projects/team/cli-chatbot.`,
  },
  "/openapi.json": {
    title: "OpenAPI",
    body: `OpenAPI 3.1 at ${BASE_URL}/openapi.json with operationIds listArticles, getArticleBySlug, listCareers, createLeadAutomation, listTools, startVoicePilot.`,
  },
  "/mcp": {
    title: "MCP server",
    body: `Streamable HTTP MCP at ${BASE_URL}/mcp. Manifests: ${BASE_URL}/server.json, ${BASE_URL}/.well-known/ai-catalog.json, ${BASE_URL}/mcp/server-card.`,
  },
};

function notFoundMarkdown(path: string) {
  return `# Page not found\n\nThe requested resource ${path} does not exist. Use one of these public indexes to recover:\n\n- Homepage: ${BASE_URL}/\n- Machine-readable site guide: ${BASE_URL}/llms.txt\n- Full content: ${BASE_URL}/llms-full.txt\n- XML sitemap: ${BASE_URL}/sitemap.xml\n- Docs: ${BASE_URL}/docs\n- API spec: ${BASE_URL}/openapi.json\n- About: ${BASE_URL}/about\n- Contact: ${BASE_URL}/contact\n- Privacy: ${BASE_URL}/privacy\n`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawPath = url.searchParams.get("path") || "/";
  const path = rawPath.split("?")[0].split("#")[0] || "/";
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;

  const known = KNOWN[normalized] ?? KNOWN[path];
  if (known) {
    const body = baseMarkdown(known.title, known.body);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  }

  // Unknown path → 404 markdown with recovery links (mirrors is-agentic pattern)
  const body = notFoundMarkdown(path);
  return new NextResponse(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
