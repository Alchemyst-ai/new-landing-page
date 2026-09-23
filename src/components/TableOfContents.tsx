"use client";

// TableOfContents: parses headings (h1 to h4) out of the rendered HTML body,
// injects matching IDs onto the live DOM nodes inside `containerId`, glides to
// a heading on click (Lenis-aware), tracks the active heading with an
// IntersectionObserver and marks it with a sliding amber rail. Renders the
// "Share this article" block beneath the list unless `showShare` is false.

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SocialShare from "./SocialShare";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Raw HTML body of the article (same string rendered into the page). */
  content: string;
  /** Article title - used for the share block. */
  title: string;
  /** Canonical URL of the article - used for the share links. */
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
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -110 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="relative rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-6 shadow-[var(--shadow-soft)]">
      <h3 className="mb-5 flex items-center gap-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716C]">
        <span aria-hidden className="h-[6px] w-[6px] bg-[#B45309]" />
        Table of Contents
      </h3>

      <nav className="relative flex flex-col border-l border-[#F1E9DA]" aria-label="Table of contents">
        {tocItems.map(({ id, text, level }) => {
          const isActive = activeId === id;
          const indent = level >= 3 ? 26 : level === 2 ? 14 : 14;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToHeading(id)}
              aria-current={isActive ? "location" : undefined}
              className={`relative block w-full py-[7px] pr-2 text-left text-[0.8125rem] leading-[1.45] transition-colors duration-200 ${
                isActive ? "text-[#4A3B33]" : "text-[#A8A29E] hover:text-[#57534E]"
              } ${level === 1 ? "font-bold" : ""}`}
              style={{ paddingLeft: `${indent}px` }}
            >
              {isActive && (
                <motion.span
                  layoutId={`toc-active-${containerId}`}
                  aria-hidden
                  className="absolute -left-px top-1 bottom-1 w-[2px] bg-[#B45309]"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              {text}
            </button>
          );
        })}
      </nav>

      {showShare && <SocialShare title={title} url={url} />}
    </div>
  );
}
