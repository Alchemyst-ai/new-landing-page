import { estimateReadTimeFromHtml } from "@/lib/utils";
import { NextResponse } from "next/server";

async function getArticles() {
  const rawBaseUrl =
    process.env.STRAPI_API_URL ||
    "";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const token = process.env.STRAPI_API_TOKEN || "";
  const url = `${baseUrl}/api/articles?populate=*&pagination[pageSize]=100`;

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Failed to fetch articles (${res.status}): ${text}`) as Error & {
      __debug?: any;
    };
    err.__debug = { url, hasAuth: Boolean(token) };
    throw err;
  }
  return res.json();
}

export async function GET() {
  try {
    const articles = await getArticles();

    // console.log("THE ARTICLES", JSON.stringify(articles, null, 2))

    const items = Array.isArray(articles?.data) ? articles.data : [];
    const data = items.map((item: any) => {
      const attrs = item?.attributes ?? item ?? {};
      const cover = attrs.cover ?? {};
      // const coverUrl = cover?.formats?.thumbnail?.url || cover?.url || null;
      const coverUrl = cover?.url || null;
      const absoluteCoverUrl = coverUrl ? `${coverUrl}` : null;
      const author = attrs.author ?? null;
      const reviewer = attrs.reviewer ?? null;
      const category = attrs.category ?? null;
      return {
        id: item?.id ?? attrs?.id ?? undefined,
        documentId: attrs?.documentId,
        slug: attrs.slug,
        title: attrs.title,
        description: attrs.description,
        publishedAt: attrs.publishedAt,
        createdAt: attrs.createdAt,
        updatedAt: attrs.updatedAt,
        image: absoluteCoverUrl,
        author: author ? { name: author.name, email: author.email } : null,
        reviewer: reviewer ? { name: reviewer.name, email: reviewer.email } : null,
        category: category ? { name: category.name, slug: category.slug } : null,
        readTime: estimateReadTimeFromHtml(attrs.test || ""),
      };
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.log("Error: ", error)
    const err = error as any;
    const message = err?.message || "Unknown error";
    const debug = err?.__debug || null;
    return NextResponse.json({ error: message, debug }, { status: 500 });
  }
}
