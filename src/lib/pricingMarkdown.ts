import {
  ACTION_COSTS_IN_TOKENS,
  ACTION_COST_LABELS,
  DISPLAY_ACTIONS,
  TIER_LABELS,
  type Tier,
} from "@/lib/pricing";

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
