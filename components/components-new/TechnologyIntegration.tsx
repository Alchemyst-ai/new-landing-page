"use client";

import {ArrowRight, ArrowUpRight } from "lucide-react";

export default function TechnologyIntegration() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            TWO POWERFUL WAYS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Leverage Alchemyst AI Technology
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl leading-relaxed">
            Choose the integration that fits your needs: fully managed for convenience or self-hosted
            for complete control.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Alchemyst AI Platform</h3>
            <p className="text-muted-foreground mb-6">
              Effortless Integration, Maximum Performance
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Our fully managed platform offers a seamless way to enhance your AI
              applications with Alchemyst AI&apos;s memory capabilities. Ideal for teams
              looking for quick deployment and hassle-free maintenance.
            </p>
            <button className="w-1/3 py-2 rounded-md bg-[#EAEAEA] text-gray-900 hover:bg-gray-700 font-bold flex items-center justify-center">
              Sign Up Now
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Alchemyst AI Open Source</h3>
            <p className="text-muted-foreground mb-6">
              Unlimited Customization, Complete Control
            </p>
            <p className="text-sm text-gray-300 mb-6">
              For teams that need full flexibility, our open-source version allows you
              to tailor Alchemyst AI to your exact requirements. Self-host on your
              infrastructure for maximum data control and customization.
            </p>
            <button className="w-1/3 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 font-bold flex items-center justify-center">
              View GitHub Repos
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 