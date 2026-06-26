import Navbar from "@/components/Navbar";
import PricingSection from "@/components/sections/PricingSection";
import PricingSchema from "@/components/pricing/PricingSchema";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Alchemyst AI Context Layer",
  description:
    "Simple, transparent pricing for the institutional context backbone. Free tier available with transparent usage costs. Enterprise plans for organizations needing deterministic context at scale.",
};

export default function PricingPage() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <PricingSchema />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}