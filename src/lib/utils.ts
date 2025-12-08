import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title: {
      template: "%s | Alchemyst AI - the ONLY AI context LAYER you can verify.",
      default: "Alchemyst AI | The ONLY AI context engine that you can verify.",
    },
    description: description || "Revolutionize workflow automation with AI agents. Build complex, intelligent systems with just a few lines of code.",
    keywords: [
      'AI Context',
      'AI Memory',
      'AI agents',
      'AI context',
      'AI memory',
      'Alchemyst AI',
      'Context Engine',
      'Context Engineering',
      'Information Retrieval',
      'LLM Free Context',
      'Multi-Agent Systems',
      'Tool Integration',
      'Verifiable Context',
      'Workflow Automation'
    ],
    openGraph: {
      title,
      description: description || "Revolutionize workflow automation with AI agents",
      url: siteConfig.url,
      siteName: "Alchemyst AI",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Alchemyst AI - The ONLY AI context engine that you can verify.",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Alchemyst AI: The ONLY AI context engine that you can verify.",
      description: "Build complex, intelligent systems with just a few lines of code.",
      images: [image],
    },
    icons: "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    authors: [
      {
        name: "Alchemyst AI Team",
        url: siteConfig.url,
      },
    ],
    ...props,
  };
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export function estimateReadTimeFromHtml(html: string, wordsPerMinute: number = 200): number {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / Math.max(100, wordsPerMinute));
  return Math.max(1, minutes);
}
