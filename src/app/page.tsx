// Home page - SSG by default (Next.js App Router Server Component)

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AlchemystFixesSection from "@/components/sections/AlchemystFixesSection";
import CTASection from "@/components/sections/CTASection";
import HeroSection from "@/components/sections/HeroSection";
import LogoBar from "@/components/sections/LogoBar";
import WhyContextSection from "@/components/sections/WhyContextSection";
import { SITE_TITLE } from "@/lib/staticContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description:
    "Enable AI agents to run your day-to-day operations at enterprise scale. The institutional context backbone that keeps every agent's knowledge current, traceable, and consistent through a single API.",
};


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LogoBar />
        <WhyContextSection />
        <AlchemystFixesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
