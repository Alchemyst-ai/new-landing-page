// PricingSection: the body of /pricing below the hero. Server component; all
// figures are derived from src/lib/pricing.ts so the tier cards, rate card,
// calculator, FAQ and JSON-LD always agree.
//
//   Tiers      four usage tiers on one ladder, plus the enterprise strip
//   Rate card  every billed action at every tier (per 1M, billing label)
//   Calculator interactive estimate (client)
//   FAQ        mirrors the pricing JSON-LD

import type { ReactNode } from "react";
import { BrandButton, Chip, Eyebrow, Section, SpecCard } from "@/components/brand";
import ComparisonTable from "@/components/brand/ComparisonTable";
import SectionHeader from "@/components/brand/SectionHeader";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import PricingCalculator from "@/components/pricing/pricingCalc";
import {
  ACTION_COST_LABELS,
  DISPLAY_ACTIONS,
  PRICING_FAQ,
  TIERS,
  TIER_ORDER,
  formatRate,
  formatUsd,
  tierEligibility,
  tokenSavingsVsFree,
  type Tier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

const SIGN_IN = "/platform/signin";
const SALES_CALL = "https://cal.com/uttaran-nayak-alchemyst/30min";

/* ── Tier card ─────────────────────────────────────────────────────────────── */

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const t = TIERS[tier];
  const isStart = t.unlockAt === 0;
  return (
    <SpecCard
      as="article"
      aria-labelledby={`tier-${tier}`}
      className={cn("flex w-full flex-col p-7", isStart && "border-[#B45309]/45")}
    >
      {isStart && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] rounded-t-[var(--radius)] bg-[#B45309]" />
      )}

      <div className="mb-6 flex min-h-[26px] items-center justify-between gap-3">
        <Eyebrow>Tier {String(index + 1).padStart(2, "0")}</Eyebrow>
        {isStart && <Chip>You start here</Chip>}
      </div>

      <h3 id={`tier-${tier}`} className="text-[1.375rem] font-bold leading-[1.25] tracking-[-0.015em] text-[#4A3B33]">
        {t.name}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#57534E] md:min-h-[3.2em]">{t.audience}</p>

      {/* Price: what it costs to start, or the spend that unlocks the tier */}
      <div className="mt-6 border-t border-[#E4D9BC] pt-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
          {isStart ? "Starts at" : "Unlocks on"}
        </p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-[2.75rem] font-bold leading-none tracking-[-0.04em] tabular-nums text-[#4A3B33]">
            {formatUsd(t.unlockAt)}
          </span>
          <span className="text-[0.875rem] text-[#78716C]">{isStart ? "to start" : "monthly spend"}</span>
        </p>
        <p className="mt-4 flex items-start gap-2.5 text-[0.875rem] leading-[1.55] text-[#57534E]">
          <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-[#E4C090]" />
          {isStart
            ? `Free up to ${formatUsd(t.freeUsage ?? 0)} of usage.`
            : `${tokenSavingsVsFree(tier)}% lower per-token rates than Free.`}
        </p>
      </div>

      {/* Rates */}
      <div className="mt-6 flex-1 border-t border-[#E4D9BC] pt-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
          Rate per 1M · USD
        </p>
        <dl className="mt-2">
          {DISPLAY_ACTIONS.map((action, i) => {
            const label = ACTION_COST_LABELS[action];
            return (
              <div
                key={action}
                className={cn(
                  "flex items-start justify-between gap-4 py-3",
                  i < DISPLAY_ACTIONS.length - 1 && "border-b border-[#F1E9DA]",
                )}
              >
                <dt className="min-w-0">
                  <span className="block text-[0.8125rem] font-bold leading-[1.4] text-[#4A3B33]">{label.name}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-[#A8A29E]">
                    {label.billingBasis}
                  </span>
                </dt>
                <dd className="whitespace-nowrap font-mono text-[13px] font-medium tabular-nums text-[#4A3B33]">
                  {formatRate(action, tier)}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <BrandButton
        href={SIGN_IN}
        variant={isStart ? "primary" : "outline"}
        arrow={isStart}
        className="mt-6 w-full"
      >
        {isStart ? "Start for free" : "Get started"}
      </BrandButton>
    </SpecCard>
  );
}

/* ── Rate card helpers ─────────────────────────────────────────────────────── */

const RATE_COLUMNS: ReactNode[] = [
  "Action",
  "Billing label",
  ...TIER_ORDER.map((tier) => (
    <span key={tier} className="block text-right">
      {TIERS[tier].name}
      <span className="mt-1 block text-[9.5px] tracking-[0.1em] text-[#A8A29E]">Rate per 1M</span>
    </span>
  )),
];

const RATE_ROWS: ReactNode[][] = DISPLAY_ACTIONS.map((action) => {
  const label = ACTION_COST_LABELS[action];
  return [
    label.name,
    <span key="unit" className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
      {label.billingBasis}
    </span>,
    ...TIER_ORDER.map((tier) => (
      <span key={tier} className="block whitespace-nowrap text-right font-mono text-[13px] tabular-nums text-[#4A3B33]">
        {formatRate(action, tier)}
      </span>
    )),
  ];
});

/* ── Section ───────────────────────────────────────────────────────────────── */

export default function PricingSection() {
  return (
    <>
      {/* Tiers */}
      <Section id="tiers" tone="paper" pad="none" innerClassName="pb-20 md:pb-28" aria-labelledby="tiers-heading">
        <SectionHeader
          id="tiers-heading"
          rule={false}
          eyebrow="Tiers"
          title={
            <>
              Four tiers. <span className="italic text-[#B45309]">One meter.</span>
            </>
          }
          lead="Every account starts on Free. Starter, Accelerate and Supercharge unlock as your monthly spend grows, and each tier bills usage at its own rates."
        />

        {/* The Markdown export swaps the card grid for a compact tier table
            (pricingTiersMarkdown); the full rates follow in the rate card. */}
        <Stagger data-markdown-pricing="tiers" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TIER_ORDER.map((tier, i) => (
            <FadeUp key={tier} className="flex">
              <TierCard tier={tier} index={i} />
            </FadeUp>
          ))}
        </Stagger>

        <FadeUp standalone className="mt-5">
          <SpecCard
            tone="sand"
            interactive={false}
            className="flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
          >
            <div>
              <Eyebrow className="mb-4">Enterprise</Eyebrow>
              <h3 className="text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                Need more than Supercharge?
              </h3>
              <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-[1.7] text-[#57534E]">
                For volume beyond Supercharge, dedicated infrastructure or custom terms, we build pricing around your
                organization.
              </p>
            </div>
            <BrandButton href={SALES_CALL} external arrow className="shrink-0">
              Talk to us
            </BrandButton>
          </SpecCard>
        </FadeUp>
      </Section>

      {/* The Markdown export replaces this block with the canonical rate table
          from pricingMarkdown(), so agents get one clean copy of the rates. */}
      <div data-markdown-pricing="calculator">
        {/* Rate card */}
        <Section id="rates" tone="sand" bordered aria-labelledby="rates-heading">
          <SectionHeader
            id="rates-heading"
            eyebrow="Rate card"
            title="Usage pricing by tier"
            lead="All prices are in USD. Rates use the calculator's Cost / Unit display, shown per 1M, next to the billing label for each action."
          />
          <FadeUp standalone>
            <ComparisonTable columns={RATE_COLUMNS} rows={RATE_ROWS} className="my-0" />
          </FadeUp>

          <FadeUp standalone className="mt-10">
            <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
              Tier eligibility
            </p>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-[#E4D9BC] sm:grid-cols-2 lg:grid-cols-4">
              {TIER_ORDER.map((tier) => (
                <div key={tier} className="flex flex-col gap-2 bg-white px-5 py-5">
                  <dt className="flex items-center gap-2.5 text-[0.9375rem] font-bold text-[#4A3B33]">
                    <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
                    {TIERS[tier].name}
                  </dt>
                  <dd className="text-[0.875rem] leading-[1.6] text-[#57534E]">{tierEligibility(tier)}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </Section>

        {/* Calculator */}
        <Section id="calculator" tone="paper" bordered aria-labelledby="calculator-heading">
          <SectionHeader
            id="calculator-heading"
            eyebrow="Calculator"
            title="Estimate your costs"
            lead="Select a tier and enter expected usage for each action to get a cost breakdown, then compare the same usage across every tier."
          />
          <FadeUp standalone>
            <PricingCalculator />
          </FadeUp>
        </Section>
      </div>

      {/* FAQ */}
      <Section id="faq" tone="sand" bordered aria-labelledby="faq-heading">
        <SectionHeader
          id="faq-heading"
          eyebrow="FAQ"
          title="Frequently asked questions"
          lead={
            <>
              Still deciding? Read the{" "}
              <a
                href="https://docs.getalchemystai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-brand font-bold text-[#4A3B33]"
              >
                documentation
              </a>{" "}
              or{" "}
              <a
                href={SALES_CALL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-brand font-bold text-[#4A3B33]"
              >
                talk to the team
              </a>
              .
            </>
          }
        />
        {/* The Markdown export renders these as "### Question" blocks
            (pricingFaqMarkdown), from the same PRICING_FAQ list. */}
        <div data-markdown-pricing="faq">
          <Stagger as="dl" className="border-t border-[#E4D9BC]">
            {PRICING_FAQ.map((item) => (
              <FadeUp
                key={item.question}
                className="grid grid-cols-1 gap-3 border-b border-[#E4D9BC] py-7 lg:grid-cols-12 lg:gap-12"
              >
                <dt className="text-[1.125rem] font-bold leading-[1.4] tracking-[-0.01em] text-[#4A3B33] lg:col-span-5">
                  {item.question}
                </dt>
                <dd className="text-[0.9375rem] leading-[1.75] text-[#57534E] lg:col-span-7">{item.answer}</dd>
              </FadeUp>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
