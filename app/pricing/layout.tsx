import { Metadata } from "next";

// Metadata for the Alchemyst AI Pricing page to aid the search engines and social media.

// Remember to optimise this. This is keyword stuffing and often penalized by search engines.
export const metadata: Metadata = {
  title: "Alchemyst AI Pricing",
  description:
    "Alchemyst AI offers flexible pricing plans to suit your business needs. Automate your processes with our cutting-edge AI technology, without breaking the bank.",
  keywords: [
    "AI employee pricing",
    "AI automation pricing",
    "AI solutions pricing",
    "AI company pricing",
    "AI marketing pricing",
    "AI hiring pricing",
    "AI design pricing",
    "AI processes pricing",
    "AI solutions pricing",
    "machine learning pricing",
    "artificial intelligence pricing",
    "business automation pricing",
    "intelligent systems pricing",
    "data analysis pricing",
    "predictive analytics pricing",
    "deep learning pricing",
    "AI-powered applications pricing",
    "automated workflows pricing",
    "digital transformation pricing",
    "AI-driven innovation pricing",
  ],
  openGraph: {
    type: "website",
    url: "https://getalchemystai.com/pricing",
    title: "Alchemyst AI Pricing",
    description:
      "Alchemyst AI offers flexible pricing plans to suit your business needs. Automate your processes with our cutting-edge AI technology, without breaking the bank.",
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
    title: "Alchemyst AI Pricing",
    description:
      "Alchemyst AI offers flexible pricing plans to suit your business needs. Automate your processes with our cutting-edge AI technology, without breaking the bank.",
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
      <body>{children}</body>
    </html>
  );
}
