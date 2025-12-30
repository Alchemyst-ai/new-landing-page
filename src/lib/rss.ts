import RSS from "rss";

async function getAllBlogPosts() {
    try {
        const rawBaseUrl = process.env.STRAPI_API_URL || "";
        const baseUrl = rawBaseUrl.replace(/\/+$/, "");
        const token = process.env.STRAPI_API_TOKEN || "";

        const url = `${baseUrl}/api/articles?populate=*`;
        // console.log("THE URL", url);

        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(url, { headers, next: { revalidate: 1800 } });
        if (!res.ok) {
            console.error(`Failed to fetch articles: ${res.status}`);
            return [];
        }

        const json = await res.json();

        const articles = Array.isArray(json?.data)
            ? json.data.map((item: any) => item.attributes ?? item)
            : Array.isArray(json)
                ? json
                : [];
        console.log("THE ARTICLES", articles);

        return articles.map((article: any) => {
            const cover = article.cover ?? {};
            const coverUrl =
                cover.url || cover?.formats?.medium?.url || null;
            const absoluteCoverUrl = coverUrl
                ? coverUrl.startsWith("http")
                    ? coverUrl
                    : `${baseUrl}${coverUrl}`
                : null;

            return {
                title: article.title ?? "",
                slug: article.slug ?? "",
                excerpt: article.description ?? article.about ?? "",
                date: article.publishedAt ?? article.createdAt ?? new Date(),
                image: absoluteCoverUrl,
                content: article.test ?? "",
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

    console.log("THE POSTS", posts)

    if (!posts || posts.length === 0) {
        console.warn("No articles found for RSS feed.");

        feed.item({
            title: "No posts available",
            description: "Our blog is being updated — check back soon!",
            url: siteUrl,
            date: new Date(),
        });
    } else {
        posts.forEach((post: any) => {
            feed.item({
                title: post.title,
                description: post.excerpt || "",
                url: `${siteUrl}/blog/${post.slug}`,
                date: post.date,
            });
        });
    }

    return feed.xml({ indent: true });
}
