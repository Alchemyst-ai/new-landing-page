import localFont from "next/font/local";

import { Metadata } from "next";
import "./globals.css";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
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
    url: "https://getalchemystai.com",
    title: "Alchemyst AI",
    description:
      "Revolutionizing the workforce with AI-driven solutions. Automate your processes with our cutting-edge AI technology.",
    images: [
      {
        url: "https://getalchemystai.com/logo/alchemyst-ai.jpeg",
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
    images: "https://getalchemystai.com/logo/alchemyst-ai.jpeg",
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
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-LX2RDBB209"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){
          // @ts-ignore
          window.dataLayer.push(arguments)
        }
        gtag('js', new Date());

        gtag('config', 'G-LX2RDBB209');
      </script>
      <body
        className={`${satoshi.variable} font-satoshi max-w-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

