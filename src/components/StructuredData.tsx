// Site-wide organization and product identities. Page-specific FAQ markup lives with its visible content.
const BASE_URL = "https://getalchemystai.com";

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Alchemyst AI",
        legalName: "XAlchemystai Technologies Pvt. Ltd.",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
        email: "founders@getalchemystai.com",
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "founders@getalchemystai.com",
            contactType: "customer service",
            url: `${BASE_URL}/contact`,
            availableLanguage: ["en"],
          },
        ],
        dateModified: "2026-09-29",
        description:
          "Alchemyst AI builds an AI context layer that gives developers and enterprises shared access to company knowledge, persistent agent memory, and traceable retrieval through an API.",
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
          "An AI context management platform for business knowledge and AI agent memory. Store context, retrieve relevant information, and inspect Context Traces through an API.",
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
        "@type": "Person",
        "@id": `${BASE_URL}/#founder`,
        name: "Uttaran Nayak",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": `${BASE_URL}/#organization` },
        url: BASE_URL,
        sameAs: [
          "https://x.com/uttarannayak",
          "https://www.linkedin.com/in/uttarannayak"
        ]
      }
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
