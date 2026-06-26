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
    <section className="py-20 bg-background pt-32">
      <div className="max-w-[85%] mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl leading-relaxed">
            Choose the plan that works best for your needs. All plans include core features with different usage limits.
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