import CustomCursor from "@/components/home/CustomCursor";
import Architecture from "@/components/home/Architecture";
import CaseStudies from "@/components/home/CaseStudies";
import EndingCard from "@/components/home/EndingCard";
import Features from "@/components/home/Features";
import MayaCard from "@/components/home/MayaCard";
import InfoCard from "@/components/home/InfoCard";
import AboutUs from "@/components/home/Aboutus";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Steps from "@/components/home/Steps";
import Hero from "@/components/home/Hero";
import Head from "next/head";
import "./globals.css";

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
        <meta
          property="og:title"
          content="Company Name - Leading in AI and Technology"
        />
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
          <h1 className="text-4xl font-bold text-center text-gray-400 mt-12 p-4 md:mt-8 md:mb-8">
            3 Simple Steps to Boost Sales with AI-Powered Precision
          </h1>
          <Steps />
          <Features />
          <Architecture />
          <MayaCard />
          <InfoCard />
          <CaseStudies />
          <AboutUs />
          <EndingCard />
        </main>
        <Footer />
      </div>
    </div>
  );
}
