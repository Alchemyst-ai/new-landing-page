import CustomCommandK from "@/components/custom-cmd-k";
import StructuredData from "@/components/StructuredData";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/staticContent";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/motion/SmoothScroll";
import type { Metadata } from "next";
import { Merriweather, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://getalchemystai.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_TITLE = SITE_TITLE;
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Alchemyst AI",
  },
  description:
    SITE_DESCRIPTION,
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
      SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: "Alchemyst AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Alchemyst AI: Enable AI agents to run your day-to-day operations at enterprise scale",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      SITE_DESCRIPTION,
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
        <StructuredData />
      </head>
      <body className={`${merriweather.variable} ${jetbrainsMono.variable}`}>
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <CustomCommandK />
      </body>
    </html>
  );
}
