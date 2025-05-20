"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import "../globals.css";
import { useEffect } from "react";

const CustomCursor = dynamic(() => import("@/components/home/CustomCursor"), {
  ssr: false,
});
const Architecture = dynamic(() => import("@/components/home/Architecture"));
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies"));
const EndingCard = dynamic(() => import("@/components/home/EndingCard"));
const Features = dynamic(() => import("@/components/home/Features"));
const AgentsCard = dynamic(() => import("@/components/home/AgentsCard"));
const InfoCard = dynamic(() => import("@/components/home/InfoCard"));
const AboutUs = dynamic(() => import("@/components/home/Aboutus"));
const IndiaAI = dynamic(() => import("@/components/home/IndiaAI"));
const Footer = dynamic(() => import("@/components/home/Footer"));
const Navbar = dynamic(() => import("@/components/home/Navbar"));
const Steps = dynamic(() => import("@/components/home/Steps"));
const Hero = dynamic(() => import("@/components/home/Hero"));

export default function B2BPage() {
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
        localStorage.setItem("country-code", `${location.countryCode}`);
      }
    });
  }, [])

  return (
    <div>
      <Head>
        <title>Alchemyst AI for B2B - Leading in AI and Technology</title>
        <meta
          name="description"
          content="B2B solutions with our cutting-edge AI technology, our team, features, and success stories. Backed by industry leaders."
        />
        <meta
          name="keywords"
          content="AI, AI SDR, AI Employee, AI Ecosystem, AI Sales Development, B2B"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Alchemyst AI for B2B - Leading in AI and Technology"
        />
        <meta
          property="og:description"
          content="Discover our powerful AI solutions for B2B and learn how we're shaping the future."
        />
        <meta property="og:url" content="https://getalchemystai.com/b2b" />
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
          <h1>Alchemyst AI for B2B - Leading in AI and Technology</h1>
        </div>
        <div className="no-js-footer">
          <p>
            Explore our cutting-edge AI technology, our team, features, and
            success stories for B2B. Backed by industry leaders.
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

        <main className="flex-grow flex flex-col gap-8 justify-center items-center md:pt-16">
          {[
            { Component: Hero, title: null },
            { Component: Steps, title: null },
            { Component: Features, title: null },
            { Component: Architecture, title: null },
            { Component: AgentsCard, title: null },
            { Component: AboutUs, title: null },
            // { Component: InfoCard, title: null },
            { Component: CaseStudies, title: null },
            { Component: IndiaAI, title: null },
            { Component: EndingCard, title: null },
          ].map(({ Component, title }, index) => (
            <Component key={index} />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
} 