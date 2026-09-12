import { NextResponse } from "next/server";

export const dynamic = "force-static";

const spec = {
  openapi: "3.1.0",
  info: {
    title: "Alchemyst AI Landing Site Public API",
    version: "1.0.0",
    description:
      "Public read/write API for the Alchemyst AI marketing site: blog articles from Strapi CMS, lead capture, and service status. All errors use RFC 9457 application/problem+json with machine-readable code, human-readable detail, and resolution hints.\n\nVersioning: URL path versioning. Current is /api/v1/* (e.g. GET /api/v1/articles). Unversioned /api/* aliases are kept for backwards compatibility and map to v1 via rewrite. Breaking changes will ship as /api/v2/* with 6-month overlap. Deprecation is signaled via `Deprecation: true` + `Sunset` response headers and documented in /llms.txt changelog. Every /api/* response includes IETF RateLimit headers (`RateLimit-Policy: 120;w=60`, `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`) and `API-Version: v1`. On 429, `Retry-After` seconds is returned with a problem+json body (code rate_limited). See /llms.txt and /developers for conventions.",
    termsOfService: "https://getalchemystai.com/privacy",
    contact: {
      name: "Alchemyst AI support",
      url: "https://getalchemystai.com/contact",
      email: "founders@getalchemystai.com",
    },
    license: {
      name: "See Privacy Notice",
      url: "https://getalchemystai.com/privacy",
    },
  },
  servers: [
    {
      url: "https://getalchemystai.com/api/v1",
      description: "Production v1 (current). Unversioned /api/* aliases to v1.",
    },
    {
      url: "https://getalchemystai.com",
      description: "Production (unversioned aliases, legacy compatible)",
    },
  ],
  tags: [
    { name: "Status", description: "Service health and version discovery." },
    { name: "Articles", description: "Blog articles proxied from Strapi CMS." },
    { name: "Leads", description: "Contact and pilot lead capture." },
  ],
  paths: {
    "/api/status": {
      get: {
        operationId: "getApiStatus",
        summary: "Get API status",
        description:
          "Returns service health, current API version (v1), timestamp, and links to docs, OpenAPI, and llms.txt. No auth required. Use to verify connectivity before calling other operations.",
        tags: ["Status"],
        responses: {
          "200": {
            description: "Service status",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiStatus" },
              },
            },
          },
          "500": { $ref: "#/components/responses/ProblemResponse" },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
        },
      },
    },
    "/api/articles": {
      get: {
        operationId: "listArticles",
        summary: "List blog articles",
        description:
          "Returns summarized Alchemyst AI blog articles from Strapi CMS with slug, title, description, author, category, and canonical URL. Supports full-text search and limit pagination.",
        tags: ["Articles"],
        parameters: [
          {
            in: "query",
            name: "limit",
            required: false,
            description: "Max articles to return (1-50, default 10).",
            schema: { type: "integer", minimum: 1, maximum: 50, default: 10 },
            example: 10,
          },
          {
            in: "query",
            name: "search",
            required: false,
            description: "Full-text search on title and description.",
            schema: { type: "string", maxLength: 200 },
            example: "context arithmetic",
          },
        ],
        responses: {
          "200": {
            description: "Article list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data", "total"],
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ArticleSummary" },
                    },
                    total: { type: "integer", description: "Total matching articles." },
                  },
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/ProblemResponse" },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
        },
      },
    },
    "/api/articles/{slug}": {
      get: {
        operationId: "getArticleBySlug",
        summary: "Get one article by slug",
        description:
          "Fetches a single Alchemyst AI article including full markdown body, metadata, and canonical URL. Returns 404 problem+json when the slug does not exist.",
        tags: ["Articles"],
        parameters: [
          {
            in: "path",
            name: "slug",
            required: true,
            description: "URL-safe article slug, e.g. voice-ai-what-changed.",
            schema: { type: "string", minLength: 1, maxLength: 200 },
            example: "voice-ai-what-changed",
          },
        ],
        responses: {
          "200": {
            description: "Single article",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data"],
                  properties: {
                    data: { $ref: "#/components/schemas/ArticleDetail" },
                  },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/ProblemResponse" },
          "422": { $ref: "#/components/responses/ProblemResponse" },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
    "/api/leads": {
      post: {
        operationId: "createLead",
        summary: "Create a contact lead",
        description:
          "Validates lead fields (name, email, useCase required; company optional) and returns a 201 acknowledgement. Real onboarding happens via platform signup. Returns 422 problem+json on validation failure.",
        tags: ["Leads"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LeadRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Lead accepted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["ok", "message", "contact"],
                  properties: {
                    ok: { type: "boolean", example: true },
                    message: { type: "string" },
                    contact: { type: "string", example: "founders@getalchemystai.com" },
                  },
                },
              },
            },
          },
          "422": { $ref: "#/components/responses/ProblemResponse" },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
  },
  components: {
    schemas: {
      ApiStatus: {
        type: "object",
        required: ["status", "service", "version", "time", "docs", "llms"],
        properties: {
          status: { type: "string", example: "ok" },
          service: { type: "string", example: "alchemyst-landing-public-api" },
          version: { type: "string", example: "v1" },
          time: { type: "string", format: "date-time" },
          docs: { type: "string", format: "uri" },
          llms: { type: "string", format: "uri" },
        },
      },
      ArticleSummary: {
        type: "object",
        required: ["slug", "title", "url"],
        properties: {
          slug: { type: "string", description: "URL-safe slug." },
          title: { type: "string" },
          description: { type: "string" },
          author: { type: ["string", "null"] },
          category: { type: ["string", "null"] },
          publishedAt: { type: ["string", "null"], format: "date-time" },
          url: { type: "string", format: "uri" },
        },
      },
      ArticleDetail: {
        allOf: [
          { $ref: "#/components/schemas/ArticleSummary" },
          {
            type: "object",
            properties: {
              updatedAt: { type: ["string", "null"], format: "date-time" },
              bodyMarkdown: { type: "string", description: "Full article body in markdown (truncated at 20k chars)." },
            },
          },
        ],
      },
      LeadRequest: {
        type: "object",
        required: ["name", "email", "useCase"],
        properties: {
          name: { type: "string", minLength: 1, maxLength: 200 },
          email: { type: "string", format: "email" },
          company: { type: "string", maxLength: 200 },
          useCase: { type: "string", minLength: 1, maxLength: 2000 },
        },
      },
      Problem: {
        type: "object",
        required: ["type", "title", "status", "detail", "code", "resolution"],
        properties: {
          type: { type: "string", example: "about:blank" },
          title: { type: "string" },
          status: { type: "integer" },
          detail: { type: "string" },
          code: { type: "string", description: "Machine-readable snake_case code." },
          resolution: { type: "string", description: "Human hint for how to resolve." },
        },
      },
    },
    responses: {
      ProblemResponse: {
        description: "RFC 9457 problem+json error with code and resolution hint.",
        content: {
          "application/problem+json": {
            schema: { $ref: "#/components/schemas/Problem" },
          },
        },
      },
      RateLimitedResponse: {
        description: "Rate limited — retry after Retry-After seconds.",
        headers: {
          "Retry-After": {
            description: "Seconds until quota resets.",
            schema: { type: "integer" },
          },
          "RateLimit-Limit": { schema: { type: "string" } },
          "RateLimit-Remaining": { schema: { type: "string" } },
          "RateLimit-Reset": { schema: { type: "string" } },
        },
        content: {
          "application/problem+json": {
            schema: { $ref: "#/components/schemas/Problem" },
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(spec, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      "API-Version": "v1",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
