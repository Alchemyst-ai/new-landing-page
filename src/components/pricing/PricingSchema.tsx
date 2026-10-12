// Pricing page FAQ schema. The questions and answers come from the same
// PRICING_FAQ list the page renders, so the JSON-LD always matches the
// visible FAQ (a requirement for FAQ rich results).
import { PRICING_FAQ } from "@/lib/pricing";

const pricingFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
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
