import { NextResponse } from "next/server";
import {
  BASE_URL,
  FULL_STATIC_CONTENT,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/staticContent";

export const dynamic = "force-dynamic";

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
    body: `Alchemyst AI by XAlchemyst Technologies Pvt. Ltd. builds the institutional context backbone for AI agents.\n\n## What we build\n\nSingle API with context arithmetic over an institutional knowledge graph. Sub-300ms p95, 99.7% fewer hallucinations, full traces.\n\n## Contact\n\n- Email: founders@getalchemystai.com\n- Address: 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata 700048, India\n- Links: [/contact](${BASE_URL}/contact) [/privacy](${BASE_URL}/privacy) [/sitemap.xml](${BASE_URL}/sitemap.xml) [/llms.txt](${BASE_URL}/llms.txt)`,
  },
  "/about-us": {
    title: "About Alchemyst AI",
    body: `See canonical [/about](${BASE_URL}/about) for the full story. Alchemyst AI is the verifiable context layer for agents with persistent memory and auditable traces.`,
  },
  "/contact": {
    title: "Contact Alchemyst AI",
    body: `Fastest: founders@getalchemystai.com (support, sales, security, privacy). Reply within 2 business days.\n\n## Address\n\nXalchemyst Technologies Pvt. Ltd., 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata 700048, India.\n\n## Indexes\n\n- [/](${BASE_URL}/) [/about](${BASE_URL}/about) [/privacy](${BASE_URL}/privacy) [/sitemap.xml](${BASE_URL}/sitemap.xml) [/llms.txt](${BASE_URL}/llms.txt) [/developers](${BASE_URL}/developers)`,
  },
  "/privacy": {
    title: "Privacy Notice | Alchemyst AI",
    body: `Privacy Notice for Xalchemyst Technologies Pvt. Ltd. Last updated June 2026. Contact founders@getalchemystai.com.\n\nWe process account, billing, telemetry, and support data only with valid basis. Retention max 36 months past termination. Rights: access, correct, delete, withdraw consent. Full policy at [/privacy](${BASE_URL}/privacy).`,
  },
  "/pricing": {
    title: "Pricing | Alchemyst AI",
    body: `Free tier 5M tokens. Starter, Accelerate, Supercharge, Enterprise. Calculator at ${BASE_URL}/pricing.`,
  },
  "/developers": {
    title: "Developer Portal | Alchemyst AI",
    body: `Developer portal at ${BASE_URL}/developers with API keys, quickstart, SDKs, sandbox, and OpenAPI at ${BASE_URL}/openapi.json. LLM index at ${BASE_URL}/llms.txt. MCP at ${BASE_URL}/mcp.`,
  },
  "/cli": {
    title: "CLI | Alchemyst AI",
    body: `Official Alchemyst AI CLI entry points: npm install @alchemystai/sdk (https://www.npmjs.com/package/@alchemystai/sdk) and pip install alchemystai (https://pypi.org/project/alchemystai/). Guide at ${BASE_URL}/cli and CLI Agent docs.`,
  },
  "/thesis": {
    title: "Context Thesis | Alchemyst AI",
    body: `Four theses on institutional context. Full page at ${BASE_URL}/thesis. Summary in llms.txt and llms-full.txt.`,
  },
  "/openapi.json": {
    title: "OpenAPI | Alchemyst AI",
    body: `OpenAPI 3.1 at ${BASE_URL}/openapi.json with operationIds getApiStatus, listArticles, getArticleBySlug, createLead.`,
  },
  "/mcp": {
    title: "MCP server | Alchemyst AI",
    body: `Streamable HTTP MCP at ${BASE_URL}/mcp. Manifests: ${BASE_URL}/server.json, ${BASE_URL}/.well-known/mcp.json, ${BASE_URL}/mcp/server-card.`,
  },
};

function notFoundMarkdown(path: string) {
  return `# Page not found\n\nThe requested resource ${path} does not exist. Use one of these public indexes to recover:\n\n- Homepage: ${BASE_URL}/\n- Machine-readable site guide: ${BASE_URL}/llms.txt\n- Full content: ${BASE_URL}/llms-full.txt\n- XML sitemap: ${BASE_URL}/sitemap.xml\n- Docs: https://docs.getalchemystai.com\n- Developer portal: ${BASE_URL}/developers\n- API spec: ${BASE_URL}/openapi.json\n- About: ${BASE_URL}/about\n- Contact: ${BASE_URL}/contact\n- Privacy: ${BASE_URL}/privacy\n`;
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
        Vary: "Accept, Accept-Encoding",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  }

  const body = notFoundMarkdown(path);
  return new NextResponse(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
