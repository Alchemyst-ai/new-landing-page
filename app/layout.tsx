// app/layout.tsx or app/layout.js depending on your setup

import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LX2RDBB209"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LX2RDBB209');
          `}
        </Script>
      </head>
      <body className="font-satoshi max-w-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
