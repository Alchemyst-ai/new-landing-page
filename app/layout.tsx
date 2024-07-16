import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.css";

// Import Google Font
const inter = Inter({ subsets: ["latin"] });

// Import local font
const satoshi = localFont({
  src: [{ path: "../public/fonts/Satoshi-Variable.ttf", weight: "500" }],
  variable: "--font-satoshi",
});

// Enhanced metadata for the application
export const metadata = {
  title: "Alchemyst AI",
  description:
    "Alchemyst AI - Revolutionizing the workforce with AI-driven solutions. Automate your processes with our cutting-edge AI technology.",
  keywords: [
    "AI employee",
    "AI agent",
    "AI company",
    "automate workforce",
    "AI marketing",
    "AI hiring",
    "AI design",
    "AI processes",
    "AI solutions",
    "machine learning",
    "artificial intelligence",
    "business automation",
    "intelligent systems",
    "data analysis",
    "predictive analytics",
    "deep learning",
    "AI-powered applications",
    "automated workflows",
    "digital transformation",
    "AI-driven innovation",
  ],
  openGraph: {
    type: "website",
    url: "https://alchemyst.ai",
    title: "Alchemyst AI",
    description:
      "Revolutionizing the workforce with AI-driven solutions. Automate your processes with our cutting-edge AI technology.",
    images: [
      {
        url: "https://alchemyst.ai/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Alchemyst AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AlchemystAI",
    title: "Alchemyst AI",
    description:
      "Revolutionizing the workforce with AI-driven solutions. Automate your processes with our cutting-edge AI technology.",
    image: "https://alchemyst.ai/twitter-image.jpg",
  },
};

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Dynamically set metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />

        {/* Open Graph meta tags */}
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        {metadata.openGraph.images.map((image, index) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}

        {/* Twitter meta tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </head>
      <body
        className={`${satoshi.variable} font-satoshi max-w-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
