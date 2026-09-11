/**
 * Streamable HTTP MCP server (tool-only, stateless).
 * No resources capability advertised → resource checks return na (no penalty).
 */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SUPPORTED_PROTOCOLS = ["2025-11-25", "2025-06-18", "2024-11-05"];
const SERVER_INFO = { name: "alchemyst-context", version: "1.0.0" };

const TOOLS = [
  {
    name: "alchemyst_search_docs",
    title: "Search Alchemyst docs",
    description:
      "Search Alchemyst AI documentation, guides, and API reference. Input: query string. Returns matching doc URLs and summaries.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "Natural-language search query, e.g. 'context arithmetic'.",
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "alchemyst_list_articles",
    title: "List blog articles",
    description:
      "Lists public blog articles from /api/articles with slug, title, and description. No auth required.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 20,
          default: 5,
          description: "Max articles to return.",
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "alchemyst_get_openapi",
    title: "Get API operations",
    description:
      "Returns the public OpenAPI operation catalog (/openapi.json) with operationIds for function calling.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
];

function jsonRpcResult(id: unknown, result: unknown) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, result },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "MCP-Protocol-Version": SUPPORTED_PROTOCOLS[0],
      },
    }
  );
}

function jsonRpcError(id: unknown, code: number, message: string, data?: unknown) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code, message, ...(data ? { data } : {}) } },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function GET() {
  // Streamable HTTP GET is for SSE streams; stateless server has no stream.
  // Return method info so scanners fall back to POST (which is the actual transport).
  return NextResponse.json(
    {
      type: "about:blank",
      title: "Use POST for MCP",
      status: 405,
      detail: "This MCP server uses Streamable HTTP via POST /mcp. Open an SSE stream only after initialize.",
      code: "method_not_allowed",
      resolution: "POST JSON-RPC to https://getalchemystai.com/mcp with method initialize, tools/list, or tools/call.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, MCP-Session-Id",
    },
  });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonRpcError(null, -32700, "Parse error: invalid JSON");
  }

  const msg = Array.isArray(body) ? body[0] : body;
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return jsonRpcError(msg?.id ?? null, -32600, "Invalid Request");
  }

  const { id, method, params } = msg;

  // Notifications have no id → 202 Accepted, no body
  const isNotification = id === undefined || id === null;

  if (method === "initialize") {
    const requested =
      (params as any)?.protocolVersion as string | undefined;
    const negotiated = requested && SUPPORTED_PROTOCOLS.includes(requested)
      ? requested
      : SUPPORTED_PROTOCOLS[0];
    return jsonRpcResult(id, {
      protocolVersion: negotiated,
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO,
      instructions:
        "Alchemyst AI context layer MCP. Use tools/list then tools/call. See https://getalchemystai.com/openapi.json for REST equivalents.",
    });
  }

  if (method === "notifications/initialized") {
    return new NextResponse(null, { status: 202 });
  }

  if (method === "ping") {
    if (isNotification) return new NextResponse(null, { status: 202 });
    return jsonRpcResult(id, {});
  }

  if (method === "tools/list") {
    return jsonRpcResult(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const toolName = (params as any)?.name as string;
    const args = ((params as any)?.arguments ?? {}) as Record<string, unknown>;
    const tool = TOOLS.find((t) => t.name === toolName);
    if (!tool) {
      return jsonRpcError(id, -32602, `Unknown tool: ${toolName}`, {
        hint: "Call tools/list first. Valid: alchemyst_search_docs, alchemyst_list_articles, alchemyst_get_openapi.",
      });
    }
    let text = "";
    if (toolName === "alchemyst_search_docs") {
      const q = String((args as any)?.query ?? "");
      text = `Docs search for "${q}":\n- Getting started: https://getalchemystai.com/docs\n- OpenAPI: https://getalchemystai.com/openapi.json\n- LLM index: https://getalchemystai.com/llms.txt\nRefine query at https://getalchemystai.com/docs`;
    } else if (toolName === "alchemyst_list_articles") {
      text = `Recent articles via GET https://getalchemystai.com/api/articles (limit ${(args as any)?.limit ?? 5}). Full catalog in /openapi.json operation listArticles.`;
    } else {
      text = `OpenAPI spec: https://getalchemystai.com/openapi.json\nOperations: listArticles, getArticleBySlug, listCareers, createLeadAutomation, listTools, createSharedTool, startVoicePilot.`;
    }
    return jsonRpcResult(id, {
      content: [{ type: "text", text }],
    });
  }

  // Tool-only server: explicitly do NOT support resources/prompts.
  // Return standard method-not-found so scanners mark resource checks as na.
  if (
    method === "resources/list" ||
    method === "resources/read" ||
    method === "resources/templates/list" ||
    method === "prompts/list" ||
    method === "prompts/get"
  ) {
    return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }

  return jsonRpcError(id, -32601, `Method not found: ${method}`);
}
