import PricingCard from "./PricingCard";
import PricingCalculator from "@/components/pricing/pricingCalc";

const pricingPlans = [
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
    <section className="py-20 bg-background pt-32" aria-labelledby="pricing-heading">
      <div className="max-w-[85%] mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h1 id="pricing-heading" className="text-4xl md:text-5xl font-bold text-center mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-center text-muted-foreground max-w-3xl leading-relaxed">
            Choose the plan that works best for your needs. All plans include core features with different usage limits.
          </p>
        </div>

        {/* FAQ for answer engines - question-form headers */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the Alchemyst AI pricing model?</h3>
              <p className="text-muted-foreground">
                Alchemyst AI uses usage-based pricing with transparent costs per token and per MB processed. 
                The pricing calculator above shows exact costs based on your expected usage patterns across 
                different tiers - from Free (up to $9 usage) to Starter, Accelerate, and Supercharge tiers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How much does enterprise context layer cost?</h3>
              <p className="text-muted-foreground">
                Enterprise pricing is custom-built based on your organization's needs. We work with you to 
                determine the right configuration for your scale, with custom network bandwidth, AI Grid 
                usage, context storage, and dedicated support.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Is there a free tier available?</h3>
              <p className="text-muted-foreground">
                Yes. The Free tier starts at $0 with 5 million tokens included when you sign up with your 
                business email. This is ideal for testing Alchemyst AI's context layer before committing to 
                a paid plan.
              </p>
            </div>
          </div>
        </div>

        {/* Contextual links for SEO/AEO */}
        <div className="mt-8 mb-16 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            Learn more:{" "}
            <a href="/thesis" className="text-primary hover:underline">Context Thesis</a>
            {" · "}
            <a href="/compare/alchemyst-ai-vs-mem0" className="text-primary hover:underline">Compare with Mem0</a>
            {" · "}
            <a href="https://docs.getalchemystai.com" className="text-primary hover:underline">Documentation</a>
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="w-full lg:col-span-2">
            <PricingCalculator />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full lg:col-span-1">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                ctaText={plan.ctaText}
                ctaLink={plan.ctaLink}
                customColor={plan.title === "Pro" ? "#ED9F36" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;