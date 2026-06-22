import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.getalchemystai.com" },
      { protocol: "https", hostname: "getalchemystai.com" },
      { protocol: "https", hostname: process.env.STRAPI_BASE_URL ?? "" },
    ],
  },
  env: {
    STRAPI_BASE_URL: process.env.STRAPI_BASE_URL ?? "",
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
