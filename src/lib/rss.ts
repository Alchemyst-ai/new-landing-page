import RSS from 'rss';

async function getAllBlogPosts() {
    const rawBaseUrl = process.env.STRAPI_API_URL || "";
    const baseUrl = rawBaseUrl.replace(/\/+$/, "");
    const token = process.env.STRAPI_API_TOKEN || "";

    console.log("THE STUFF", token, rawBaseUrl)

    const url = `${baseUrl}/api/articles?populate=*`;

    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status}`);
    }

    const json = await res.json();
    const articles = Array.isArray(json?.data) ? json.data : [];

    return articles.map((item: any) => {
        const attrs = item?.attributes ?? {};
        const cover = attrs.cover ?? {};
        const coverUrl = cover?.url || cover?.formats?.medium?.url || null;
        const absoluteCoverUrl = coverUrl
            ? `${baseUrl}${coverUrl}`
            : null;

        return {
            title: attrs.title,
            slug: attrs.slug,
            excerpt: attrs.description,
            date: attrs.publishedAt || attrs.createdAt,
            image: absoluteCoverUrl,
            content: attrs.test || "",
        };
    });
}


export async function generateRSSFeed() {
    const siteUrl = 'https://getalchemystai.com';
    const feed = new RSS({
        title: 'AlchemystAI blog',
        description: 'Latest upto date articles and blog posts from AlchemystAI',
        site_url: siteUrl,
        feed_url: `${siteUrl}/rss.xml`,
        language: 'en',
    });

    const posts = await getAllBlogPosts();

    posts.forEach((post: any) => {
        feed.item({
            title: post.title,
            description: post.excerpt,
            url: `${siteUrl}/blog/${post.slug}`,
            date: post.date,
        });
    });

    return feed.xml({ indent: true });
}
