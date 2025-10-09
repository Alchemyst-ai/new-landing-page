"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";

// const TIERS = ["starter", "accelerate", "supercharge", "free"] as const;
// type SubscriptionTier = (typeof TIERS)[number];

export const ACTION_COSTS_IN_TOKENS = {
  'genai.chat.generate': {
    tier1: 15,
    tier2: 13,
    tier3: 10,
    b2c: 20
  },
  'genai.proxy.openai.chat.completions': {
    tier1: 15,
    tier2: 13,
    tier3: 10,
    b2c: 20
  },
  'genai.chat.web_search': {
    tier1: 40,
    tier2: 37,
    tier3: 30,
    b2c: 45
  },
  'context.upload': {
    tier1: 1 / 10,
    tier2: 8 / 100,
    tier3: 3 / 100,
    b2c: 2 / 10
  },
  'context.search': {
    tier1: 5 / 1000,
    tier2: 45 / 10000,
    tier3: 3 / 1000,
    b2c: 7 / 1000
  },
  // 'genai.email.generate': {
  //   tier1: 3,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'genai.social.generate': {
  //   tier1: 3,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'genai.workflow.step.generate': {
  //   tier1: 7,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'genai.leads.get': {
  //   tier1: 3,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'genai.leads.augment.by_url': {
  //   tier1: 2,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'genai.leads.augment.by_web_search': {
  //   tier1: 4,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'genai.email.send': {
  //   tier1: 1,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
  // 'campaigns.create': {
  //   tier1: 1,
  //   tier2: 0,
  //   tier3: 0,
  //   b2c: 0
  // },
};

const TIER_LABELS: Record<keyof typeof ACTION_COSTS_IN_TOKENS['context.upload'], string> = {
  b2c: "Free (you start here, free upto $9 usage)",
  tier1: "Starter (unlocks on $19 monthly spend)",
  tier2: "Accelerate (unlocks on $199 monthly spend)",
  tier3: "Supercharge (unlocks on $799 monthly spend)",
}

export const ACTION_COST_LABELS: Record<keyof typeof ACTION_COSTS_IN_TOKENS, { name: string, description: string, billingBasis: string }> = {
  "context.search": { name: "Context Search", description: "Search through organizational contexts", billingBasis: "1MB" },
  "context.upload": { name: "Context Upload", description: "Upload organization context", billingBasis: "1MB" },
  "genai.chat.generate": { name: "AI Chat Response Generations", description: "Cost of using our Chat APIs", billingBasis: "1M tokens" },
  "genai.proxy.openai.chat.completions": { name: "LLM Proxy Response Generations", description: "Cost of using our LLM Proxy APIs", billingBasis: "1M tokens" },
  "genai.chat.web_search": { name: "AI Web Search Usage", description: "Cost of using web search in our chat APIs (in addition to response generations)", billingBasis: "1K results" },
}


export default function PricingCalculator() {
  const [tier, setTier] = useState<keyof typeof TIER_LABELS>("b2c");
  const [usage, setUsage] = useState<Record<string, number>>({});

  // Compute total
  const totalCost = useMemo(() => {
    return Object.entries(ACTION_COSTS_IN_TOKENS).reduce((acc, [action, costs]) => {
      const instances = usage[action] ?? 0;
      const costPerUnit = costs[tier] ?? 0;
      return acc + instances * costPerUnit;
    }, 0);
  }, [usage, tier]);

  const handleChange = (action: string, value: string) => {
    setUsage((prev) => ({
      ...prev,
      [action]: parseFloat(value) || 0,
    }));
  };

  const resetUsage = () => setUsage({});

  return (
    <div className="max-w-5xl py-10">
      <Card className="border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Pricing Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="w-48 text-sm text-gray-400">Subscription Tier:</span>
              <Select value={tier} onValueChange={(v) => setTier(v as keyof typeof TIER_LABELS)}>
                <SelectTrigger className="min-w-96 w-full">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TIER_LABELS).map((t) => (
                    <SelectItem key={t} value={t}>
                      {TIER_LABELS[t as keyof typeof TIER_LABELS]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={resetUsage}>
              Reset
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-700 text-left">
                  <th className="p-2 font-medium">Action</th>
                  <th className="p-2 font-medium">Description</th>
                  <th className="p-2 font-medium">Billing Unit</th>
                  <th className="p-2 font-medium">Cost / Unit (USD)</th>
                  <th className="p-2 font-medium text-center">Usage</th>
                  <th className="p-2 font-medium text-center">Cost (USD)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ACTION_COSTS_IN_TOKENS).map(([action, costs]) => {
                  const label = ACTION_COST_LABELS[action as keyof typeof ACTION_COST_LABELS] || { name: action, description: "", billingBasis: "" };
                  const perUnit = costs[tier] ?? 0;
                  const count = usage[action] ?? 0;
                  const cost = perUnit * count;

                  return (
                    <tr key={action} className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 font-medium">{label.name || action}</td>
                      <td className="p-2 text-gray-400 min-w-48">{label.description}</td>
                      <td className="p-2 min-w-24 text-gray-400">{label.billingBasis}</td>
                      <td className="p-2 min-w-24 text-center">{perUnit.toFixed(3)}</td>
                      <td className="p-2 min-w-36 text-center">
                        <Input
                          type="number"
                          step='0.01'
                          value={count || ""}
                          onChange={(e) => handleChange(action, e.target.value)}
                          placeholder="0"
                          className="w-full h-8"
                        />
                      </td>
                      <td className="p-2 w-36 text-center">{cost.toFixed(3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6 text-right">
            <div>
              <p className="text-lg font-medium text-gray-300">
                Estimated Total:{" USD "}
                <span className="text-xl font-semibold text-white text-right">
                  {totalCost.toFixed(3)}
                </span>
              </p>
              <p className="text-xs text-gray-500">Based on simulated usage and current tier rates.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
