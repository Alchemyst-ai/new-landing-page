"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        ACTION_COSTS_IN_TOKENS[pricingKey as keyof typeof ACTION_COSTS_IN_TOKENS]?.[
          tier
        ] ?? 0;
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
    <div className="w-full py-6">
      <Card className="border border-gray-700 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Pricing Calculator
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="w-48 text-sm text-gray-400">
                Subscription Tier:
              </span>
              <Select value={tier} onValueChange={(v) => setTier(v as Tier)}>
                <SelectTrigger className="min-w-96">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TIER_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={resetUsage}>
              Reset
            </Button>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="p-2 text-right">Action</th>
                <th className="p-2 text-right">Description</th>
                <th className="p-2 text-right">Billing Unit</th>
                <th className="p-2 text-right">Cost / Unit</th>
                <th className="p-2 text-right">Usage</th>
                <th className="p-2 text-right">Cost</th>
              </tr>
            </thead>

            <tbody>
              {DISPLAY_ACTIONS.map((action) => {
                const costs = ACTION_COSTS_IN_TOKENS[action];
                const label =
                  ACTION_COST_LABELS[action as keyof typeof ACTION_COST_LABELS];

                if (!costs || !label) return null;

                const perUnit = costs[tier];
                const count = usage[action] ?? 0;
                const cost = perUnit * count;

                return (
                  <tr
                    key={action}
                    className="border-b border-gray-800 hover:bg-gray-800/30"
                  >
                    <td className="p-2 text-right font-medium">{label.name}</td>
                    <td className="p-2 text-right text-gray-400">
                      {label.description}
                    </td>

                    <td className="p-2 text-right">
                      <span className="text-gray-400">{label.billingBasis}</span>
                    </td>

                    <td className="p-2 text-right">
                      {(perUnit * 1_000_000).toFixed(2)} per 1M
                    </td>

                    <td className="p-2 text-right w-40">
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={count || ""}
                        onChange={(e) => handleChange(action, e.target.value)}
                        className="h-8 text-right"
                      />
                    </td>

                    <td className="p-2 text-right">${cost.toFixed(4)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <p className="text-lg">
              Estimated Total:{" "}
              <span className="font-semibold">
                ${totalCost.toFixed(4)}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}