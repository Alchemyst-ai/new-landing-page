import PricingSection from "@/components/sections/PricingSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}