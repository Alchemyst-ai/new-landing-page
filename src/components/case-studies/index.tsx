// Case study primitives shared by /case-study and /case-study/[slug].

import { Arrow, SpecCard } from "@/components/brand";
import { type CaseStudy, caseStudyPath } from "@/lib/caseStudies";
import { cn } from "@/lib/utils";
import Link from "next/link";

/** Headline metric: big amber figure over a mono caption. */
export function HeroMetric({ cs, className }: { cs: CaseStudy; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em] text-[#B45309] tabular-nums">
        {cs.heroMetric}
      </span>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4A3B33]">
        {cs.heroMetricLabel}
      </span>
    </div>
  );
}

export function CaseStudyCard({
  cs,
  index,
  compact = false,
  className,
}: {
  cs: CaseStudy;
  index?: number;
  /** Drop the summary paragraph (used in the "more case studies" grid). */
  compact?: boolean;
  className?: string;
}) {
  return (
    <SpecCard as="article" className={cn("flex h-full flex-col p-7", className)}>
      <span className="mb-8 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
        <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
        {index !== undefined && `${String(index + 1).padStart(2, "0")} · `}
        {cs.shortLabel}
      </span>
      <HeroMetric cs={cs} className="mb-8" />
      <h3 className="mb-2 text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
        <Link href={caseStudyPath(cs.slug)} className="after:absolute after:inset-0">
          {cs.industry}
        </Link>
      </h3>
      <p className="mb-4 text-[0.9375rem] italic leading-[1.6] text-[#B45309]">{cs.tagline}</p>
      {!compact && <p className="mb-6 line-clamp-4 text-[0.9375rem] leading-[1.7] text-[#57534E]">{cs.tldr}</p>}
      <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold tracking-wide text-[#B45309] group-hover:text-[#A16207]">
        Read the case study
        <Arrow className="group-hover:translate-x-[3px]" />
      </span>
    </SpecCard>
  );
}
