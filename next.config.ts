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

const imageHostnames = Array.from(
  new Set(
    [
      "cms.getalchemystai.com",
      "getalchemystai.com",
      hostnameFromUrl(strapiBaseUrl),
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
    ];
  },
};

export default nextConfig;
