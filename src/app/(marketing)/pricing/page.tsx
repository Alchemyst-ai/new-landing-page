import { Header } from "@/components/sections/header";
import PricingSection from "@/components/sections/PricingSection";
import { Footer } from "@/components/sections/footer";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
} 