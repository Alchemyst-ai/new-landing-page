// Status glyphs for comparison tables. Replaces ✅ / ⚠️ / ❌ emoji with
// on-brand marks that keep the same meaning (and expose it to assistive
// tech). <StatusText> converts a leading emoji inside a cell string.

import * as React from "react";

type Kind = "yes" | "partial" | "no";

const LABEL: Record<Kind, string> = { yes: "Yes", partial: "Partial", no: "No" };

export function Status({ kind }: { kind: Kind }) {
  return (
    <span className="mr-1.5 inline-flex translate-y-[2px] items-center" role="img" aria-label={LABEL[kind]}>
      {kind === "yes" && (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#B45309] text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      {kind === "partial" && (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-[#E4C090] bg-[#F8F4EE] text-[#A16207]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden>
            <path d="M6 12h12" />
          </svg>
        </span>
      )}
      {kind === "no" && (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-[#D6D3D1] bg-white text-[#A8A29E]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden>
            <path d="M7 7l10 10M17 7L7 17" />
          </svg>
        </span>
      )}
    </span>
  );
}

const MAP: [RegExp, Kind][] = [
  [/^\s*✅\uFE0F?\s*/, "yes"],
  [/^\s*⚠️?\uFE0F?\s*/, "partial"],
  [/^\s*❌\uFE0F?\s*/, "no"],
];

/** Render a table-cell string, turning a leading status emoji into a glyph. */
export function StatusText({ children }: { children: React.ReactNode }) {
  if (typeof children !== "string") return <>{children}</>;
  for (const [re, kind] of MAP) {
    if (re.test(children)) {
      const rest = children.replace(re, "");
      return (
        <>
          <Status kind={kind} />
          {rest}
        </>
      );
    }
  }
  return <>{children}</>;
}
