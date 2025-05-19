export interface FeatureCardData {
  title: string;
  description: string;
  className?: string;
  rowSpan?: boolean;
}

export const featureCardsData: FeatureCardData[] = [
  {
    title: "Enhance Future Conversations",
    description: "Build smarter AI that learns from every interaction, providing context-rich responses without repetitive questions.",
    className: "bg-[#1a1a1a] text-white border border-gray-800",
  },
  {
    title: "Save Money",
    description: "Reduce LLM costs by up to 80% through intelligent data filtering, sending only the most relevant information to AI models.",
    className: "bg-[#1a1a1a] text-white border border-gray-800",
  },
  {
    title: "Reliable and Stable Platform You can trust",
    description: "With average 99.99% uptime and effortless fallback, Retell AI ensures your agents are always production-ready.",
    className: "bg-card border border-border",
    rowSpan: true,
  },
  {
    title: "Improve AI Responses",
    description: "Deliver more accurate and personalized AI outputs by leveraging historical context and user preferences.",
    className: "bg-[#1a1a1a] text-white border border-gray-800",
  },
  {
    title: "Easy Integration",
    description: "Seamlessly enhance your existing AI solutions with Alchemyst's memory layer - compatible with OpenAI, Claude, Gemini and more.",
    className: "bg-[#1a1a1a] text-white border border-gray-800",
  },
]; 