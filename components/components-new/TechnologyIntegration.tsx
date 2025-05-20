"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function TechnologyIntegration() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            ROAD TO PROD: TWO POWERFUL WAYS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Hey Neo, choose your pill
          </h2>
          <p className="text-center text-muted-foreground max-w-6xl leading-relaxed">
            Choose the style that fits your needs: use our fully managed platform for convenience, or build on our APIs for complete control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-bl to-red-800/40 from-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:bg-[#1a1a1a]">
            <h3 className="text-xl font-bold mb-4">Alchemyst AI Platform</h3>
            <p className="text-muted-foreground mb-6">
              Effortless Integration, Maximum Performance
            </p>
            <p className="text-sm text-gray-300 mb-6">
              With seamless integration options - either as a proxy, or as a fully managed service - you can up and running in minutes. No need to worry about infrastructure or scaling - pay as you go.
            </p>
            <a
              className="w-1/3 py-2 rounded-md bg-[#EAEAEA] text-gray-900 hover:bg-gray-700 hover:text-gray-100 font-bold flex items-center justify-center"
              href="https://platform.getalchemystai.com/auth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign Up Now
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 bg-gradient-to-br to-blue-800/40 from-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:bg-[#1a1a1a]">
            <h3 className="text-xl font-bold mb-4">Build on Alchemyst AI</h3>
            <p className="text-muted-foreground mb-6">
              Unlimited Customization, Complete Control
            </p>
            <p className="text-sm text-gray-300 mb-6">
              With infinite possibilities to leverage our platform, and with an ever-expanding cookbook of examples, ideas and community-powered templates, your next big AI-native SaaS startup idea is just a weekend away.
            </p>
            <a
              className="w-1/3 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 font-bold flex items-center justify-center"
              href="https://github.com/alchemyst-ai/awesome-saas"
              target="_blank"
              rel="noopener noreferrer"
            >
              See Samples
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 