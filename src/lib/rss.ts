import RSS from "rss";

async function getAllBlogPosts() {
    try {
        const rawBaseUrl = process.env.STRAPI_API_URL || "";
        const baseUrl = rawBaseUrl.replace(/\/+$/, "");
        const token = process.env.STRAPI_API_TOKEN || "";

        const url = `${baseUrl}/api/articles?populate=*`;

        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(url, { headers, next: { revalidate: 3600 } });
        if (!res.ok) {
            console.error(`Failed to fetch articles: ${res.status}`);
            return [];
        }

        const json = await res.json();
        const articles = Array.isArray(json?.data) ? json.data : [];

        return articles.map((item: any) => {
            const attrs = item?.attributes ?? {};
            const cover = attrs.cover ?? {};
            const coverUrl = cover?.url || cover?.formats?.medium?.url || null;
            const absoluteCoverUrl = coverUrl ? `${baseUrl}${coverUrl}` : null;

            return {
                title: attrs.title,
                slug: attrs.slug,
                excerpt: attrs.description,
                date: attrs.publishedAt || attrs.createdAt,
                image: absoluteCoverUrl,
                content: attrs.test || "",
            };
        });
    } catch (error: any) {
        console.error("Error fetching articles for RSS:", error?.message || error);
        return [];
    }
}

export async function generateRSSFeed() {
    const siteUrl = "https://getalchemystai.com";
    const feed = new RSS({
        title: "AlchemystAI Blog",
        description: "Latest up-to-date articles and blog posts from AlchemystAI",
        site_url: siteUrl,
        feed_url: `${siteUrl}/rss`,
        language: "en",
    });

    const posts = await getAllBlogPosts();

    if (!posts.length) {
        console.warn("No articles found for RSS feed.");

        feed.item({
            title: "No posts available",
            description: "Our blog is being updated — check back soon!",
            url: siteUrl,
            date: new Date(),
        });
    }

    if (posts.length >= 1)
        posts.forEach((post: any) => {
            feed.item({
                title: post.title,
                description: post.excerpt || "",
                url: `${siteUrl}/blog/${post.slug}`,
                date: post.date,
            });
        });

    return feed.xml({ indent: true });
}