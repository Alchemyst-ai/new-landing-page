import StickyAdFooter from "@/components/sticky-ad-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/config";
import { cn, constructMetadata } from "@/lib/utils";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import TripettoPopup from "@/components/TripettoPopup";

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <GoogleTagManager gtmId="GTM-558WGZR4" />
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth font-sans",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* Wrapper adds bottom padding to prevent content being hidden under sticky footer */}
          <div className="pb-10 sm:pb-12">
            <Header />
            {children}
            <TripettoPopup />
            <Footer />
          </div>
          {/* <ThemeToggle /> */}
          {/* <StickyAdFooter /> */}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-WHNWY5LTDN" />
      </body>
    </html>
  );
}
