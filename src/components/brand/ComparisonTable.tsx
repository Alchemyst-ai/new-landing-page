// ComparisonTable: the one table design for every comparison on the site.
// Hairline card, mono header row, the Alchemyst column tinted and ruled in
// amber, status emoji rendered as brand glyphs. Scrolls sideways on small
// screens instead of crushing columns. Opts out of prose styling.

import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusText } from "./Status";

export default function ComparisonTable({
  columns,
  rows,
  highlight,
  className,
}: {
  columns: React.ReactNode[];
  rows: React.ReactNode[][];
  /** Column index to highlight (defaults to the first column whose header mentions Alchemyst). */
  highlight?: number;
  className?: string;
}) {
  const hi =
    highlight ??
    columns.findIndex((c) => typeof c === "string" && /alchemyst/i.test(c));
  return (
    <div
      className={cn(
        "not-prose relative my-10 overflow-x-auto rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-[0.9rem] leading-[1.55]">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                scope="col"
                className={cn(
                  "border-b px-5 py-4 align-bottom font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em]",
                  i === hi
                    ? "border-b-[#B45309] bg-[#FBF4EA] text-[#B45309]"
                    : "border-b-[#E4D9BC] bg-[#F8F4EE] text-[#78716C]",
                )}
              >
                {i === hi && <span aria-hidden className="mr-2 inline-block h-[6px] w-[6px] -translate-y-px bg-[#B45309]" />}
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="group/row">
              {row.map((cell, i) => {
                const Tag = i === 0 ? "th" : "td";
                return (
                  <Tag
                    key={i}
                    scope={i === 0 ? "row" : undefined}
                    className={cn(
                      "px-5 py-4 align-top transition-colors duration-200",
                      r < rows.length - 1 && "border-b border-[#F1E9DA]",
                      i === 0 ? "font-bold text-[#4A3B33] group-hover/row:bg-[#FDFBF7]" : "text-[#57534E] group-hover/row:bg-[#FDFBF7]",
                      i === hi && "bg-[#FDF8F0] text-[#4A3B33] group-hover/row:bg-[#FBF1E4]",
                    )}
                  >
                    <StatusText>{cell}</StatusText>
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
