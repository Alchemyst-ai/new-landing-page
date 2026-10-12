import { SpecStrip } from "@/components/brand";
import { PageHero, PageShell } from "@/components/page";
import PricingSchema from "@/components/pricing/PricingSchema";
import PricingSection from "@/components/sections/PricingSection";
import { TIERS, TIER_ORDER, formatRate, formatUsd } from "@/lib/pricing";
import type { Metadata } from "next";

const PAGE_PATH = "/pricing";
const URL = "https://getalchemystai.com/pricing";

const [free, starter, accelerate, supercharge] = TIER_ORDER.map((t) => TIERS[t]);
const freeUsage = formatUsd(free.freeUsage ?? 0);
const unlocks = `${formatUsd(starter.unlockAt)}, ${formatUsd(accelerate.unlockAt)} and ${formatUsd(supercharge.unlockAt)}`;

const title = "Pricing - Alchemyst AI Context Layer";
const description = `Usage-based pricing for the Alchemyst AI context layer. Start on Free, free up to ${freeUsage} of usage, then unlock ${starter.name}, ${accelerate.name} and ${supercharge.name} rates on ${unlocks} of monthly spend.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL },
  openGraph: { title, description, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function PricingPage() {
  return (
    <PageShell cta>
      <PricingSchema />
      <PageHero
        width="wide"
        crumbs={[{ name: "Pricing" }]}
        currentPath={PAGE_PATH}
        eyebrow="Pricing"
        title={
          <>
            Pay for what you use. <span className="italic text-[#B45309]">Tiers unlock as you grow.</span>
          </>
        }
        titleClassName="max-w-[22ch]"
        lead={`Usage-based pricing, in USD. Every account starts on ${free.name}, which is free up to ${freeUsage} of usage. ${starter.name}, ${accelerate.name} and ${supercharge.name} unlock on ${unlocks} of monthly spend, each with its own rate card.`}
        meta="Prices in USD · Rates shown per 1M"
      >
        {/* Visual recap of the lead; omitted from the Markdown export. */}
        <div data-markdown-skip className="overflow-x-auto">
          <SpecStrip
            className="w-fit"
            items={[
              { value: formatUsd(free.unlockAt), label: "to start" },
              { value: freeUsage, label: "free usage" },
              { value: String(TIER_ORDER.length), label: "usage tiers" },
              { value: formatRate("genai.chat.generate", TIER_ORDER[TIER_ORDER.length - 1]), label: `per 1M tokens on ${supercharge.name}` },
            ]}
          />
        </div>
      </PageHero>
      <PricingSection />
    </PageShell>
  );
}
