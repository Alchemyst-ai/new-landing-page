"use client";

import type { CardPost } from "@/components/blog-card";
import { siteConfig } from '@/lib/config';
import { cn, formatDate } from "@/lib/utils";
import { CommentCount } from "disqus-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function BlogCardWithComments({
  data,
  priority,
  featured,
}: {
  data: CardPost;
  priority?: boolean;
  featured?: boolean;
}) {

  const disqusShortname = 'alchemyst';
  const fullUrl = `${siteConfig.url}/blog/${data.slug}`;
  const disqusConfig = {
    url: fullUrl,
    identifier: data.slug,
    title: data.title,
  };
  const summary = (data as any).summary ?? (data as any).description ?? "";
  const [canRenderComments, setCanRenderComments] = useState(false);
  useEffect(() => {
    setCanRenderComments(true);
  }, []);

  return (
    <Link
      href={`/blog/${data.slug}`}
      className={cn(
        "block overflow-hidden rounded-xl transition-all duration-200",
        featured
          ? "bg-card hover:bg-card/90 border"
          : "bg-card hover:bg-card/90 border",
        featured ? "lg:grid lg:grid-cols-2 lg:gap-8" : ""
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        featured ? "lg:h-[400px]" : "h-[200px]"
      )}>
        {data.image ? (
          <Image
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            src={data.image}
            width={1200}
            height={630}
            alt={data.title}
            priority={priority}
          />
          // <img
          //   className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
          //   src={data.image}
          //   width={1200}
          //   height={630}
          //   alt={data.title}
          //   // priority={priority}
          // />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={data.publishedAt}>
              {formatDate(data.publishedAt)}
            </time>
            {data.readTime && (
              <>
                <span>•</span>
                <span>{data.readTime} min read</span>
              </>
            )}
          </div>
          {canRenderComments && priority && (
            <CommentCount
              shortname={disqusShortname}
              config={disqusConfig}
            >
              <span className="text-sm text-muted-foreground">Comments</span>
            </CommentCount>

          )}
        </div>
        <h3 className={cn(
          "font-bold mb-4 text-foreground",
          featured ? "text-3xl" : "text-xl"
        )}>
          {data.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{summary}</p>

        {data.author?.name && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              {data.author.name}
            </span>
          </div>
        )}

        {featured && (
          <div className="mt-6 inline-flex items-center text-foreground hover:text-muted-foreground">
            Read More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}