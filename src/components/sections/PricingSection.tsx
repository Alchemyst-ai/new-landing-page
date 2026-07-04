"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PricingCalculator from "@/components/pricing/pricingCalc";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    interval: "/forever",
    description: "Perfect for testing and side projects.",
    features: [
      { text: "50,000 requests per month" },
      { text: "500MB Context Storage" },
      { text: "Standard Context Traces" },
      { text: "Community Support" },
      { text: "1 Workspace" }
    ],
    ctaText: "Start for free",
    ctaLink: "/platform/signin",
    highlight: false,
    accent: "#64748B"
  },
  {
    title: "Pro",
    price: "$49",
    interval: "/month",
    description: "For startups and small production teams.",
    features: [
      { text: "1,000,000 requests per month" },
      { text: "50GB Context Storage" },
      { text: "Advanced Context Traces" },
      { text: "Priority Email Support" },
      { text: "5 Workspaces" },
      { text: "Custom Ontology Rules" }
    ],
    ctaText: "Get Pro",
    ctaLink: "/platform/signin",
    highlight: true,
    accent: "#F49025"
  },
  {
    title: "Enterprise",
    price: "Custom",
    interval: "",
    description: "For organizations scaling critical AI operations.",
    features: [
      { text: "Unlimited requests" },
      { text: "Custom Context Storage limits" },
      { text: "VPC Peering & Dedicated Infrastructure" },
      { text: "24/7 Phone & Slack Support" },
      { text: "Unlimited Workspaces" },
      { text: "SSO & SAML Authentication" },
      { text: "Dedicated Success Manager" }
    ],
    ctaText: "Talk to Sales",
    ctaLink: "https://cal.com/uttaran-nayak-alchemyst/30min",
    highlight: false,
    accent: "#128F8B"
  }
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-32 bg-white relative w-full overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40"
           style={{
             backgroundImage: `linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)`,
             backgroundSize: "60px 60px",
             maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
             WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
           }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-24 text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#128F8B] font-semibold bg-[#128F8B]/10 px-4 py-1.5 rounded-none border border-[#128F8B]/20">
              Pricing
            </span>
          </div>
          <h1
            id="pricing-heading"
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] text-slate-900 mb-6 leading-tight"
          >
            Simple, Transparent Pricing
          </h1>
          <p className="font-sans text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
            Choose the plan that works best for your needs. All plans include core features to build context-aware AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`flex flex-col relative bg-white border ${plan.highlight ? 'border-[#F49025]' : 'border-slate-200'} rounded-none p-10 transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0px_#E2E8F0] hover:shadow-[16px_16px_0px_#CBD5E1]`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F49025] text-white font-mono text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 shadow-[2px_2px_0px_#0F172A]">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4" style={{ color: plan.accent }}>
                  {plan.title}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="font-sans text-5xl font-extrabold text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  {plan.interval && (
                    <span className="font-sans text-base text-slate-500 font-medium mb-1">
                      {plan.interval}
                    </span>
                  )}
                </div>
                <p className="font-sans text-sm text-slate-600 font-medium h-10">
                  {plan.description}
                </p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke={plan.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-sans text-sm text-slate-700 font-medium leading-tight">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                asChild 
                className={`w-full rounded-none py-6 text-sm font-bold tracking-wide transition-all shadow-[4px_4px_0px_#0F172A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0F172A] ${plan.highlight ? 'bg-[#F49025] hover:bg-[#D97B1A] text-white shadow-[4px_4px_0px_#0F172A]' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
              >
                <a href={plan.ctaLink}>
                  {plan.ctaText}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Pricing Calculator */}
        <div className="mb-32">
          <PricingCalculator />
        </div>

        {/* FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 p-10 rounded-none shadow-[8px_8px_0px_#E2E8F0]"
        >
          <div className="mb-10 text-center">
            <h2 className="font-sans text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">
                What is the Alchemyst AI pricing model?
              </h3>
              <p className="font-sans text-slate-600 font-medium leading-relaxed">
                Alchemyst AI uses straightforward tiered pricing. You can start completely free, and upgrade to Pro as your request volume or storage needs increase. For massive scale, our Enterprise tier offers custom limits and VPC options.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">
                How much does enterprise context layer cost?
              </h3>
              <p className="font-sans text-slate-600 font-medium leading-relaxed">
                Enterprise pricing is custom-built based on your organization's needs. We work with you to determine the right configuration for your scale, with custom network bandwidth, storage, and dedicated support.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">
                Is there a free tier available?
              </h3>
              <p className="font-sans text-slate-600 font-medium leading-relaxed">
                Yes. The Free tier starts at $0 with 50,000 requests included when you sign up. This is ideal for testing Alchemyst AI's context layer before committing to a paid plan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;