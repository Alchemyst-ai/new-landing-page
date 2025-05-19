import React from "react";
import PricingCard from "./PricingCard";

const pricingPlans = [
  {
    title: "Hobby",
    price: "Free",
    description: "Perfect for developers and small teams that want to get started with MemoAI.",
    features: [
      { text: "10,000 memories" },
      { text: "Unlimited end users" },
      { text: "1,000 retrieval API calls/month" },
      { text: "Community Support" },
    ],
    ctaText: "Start for Free",
  },
  {
    title: "Starter",
    price: "$ 19/month",
    originalPrice: "$29/mo",
    description: "Perfect for growing teams that need more power and flexibility.",
    features: [
      { text: "50,000 memories" },
      { text: "Unlimited end users" },
      { text: "5,000 retrieval API calls/month" },
      { text: "Community Support" },
    ],
    ctaText: "Buy Now",
  },
  {
    title: "Pro",
    price: "$ 249 / month",
    description: "Ideal for growing businesses that need a reliable, managed solution with generous free usage.",
    features: [
      { text: "Unlimited memories" },
      { text: "Unlimited end users" },
      { text: "50,000 retrieval API calls/month" },
      { text: "Private Slack Channel" },
      { text: "Graph Memory" },
      { text: "Advanced Analytics" },
      { text: "Multiple projects support" },
    ],
    ctaText: "Buy Now",
    popular: true,
    customColor: "#FF9E3C",
  },
  {
    title: "Enterprise",
    price: "Flexible Pricing",
    description: "Designed for large organizations with advanced security, compliance, and scalability needs.",
    features: [
      { text: "Unlimited memories" },
      { text: "Unlimited end users" },
      { text: "Unlimited API calls" },
      { text: "Private Slack Channel" },
      { text: "Graph Memory" },
      { text: "Advanced Analytics" },
      { text: "On-prem deployment" },
      { text: "SSO" },
      { text: "Audit Logs" },
      { text: "Custom Integrations" },
      { text: "SLA" },
    ],
    ctaText: "Contact Us",
  },
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-lime-400/20 text-lime-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
            PRICING
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
              originalPrice={plan.originalPrice}
              description={plan.description}
              features={plan.features}
              ctaText={plan.ctaText}
              popular={plan.popular}
              customColor={plan.title === "Pro" ? "#FF9E3C" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 