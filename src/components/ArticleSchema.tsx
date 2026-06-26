// ArticleSchema - emits Article JSON-LD for comparison/guide pages for AI visibility.
// BlogPosting is also valid for time-sensitive editorial content.

const BASE_URL = "https://getalchemystai.com";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

function absoluteUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function ArticleSchema({
  headline,
  description,
  url,
  datePublished = "2026-06-01",
  dateModified,
  authorName = "Alchemyst AI",
}: ArticleSchemaProps) {
  const pageUrl = absoluteUrl(url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: pageUrl,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Organization",
      name: authorName,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Alchemyst AI",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}