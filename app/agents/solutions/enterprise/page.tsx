import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CustomCursor from "@/components/home/CustomCursor";
import Head from "next/head";
import EnterpriseComponent from "@/components/solutions/enterprise/EnterpriseComponent";

const page = () => {
  return (
    <div>
      <Head>
        <title>Alchemyst AI - Automating Sales for Startups</title>
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
        <div className="hidden lg:block">
          <CustomCursor />
        </div>
        <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
          <Navbar />
          <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
        </header>
        <main>
          <EnterpriseComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default page;
