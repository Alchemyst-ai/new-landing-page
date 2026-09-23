// Compare template: every /compare/* detail page is built from this so the
// comparisons read as one consistent, premium document set. Text content
// lives in each page; this file owns layout, schema wiring and the closing
// CTA (the shared homepage CTA, reused verbatim).

import * as React from "react";
import ArticleSchema from "@/components/ArticleSchema";
import { PageHero, PageShell, Prose } from "@/components/page";
import { cn } from "@/lib/utils";

export { default as ComparisonTable } from "@/components/brand/ComparisonTable";

export function ComparePage({
  path,
  crumb,
  title,
  lead,
  headline,
  description,
  meta = "Last updated: June 2026",
  children,
}: {
  /** Route path, e.g. "/compare/alchemyst-ai-vs-mem0". */
  path: string;
  /** Visible breadcrumb label for this page. */
  crumb: string;
  /** Visible H1. */
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Article JSON-LD headline and description. */
  headline: string;
  description: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <PageShell cta>
      <ArticleSchema headline={headline} description={description} url={path} />
      <PageHero
        crumbs={[{ name: "Compare", path: "/compare" }, { name: crumb }]}
        currentPath={path}
        title={title}
        lead={lead}
        meta={meta}
      />
      <Prose>{children}</Prose>
    </PageShell>
  );
}

/** Highlighted note block (e.g. "Performance note"). */
export function Callout({
  label,
  children,
  className,
}: {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "not-prose relative my-10 overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-[#F8F4EE] px-6 py-5",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] bg-[#B45309]" />
      {label && (
        <p className="mb-2 flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
          <span aria-hidden className="h-[5px] w-[5px] bg-[#B45309]" />
          {label}
        </p>
      )}
      <div className="text-[0.9375rem] leading-[1.7] text-[#57534E] [&_strong]:text-[#4A3B33]">{children}</div>
    </aside>
  );
}
