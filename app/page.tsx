import Applications from "@/components/Applications";
import Benefits from "@/components/Benefits";
import CustomCursor from "@/components/CustomCursor";
import FlowLayout from "@/components/FlowLayout";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ModelsIntro from "@/components/ModelsIntro";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
import applications from "./constants/applications";
import { flows } from "./constants/flows";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <main className="flex-grow flex flex-col gap-8 justify-center items-center">
        <Hero />
        <Benefits />
        <FlowLayout flows={flows} />
        <ModelsIntro />
        <Applications applications={applications} />
        <Team />
        <div className="animated-line-w absolute right-0 bottom-40 flex flex-col justify-start items-start ">
          <div className="h-1 w-72 bg-gradient-to-l from-black via-gray-300 to-white"></div>
        </div>
        <Footer />
      </main>

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}
