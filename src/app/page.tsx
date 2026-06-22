// Home page — SSG by default (Next.js App Router Server Component)
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import LogoBar from "@/components/sections/LogoBar";
import SemanticDriftSection from "@/components/sections/SemanticDriftSection";
import AlchemystFixesSection from "@/components/sections/AlchemystFixesSection";
import ThesisSection from "@/components/sections/ThesisSection";

import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alchemyst AI — Context Layer | Never Let Your AI Work on Stale Knowledge",
  description:
    "Persistent memory, semantic retrieval, and cross-session context for AI agents. Fix semantic drift before it kills your enterprise AI adoption.",
};


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LogoBar />
        <SemanticDriftSection />
        <AlchemystFixesSection />
        <ThesisSection />
        
      </main>
      <Footer />
    </>
  );
}
