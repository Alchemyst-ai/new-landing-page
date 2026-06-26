import Script from "next/script";

// Pricing page specific JSON-LD for better AI citation
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pricing - Alchemyst AI Context Layer",
  description: "Simple, transparent pricing for the institutional context backbone. Free tier available with transparent usage costs.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://getalchemystai.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: "https://getalchemystai.com/pricing"
      }
    ]
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Alchemyst AI pricing model?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alchemyst AI uses usage-based pricing with transparent costs per token and per MB processed across different tiers."
        }
      },
      {
        "@type": "Question",
        name: "How much does enterprise context layer cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enterprise pricing is custom-built based on your organization's needs with dedicated support and scale."
        }
      },
      {
        "@type": "Question",
        name: "Is there a free tier available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 5 million tokens free when you sign up with your business email."
        }
      }
    ]
  }
};

export default function PricingSchema() {
  return (
    <Script
      id="pricing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pricingSchema).replace(/</g, "\\u003c")
      }}
    />
  );
}