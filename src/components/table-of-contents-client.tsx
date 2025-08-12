"use client";

import TableOfContents from "./table-of-contents";

interface TableOfContentsClientProps {
  content: string;
}

export default function TableOfContentsClient({ content }: TableOfContentsClientProps) {
  return <TableOfContents content={content} />;
} 