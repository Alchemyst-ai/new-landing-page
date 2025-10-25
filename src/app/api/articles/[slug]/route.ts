import { NextResponse } from "next/server";
import { estimateReadTimeFromHtml } from "@/lib/utils";

function normalizeBaseUrl(raw: string) {
  return raw.replace(/\/+$/, "");
}

async function getArticleBySlug(slug: string) {
  const rawBaseUrl =
    process.env.STRAPI_API_URL ||
    "";
  const baseUrl = normalizeBaseUrl(rawBaseUrl);
  const token = process.env.STRAPI_API_TOKEN || "";
  const url = `${baseUrl}/api/articles?filters[slug][$eq]=${encodeURIComponent(
    slug
  )}&populate=*`;

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Failed to fetch article (${res.status}): ${text}`) as Error & {
      __debug?: any;
    };
    err.__debug = { url, hasAuth: Boolean(token) };
    throw err;
  }
  return res.json();
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await ctx.params;
    const result = await getArticleBySlug(slug);

    // console.log("Single Article", result)

    const items = Array.isArray(result?.data) ? result.data : [];
    const data = items.map((item: any) => {
      const attrs = item?.attributes ?? item ?? {};
      const cover = attrs.cover ?? {};
      // const coverUrl = cover?.formats?.thumbnail?.url || cover?.url || null;
      const coverUrl = cover?.url || null;
      // const absBase = (process.env.STRAPI_API_URL || "").replace(/\/+$/, "");
      const image = coverUrl ? `${coverUrl}` : null;
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
        test: attrs.test,
        about: attrs.about,
        image,
        author: author ? { name: author.name, email: author.email } : null,
        reviewer: reviewer ? { name: reviewer.name, email: reviewer.email } : null,
        category: category ? { name: category.name, slug: category.slug } : null,
        readTime: estimateReadTimeFromHtml(attrs.test || ""),
      };
    });
    if (data.length === 0) return NextResponse.json({ data: [] }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const err = error as any;
    const message = err?.message || "Unknown error";
    const debug = err?.__debug || null;
    return NextResponse.json({ error: message, debug }, { status: 500 });
  }
}


