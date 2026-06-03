import { DOMParser } from '@xmldom/xmldom';
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static pages
  let staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.99,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.99,
    },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/use-cases/customer-support`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/use-cases/edtech`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/use-cases/finance`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/use-cases/healthcare`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const docsSitemap = await fetch('https://getalchemystai.com/docs/sitemap.xml');

  // Parse the docs sitemap XML and extract URLs
  let docsUrls: MetadataRoute.Sitemap = [];
  if (docsSitemap.ok) {
    const xmlText = await docsSitemap.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const urlElements = Array.from(xmlDoc.getElementsByTagName("url"));
    docsUrls = urlElements.map((urlElem: Element) => {
      const loc = urlElem.getElementsByTagName("loc")[0]?.textContent || "";
      const lastmod = urlElem.getElementsByTagName("lastmod")[0]?.textContent;
      return {
        url: loc,
        lastModified: lastmod ? new Date(lastmod) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

    staticPages = [...staticPages, ...docsUrls];
  }

  // Fetch blog posts directly from Strapi (looping all pages)
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const rawBase = process.env.STRAPI_API_URL || "";
    const strapiBase = rawBase.replace(/\/+$/, "");
    const token = process.env.STRAPI_API_TOKEN || "";
    const strapiHeaders: Record<string, string> = {};
    if (token) strapiHeaders["Authorization"] = `Bearer ${token}`;

    let strapiPage = 1;
    const allSlugs: { slug: string; updatedAt: string; publishedAt: string }[] = [];

    while (true) {
      const qs = new URLSearchParams();
      qs.set("fields[0]", "slug");
      qs.set("fields[1]", "updatedAt");
      qs.set("fields[2]", "publishedAt");
      qs.set("pagination[page]", String(strapiPage));
      qs.set("pagination[pageSize]", "100");
      qs.set("sort", "publishedAt:desc");

      const res = await fetch(`${strapiBase}/api/articles?${qs}`, { headers: strapiHeaders, next: { revalidate: 1800 } });
      if (!res.ok) break;
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : [];
      allSlugs.push(...items.map((a: any) => ({ slug: a.slug, updatedAt: a.updatedAt, publishedAt: a.publishedAt })));
      const meta = json?.meta?.pagination;
      if (!meta || strapiPage >= meta.pageCount) break;
      strapiPage++;
    }

    blogPosts = allSlugs.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.updatedAt || a.publishedAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  return [...staticPages, ...blogPosts];
}
