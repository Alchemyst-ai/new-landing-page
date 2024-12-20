"use client";

import { useState } from "react";
import { PRICING_PLANS } from "@/app/constants/pricing";
import PricingToggle from "@/components/PricingToggle";
import PricingCard from "@/components/PricingCard";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  return (
    <div>

      {/* Navbar component */}
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>

      {/* Pricing Page */}
      <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Pricing Button */}
          <div className="flex justify-center mt-28 mb-12">
          <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
            Pricing
          </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-9xl font-bold text-center mb-6">
            Choose the Perfect Plan for Your Business
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg sm:text-2xl text-center mb-12 mt-16 max-w-4xl mx-auto">
            Discover the perfect plan for your business, whether you&apos;re just getting
            started or scaling to new heights. Our flexible pricing tiers are designed to
            suit companies of all sizes, from startups to large enterprises.
          </p>

          {/* Pricing Toggle */}
          <PricingToggle
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />

          {/* Pricing Cards */}
          <div
            className={`mt-12 space-y-8 sm:space-y-0 ${
              billingCycle === "monthly"
                ? "sm:grid sm:grid-cols-3 sm:gap-6"
                : "flex justify-center"
            }`}
          >
            {PRICING_PLANS[billingCycle].map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
