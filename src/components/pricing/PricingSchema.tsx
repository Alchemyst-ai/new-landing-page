// Pricing page specific FAQ schema for better AI citation on pricing queries
const pricingFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Alchemyst AI pricing model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alchemyst AI uses usage-based pricing with transparent costs per token and per MB processed. The pricing calculator shows exact costs across Free, Starter, Accelerate, and Supercharge tiers based on your expected usage patterns."
      }
    },
    {
      "@type": "Question",
      name: "How much does enterprise context layer cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enterprise pricing is custom-built based on your organization's needs with dedicated support and scale. Contact the Alchemyst team for a tailored quote."
      }
    },
    {
      "@type": "Question",
      name: "Is there a free tier available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Free tier starts at $0 with 5 million tokens included when you sign up with your business email. This is ideal for testing Alchemyst AI's context layer before committing to a paid plan."
      }
    }
  ]
};

export default function PricingSchema() {
  return (
    <script
      id="pricing-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pricingFAQ).replace(/</g, "\\u003c")
      }}
    />
  );
}