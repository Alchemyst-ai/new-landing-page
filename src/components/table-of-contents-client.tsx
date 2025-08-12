"use client";

import TableOfContents from "./table-of-contents";

interface TableOfContentsClientProps {
  content: string;
  title: string;
  url: string;
}

export default function TableOfContentsClient({ content, title, url }: TableOfContentsClientProps) {
  return <TableOfContents content={content} title={title} url={url} />;
} 