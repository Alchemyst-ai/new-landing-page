"use client";

import { CommentCount } from 'disqus-react';
import { siteConfig } from '@/lib/config';

interface SimpleCommentCountProps {
  postSlug: string;
  postTitle: string;
}

export default function SimpleCommentCount({ postSlug, postTitle }: SimpleCommentCountProps) {
  const disqusShortname = 'alchemyst';
  const fullUrl = `${siteConfig.url}/blog/${postSlug}`;
  const disqusConfig = {
    url: fullUrl,
    identifier: postSlug,
    title: postTitle,
  };

  return (
    <CommentCount
      shortname={disqusShortname}
      config={disqusConfig}
    >
      <span className="text-xs text-muted-foreground">Comments</span>
    </CommentCount>
  );
} 