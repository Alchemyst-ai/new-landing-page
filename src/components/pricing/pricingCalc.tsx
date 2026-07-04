"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Tier = "b2c" | "tier1" | "tier2" | "tier3";

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
  "genai.email.generate": {
    tier1: 3,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "genai.social.generate": {
    tier1: 3,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "genai.workflow.step.generate": {
    tier1: 7,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "genai.leads.get": {
    tier1: 3,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "genai.leads.augment.by_url": {
    tier1: 2,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "genai.leads.augment.by_web_search": {
    tier1: 4,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "genai.email.send": {
    tier1: 1,
    tier2: 0,
    tier3: 0,
    b2c: 0,
  },
  "campaigns.create": {
    tier1: 1,
    tier2: 0,
    tier3: 0,
    b2c: 0,
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

const TIER_LABELS: Record<Tier, string> = {
  b2c: "Free (you start here, free upto $9 usage)",
  tier1: "Starter (unlocks on $19 monthly spend)",
  tier2: "Accelerate (unlocks on $199 monthly spend)",
  tier3: "Supercharge (unlocks on $799 monthly spend)",
};

const DISPLAY_ACTIONS = [
  "genai.chat.generate",
  "genai.proxy.openai.chat.completions",
  "genai.chat.web_search",
  "context.upload",
  "context.search",
] as const;

export default function PricingCalculator() {
  const [tier, setTier] = useState<Tier>("b2c");
  const [usage, setUsage] = useState<Record<string, number>>({});

  const totalCost = useMemo(() => {
    return Object.entries(usage).reduce((acc, [pricingKey, count]) => {
      const costPerUnit =
        ACTION_COSTS_IN_TOKENS[
          pricingKey as keyof typeof ACTION_COSTS_IN_TOKENS
        ]?.[tier] ?? 0;
      return acc + costPerUnit * count;
    }, 0);
  }, [usage, tier]);

  const handleChange = (action: string, value: string) => {
    setUsage((prev) => ({
      ...prev,
      [action]: Math.max(parseFloat(value) || 0, 0),
    }));
  };

  const resetUsage = () => setUsage({});

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {/* Section heading */}
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#128F8B] font-semibold bg-[#128F8B]/10 px-4 py-1.5 border border-[#128F8B]/20 mb-6">
          Calculator
        </span>
        <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-slate-900 mb-4">
          Estimate Your Costs
        </h2>
        <p className="font-sans text-base md:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
          Select your tier and enter expected usage to get a detailed cost
          breakdown.
        </p>
      </div>

      {/* Calculator card */}
      <div className="bg-white border border-slate-200 rounded-none p-8 md:p-10 shadow-[8px_8px_0px_#E2E8F0]">
        {/* Tier selector row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold whitespace-nowrap">
              Subscription Tier:
            </span>
            <Select value={tier} onValueChange={(v) => setTier(v as Tier)}>
              <SelectTrigger className="min-w-[280px] sm:min-w-[384px] rounded-none border-slate-300 font-sans text-sm text-slate-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-slate-200">
                {Object.entries(TIER_LABELS).map(([k, v]) => (
                  <SelectItem
                    key={k}
                    value={k}
                    className="font-sans text-sm text-slate-700"
                  >
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetUsage}
            className="rounded-none border-slate-300 font-sans text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_#E2E8F0] hover:shadow-[4px_4px_0px_#CBD5E1] transition-all"
          >
            Reset
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-8 md:-mx-10 px-8 md:px-10">
          <table className="w-full text-sm border-collapse font-sans min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50">
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-slate-900 font-bold">
                  Action
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-slate-900 font-bold hidden md:table-cell">
                  Description
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-slate-900 font-bold">
                  Unit
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-[#128F8B] font-bold">
                  Cost / Unit
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-slate-900 font-bold">
                  Usage
                </th>
                <th className="p-3 text-right font-mono text-xs uppercase tracking-widest text-slate-900 font-bold">
                  Cost
                </th>
              </tr>
            </thead>

            <tbody>
              {DISPLAY_ACTIONS.map((action) => {
                const costs = ACTION_COSTS_IN_TOKENS[action];
                const label =
                  ACTION_COST_LABELS[
                    action as keyof typeof ACTION_COST_LABELS
                  ];

                if (!costs || !label) return null;

                const perUnit = costs[tier];
                const count = usage[action] ?? 0;
                const cost = perUnit * count;

                return (
                  <tr
                    key={action}
                    className="border-b border-slate-100 hover:bg-[#F49025]/[0.03] transition-colors duration-150"
                  >
                    <td className="p-3 font-sans text-sm font-semibold text-slate-900">
                      {label.name}
                    </td>
                    <td className="p-3 font-sans text-sm text-slate-500 hidden md:table-cell">
                      {label.description}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                        {label.billingBasis}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[13px] text-[#128F8B] font-medium tabular-nums">
                      ${(perUnit * 1_000_000).toFixed(2)}{" "}
                      <span className="text-slate-400">per 1M</span>
                    </td>
                    <td className="p-3 w-36">
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={count || ""}
                        onChange={(e) => handleChange(action, e.target.value)}
                        className="h-8 rounded-none border-slate-300 font-mono text-sm text-slate-900 tabular-nums focus:border-[#128F8B] focus:ring-[#128F8B]/20"
                      />
                    </td>
                    <td className="p-3 text-right font-mono text-[13px] text-slate-900 font-medium tabular-nums">
                      ${cost.toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex items-center justify-end mt-8 pt-6 border-t-2 border-slate-200 gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Estimated Total:
          </span>
          <span className="font-sans text-2xl md:text-3xl font-extrabold text-[#F49025] tabular-nums tracking-tight">
            ${totalCost.toFixed(4)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
