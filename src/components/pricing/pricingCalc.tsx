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

import {
  ACTION_COSTS_IN_TOKENS,
  ACTION_COST_LABELS,
  DISPLAY_ACTIONS,
  TIER_LABELS,
  type Tier,
} from "@/lib/pricing";

export { ACTION_COSTS_IN_TOKENS, ACTION_COST_LABELS } from "@/lib/pricing";

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
      data-markdown-pricing="calculator"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {/* Section heading */}
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#A16207] font-semibold bg-[#A16207]/10 px-4 py-1.5 border border-[#A16207]/20 mb-6">
          Calculator
        </span>
        <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-stone-900 mb-4">
          Estimate Your Costs
        </h2>
        <p className="font-sans text-base md:text-lg text-stone-600 font-medium max-w-2xl leading-relaxed">
          Select your tier and enter expected usage to get a detailed cost
          breakdown.
        </p>
      </div>

      {/* Calculator card */}
      <div className="bg-white border border-[#E4D9BC] rounded-xl p-8 md:p-10 shadow-[var(--shadow-soft)]">
        {/* Tier selector row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500 font-semibold whitespace-nowrap">
              Subscription Tier:
            </span>
            <Select value={tier} onValueChange={(v) => setTier(v as Tier)}>
              <SelectTrigger className="min-w-[280px] sm:min-w-[384px] rounded-md border-[#E4D9BC] font-sans text-sm text-stone-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-md border-[#E4D9BC]">
                {Object.entries(TIER_LABELS).map(([k, v]) => (
                  <SelectItem
                    key={k}
                    value={k}
                    className="font-sans text-sm text-stone-700"
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
            className="rounded-md border-[#E4D9BC] font-sans text-sm font-semibold text-[#57534E] hover:bg-[#F8F4EE] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] transition-all"
          >
            Reset
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-8 md:-mx-10 px-8 md:px-10">
          <table className="w-full text-sm border-collapse font-sans min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-stone-200 bg-stone-50">
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
                  Action
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-stone-900 font-bold hidden md:table-cell">
                  Description
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
                  Unit
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-[#A16207] font-bold">
                  Cost / Unit
                </th>
                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
                  Usage
                </th>
                <th className="p-3 text-right font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
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
                    className="border-b border-[#F1E9DA] hover:bg-[#B45309]/[0.03] transition-colors duration-150"
                  >
                    <td className="p-3 font-sans text-sm font-semibold text-stone-900">
                      {label.name}
                    </td>
                    <td className="p-3 font-sans text-sm text-stone-500 hidden md:table-cell">
                      {label.description}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-xs text-stone-400 uppercase tracking-wider">
                        {label.billingBasis}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[13px] text-[#A16207] font-medium tabular-nums">
                      ${(perUnit * 1_000_000).toFixed(2)}{" "}
                      <span className="text-stone-400">per 1M</span>
                    </td>
                    <td className="p-3 w-36">
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={count || ""}
                        onChange={(e) => handleChange(action, e.target.value)}
                        className="h-8 rounded-md border-[#E4D9BC] font-mono text-sm text-stone-900 tabular-nums focus:border-[#A16207] focus:ring-[#A16207]/20"
                      />
                    </td>
                    <td className="p-3 text-right font-mono text-[13px] text-stone-900 font-medium tabular-nums">
                      ${cost.toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex items-center justify-end mt-8 pt-6 border-t-2 border-stone-200 gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500 font-semibold">
            Estimated Total:
          </span>
          <span className="font-sans text-2xl md:text-3xl font-extrabold text-[#B45309] tabular-nums tracking-tight">
            ${totalCost.toFixed(4)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
