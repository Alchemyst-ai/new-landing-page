// /use-cases: what gets built on the context layer, grouped by the job each
// application leans on most. Five jobs, one API; every card shows its
// mixture of the five as HUD squares.

import { BrandButton, Chip, Eyebrow, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { MixtureLegend, UseCaseCard } from "@/components/use-cases";
import { JOBS, PLATFORM_TILES, useCasesForJob } from "@/lib/useCases";
import type { Metadata } from "next";
import Link from "next/link";

const PAGE_PATH = "/use-cases";
const SALES_CALL = "https://cal.com/uttaran-nayak-alchemyst/30min";
const DOCS = "https://docs.getalchemystai.com";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "What teams build on the Alchemyst AI context layer: customer support, finance and payments, edtech, healthcare, voice AI, assistant, sales, coding, research, legal and more, each a different mixture of five jobs: persistent memory, current context, traceable decisions, shared context and scoped retrieval.",
  keywords: [
    "AI agent use cases",
    "AI memory use cases",
    "context layer use cases",
    "persistent memory for AI agents",
    "multi-agent shared context",
    "auditable AI agents",
  ],
  alternates: { canonical: "https://getalchemystai.com/use-cases" },
};

export default function UseCasesPage() {
  return (
    <PageShell>
      <PageHero
        width="wide"
        crumbs={[{ name: "Use cases" }]}
        currentPath={PAGE_PATH}
        eyebrow="Use cases"
        title={
          <>
            The application changes. <span className="italic text-[#B45309]">The context layer doesn&apos;t.</span>
          </>
        }
        titleClassName="max-w-[22ch]"
        lead="Everything below runs on the same API, in a different mixture of the same five jobs. That mixture is what makes a support desk a different piece of software from a coding agent, and it is the reason context is infrastructure rather than a feature."
      >
        <nav aria-label="Jobs" className="flex flex-col gap-6">
          <ol className="flex flex-wrap gap-2.5">
            {JOBS.map((job) => (
              <li key={job.id}>
                <a
                  href={`#${job.id}`}
                  className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-3.5 py-2 text-[0.875rem] font-bold text-[#4A3B33] shadow-[var(--shadow-soft)] transition-[border-color,color,transform] duration-200 hover:-translate-y-px hover:border-[#E4C090] hover:text-[#B45309]"
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#B45309]">{job.num}</span>
                  {job.name}
                </a>
              </li>
            ))}
          </ol>
          <MixtureLegend />
        </nav>
      </PageHero>

      {JOBS.map((job, i) => {
        const cases = useCasesForJob(job.id);
        return (
          <Section key={job.id} id={job.id} tone={i % 2 === 0 ? "paper" : "sand"} bordered className="scroll-mt-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <FadeUp standalone className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow className="mb-6">
                    {job.num} · {cases.length} use cases
                  </Eyebrow>
                  <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-[1.14] tracking-[-0.028em] text-[#4A3B33] text-balance">
                    {job.name}
                  </h2>
                  <p className="mb-6 max-w-[40ch] text-[1rem] leading-[1.75] text-[#57534E]">{job.summary}</p>
                  <Chip>{job.primitive}</Chip>
                </div>
              </FadeUp>

              <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                {cases.map((uc) => (
                  <FadeUp key={uc.slug} className="h-full">
                    <UseCaseCard uc={uc} />
                  </FadeUp>
                ))}
              </Stagger>
            </div>
          </Section>
        );
      })}

      <Section tone="sand" bordered id="platform">
        <SectionHeader
          eyebrow="In every use case"
          title="What the context layer gives every agent"
          lead="Whichever job leads, the same capabilities sit underneath: memory, sync, tooling and agents that act on context."
        />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_TILES.map((t, i) => (
            <FadeUp key={t.title} className="flex">
              <SpecCard
                as="article"
                interactive={!!t.href}
                className="relative flex w-full flex-col p-7"
              >
                <span className="mb-6 flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#B45309]">
                  <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                  {t.href ? (
                    <Link href={t.href} className="after:absolute after:inset-0">
                      {t.title}
                    </Link>
                  ) : (
                    t.title
                  )}
                </h3>
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{t.body}</p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      <Section tone="dark" grid>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FadeUp standalone className="mb-7">
              <Eyebrow>Don&apos;t see yours?</Eyebrow>
            </FadeUp>
            <RevealText
              as="h2"
              className="mb-6 text-[clamp(1.875rem,3.8vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#F5F5F4] text-balance"
            >
              It is probably one of the five.
            </RevealText>
            <FadeUp standalone delay={0.15}>
              <p className="max-w-[40rem] text-[1.0625rem] leading-[1.75] text-[#A8A29E]">
                The applications differ. The jobs underneath them do not. Tell us what you are building and which
                one it leans on, and we will show you the mixture.
              </p>
            </FadeUp>
          </div>
          <FadeUp standalone delay={0.2} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <BrandButton href={SALES_CALL} external arrow>
              Talk to us
            </BrandButton>
            <BrandButton href={DOCS} variant="outline-dark" external>
              Read the docs
            </BrandButton>
          </FadeUp>
        </div>
      </Section>
    </PageShell>
  );
}
