"use client";

// CodeBlock: editor-chrome code surface with a small, safe tokenizer that
// returns React nodes (no dangerouslySetInnerHTML). Palette stays in the warm
// amber family: keywords deep amber, SDK handles primary amber, strings
// umber, comments muted stone.

import * as React from "react";
import { cn } from "@/lib/utils";

const KEYWORDS = new Set([
  "const", "let", "var", "await", "async", "new", "return", "import", "from", "export",
  "function", "if", "else", "true", "false", "null", "undefined", "def", "for", "in",
  "npm", "pip", "install", "npx", "export",
]);
const HANDLES = new Set(["alchemyst", "ctx", "Alchemyst", "AlchemystAI"]);

type Tok = { t: "c" | "s" | "k" | "h" | "n" | "p" | "x"; v: string };

function tokenize(line: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < line.length) {
    const rest = line.slice(i);
    // Comments: // ... or # ... (shell / python) at start or after whitespace.
    if (rest.startsWith("//") || (rest.startsWith("#") && (i === 0 || /\s/.test(line[i - 1])))) {
      out.push({ t: "c", v: rest });
      break;
    }
    const q = rest[0];
    if (q === '"' || q === "'" || q === "`") {
      let j = 1;
      while (j < rest.length && rest[j] !== q) j += rest[j] === "\\" ? 2 : 1;
      out.push({ t: "s", v: rest.slice(0, j + 1) });
      i += j + 1;
      continue;
    }
    const word = /^[A-Za-z_$][\w$]*/.exec(rest);
    if (word) {
      const w = word[0];
      out.push({ t: KEYWORDS.has(w) ? "k" : HANDLES.has(w) ? "h" : "x", v: w });
      i += w.length;
      continue;
    }
    const num = /^\d[\d._]*/.exec(rest);
    if (num) {
      out.push({ t: "n", v: num[0] });
      i += num[0].length;
      continue;
    }
    out.push({ t: /[{}()[\];,.:=<>+\-*/|&!?]/.test(q) ? "p" : "x", v: q });
    i += 1;
  }
  return out;
}

const COLORS_LIGHT: Record<Tok["t"], string> = {
  c: "text-[#A8A29E] italic",
  s: "text-[#78350F]",
  k: "text-[#A16207] font-semibold",
  h: "text-[#B45309] font-semibold",
  n: "text-[#B45309]",
  p: "text-[#A8A29E]",
  x: "text-[#4A3B33]",
};
const COLORS_DARK: Record<Tok["t"], string> = {
  c: "text-[#78716C] italic",
  s: "text-[#F2DABA]",
  k: "text-[#E4C090] font-semibold",
  h: "text-[#F5F5F4] font-semibold",
  n: "text-[#E4C090]",
  p: "text-[#78716C]",
  x: "text-[#D6D3D1]",
};

export function highlight(code: string, tone: "light" | "dark" = "light") {
  const C = tone === "dark" ? COLORS_DARK : COLORS_LIGHT;
  return code.split("\n").map((line, li) => (
    <span key={li} className="block min-h-[1.6em]">
      {tokenize(line).map((tok, ti) => (
        <span key={ti} className={C[tok.t]}>
          {tok.v}
        </span>
      ))}
    </span>
  ));
}

export default function CodeBlock({
  code,
  label,
  tone = "light",
  chrome = true,
  className,
  wrap = false,
}: {
  code: string;
  /** Optional existing label (e.g. the heading it belongs to). */
  label?: string;
  tone?: "light" | "dark";
  chrome?: boolean;
  className?: string;
  wrap?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);
  const dark = tone === "dark";
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable: ignore */
    }
  };
  return (
    <div
      className={cn(
        "group/code relative overflow-hidden rounded-[var(--radius)] border",
        dark ? "bg-[#161413] border-white/[0.08]" : "bg-[#FBF8F2] border-[#E4D9BC]",
        className,
      )}
    >
      {chrome && (
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b px-4 py-2.5",
            dark ? "border-white/[0.06]" : "border-[#EFE6D6]",
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span aria-hidden className="flex gap-1.5">
              {[0, 1, 2].map((k) => (
                <span key={k} className={cn("h-2 w-2 rounded-full", dark ? "bg-white/[0.12]" : "bg-[#E4D9BC]")} />
              ))}
            </span>
            {label && (
              <span className={cn("truncate font-mono text-[10px] uppercase tracking-[0.14em]", dark ? "text-[#A8A29E]" : "text-[#78716C]")}>
                {label}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className={cn(
              "inline-flex h-6 w-6 items-center justify-center rounded-[var(--radius)] transition-colors",
              dark ? "text-[#78716C] hover:text-[#E4C090] hover:bg-white/[0.05]" : "text-[#A8A29E] hover:text-[#B45309] hover:bg-[#F1E9DA]",
            )}
          >
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            )}
          </button>
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.6]",
          wrap ? "whitespace-pre-wrap" : "whitespace-pre",
        )}
      >
        <code>{highlight(code, tone)}</code>
      </pre>
    </div>
  );
}
