import Applications from "@/components/home/Applications";
import Architecture from "@/components/home/Architecture";
import BackedBy from "@/components/home/BackedBy";
import CustomCursor from "@/components/home/CustomCursor";
import Features from "@/components/home/Features";
import FlowLayout from "@/components/home/FlowLayout";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Integrations from "@/components/home/Integrations";
import MediaAndCoverage from "@/components/home/MediaAndCoverage";
import ModelsIntro from "@/components/home/ModelsIntro";
import Navbar from "@/components/home/Navbar";
import TalkToFounder from "@/components/home/TalkToFounder";
import Team from "@/components/home/Team";
import FeaturedIn from "@/components/media-awards/FeaturedIn";
import applications from "./constants/applications";
import { features } from "./constants/features";
import { flows } from "./constants/flows";
import Head from "next/head";


export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Company Name - Leading in AI and Technology</title>
        <meta
          name="description"
          content="Explore our cutting-edge AI technology, our team, features, and success stories. Backed by industry leaders."
        />
        <meta
          name="keywords"
          content="AI, Technology, Innovation, Features, Team, Integrations, Architecture, Applications"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Company Name - Leading in AI and Technology" />
        <meta
          property="og:description"
          content="Discover our powerful AI solutions and learn how we're shaping the future."
        />
        <meta property="og:url" content="https://yourcompany.com" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
        <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
          <Navbar />
          <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
        </header>
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <main className="flex-grow flex flex-col gap-8 justify-center items-center pt-16">
          <Hero />
          <FlowLayout flows={flows} />
          <Architecture />
          <Features features={features} />
          <ModelsIntro />
          <BackedBy />
          <Integrations />
          <Applications applications={applications} />
          <Team />
          <FeaturedIn />
          <MediaAndCoverage />
          <TalkToFounder />
          {/* <Testimonials testimonials={testimonials} /> */}
          <div className="animated-line-w max-w-screen overflow-x-hidden absolute right-0 bottom-40 sm:flex flex-col justify-start items-start hidden">
            <div className="h-1 w-72 bg-gradient-to-l from-black via-gray-300 to-white"></div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
