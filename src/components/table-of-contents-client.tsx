"use client";

import TableOfContents from "./table-of-contents";
import { useEffect } from "react";

interface TableOfContentsClientProps {
  content: string;
  title: string;
  url: string;
  containerId?: string;
}

export default function TableOfContentsClient({ content, title, url, containerId = "article-content" }: TableOfContentsClientProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((el, idx) => {
      if (!el.id) el.id = `heading-${idx}`;
    });
  }, [containerId, content]);

  return <TableOfContents content={content} title={title} url={url} />;
} 