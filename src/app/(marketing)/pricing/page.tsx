import { Header } from "@/components/sections/header";
import PricingSection from "@/components/sections/PricingSection";
import { Footer } from "@/components/sections/footer";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Header />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <main className="flex-grow">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
} 