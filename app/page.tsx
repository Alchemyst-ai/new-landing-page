import Applications from "@/components/Applications";
import Benefits from "@/components/Benefits";
import CustomCursor from "@/components/CustomCursor";
import Features from "@/components/Features";
import FlowLayout from "@/components/FlowLayout";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import ModelsIntro from "@/components/ModelsIntro";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import applications from "./constants/applications";
import { features } from "./constants/features";
import { flows } from "./constants/flows";
import testimonials from "./constants/testimonials";
import TalkToFounder from "@/components/TalkToFounder";
import MediaAndCoverage from "@/components/MediaAndCoverage";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>

      <main className="flex-grow flex flex-col gap-8 justify-center items-center">
        <Hero />
        <Benefits />
        <FlowLayout flows={flows} />
        <Features features={features} />
        <ModelsIntro />
        <Integrations />
        <Applications applications={applications} />
        <Team />
        <TalkToFounder/>
        <MediaAndCoverage/>
        <Testimonials testimonials={testimonials} />
        <div className="animated-line-w max-w-screen overflow-x-hidden absolute right-0 bottom-40 flex flex-col justify-start items-start ">
          <div className="h-1 w-72 bg-gradient-to-l from-black via-gray-300 to-white"></div>
        </div>
        <Footer />
      </main>

      <div className="hidden md:block">
        <CustomCursor />
      </div>
    </div>
  );
}
