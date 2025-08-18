"use client";

import React from "react";
import { DiscussionEmbed } from "disqus-react";
import { useTheme } from "next-themes";
import { useInView } from "react-intersection-observer";

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
  const { resolvedTheme = "light" } = useTheme();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    fallbackInView: true,
  });

  // Use hardcoded shortname as specified
  const disqusShortname = "alchemyst";
  
  const disqusConfig = {
    identifier: postSlug,
    url: postUrl,
    title: postTitle,
  };

  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12" ref={ref}>
      {inView ? (
        <div className="comments bg-card rounded-xl border p-4 sm:p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Comments</h3>
          </div>
          
          <DiscussionEmbed
            key={resolvedTheme}
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      ) : null}
    </section>
  );
} 