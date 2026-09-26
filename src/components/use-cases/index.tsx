// Use-case building blocks, shared by /use-cases and /use-cases/[slug].
// Server-safe (no hooks). The "mixture" is the signature element: every use
// case is the same five jobs in a different proportion, drawn as HUD squares
// (index cards) or segmented bars (detail hero).

import Link from "next/link";
import { Arrow } from "@/components/brand";
import { JOB_BY_ID, mixtureOf, useCasePath, type UseCase, type Weight } from "@/lib/useCases";
import { cn } from "@/lib/utils";

const WEIGHT_LABEL: Record<Weight, string> = { lead: "Leads", uses: "Uses", light: "Light" };

const SQUARE: Record<Weight, string> = {
  lead: "bg-[#B45309] border-[#B45309]",
  uses: "bg-[#E4C090] border-[#E4C090]",
  light: "bg-transparent border-[#D6CBB0]",
};

/** Five tiny squares, one per job, in canonical order. */
export function MixtureDots({ uc, className }: { uc: UseCase; className?: string }) {
  const mix = mixtureOf(uc);
  return (
    <span
      role="img"
      aria-label={`Leads with ${JOB_BY_ID[uc.job].name.toLowerCase()}`}
      className={cn("inline-flex items-center gap-[3px]", className)}
    >
      {mix.map((m) => (
        <span key={m.job.id} aria-hidden className={cn("h-[7px] w-[7px] border", SQUARE[m.weight])} />
      ))}
    </span>
  );
}

/** Legend for MixtureDots. */
export function MixtureLegend({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#78716C]", className)}>
      {(["lead", "uses", "light"] as Weight[]).map((w) => (
        <span key={w} className="inline-flex items-center gap-2">
          <span aria-hidden className={cn("h-[7px] w-[7px] border", SQUARE[w])} />
          {WEIGHT_LABEL[w]}
        </span>
      ))}
    </span>
  );
}

/** Detail-page mixture: one column per job with a three-segment bar. */
export function MixtureStrip({ uc, className }: { uc: UseCase; className?: string }) {
  const mix = mixtureOf(uc);
  const filled: Record<Weight, number> = { lead: 3, uses: 2, light: 0 };
  return (
    <dl className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-[#E4D9BC] sm:grid-cols-5", className)}>
      {mix.map((m) => (
        <div key={m.job.id} className={cn("flex flex-col gap-3 bg-white px-4 py-4", m.weight === "lead" && "bg-[#FBF6EC]")}>
          <dt className="font-mono text-[9.5px] uppercase leading-[1.4] tracking-[0.14em] text-[#78716C]">
            {m.job.num} · {m.job.name}
          </dt>
          <dd className="flex items-center justify-between gap-3">
            <span aria-hidden className="flex flex-1 gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-[4px] flex-1",
                    i < filled[m.weight] ? (m.weight === "lead" ? "bg-[#B45309]" : "bg-[#E4C090]") : "bg-[#EFE6D6]",
                  )}
                />
              ))}
            </span>
            <span
              className={cn(
                "font-mono text-[10px] font-semibold uppercase tracking-[0.12em]",
                m.weight === "lead" ? "text-[#B45309]" : m.weight === "uses" ? "text-[#57534E]" : "text-[#A8A29E]",
              )}
            >
              {WEIGHT_LABEL[m.weight]}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Link card for a single use case. */
export function UseCaseCard({
  uc,
  showJob = false,
  className,
}: {
  uc: UseCase;
  /** Show the leading job as a mono label (cross-links) instead of the tagline. */
  showJob?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={useCasePath(uc.slug)}
      className={cn(
        "group group/btn relative flex h-full flex-col rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-6 shadow-[var(--shadow-soft)]",
        "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[3px] hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)]",
        className,
      )}
    >
      <span className="mb-4 flex items-center justify-between gap-4">
        <MixtureDots uc={uc} />
        <Arrow className="text-[#A8A29E] transition-colors duration-300 group-hover:text-[#B45309]" />
      </span>
      <span className="mb-2 text-[1rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33] sm:text-[1.125rem]">{uc.name}</span>
      {showJob ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A16207]">
          {JOB_BY_ID[uc.job].name}
        </span>
      ) : (
        <span className="text-[0.9375rem] italic leading-[1.6] text-[#57534E]">{uc.tagline}</span>
      )}
    </Link>
  );
}
