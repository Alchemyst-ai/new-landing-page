import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const BASE_URL = "https://getalchemystai.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Alchemyst AI | The Institutional Context Backbone for Your Enterprise",
    template: "%s | Alchemyst AI",
  },
  description:
    "Enable AI agents to run your day-to-day operations at enterprise scale. The institutional context backbone that keeps every agent's knowledge current, traceable, and consistent. One API, zero infrastructure.",
  keywords: [
    "AI context layer",
    "context arithmetic",
    "institutional knowledge graph",
    "context traces",
    "AI memory API",
    "semantic retrieval",
    "agent memory",
    "context management",
    "semantic drift",
    "AI knowledge base",
    "LLM memory",
    "agentic AI",
    "Alchemyst AI",
  ],
  authors: [{ name: "Alchemyst AI", url: BASE_URL }],
  creator: "Alchemyst AI",
  publisher: "Alchemyst AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Alchemyst AI | The Institutional Context Backbone for Your Enterprise",
    description:
      "Enable AI agents to run your day-to-day operations at enterprise scale — the institutional context backbone for your enterprise.",
    url: BASE_URL,
    siteName: "Alchemyst AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Alchemyst AI — Enable AI agents to run your day-to-day operations at enterprise scale",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alchemyst AI | The Institutional Context Backbone for Your Enterprise",
    description:
      "Enable AI agents to run your day-to-day operations at enterprise scale — the institutional context backbone for your enterprise.",
    site: "@getalchemystai",
    creator: "@getalchemystai",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    "llms-txt": `${BASE_URL}/llms.txt`,
    "llms-full-txt": `${BASE_URL}/llms-full.txt`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anta&family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
