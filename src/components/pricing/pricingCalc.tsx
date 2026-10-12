"use client";

// PricingCalculator: pick a tier, enter expected usage per billed action, read
// the estimate. The arithmetic is unchanged from the original calculator:
// cost = configured base rate x usage. The Cost / Unit column shows the base
// rate multiplied by 1,000,000 ("per 1M"), exactly as the rate card does.

import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ACTION_COSTS_IN_TOKENS,
  ACTION_COST_LABELS,
  DISPLAY_ACTIONS,
  TIERS,
  TIER_ORDER,
  formatRate,
  formatUsd,
  type DisplayAction,
  type Tier,
} from "@/lib/pricing";

export { ACTION_COSTS_IN_TOKENS, ACTION_COST_LABELS } from "@/lib/pricing";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

function tierCaption(tier: Tier) {
  const t = TIERS[tier];
  return t.unlockAt === 0 ? `Free up to ${formatUsd(t.freeUsage ?? 0)}` : `${formatUsd(t.unlockAt)} monthly spend`;
}

export default function PricingCalculator() {
  const groupName = useId();
  const [tier, setTier] = useState<Tier>("b2c");
  // Raw input strings, so partial entries such as "0." stay editable.
  const [raw, setRaw] = useState<Partial<Record<DisplayAction, string>>>({});

  const usage = useMemo(() => {
    const out: Partial<Record<DisplayAction, number>> = {};
    for (const action of DISPLAY_ACTIONS) {
      out[action] = Math.max(parseFloat(raw[action] ?? "") || 0, 0);
    }
    return out;
  }, [raw]);

  const totals = useMemo(() => {
    const out = {} as Record<Tier, number>;
    for (const t of TIER_ORDER) {
      out[t] = DISPLAY_ACTIONS.reduce(
        (acc, action) => acc + ACTION_COSTS_IN_TOKENS[action][t] * (usage[action] ?? 0),
        0,
      );
    }
    return out;
  }, [usage]);

  const hasUsage = DISPLAY_ACTIONS.some((a) => (usage[a] ?? 0) > 0);

  return (
    <div className="rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)]">
      {/* Tier selector */}
      <div className="flex flex-col gap-5 border-b border-[#E4D9BC] p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p id={`${groupName}-label`} className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
            Tier
          </p>
          <button
            type="button"
            onClick={() => setRaw({})}
            disabled={!hasUsage}
            className="rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-3.5 py-1.5 text-[0.8125rem] font-bold text-[#57534E] shadow-[var(--shadow-soft)] transition-[transform,border-color,color,box-shadow] duration-200 hover:-translate-y-px hover:border-[#B45309]/50 hover:text-[#4A3B33] hover:shadow-[var(--shadow-soft-lg)] disabled:pointer-events-none disabled:opacity-50"
          >
            Reset
          </button>
        </div>
        <div role="radiogroup" aria-labelledby={`${groupName}-label`} className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {TIER_ORDER.map((t) => {
            const active = t === tier;
            return (
              <label
                key={t}
                className={cn(
                  "relative flex cursor-pointer flex-col gap-1.5 rounded-[var(--radius)] border px-4 py-3.5 transition-[border-color,background-color] duration-200",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#B45309]/30",
                  active ? "border-[#B45309] bg-[#FDF8F0]" : "border-[#E4D9BC] bg-white hover:border-[#E4C090]",
                )}
              >
                <input
                  type="radio"
                  name={groupName}
                  value={t}
                  checked={active}
                  onChange={() => setTier(t)}
                  className="sr-only"
                />
                <span className="flex items-center gap-2 text-[0.9375rem] font-bold tracking-[-0.01em] text-[#4A3B33]">
                  <span aria-hidden className={cn("h-[7px] w-[7px] transition-colors", active ? "bg-[#B45309]" : "bg-[#E4D9BC]")} />
                  {TIERS[t].name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#78716C]">{tierCaption(t)}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Usage table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-[0.9rem]">
          <thead>
            <tr>
              {["Action", "Unit", "Cost / Unit", "Usage", "Cost"].map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={cn(
                    "border-b border-[#E4D9BC] bg-[#F8F4EE] px-5 py-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em]",
                    h === "Cost / Unit" ? "text-[#B45309]" : "text-[#78716C]",
                    i === 4 && "text-right",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISPLAY_ACTIONS.map((action, r) => {
              const label = ACTION_COST_LABELS[action];
              const cost = ACTION_COSTS_IN_TOKENS[action][tier] * (usage[action] ?? 0);
              const inputId = `${groupName}-${action}`;
              return (
                <tr key={action} className="group/row">
                  <th
                    scope="row"
                    className={cn(
                      "px-5 py-4 align-middle font-normal transition-colors group-hover/row:bg-[#FDFBF7]",
                      r < DISPLAY_ACTIONS.length - 1 && "border-b border-[#F1E9DA]",
                    )}
                  >
                    <label htmlFor={inputId} className="block text-[0.9375rem] font-bold leading-[1.4] text-[#4A3B33]">
                      {label.name}
                    </label>
                    <span className="mt-0.5 block text-[0.8125rem] leading-[1.5] text-[#78716C]">{label.description}</span>
                  </th>
                  <td className={cn("px-5 py-4 align-middle transition-colors group-hover/row:bg-[#FDFBF7]", r < DISPLAY_ACTIONS.length - 1 && "border-b border-[#F1E9DA]")}>
                    <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
                      {label.billingBasis}
                    </span>
                  </td>
                  <td className={cn("px-5 py-4 align-middle transition-colors group-hover/row:bg-[#FDFBF7]", r < DISPLAY_ACTIONS.length - 1 && "border-b border-[#F1E9DA]")}>
                    <span className="whitespace-nowrap font-mono text-[13px] font-medium tabular-nums text-[#B45309]">
                      {formatRate(action, tier)} <span className="text-[#A8A29E]">per 1M</span>
                    </span>
                  </td>
                  <td className={cn("w-40 px-5 py-4 align-middle transition-colors group-hover/row:bg-[#FDFBF7]", r < DISPLAY_ACTIONS.length - 1 && "border-b border-[#F1E9DA]")}>
                    <input
                      id={inputId}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      placeholder="0"
                      value={raw[action] ?? ""}
                      onChange={(e) => setRaw((prev) => ({ ...prev, [action]: e.target.value }))}
                      className="h-9 w-full rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-3 font-mono text-[13px] tabular-nums text-[#4A3B33] placeholder-[#A8A29E] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#B45309]/60 focus:shadow-[0_0_0_3px_rgba(180,83,9,0.12)]"
                    />
                  </td>
                  <td className={cn("px-5 py-4 text-right align-middle transition-colors group-hover/row:bg-[#FDFBF7]", r < DISPLAY_ACTIONS.length - 1 && "border-b border-[#F1E9DA]")}>
                    <span className="font-mono text-[13px] font-medium tabular-nums text-[#4A3B33]">{money.format(cost)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex flex-col gap-2 border-t border-[#E4D9BC] bg-[#FDF8F0] px-6 py-6 sm:flex-row sm:items-end sm:justify-between md:px-8">
        <p className="flex items-center gap-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
          <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
          Estimated total · {TIERS[tier].name}
        </p>
        <p
          aria-live="polite"
          className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-none tracking-[-0.03em] tabular-nums text-[#B45309]"
        >
          {money.format(totals[tier])}
        </p>
      </div>

      {/* Same usage, every tier */}
      <div className="border-t border-[#E4D9BC] px-6 py-6 md:px-8">
        <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
          Same usage on every tier
        </p>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-[#E4D9BC] md:grid-cols-4">
          {TIER_ORDER.map((t) => (
            <div
              key={t}
              className={cn("flex flex-col gap-1.5 px-4 py-4", t === tier ? "bg-[#FDF8F0]" : "bg-white")}
            >
              <dt
                className={cn(
                  "order-2 font-mono text-[10px] uppercase tracking-[0.14em]",
                  t === tier ? "text-[#B45309]" : "text-[#78716C]",
                )}
              >
                {TIERS[t].name}
              </dt>
              <dd
                className={cn(
                  "order-1 text-[1.0625rem] tracking-[-0.01em] tabular-nums",
                  t === tier ? "font-bold text-[#4A3B33]" : "text-[#57534E]",
                )}
              >
                {money.format(totals[t])}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
