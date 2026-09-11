import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const strapiBaseUrl =
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_BASE_URL ||
  "https://cms.getalchemystai.com";

function hostnameFromUrl(value: string | undefined): string | null {
  if (!value) return null;

  try {
    return new URL(value).hostname || null;
  } catch {
    return value.trim() || null;
  }
}

function mediaHostnameFor(hostname: string | null): string | null {
  if (!hostname || !hostname.endsWith(".strapiapp.com")) return null;
  if (hostname.endsWith(".media.strapiapp.com")) return hostname;
  return hostname.replace(".strapiapp.com", ".media.strapiapp.com");
}

const strapiHostname = hostnameFromUrl(strapiBaseUrl);

const imageHostnames = Array.from(
  new Set(
    [
      "cms.getalchemystai.com",
      "getalchemystai.com",
      strapiHostname,
      mediaHostnameFor(strapiHostname),
    ].filter((hostname): hostname is string => Boolean(hostname))
  )
);

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: imageHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
  env: {
    STRAPI_BASE_URL: strapiBaseUrl,
    STRAPI_BLOG_CONTENT_TYPE:
      process.env.STRAPI_BLOG_CONTENT_TYPE ?? "articles",
  },
  async rewrites() {
    return [
      {
        source: "/blog/:slug.md",
        destination: "/api/blog/:slug/.md",
      },
      // Versioned API aliases: /api/v1/* → /api/* (v1 is current; unversioned is legacy alias)
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "RateLimit-Policy", value: '120;w=60;comment="public read: 120 req/min per IP"' },
          { key: "RateLimit-Limit", value: "120" },
          { key: "RateLimit-Remaining", value: "119" },
          { key: "RateLimit-Reset", value: "60" },
          { key: "API-Version", value: "v1" },
          { key: "Access-Control-Expose-Headers", value: "RateLimit-Policy, RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, API-Version, Retry-After" },
        ],
      },
      {
        source: "/openapi.json",
        headers: [
          { key: "API-Version", value: "v1" },
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=600" },
        ],
      },
    ];
  },
};

export default nextConfig;