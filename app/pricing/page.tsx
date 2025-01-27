"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { PRICING_PLANS } from "@/app/constants/pricing";
import PricingToggle from "@/components/pricing/PricingToggle";
import PricingCard from "@/components/pricing/PricingCard";
import TopupPricingCard from "@/components/pricing/TopupPricingCard";
import EnterpriseCard from "@/components/pricing/EnterpriseCard";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { useCountryDetection } from "@/components/CountryDetector";
import DetailedComparison from "@/components/pricing/DetailedComparison";

// Base plan types for topup pricing
type BasePlan = "Starter" | "Accelerate" | "Supercharge";

export default function PricingPage() {
  // State variables for billing cycle and country
  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "annually" | "topup"
  >("monthly");
  const [country, setCountry] = useState("");
  // const detectedCountry = useCountryDetection();

  // State variables for topup pricing inputs and base plan
  const [emails, setEmails] = useState(7000);
  const [leads, setLeads] = useState(750);
  const [enrichments, setEnrichments] = useState(375);
  const [basePlan, setBasePlan] = useState<BasePlan>("Starter");
  const [countryCode, setCountryCode] = useState<string | null>(localStorage.getItem('country-code'))

  // useEffect to update country based on detectedCountry
  // useEffect(() => {
  //   console.log("Detected country:", detectedCountry);
  //   setCountry(detectedCountry);
  // }, [detectedCountry]);

  // const pricingRegion = country === "IN" ? "india" : "international";
  useLayoutEffect(() => {
    const cachedCountryCode = localStorage.getItem('country-code');

    async function detectCountry() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city,
          region: data.region
        };
      } catch (error) {
        console.error('Error detecting country:', error);
        return null;
      }
    }

    
    if (!cachedCountryCode) {
      detectCountry().then(location => {
        if (location) {
          setCountryCode(location.countryCode)
          localStorage.setItem("country-code", location.countryCode);
        }
      });
    }
  }, []);

  const pricingRegion = countryCode === 'IN' ? "india" : "international";
  // console.log("Selected pricing region:", localStorage.getItem('country-code'));

  return (
    <div>
      {/* Navbar component */}
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>

      {/* Pricing page content */}
      <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mt-8 md:mt-28 mb-12">
            <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
              Pricing
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Choose the Perfect Plan for Your Business
          </h1>

          <p className="text-gray-400 text-lg md:text-xl text-center mb-16 mt-4 max-w-4xl mx-auto">
            Discover the perfect plan for your business, whether you are just
            getting started or scaling to new heights. Our flexible pricing
            tiers are designed to suit companies of all sizes, from startups to
            large enterprises.
          </p>

          <PricingToggle
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />

          {/* Pricing cards based on billing cycle */}
          <div className="mt-12 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
            {billingCycle === "topup" ? (
              <div className="col-span-3">
                <TopupPricingCard
                  country={country}
                  emails={emails}
                  setEmails={setEmails}
                  leads={leads}
                  setLeads={setLeads}
                  enrichments={enrichments}
                  setEnrichments={setEnrichments}
                  basePlan={basePlan}
                  setBasePlan={setBasePlan}
                />
              </div>
            ) : (
              PRICING_PLANS[pricingRegion][billingCycle].map((plan, index) => (
                <PricingCard
                  key={index}
                  plan={plan}
                  billingCycle={billingCycle}
                  country={country || ""}
                />
              ))
            )}
          </div>

          {/* Detailed Comparison Card */}
          <div className="mt-24">
            <DetailedComparison />
          </div>

          {/* Enterprise card  */}
          <EnterpriseCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
