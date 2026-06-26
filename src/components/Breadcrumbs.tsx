// Breadcrumbs - renders a visible breadcrumb trail AND BreadcrumbList JSON-LD.
// The visible trail shows site hierarchy to users; the structured data exposes
// the same hierarchy to search/answer engines (Google, ChatGPT, Perplexity,
// Gemini, Grok) so they can render rich results and understand page context.

import Link from "next/link";

const BASE_URL = "https://getalchemystai.com";

const SANS = "'Sora', sans-serif";

export interface Crumb {
  /** Visible label, e.g. "Blog" */
  name: string;
  /** Path relative to the site root, e.g. "/blog". Omit for the current page (last crumb). */
  path?: string;
}

interface BreadcrumbsProps {
  /**
   * Ordered trail from the site root to the current page.
   * A leading "Home" crumb is added automatically, so pass only the deeper levels.
   * Example: [{ name: "Blog", path: "/blog" }, { name: post.title }]
   */
  items: Crumb[];
  /**
   * Path of the current page (the last crumb), relative to the site root, e.g.
   * "/about-us". Used so the final BreadcrumbList ListItem points at the page
   * itself rather than the homepage. Falls back to the last crumb's own `path`.
   */
  currentPath?: string;
  /** Optional style overrides for the visible wrapper (e.g. spacing on dark pages). */
  style?: React.CSSProperties;
}

/** Build the absolute URL for a crumb path, normalising slashes. */
function absoluteUrl(path?: string): string {
  if (!path) return BASE_URL;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function Breadcrumbs({ items, currentPath, style }: BreadcrumbsProps) {
  // Always begin the trail at Home.
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  // BreadcrumbList JSON-LD - one ListItem per level, in order.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => {
      const isLastItem = index === trail.length - 1;
      // The last item is the current page; resolve it to the page's own URL
      // (via currentPath) so it never collapses to the homepage.
      const path = crumb.path ?? (isLastItem ? currentPath : undefined);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(path),
      };
    }),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontFamily: SANS,
        fontSize: "0.8125rem",
        color: "#94A3B8",
        marginBottom: "24px",
        ...style,
      }}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // Per Next.js JSON-LD guidance, scrub `<` to its unicode escape to
        // prevent XSS, since JSON.stringify does not sanitize HTML.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ol
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          margin: 0,
          padding: 0,
        }}
      >
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li
              key={`${crumb.name}-${index}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", minWidth: 0 }}
            >
              {crumb.path && !isLast ? (
                <Link
                  href={crumb.path}
                  style={{ color: "#94A3B8", textDecoration: "none" }}
                >
                  {crumb.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    color: isLast ? "#F49025" : "#94A3B8",
                    fontWeight: isLast ? 600 : 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "60ch",
                  }}
                >
                  {crumb.name}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: "#475569" }}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
