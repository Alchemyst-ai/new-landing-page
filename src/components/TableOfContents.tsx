"use client";

// TableOfContents — mirrors the reference branch's TableOfContentsClient.
// Parses headings (h2/h3) out of the rendered HTML body, injects matching IDs
// onto the live DOM nodes inside `containerId`, and provides smooth-scroll
// navigation with an active-heading highlight on scroll.
import { useEffect, useMemo, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Raw HTML body of the article (same string rendered into the page). */
  content: string;
  /** Article title (used for an aria-label / heading). */
  title?: string;
  /** Canonical URL of the article (kept for parity with the reference API). */
  url?: string;
  /** DOM id of the rendered article container whose headings we sync with. */
  containerId: string;
}

function slugify(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base ? `${base}` : `section-${index}`;
}

export default function TableOfContents({
  content,
  title,
  containerId,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Parse headings from the HTML string (runs once per content change).
  const headings = useMemo<Heading[]>(() => {
    if (typeof window === "undefined" || !content) return [];
    const doc = new DOMParser().parseFromString(content, "text/html");
    const nodes = Array.from(doc.querySelectorAll("h2, h3"));
    const seen = new Map<string, number>();
    return nodes.map((node, i) => {
      const text = (node.textContent || "").trim();
      let id = slugify(text, i);
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      return { id, text, level: node.tagName === "H3" ? 3 : 2 };
    });
  }, [content]);

  // Assign the same ids to the live rendered headings so anchors resolve.
  useEffect(() => {
    if (!headings.length) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    const live = Array.from(container.querySelectorAll("h2, h3"));
    headings.forEach((h, i) => {
      if (live[i] && !live[i].id) live[i].id = h.id;
    });
  }, [headings, containerId]);

  // Highlight the heading currently in view.
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll("h2, h3").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, containerId]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  if (!headings.length) return null;

  return (
    <nav
      aria-label={title ? `Table of contents for ${title}` : "Table of contents"}
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#F49025",
          marginBottom: "16px",
        }}
      >
        On this page
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} style={{ marginBottom: "10px" }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  lineHeight: 1.45,
                  textDecoration: "none",
                  paddingLeft: h.level === 3 ? "24px" : "12px",
                  borderLeft: isActive
                    ? "2px solid #F49025"
                    : "2px solid rgba(15,23,42,0.08)",
                  color: isActive ? "#0F172A" : "#64748B",
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 0.15s ease",
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
