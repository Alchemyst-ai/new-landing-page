import StructuredData from "@/components/StructuredData";
import ScrollProgress from "@/components/ScrollProgress";
import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://getalchemystai.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_TITLE = "Alchemyst AI | The company brain your AI agents can trust"
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: DEFAULT_TITLE,
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
    title: DEFAULT_TITLE,
    description:
      "Enable AI agents to run your day-to-day operations at enterprise scale with the institutional context backbone.",
    url: BASE_URL,
    siteName: "Alchemyst AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Alchemyst AI - Enable AI agents to run your day-to-day operations at enterprise scale",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Enable AI agents to run your day-to-day operations at enterprise scale - the institutional context backbone for your enterprise.",
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
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
