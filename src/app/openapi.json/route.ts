import { NextResponse } from "next/server";

export const dynamic = "force-static";

const spec = {
  openapi: "3.1.0",
  info: {
    title: "Alchemyst AI Landing Site Public API",
    version: "1.0.0",
    description:
      "Public read/write API for the Alchemyst AI marketing site: blog articles from Strapi, career listings from Tally, lead capture, and voice pilot signup. All errors use RFC 9457 application/problem+json with machine-readable code, human-readable detail, and resolution hints.\n\nVersioning: URL path versioning. Current is /api/v1/* (e.g. GET /api/v1/articles). Unversioned /api/* aliases are kept for backwards compatibility and map to v1 via rewrite. Breaking changes will ship as /api/v2/* with 6-month overlap. Deprecation is signaled via `Deprecation: true` + `Sunset` response headers and documented in /llms.txt changelog. Send `API-Version: v1` (also returned on every response) or use the versioned path.\n\nRate limits: public read 120 req/min per IP. Every /api/* response includes IETF RateLimit headers (`RateLimit-Policy: 120;w=60`, `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`) and `API-Version: v1`. On 429, `Retry-After` seconds is returned with a problem+json body (code rate_limited). See /llms.txt and /docs for conventions.",
    termsOfService: "https://getalchemystai.com/terms-of-use",
    contact: {
      name: "Alchemyst AI support",
      url: "https://getalchemystai.com/contact",
      email: "founders@getalchemystai.com",
    },
    license: {
      name: "See Terms of Use",
      url: "https://getalchemystai.com/terms-of-use",
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
    { name: "Articles", description: "Blog articles proxied from Strapi CMS." },
    { name: "Careers", description: "Job listings proxied from Tally." },
    { name: "Leads", description: "Lead capture and pilot signup." },
    { name: "Tools", description: "Community context spaces." },
  ],
  paths: {
    "/api/articles": {
      get: {
        operationId: "listArticles",
        summary: "List blog articles",
        description:
          "Returns summarized blog articles from Strapi with slug, title, description, cover, author, category, and read time.",
        tags: ["Articles"],
        responses: {
          "200": {
            description: "Article list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data"],
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ArticleSummary" },
                    },
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
          "Fetches a single article including full HTML body (test, about), metadata, and read time. Returns 404 JSON when missing.",
        tags: ["Articles"],
        parameters: [
          {
            in: "path",
            name: "slug",
            required: true,
            description: "URL-safe article slug, e.g. context-embeddings-in-llms.",
            schema: { type: "string", minLength: 1, maxLength: 200 },
            example: "context-embeddings-in-llms",
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
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ArticleDetail" },
                    },
                  },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/ProblemResponse" },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
    "/api/careers": {
      get: {
        operationId: "listCareers",
        summary: "List open roles",
        description:
          "Lists published, open Tally forms as job positions, sorted newest first. Falls back to demo data when Tally is unreachable.",
        tags: ["Careers"],
        responses: {
          "200": {
            description: "Job list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["jobs"],
                  properties: {
                    jobs: {
                      type: "array",
                      items: { $ref: "#/components/schemas/JobPosition" },
                    },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
    "/api/lead-automation": {
      post: {
        operationId: "createLeadAutomation",
        summary: "Add lead to campaign",
        description:
          "Validates lead fields and forwards to MeetAlfred campaign 1332714. Requires email, firstname, company, title, and LinkedIn handle.",
        tags: ["Leads"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LeadAutomationRequest" },
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
                  properties: { ok: { type: "boolean", example: true } },
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
    "/api/tools": {
      get: {
        operationId: "listTools",
        summary: "List context spaces",
        description:
          "Searchable, paginated list of community context spaces with type filter (all, featured, recommended, or category slug).",
        tags: ["Tools"],
        parameters: [
          {
            in: "query",
            name: "type",
            required: false,
            description: "Filter type or category slug.",
            schema: { type: "string", default: "all" },
          },
          {
            in: "query",
            name: "search",
            required: false,
            description: "Full-text search on title and description.",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
          },
          {
            in: "query",
            name: "offset",
            required: false,
            schema: { type: "integer", minimum: 0, default: 0 },
          },
        ],
        responses: {
          "200": {
            description: "Tool list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ContextSpace" },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
      post: {
        operationId: "createSharedTool",
        summary: "Create shared item",
        description:
          "Creates a shared context item and returns it with a generated magic key.",
        tags: ["Tools"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", additionalProperties: true },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SharedItem" },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
    "/api/voice-start-pilot": {
      post: {
        operationId: "startVoicePilot",
        summary: "Request voice pilot",
        description:
          "Validates email, agent count, terms acceptance, and optional phone, then appends the lead to Google Sheets.",
        tags: ["Leads"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VoicePilotRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Pilot requested",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: { email: { type: "string", format: "email" } },
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
    "/api/v1/articles": {
      get: {
        operationId: "listArticlesV1",
        summary: "List blog articles (v1)",
        description:
          "Versioned alias of GET /api/articles. Current stable v1. See Versioning in info.description.",
        tags: ["Articles"],
        parameters: [
          {
            in: "header",
            name: "API-Version",
            required: false,
            description: "Pin API version. Current: v1.",
            schema: { type: "string", enum: ["v1"], default: "v1" },
          },
        ],
        responses: {
          "200": {
            description: "Article list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data"],
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ArticleSummary" },
                    },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
    "/api/v1/careers": {
      get: {
        operationId: "listCareersV1",
        summary: "List open roles (v1)",
        description: "Versioned alias of GET /api/careers.",
        tags: ["Careers"],
        responses: {
          "200": {
            description: "Job list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["jobs"],
                  properties: {
                    jobs: {
                      type: "array",
                      items: { $ref: "#/components/schemas/JobPosition" },
                    },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimitedResponse" },
          "500": { $ref: "#/components/responses/ProblemResponse" },
        },
      },
    },
  },
  components: {
    schemas: {
      Problem: {
        type: "object",
        required: ["type", "title", "status", "detail", "code", "resolution"],
        properties: {
          type: { type: "string", example: "about:blank" },
          title: { type: "string", example: "Article not found" },
          status: { type: "integer", example: 404 },
          detail: { type: "string" },
          code: { type: "string", example: "article_not_found" },
          resolution: { type: "string" },
        },
      },
      ArticleSummary: {
        type: "object",
        properties: {
          id: { type: "integer" },
          slug: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          publishedAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          image: { type: ["string", "null"] },
          readTime: { type: "integer" },
        },
      },
      ArticleDetail: {
        allOf: [
          { $ref: "#/components/schemas/ArticleSummary" },
          {
            type: "object",
            properties: {
              test: { type: "string", description: "Full HTML body" },
              about: { type: "string" },
            },
          },
        ],
      },
      JobPosition: {
        type: "object",
        required: ["id", "title", "createdAt"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          title: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      LeadAutomationRequest: {
        type: "object",
        required: [
          "email",
          "csv_csvfirstname",
          "csv_csvcompanyname",
          "csv_currenttitle",
          "csv_linkedinhandle",
        ],
        properties: {
          email: { type: "string", format: "email" },
          csv_csvfirstname: { type: "string" },
          csv_csvcompanyname: { type: "string" },
          csv_currenttitle: { type: "string" },
          csv_linkedinhandle: { type: "string", format: "uri" },
          linkedin_profile_url: { type: "string" },
        },
        additionalProperties: true,
      },
      VoicePilotRequest: {
        type: "object",
        required: ["email", "callingAgents", "acceptedTerms"],
        properties: {
          email: { type: "string", format: "email" },
          callingAgents: { type: "integer", minimum: 1 },
          acceptedTerms: { type: "boolean" },
          phoneCountryCode: { type: "string" },
          phoneNumber: { type: "string" },
          phoneE164: { type: "string" },
          source: { type: "string" },
        },
      },
      ContextSpace: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          categories: { type: "array", items: { type: "string" } },
          fullName: { type: ["string", "null"] },
        },
      },
      SharedItem: {
        type: "object",
        properties: {
          magic_key: { type: "string" },
        },
        additionalProperties: true,
      },
    },
    responses: {
      ProblemResponse: {
        description: "RFC 9457 problem+json error with code and resolution",
        headers: {
          "RateLimit-Policy": {
            description: "Rate limit policy, e.g. 120;w=60",
            schema: { type: "string" },
          },
          "RateLimit-Remaining": {
            description: "Requests remaining in window",
            schema: { type: "string" },
          },
          "Retry-After": {
            description: "Seconds to wait after 429",
            schema: { type: "string" },
          },
          "API-Version": {
            description: "API version served (v1)",
            schema: { type: "string" },
          },
        },
        content: {
          "application/problem+json": {
            schema: { $ref: "#/components/schemas/Problem" },
          },
          "application/json": {
            schema: { $ref: "#/components/schemas/Problem" },
          },
        },
      },
      RateLimitedResponse: {
        description: "429 rate limited with Retry-After",
        headers: {
          "Retry-After": {
            description: "Seconds until retry",
            schema: { type: "integer", example: 60 },
          },
          "RateLimit-Policy": {
            schema: { type: "string", example: "120;w=60" },
          },
          "API-Version": {
            schema: { type: "string", example: "v1" },
          },
        },
        content: {
          "application/problem+json": {
            schema: { $ref: "#/components/schemas/Problem" },
            example: {
              type: "about:blank",
              title: "Rate limited",
              status: 429,
              detail: "Too many requests. Retry after 60 seconds.",
              code: "rate_limited",
              resolution: "Back off per Retry-After, then retry. See /openapi.json rate limit policy.",
            },
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
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
