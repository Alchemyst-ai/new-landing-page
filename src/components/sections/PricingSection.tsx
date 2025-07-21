"use client"
import React from "react";
import PricingCard from "@/components/sections/PricingCard";

const pricingPlans = [
  {
    title: "Starter",
    price: "$19/mo",
    description: "Best for your budding hobby projects",
    features: [
      { text: "200MB free network bandwidth/month" },
      { text: "100MB free AI Grid bandwidth/month" },
      { text: "500MB free context storage" },
      { text: "500 platform tokens for first month" },
      { text: "Around 500 documents for storage (~1MB each)" },
      { text: "All other Alchemyst features" },
      { text: "50 DeepResearch uses/day" },
      { text: "Contextual Research" }
    ],
    ctaText: "Talk to the Team",
    ctaLink: "https://cal.com/uttaran-nayak-alchemyst/30min?overlayCalendar=true&layout=mobile"
  },
  {
    title: "Accelerate",
    price: "$199/mo",
    description: "Best for your next startup idea",
    features: [
      { text: "5GB free network bandwidth/month" },
      { text: "2GB free AI Grid bandwidth/month" },
      { text: "10GB free context storage" },
      { text: "2000 platform tokens for first month" },
      { text: "Around 10,000 documents for storage (~1MB each)" },
      { text: "All other Alchemyst features" },
      { text: "250 DeepResearch uses/day" },
      { text: "Contextual Research" }
    ],
    ctaText: "Talk to the Team",
    ctaLink: "https://cal.com/uttaran-nayak-alchemyst/30min?overlayCalendar=true&layout=mobile",
    popular: true,
    customColor: "#FF7900"
  },
  {
    title: "Supercharge",
    price: "$799/mo",
    description: "Best for scaling your startup",
    features: [
      { text: "25GB free network bandwidth/month" },
      { text: "10GB free AI Grid bandwidth/month" },
      { text: "50GB free context storage" },
      { text: "10000 platform tokens for first month" },
      { text: "Around 10,000 documents for storage (~1MB each)" },
      { text: "All other Alchemyst features" },
      { text: "1000 DeepResearch uses/day" },
      { text: "Contextual Research" }
    ],
    ctaText: "Talk to the Team",
    ctaLink: "https://cal.com/uttaran-nayak-alchemyst/30min?overlayCalendar=true&layout=mobile"
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For 5+ person enterprises with custom needs",
    features: [
      { text: "Custom free network bandwidth/month" },
      { text: "Custom free AI Grid bandwidth/month" },
      { text: "Custom free context storage" },
      { text: "Custom platform tokens for first month" },
      { text: "Around 10000+ documents for storage (~1MB each)" },
      { text: "All other Alchemyst features" },
      { text: "Custom DeepResearch uses/day" },
      { text: "Contextual Research" }
    ],
    ctaText: "Talk to the Team",
    ctaLink: "https://cal.com/uttaran-nayak-alchemyst/30min?overlayCalendar=true&layout=mobile"
  }
];


const PricingSection = () => {
  return (
    <section className="py-20 bg-[#0a0a0a] pt-32" style={{ cursor: 'auto' }}>
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm dark:bg-muted/70">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-400 max-w-3xl leading-relaxed">
            Choose the plan that works best for your needs. All plans include core features with different usage limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              ctaText={plan.ctaText}
              ctaLink={plan.ctaLink}
              popular={plan.popular}
              customColor={plan.title === "Pro" ? "#ED9F36" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 