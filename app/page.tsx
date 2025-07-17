"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import "./globals.css";
import { useEffect } from "react";
import HeroSection from "@/components/components-new/HeroSection";
import { FeaturesSection } from "@/components/components-new/features";
import UseCasesSection from "@/components/components-new/UseCasesSection";
import CodeCompiler from "@/components/components-new/CodeCompiler";
import Ecosystem from "@/components/components-new/Ecosystem";
import TechnologyIntegration from "@/components/components-new/TechnologyIntegration";
import FAQSection from "@/components/components-new/FAQSection";
import StatsSection from "@/components/components-new/StatsSection";

const CustomCursor = dynamic(() => import("@/components/home/CustomCursor"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/components-new/Footer"));
const Navbar = dynamic(() => import("@/components/home/Navbar"));

export default function HomePage() {
  useEffect(() => {
    async function detectCountry() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return {
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city,
          region: data.region,
        };
      } catch (error) {
        console.error("Error detecting country:", error);
        return null;
      }
    }

    detectCountry().then(location => {
      if (location) {
        // console.log(`User is from ${location.countryCode}`);
        localStorage.setItem("country-code", `${location.countryCode}`);
      }
    });
  }, [])

  return (
    <div>
      <Head>
        <title>Alchemyst AI - Leading in AI and Technology</title>
        <meta
          name="description"
          content="Explore our cutting-edge AI technology, our team, features, and success stories. Backed by industry leaders."
        />
        <meta
          name="keywords"
          content="AI, AI SDR, AI Employee, AI Ecosystem, AI Sales Development"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Alchemyst AI - Leading in AI and Technology"
        />
        <meta
          property="og:description"
          content="Discover our powerful AI solutions and learn how we're shaping the future."
        />
        <meta property="og:url" content="https://https://getalchemystai.com" />
        <meta property="og:type" content="website" />
      </Head>
      <noscript>
        <style>
          {`
            .no-js-header {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #0E0E0C;
              width: 100%;
            }
            .no-js-footer {
              display: block;
              width: 100%;
            }
          `}
        </style>
        <div className="no-js-header">
          <h1>Alchemyst AI - Leading in AI and Technology</h1>
        </div>
        <div className="no-js-footer">
          <p>
            Explore our cutting-edge AI technology, our team, features, and
            success stories. Backed by industry leaders.
          </p>
        </div>
      </noscript>
      <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
        <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
          <Navbar />
          <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
        </header>
        <div className="hidden lg:block">
          <CustomCursor />
        </div>

        <main className="w-full">
          <HeroSection />

          <FeaturesSection />

          <UseCasesSection />

          {/* <HowItWorks /> */}

          <CodeCompiler />

          <StatsSection />

          <Ecosystem />

          <TechnologyIntegration />

          <FAQSection />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
