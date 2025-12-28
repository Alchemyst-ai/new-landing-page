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

  // Fetch blog posts from your API
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${baseUrl}/api/articles`, { next: { revalidate: 1800 } });
    if (res.ok) {
      const json = await res.json();
      const articles = json?.data || [];

      blogPosts = articles.map((article: any) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  return [...staticPages, ...blogPosts];
}
