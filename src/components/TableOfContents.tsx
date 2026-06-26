"use client";

// TableOfContents — faithful port of the reference branch's TableOfContents
// (+ TableOfContentsClient) adapted to the dark blog theme. It parses headings
// (h1–h4) out of the rendered HTML body, injects matching IDs onto the live DOM
// nodes inside `containerId`, provides smooth-scroll navigation with an
// active-heading highlight (IntersectionObserver), and renders a
// "Share this article" block beneath the list.

import { useEffect, useMemo, useState } from "react";
import SocialShare from "./SocialShare";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Raw HTML body of the article (same string rendered into the page). */
  content: string;
  /** Article title — used for the share block. */
  title: string;
  /** Canonical URL of the article — used for the share links. */
  url: string;
  /** ID of the rendered article container to read headings from. */
  containerId?: string;
  /** When false, hide the Share-this-article block (e.g. mobile TOC). */
  showShare?: boolean;
}

export default function TableOfContents({
  content,
  title,
  url,
  containerId = "article-content",
  showShare = true,
}: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Parse the HTML once on the client to seed the list immediately.
  const parsedItems = useMemo<TOCItem[]>(() => {
    if (typeof window === "undefined" || !content) return [];
    const doc = new DOMParser().parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4");
    return Array.from(headings).map((heading, index) => ({
      id: heading.id || `heading-${index}`,
      text: heading.textContent?.trim() || "",
      level: parseInt(heading.tagName.charAt(1), 10),
    }));
  }, [content]);

  // Reconcile against the live DOM nodes so IDs are injected for scrolling.
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      setTocItems(parsedItems);
      return;
    }
    const headings = container.querySelectorAll("h1, h2, h3, h4");
    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) (heading as HTMLElement).id = id;
      return {
        id,
        text: heading.textContent?.trim() || "",
        level: parseInt(heading.tagName.charAt(1), 10),
      };
    });
    setTocItems(items.length ? items : parsedItems);
  }, [containerId, content, parsedItems]);

  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (tocItems.length === 0) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      {/* Heading with check-circle icon */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "22px", width: "22px", marginRight: "10px", color: "#F49025" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        <h3
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.0625rem",
            fontWeight: 600,
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Table of Contents
        </h3>
      </div>

      {/* TOC list */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          paddingLeft: "8px",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {tocItems.map(({ id, text, level }) => {
          const isActive = activeId === id;
          const indent = level >= 3 ? 18 : level === 2 ? 8 : 0;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToHeading(id)}
              className="blog-toc-item"
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                fontFamily: "'Sora', sans-serif",
                fontSize: "0.8125rem",
                lineHeight: 1.45,
                fontWeight: level === 1 ? 600 : 400,
                color: isActive ? "#F49025" : "#94A3B8",
                background: isActive ? "rgba(244,144,37,0.10)" : "transparent",
                border: "none",
                borderRadius: "6px",
                padding: "5px 10px",
                marginLeft: `${indent}px`,
                cursor: "pointer",
                transition: "color 0.2s, background 0.2s",
              }}
            >
              {text}
            </button>
          );
        })}
      </nav>

      {/* Share this article */}
      {showShare && <SocialShare title={title} url={url} />}
    </div>
  );
}
