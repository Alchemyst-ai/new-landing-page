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

const BYTES_PER_MB = 1000 * 1000;
const CHARS_PER_TOKEN = 3;
const TOKENS_PER_MB = BYTES_PER_MB / CHARS_PER_TOKEN;
const M_TOKENS_PER_MB = TOKENS_PER_MB / 1000 * 1000;

type Tier = "b2c" | "tier1" | "tier2" | "tier3";
type ContextUnit = "token" | "mb";

export const ACTION_COSTS_IN_TOKENS = {
  "genai.chat.generate": {
    tier1: 15,
    tier2: 13,
    tier3: 10,
    b2c: 20,
  },
  "genai.proxy.openai.chat.completions": {
    tier1: 15,
    tier2: 13,
    tier3: 10,
    b2c: 20,
  },
  "genai.chat.web_search": {
    tier1: 40,
    tier2: 37,
    tier3: 30,
    b2c: 45,
  },

  "context.upload.mb": {
    tier1: 1 / 10,
    tier2: 8 / 100,
    tier3: 3 / 100,
    b2c: 2 / 10,
  },
  "context.search.mb": {
    tier1: 5 / 1000,
    tier2: 45 / 10000,
    tier3: 3 / 1000,
    b2c: 7 / 1000,
  },

  "context.upload": {
    tier1: (1 / 10) * M_TOKENS_PER_MB,
    tier2: (8 / 100) * M_TOKENS_PER_MB,
    tier3: (3 / 100) * M_TOKENS_PER_MB,
    b2c: (2 / 10) * M_TOKENS_PER_MB,
  },
  "context.search": {
    tier1: (5 / 1000) * M_TOKENS_PER_MB,
    tier2: (45 / 10000) * M_TOKENS_PER_MB,
    tier3: (3 / 1000) * M_TOKENS_PER_MB,
    b2c: (7 / 1000) * M_TOKENS_PER_MB,
  },
};

export const ACTION_COST_LABELS = {
  "context.upload": {
    name: "Context Upload",
    description: "Upload organization context",
    billingBasis: "Tokens / MB",
  },
  "context.search": {
    name: "Context Search",
    description: "Search through organizational contexts",
    billingBasis: "Tokens / MB",
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

const CONTEXT_ACTIONS = ["context.upload", "context.search"] as const;

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
  const [contextUnits, setContextUnits] = useState<
    Record<string, ContextUnit>
  >({
    "context.upload": "token",
    "context.search": "token",
  });

  const getPricingKey = (action: string) => {
    if (!CONTEXT_ACTIONS.includes(action as any)) return action;
    return contextUnits[action] === "mb" ? `${action}.mb` : action;
  };

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
    const pricingKey = getPricingKey(action);
    setUsage((prev) => ({
      ...prev,
      [pricingKey]: Math.max(parseFloat(value) || 0, 0),
    }));
  };

  const resetUsage = () => setUsage({});

  return (
    <div className="w-full py-6">
      <Card className="border border-gray-700">
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
                const pricingKey = getPricingKey(action);
                const costs =
                  ACTION_COSTS_IN_TOKENS[
                    pricingKey as keyof typeof ACTION_COSTS_IN_TOKENS
                  ];
                const label =
                  ACTION_COST_LABELS[action as keyof typeof ACTION_COST_LABELS];

                const perUnit = costs[tier];
                const count = usage[pricingKey] ?? 0;
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

                    {/* billing unit dropdown only for context */}
                    <td className="p-2 text-right">
                      {CONTEXT_ACTIONS.includes(action as any) ? (
                        <Select
                          value={contextUnits[action]}
                          onValueChange={(v) =>
                            setContextUnits((prev) => ({
                              ...prev,
                              [action]: v as ContextUnit,
                            }))
                          }
                        >
                          <SelectTrigger className="h-8 w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="token">1M Tokens</SelectItem>
                            <SelectItem value="mb">MB</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-gray-400">
                          {label.billingBasis}
                        </span>
                      )}
                    </td>

                    <td className="p-2 text-right">
                      {perUnit.toFixed(
                        CONTEXT_ACTIONS.includes(action as any) ? 8 : 3
                      )}
                    </td>

                    <td className="p-2 text-right w-40">
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={count || ""}
                        onChange={(e) =>
                          handleChange(action, e.target.value)
                        }
                        className="h-8 text-right"
                      />
                    </td>

                    <td className="p-2 text-right">{cost.toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <p className="text-lg">
              Estimated Total:{" "}
              <span className="font-semibold">
                {totalCost.toFixed(3)} USD
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
