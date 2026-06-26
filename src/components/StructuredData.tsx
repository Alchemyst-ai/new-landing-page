// Site-wide JSON-LD structured data for GEO / AI answer engines.
// Emits Organization, SoftwareApplication and FAQPage in a single @graph so
// the brand entity is fed straight into AI knowledge graphs
// (ChatGPT, Claude, Perplexity, Gemini, Grok).
// Copy is grounded in this branch's "Context Layer / semantic drift" positioning.

const BASE_URL = "https://getalchemystai.com";

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Alchemyst AI",
        legalName: "XAlchemyst Technologies Pvt. Ltd.",
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.png`,
        email: "founders@getalchemystai.com",
        description:
          "Alchemyst AI is the institutional context backbone for the enterprise. It enables AI agents to run day-to-day operations at scale by providing persistent, traceable context and semantic retrieval over an institutional knowledge graph, keeping institutional knowledge current, traceable, and consistent.",
        sameAs: [
          "https://x.com/getalchemyst",
          "https://www.linkedin.com/company/alchemystai",
          "https://github.com/alchemyst-ai",
          "https://www.instagram.com/alchemyst.ai",
          "https://dub.sh/context-community",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}/#software`,
        name: "Alchemyst AI Context Layer",
        url: BASE_URL,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web, Cloud",
        description:
          "The institutional context backbone for your enterprise. Enable AI agents to run your day-to-day operations at enterprise scale with persistent, traceable context and semantic retrieval over an institutional knowledge graph. One API, zero infrastructure, sub-300ms retrieval latency, 99.9% uptime SLA.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Alchemyst AI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Alchemyst AI is the institutional context backbone for the enterprise. It enables AI agents to run your day-to-day operations at enterprise scale, providing persistent, traceable context and semantic retrieval through a single API — powered by context arithmetic over your institutional knowledge graph — so institutional knowledge stays current, traceable, and consistent, with no infrastructure to manage.",
            },
          },
          {
            "@type": "Question",
            name: "What is semantic drift and how does Alchemyst AI fix it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Semantic drift (context rot) is when an AI agent's knowledge base goes stale as your business moves on, causing wrong or outdated answers. Alchemyst AI fixes it with a live context layer that continuously updates your institutional knowledge graph and uses context arithmetic for retrieval so agents stay accurate.",
            },
          },
          {
            "@type": "Question",
            name: "How fast is Alchemyst AI's context retrieval?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Alchemyst AI delivers sub-300ms retrieval latency with a 99.9% uptime SLA, served through one API with zero infrastructure to manage.",
            },
          },
          {
            "@type": "Question",
            name: "Who is Alchemyst AI's context layer for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It is built for developers and enterprises building AI agents, LLM apps, chatbots, and automation workflows that need persistent, traceable context across sessions to stay reliable in production.",
            },
          },
          {
            "@type": "Question",
            name: "Does Alchemyst AI require managing my own infrastructure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Alchemyst AI is delivered as a single API with zero infrastructure. You integrate the context layer without standing up or maintaining a vector database or memory store yourself.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // Per Next.js JSON-LD guidance, scrub `<` to its unicode escape to
      // prevent XSS, since JSON.stringify does not sanitize HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
