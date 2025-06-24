import Footer from "@/components/components-new/Footer";
import Navbar from "@/components/home/Navbar";
import PricingSection from "@/components/PricingSection";
import CustomCursor from "@/components/home/CustomCursor";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <main className="flex-grow">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
} 