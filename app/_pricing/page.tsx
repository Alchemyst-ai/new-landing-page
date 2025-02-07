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
  const [countryCode, setCountryCode] = useState<string | null>(null)

  // useEffect to update country based on detectedCountry
  // useEffect(() => {
  //   console.log("Detected country:", detectedCountry);
  //   setCountry(detectedCountry);
  // }, [detectedCountry]);

  // const pricingRegion = country === "IN" ? "india" : "international";
  useEffect(() => {
    // const cachedCountryCode = localStorage.getItem('country-code');

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

    // if (!cachedCountryCode) {
      detectCountry().then(location => {
        if (location) {
          setCountryCode(location.countryCode)
          localStorage.setItem("country-code", location.countryCode);
        }
      });
    // }else{
    //   setCountryCode(cachedCountryCode)
    // }
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
          {
            !countryCode ? (
              <div className=" mt-12 text-center ">
                {/* <p className="text-gray-500 py-2">Getting pricing for your region...</p> */}
                <div className="grid grid-cols-3 gap-6 justify-center mb-6 h-[42rem]">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse"
                    >
                      <div className="px-6 py-10">
                        <div className="h-10 bg-gray-700 rounded-lg mb-8"></div>
                        <div className="h-8 bg-gray-700 rounded-lg mb-6 w-2/3"></div>
                        {/* Info Skeleton */}
                        <div className="space-y-2 mb-8">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-4 bg-gray-700 rounded-lg"></div>
                          ))}
                        </div>
                        {/* Button Skeleton */}
                        <div className="h-12 bg-gray-700 rounded-xl"></div>
                      </div>
                      <div className="px-6 pb-8">
                        <ul className="space-y-4">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <li
                              key={i}
                              className="flex items-center"
                            >
                              <div className="h-5 w-5 bg-gray-700 rounded-full mr-4"></div>
                              <div className="h-4 bg-gray-700 rounded-lg w-3/4"></div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
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
            )
          }

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

function SkeletonPricingCard() {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse">
      <div className="px-6 py-8">
        {/* Title Skeleton */}
        <div className="h-10 bg-gray-700 rounded-lg mb-8"></div>

        {/* Price Skeleton */}
        <div className="h-8 bg-gray-700 rounded-lg mb-6 w-2/3"></div>

        {/* Info Skeleton */}
        <div className="space-y-2 mb-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-700 rounded-lg"></div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-700 rounded-xl"></div>
      </div>

      <div className="px-6 pb-8">
        {/* Features Skeleton */}
        <ul className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-center">
              <div className="h-5 w-5 bg-gray-700 rounded-full mr-4"></div>
              <div className="h-4 bg-gray-700 rounded-lg w-3/4"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
