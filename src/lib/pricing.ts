// Shared pricing data for the interactive calculator and Markdown output.
export type Tier = "b2c" | "tier1" | "tier2" | "tier3";

export const ACTION_COSTS_IN_TOKENS: Record<string, Record<Tier, number>> = {
  "genai.chat.generate": {
    tier1: 15 / 1_000_000,
    tier2: 13 / 1_000_000,
    tier3: 10 / 1_000_000,
    b2c: 20 / 1_000_000,
  },
  "genai.proxy.openai.chat.completions": {
    tier1: 15 / 1_000_000,
    tier2: 13 / 1_000_000,
    tier3: 10 / 1_000_000,
    b2c: 20 / 1_000_000,
  },
  "genai.chat.web_search": {
    tier1: 40 / 1_000_000,
    tier2: 37 / 1_000_000,
    tier3: 30 / 1_000_000,
    b2c: 45 / 1_000_000,
  },
  "context.upload": {
    tier1: (1 * 10) / (2 * 1024 * 1024),
    tier2: (8 * 5) / (20 * 1024 * 1024),
    tier3: (3 * 3) / (20 * 1024 * 1024),
    b2c: 2 / (2 * 1024 * 1024),
  },
  "context.search": {
    tier1: (1 * 10) / (4 * 1024 * 1024),
    tier2: (8 * 5) / (40 * 1024 * 1024),
    tier3: (3 * 3) / (40 * 1024 * 1024),
    b2c: 2 / (4 * 1024 * 1024),
  },
};

export const ACTION_COST_LABELS = {
  "context.upload": {
    name: "Context Upload",
    description: "Upload organization context",
    billingBasis: "MB",
  },
  "context.search": {
    name: "Context Search",
    description: "Search through organizational contexts",
    billingBasis: "MB",
  },
  "genai.chat.generate": {
    name: "AI Chat Response Generations",
    description: "Cost of using our Chat APIs",
    billingBasis: "1M tokens",
  },
  "genai.proxy.openai.chat.completions": {
    name: "LLM Proxy Response Generations",
    description: "Cost of using our LLM Proxy APIs",
    billingBasis: "1M tokens",
  },
  "genai.chat.web_search": {
    name: "AI Web Search Usage",
    description: "Cost of using web search",
    billingBasis: "1K results",
  },
};

export const TIER_LABELS: Record<Tier, string> = {
  b2c: "Free (you start here, free upto $9 usage)",
  tier1: "Starter (unlocks on $19 monthly spend)",
  tier2: "Accelerate (unlocks on $199 monthly spend)",
  tier3: "Supercharge (unlocks on $799 monthly spend)",
};

export const DISPLAY_ACTIONS = [
  "genai.chat.generate",
  "genai.proxy.openai.chat.completions",
  "genai.chat.web_search",
  "context.upload",
  "context.search",
] as const;

export type DisplayAction = (typeof DISPLAY_ACTIONS)[number];

/* ── Tier presentation ────────────────────────────────────────────────────────
 * Everything the pricing page shows about a tier is derived from the data
 * above plus this table, so the cards, rate card, calculator, FAQ and
 * JSON-LD can never disagree with each other. */

/** Tiers in ladder order (lowest unlock threshold first). */
export const TIER_ORDER: readonly Tier[] = ["b2c", "tier1", "tier2", "tier3"];

export const TIERS: Record<
  Tier,
  {
    name: string;
    /** Monthly spend (USD) that unlocks the tier. 0 for the starting tier. */
    unlockAt: number;
    /** Free usage allowance (USD), where the tier has one. */
    freeUsage?: number;
    audience: string;
  }
> = {
  b2c: {
    name: "Free",
    unlockAt: 0,
    freeUsage: 9,
    audience: "For prototypes, evaluation and side projects.",
  },
  tier1: {
    name: "Starter",
    unlockAt: 19,
    audience: "For your first production workloads.",
  },
  tier2: {
    name: "Accelerate",
    unlockAt: 199,
    audience: "For teams scaling agents across products.",
  },
  tier3: {
    name: "Supercharge",
    unlockAt: 799,
    audience: "For high-volume, context-heavy workloads.",
  },
};

/** The calculator's Cost / Unit figure: base rate multiplied by 1,000,000. */
export function ratePer1M(action: DisplayAction, tier: Tier): number {
  return ACTION_COSTS_IN_TOKENS[action][tier] * 1_000_000;
}

/** "$20.00": the rate as displayed everywhere on the page. */
export function formatRate(action: DisplayAction, tier: Tier): string {
  return `$${ratePer1M(action, tier).toFixed(2)}`;
}

/** Whole-number dollars, e.g. "$19". */
export function formatUsd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/** Percentage by which a tier's token rate (AI chat) is below Free's. */
export function tokenSavingsVsFree(tier: Tier): number {
  const free = ratePer1M("genai.chat.generate", "b2c");
  return Math.round((1 - ratePer1M("genai.chat.generate", tier) / free) * 100);
}

/** "You start here. Free up to $9 of usage." / "Unlocks on $19 monthly spend." */
export function tierEligibility(tier: Tier): string {
  const t = TIERS[tier];
  return t.unlockAt === 0
    ? `You start here. Free up to ${formatUsd(t.freeUsage ?? 0)} of usage.`
    : `Unlocks on ${formatUsd(t.unlockAt)} monthly spend.`;
}

/* ── Pricing FAQ (visible on /pricing and mirrored in its JSON-LD) ─────────── */

const [, starter, accelerate, supercharge] = TIER_ORDER;
const chatRates = TIER_ORDER.map((t) => formatRate("genai.chat.generate", t));

export const PRICING_FAQ: { question: string; answer: string }[] = [
  {
    question: "What is the Alchemyst AI pricing model?",
    answer:
      "Alchemyst AI uses usage-based pricing with four tiers: Free, Starter, Accelerate and Supercharge. You pay for what you use at your tier's rates, across AI chat and LLM proxy generations (billed by tokens), AI web search (billed by results), and context upload and context search (billed by MB). All prices are in USD.",
  },
  {
    question: "Is there a free tier available?",
    answer: `Yes. Every account starts on the Free tier, which is free up to ${formatUsd(TIERS.b2c.freeUsage ?? 0)} of usage.`,
  },
  {
    question: "How do the Starter, Accelerate and Supercharge tiers unlock?",
    answer: `Tiers unlock on monthly spend: Starter on ${formatUsd(TIERS[starter].unlockAt)}, Accelerate on ${formatUsd(TIERS[accelerate].unlockAt)} and Supercharge on ${formatUsd(TIERS[supercharge].unlockAt)}. Each tier has its own rate card. AI chat and LLM proxy generations, for example, cost ${chatRates[0]} per 1M tokens on Free, ${chatRates[1]} on Starter, ${chatRates[2]} on Accelerate and ${chatRates[3]} on Supercharge.`,
  },
  {
    question: "How much does enterprise context layer cost?",
    answer:
      "If you need volume beyond Supercharge, dedicated infrastructure or custom terms, enterprise pricing is built around your organization's needs. Talk to the Alchemyst team for a tailored quote.",
  },
];

