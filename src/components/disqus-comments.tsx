"use client";

import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { siteConfig } from '@/lib/config';

interface DisqusCommentsProps {
  postSlug: string;
  postTitle?: string;
  postUrl?: string;
}

export default function DisqusComments({ 
  postSlug, 
  postTitle = '',
  postUrl 
}: DisqusCommentsProps) {
  // Construct the full URL if not provided
  const fullUrl = postUrl || `${siteConfig.url}/blog/${postSlug}`;
  
  const disqusShortname = 'alchemyst';
  const disqusConfig = {
    url: fullUrl,
    identifier: postSlug,
    title: postTitle,
    language: 'en'
  };

  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12">
      <div className="bg-card rounded-xl border p-4 sm:p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">Comments</h3>
          <CommentCount
            shortname={disqusShortname}
            config={disqusConfig}
          >
            <span className="text-sm text-muted-foreground">Loading comments...</span>
          </CommentCount>
        </div>
        
        <DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </section>
  );
} 