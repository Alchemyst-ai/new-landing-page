import { estimateReadTimeFromHtml } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

async function getAllArticles() {
  const rawBaseUrl = process.env.STRAPI_API_URL || "";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const token = process.env.STRAPI_API_TOKEN || "";

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let page = 1;
  const pageSize = 25;
  let allItems: any[] = [];

  while (true) {
    const url = `${baseUrl}/api/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`Failed to fetch articles (${res.status}): ${text}`) as Error & { __debug?: any };
      err.__debug = { url, hasAuth: Boolean(token) };
      throw err;
    }
    const json = await res.json();
    const items: any[] = Array.isArray(json?.data) ? json.data : [];
    allItems = allItems.concat(items);

    const pagination = json?.meta?.pagination;
    if (!pagination || page >= pagination.pageCount) break;
    page++;
  }

  return allItems;
}

function mapItem(item: any) {
  const attrs = item?.attributes ?? item ?? {};
  const cover = attrs.cover ?? {};
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
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);

    const allItems = await getAllArticles();
    const data = allItems
      .map(mapItem)
      .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

    // If page param provided, return paginated slice; otherwise return all
    if (page > 0) {
      const start = (page - 1) * pageSize;
      const slice = data.slice(start, start + pageSize);
      return NextResponse.json({
        data: slice,
        pagination: {
          page,
          pageSize,
          total: data.length,
          pageCount: Math.ceil(data.length / pageSize),
        },
      });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.log("Error: ", error);
    const err = error as any;
    const message = err?.message || "Unknown error";
    const debug = err?.__debug || null;
    return NextResponse.json(
      {
        type: "about:blank",
        title: "Failed to list articles",
        status: 500,
        detail: message,
        code: "upstream_failed",
        resolution: "Retry shortly, or see /openapi.json. Contact founders@getalchemystai.com if this persists.",
        error: message,
        debug,
      },
      { status: 500, headers: { "Content-Type": "application/problem+json" } }
    );
  }
}
