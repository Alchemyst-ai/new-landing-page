// Markdown renderings of the pricing data, for agent-readable outputs:
// /pricing.md and /llms-full.txt (swapped in by pageMarkdown.ts via
// data-markdown-pricing blocks) and the /llms.txt Pricing entry.
// Everything is derived from src/lib/pricing.ts.

import {
  ACTION_COSTS_IN_TOKENS,
  ACTION_COST_LABELS,
  DISPLAY_ACTIONS,
  PRICING_FAQ,
  TIERS,
  TIER_LABELS,
  TIER_ORDER,
  formatRate,
  formatUsd,
  tierEligibility,
  tokenSavingsVsFree,
  type Tier,
} from "@/lib/pricing";

/** Rate card and tier eligibility (replaces the rate card + calculator). */
export function pricingMarkdown(): string {
  const tiers = Object.keys(TIER_LABELS) as Tier[];
  const rows = DISPLAY_ACTIONS.map((action) => {
    const label = ACTION_COST_LABELS[action];
    const rates = tiers.map(
      (tier) => `$${(ACTION_COSTS_IN_TOKENS[action][tier] * 1_000_000).toFixed(2)}`,
    );
    return `| ${label.name} | ${label.billingBasis} | ${rates.join(" | ")} |`;
  });

  return [
    "## Usage pricing by tier",
    "",
    "All prices are in USD. Rates use the calculator’s Cost / Unit display: the configured base rate multiplied by 1,000,000 (shown as ‘per 1M’). Billing labels are reproduced from the calculator.",
    "",
    "| Action | Billing label | Free: rate per 1M | Starter: rate per 1M | Accelerate: rate per 1M | Supercharge: rate per 1M |",
    "| --- | --- | ---: | ---: | ---: | ---: |",
    ...rows,
    "",
    "### Tier eligibility",
    "",
    ...tiers.map((tier) => `- ${TIER_LABELS[tier]}`),
    "",
  ].join("\n");
}

/** Compact tier overview (replaces the four tier cards). */
export function pricingTiersMarkdown(): string {
  const rows = TIER_ORDER.map((tier) => {
    const chat = `${formatRate("genai.chat.generate", tier)} per 1M tokens`;
    const savings = tokenSavingsVsFree(tier);
    const rate = savings > 0 ? `${chat} (${savings}% lower than Free)` : chat;
    return `| ${TIERS[tier].name} | ${tierEligibility(tier)} | ${TIERS[tier].audience} | ${rate} |`;
  });
  return [
    "| Tier | Eligibility | Best for | AI chat and LLM proxy rate |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
    "Every account starts on Free: [Start for free](/platform/signin). The full rate card for every billed action follows below.",
    "",
  ].join("\n");
}

/** FAQ as heading + answer pairs (replaces the FAQ definition list). */
export function pricingFaqMarkdown(): string {
  return PRICING_FAQ.flatMap(({ question, answer }) => [`### ${question}`, "", answer, ""]).join("\n");
}

/** One-paragraph pricing summary for the /llms.txt index. */
export function pricingSummary(): string {
  const [free, ...paid] = TIER_ORDER;
  const top = TIER_ORDER[TIER_ORDER.length - 1];
  const list = (items: string[]) => `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
  const paidText = list(
    paid.map((tier) => `${TIERS[tier].name} (unlocks on ${formatUsd(TIERS[tier].unlockAt)} monthly spend)`),
  );
  return [
    `Usage-based pricing in USD with ${TIER_ORDER.length} tiers:`,
    `${TIERS[free].name} (you start here, free up to ${formatUsd(TIERS[free].freeUsage ?? 0)} of usage), ${paidText}.`,
    `Each tier has its own rates for ${list(DISPLAY_ACTIONS.map((a) => ACTION_COST_LABELS[a].name))}.`,
    `AI chat and LLM proxy generations cost ${formatRate("genai.chat.generate", free)} per 1M tokens on ${TIERS[free].name} and ${formatRate("genai.chat.generate", top)} on ${TIERS[top].name}.`,
    `The page has the full rate card, a cost calculator, and an enterprise contact for volume beyond ${TIERS[top].name}.`,
  ].join(" ");
}
