// HowToSchema - emits HowTo JSON-LD for step-by-step guide pages so answer
// engines (Google rich results, ChatGPT, Perplexity, Gemini) can surface the
// steps directly. Keep the `steps` text aligned with the on-page H2/H3 sections.

const BASE_URL = "https://getalchemystai.com";

export interface HowToStep {
  /** Step heading, ideally matching the on-page H2/H3, e.g. "Approach 1: Build it yourself". */
  name: string;
  /** Plain-text description of what to do in this step. */
  text: string;
  /** Optional anchor/path for this step, relative to the page URL. */
  url?: string;
}

interface HowToSchemaProps {
  /** Page name, e.g. "How to Add Persistent Memory to AI Agents". */
  name: string;
  /** One-sentence summary of the overall task. */
  description: string;
  /** Absolute or relative URL of the guide page. */
  url: string;
  /** Ordered steps. */
  steps: HowToStep[];
  /** Optional ISO date the guide was last updated. */
  dateModified?: string;
}

function absoluteUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function HowToSchema({
  name,
  description,
  url,
  steps,
  dateModified,
}: HowToSchemaProps) {
  const pageUrl = absoluteUrl(url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: pageUrl,
    ...(dateModified ? { dateModified } : {}),
    step: steps.map((s, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: s.name,
      text: s.text,
      url: s.url ? absoluteUrl(s.url) : `${pageUrl}#step-${index + 1}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // Per Next.js JSON-LD guidance, scrub `<` to its unicode escape to
      // prevent XSS, since JSON.stringify does not sanitize HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
