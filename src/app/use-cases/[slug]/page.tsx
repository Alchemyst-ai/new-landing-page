// /use-cases/[slug]: one application on the context layer. Hero with the
// five-job mixture, what breaks without it, then a numbered run of sections:
// what it does, performance, what it is made of, where it applies, what feeds
// it (three SDK calls), what it costs, where it runs, FAQs and the other use
// cases (optional ones drop out), and a dark closing chapter.

import type * as React from "react";
import ArticleSchema from "@/components/ArticleSchema";
import { BrandButton, Chip, Eyebrow, Section, SpecCard } from "@/components/brand";
import CodeBlock from "@/components/brand/CodeBlock";
import ComparisonTable from "@/components/brand/ComparisonTable";
import SectionHeader from "@/components/brand/SectionHeader";
import { DrawLine, FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { MixtureStrip, UseCaseCard } from "@/components/use-cases";
import {
  JOB_BY_ID,
  TOKEN_COMPARISON,
  USE_CASES,
  USE_CASE_BY_SLUG,
  ingestCode,
  lightJobOf,
  recallCode,
  useCasePath,
  useCasesForJob,
} from "@/lib/useCases";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL = "https://getalchemystai.com";
const SALES_CALL = "https://cal.com/uttaran-nayak-alchemyst/30min";
const PLATFORM = "https://platform.getalchemystai.com";
const DOCS = "https://docs.getalchemystai.com";

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const uc = USE_CASE_BY_SLUG[slug];
  if (!uc) return { title: "Use case not found" };
  const url = `${SITE_URL}${useCasePath(slug)}`;
  return {
    title: `${uc.name}: ${uc.tagline}`,
    description: uc.description,
    alternates: { canonical: url },
    openGraph: { title: uc.title, description: uc.description, url, type: "article" },
    twitter: { card: "summary_large_image", title: uc.title, description: uc.description },
  };
}

const DEPLOYMENTS: { title: string; body: string; tag?: string }[] = [
  {
    title: "Managed cloud",
    body: "Encrypted in transit and at rest, isolated per organization, and scoped at write time.",
  },
  {
    title: "Dedicated infrastructure",
    body: "Single-tenant, with VPC peering when your data cannot share a network boundary.",
    tag: "Enterprise",
  },
  {
    title: "Self-hosted",
    body: "Run the context layer on your own infrastructure, with OpenTelemetry for observability.",
    tag: "On-premise",
  },
];

/** CodeBlock label for a hand-written sample: the SDK call it demonstrates. */
function methodOf(code: string): string {
  if (code.includes("memory.add")) return "context.memory.add";
  if (code.includes("traces.list")) return "context.traces.list";
  if (code.includes("context.delete")) return "context.delete → context.add";
  return "context.add";
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const uc = USE_CASE_BY_SLUG[slug];
  if (!uc) notFound();

  const path = useCasePath(uc.slug);
  const lead = JOB_BY_ID[uc.job];
  const light = lightJobOf(uc);
  const lightLeaders = useCasesForJob(light.id).slice(0, 3);
  const others = USE_CASES.filter((u) => u.slug !== uc.slug);

  const steps = [
    {
      title: "Scope what you ingest",
      body: "Every document lands with a groupName: the sets it belongs to. Those sets are what retrieval intersects later, so the structure you choose here is the precision you get there.",
      label: "Ingest",
      method: "context.add",
      code: ingestCode(uc),
    },
    { title: uc.write.title, body: uc.write.body, label: "Write", method: methodOf(uc.write.code), code: uc.write.code },
    {
      title: `Search before ${uc.recall.verb}`,
      body: "Search intersects the scopes, subtracts superseded and duplicate content, and ranks what survives. Only that reaches the model, and the whole decision is recorded as a Context Trace.",
      label: "Search",
      method: "context.search",
      code: recallCode(uc),
    },
  ];


  const faqJsonLd = uc.faqs && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: uc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  /* Sections render in this order; optional ones drop out, and the survivors
     are numbered and toned (sand / paper) in sequence. */
  type Block = { key: string; eyebrow: string; render: (eyebrow: string) => React.ReactNode };
  const blocks: (Block | false | undefined)[] = [
    uc.capabilities && {
      key: "capabilities",
      eyebrow: "What it does",
      render: (eyebrow) => {
        const c = uc.capabilities!;
        return (
          <>
            <SectionHeader eyebrow={eyebrow} title={c.title} lead={c.lead} />
            <Stagger
              className={cn(
                "grid grid-cols-1 gap-5 md:grid-cols-2",
                c.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4",
              )}
            >
              {c.items.map((item, i) => (
                <FadeUp key={item.title} className="flex">
                  <SpecCard className="flex w-full flex-col p-7">
                    <span className="mb-6 flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#B45309]">
                      <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-3 text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">{item.title}</h3>
                    <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{item.body}</p>
                  </SpecCard>
                </FadeUp>
              ))}
            </Stagger>
          </>
        );
      },
    },
    uc.benchmarks && {
      key: "benchmarks",
      eyebrow: "Performance",
      render: (eyebrow) => {
        const b = uc.benchmarks!;
        return (
          <>
            <SectionHeader eyebrow={eyebrow} title={b.title} lead={b.lead} />
            <FadeUp standalone>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-[#E4D9BC] lg:grid-cols-4">
                {b.stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-2 bg-white px-6 py-7">
                    <dd className="order-1 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-[#B45309] tabular-nums">
                      {s.value}
                    </dd>
                    <dt className="order-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4A3B33]">{s.label}</dt>
                    <p className="order-3 text-[0.875rem] leading-[1.6] text-[#78716C]">{s.note}</p>
                  </div>
                ))}
              </dl>
            </FadeUp>
            {b.comparison && (
              <FadeUp standalone>
                <ComparisonTable className="mb-0 mt-8" columns={b.comparison.columns} rows={b.comparison.rows} />
              </FadeUp>
            )}
          </>
        );
      },
    },
    {
      key: "made-of",
      eyebrow: "What it's made of",
      render: (eyebrow) => (
        <>
          <SectionHeader
            eyebrow={eyebrow}
            title={
              <>
                Mostly <span className="italic text-[#B45309]">{`${lead.name.toLowerCase()}.`}</span> Then three others.
              </>
            }
            lead="Every application on Alchemyst is a different mixture of the same five jobs. That mixture is what makes this a different piece of software from the one next to it, even though the API underneath is identical."
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <FadeUp standalone className="flex lg:col-span-6">
              <SpecCard interactive={false} className="flex w-full flex-col overflow-hidden p-8 md:p-10">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-[#B45309]" />
                <Eyebrow className="mb-6">Leads · {lead.name}</Eyebrow>
                <h3 className="mb-4 text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.02em] text-[#4A3B33] text-balance">
                  {lead.headline}
                </h3>
                <p className="mb-8 text-[1rem] leading-[1.75] text-[#57534E]">{uc.dominant.body}</p>
                <ul className="mt-auto border-t border-[#F1E9DA]">
                  {uc.dominant.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 border-b border-[#F1E9DA] py-3.5 text-[0.9375rem] text-[#4A3B33]">
                      <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-[#B45309]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </SpecCard>
            </FadeUp>

            <Stagger className="grid grid-cols-1 gap-5 lg:col-span-6">
              {uc.support.map((s) => (
                <FadeUp key={s.job} className="flex">
                  <SpecCard interactive={false} className="w-full p-7">
                    <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A16207]">
                      <span aria-hidden className="h-[5px] w-[5px] bg-[#E4C090]" />
                      Uses · {JOB_BY_ID[s.job].name}
                    </p>
                    <h3 className="mb-2 text-[1.125rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">{s.title}</h3>
                    <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{s.body}</p>
                  </SpecCard>
                </FadeUp>
              ))}
            </Stagger>
          </div>

          <FadeUp standalone>
            <p className="mt-10 max-w-[72ch] text-[1rem] leading-[1.8] text-[#57534E]">
              That is four of the five. The fifth, <strong className="text-[#4A3B33]">{light.name.toLowerCase()}</strong>{" "}
              ({light.summary.charAt(0).toLowerCase() + light.summary.slice(1, -1)}), is what leads in{" "}
              {lightLeaders.map((u, i) => (
                <span key={u.slug}>
                  <Link href={useCasePath(u.slug)} className="link-brand">
                    {u.name}
                  </Link>
                  {i < lightLeaders.length - 2 ? ", " : i === lightLeaders.length - 2 ? " and " : ""}
                </span>
              ))}{" "}
              instead. Same API, different mixture.
            </p>
          </FadeUp>
        </>
      ),
    },
    uc.scenarios && {
      key: "scenarios",
      eyebrow: "Where it applies",
      render: (eyebrow) => {
        const s = uc.scenarios!;
        return (
          <>
            <SectionHeader eyebrow={eyebrow} title={s.title} lead={s.lead} />
            <ol>
              {s.items.map((item, i) => (
                <li key={item.title}>
                  {i > 0 && <DrawLine />}
                  <Stagger className="grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-10">
                    <FadeUp className="md:col-span-4">
                      <h3 className="flex items-center gap-3 text-[1.25rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                        <span aria-hidden className="h-[7px] w-[7px] shrink-0 bg-[#B45309]" />
                        {item.title}
                      </h3>
                    </FadeUp>
                    <FadeUp className="md:col-span-5">
                      <p className="text-[0.9375rem] leading-[1.75] text-[#57534E]">{item.body}</p>
                    </FadeUp>
                    <FadeUp className="md:col-span-3 md:justify-self-end">
                      <Chip className="border-[#E4C090] bg-[rgba(180,83,9,0.06)] text-[#B45309]">{item.benefit}</Chip>
                    </FadeUp>
                  </Stagger>
                </li>
              ))}
            </ol>
          </>
        );
      },
    },
    {
      key: "feeds",
      eyebrow: "What feeds it",
      render: (eyebrow) => (
        <>
          <SectionHeader eyebrow={eyebrow} title="The sources you already have" lead={uc.sourcesLead} />

          <FadeUp standalone className="mb-14 flex flex-wrap gap-2 md:mb-16">
            {uc.sources.map((s) => (
              <Chip key={s} className="px-3 py-2 text-[11px]">
                {s}
              </Chip>
            ))}
          </FadeUp>

          <ol>
            {steps.map((step, i) => (
              <li key={step.label}>
                {i > 0 && <DrawLine />}
                <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-12">
                  <FadeUp standalone className="lg:col-span-4">
                    <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                      {String(i + 1).padStart(2, "0")} · {step.label}
                    </p>
                    <h3 className="mb-3 text-[1.375rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#4A3B33]">{step.title}</h3>
                    <p className="text-[0.9375rem] leading-[1.75] text-[#57534E]">{step.body}</p>
                  </FadeUp>
                  <FadeUp standalone delay={0.08} className="min-w-0 lg:col-span-8">
                    <CodeBlock code={step.code} label={step.method} />
                  </FadeUp>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-4 font-mono text-[11px] leading-[1.8] tracking-[0.04em] text-[#78716C]">
            <code className="text-[#4A3B33]">npm install @alchemystai/sdk</code> or{" "}
            <code className="text-[#4A3B33]">pip install alchemystai</code>, both ship the same client. Full reference
            in the{" "}
            <a href={DOCS} target="_blank" rel="noopener noreferrer" className="link-brand">
              docs
            </a>
            .
          </p>
        </>
      ),
    },
    uc.efficiency && {
      key: "efficiency",
      eyebrow: "What it costs",
      render: (eyebrow) => {
        const e = uc.efficiency!;
        const { standard, enhanced } = TOKEN_COMPARISON;
        return (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader align="left" rule={false} className="!mb-8" eyebrow={eyebrow} title={e.title} lead={e.lead} />
              <Stagger as="ul">
                {e.points.map((pt, i) => (
                  <FadeUp as="li" key={pt} className={cn("flex items-center gap-3 py-4 text-[0.9375rem] text-[#4A3B33]", i > 0 && "border-t border-[#E4D9BC]/70")}>
                    <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-[#B45309]" />
                    {pt}
                  </FadeUp>
                ))}
              </Stagger>
              <FadeUp standalone className="mt-8">
                <BrandButton href={PLATFORM} external arrow>
                  Get started
                </BrandButton>
              </FadeUp>
            </div>

            <FadeUp standalone delay={0.1} className="lg:col-span-7 lg:pt-10">
              <SpecCard interactive={false} className="overflow-hidden">
                <div className="flex items-center justify-between gap-4 border-b border-[#E4D9BC]/70 px-6 py-4">
                  <Eyebrow>Tokens used, average per task</Eyebrow>
                  <Chip>Memory connected</Chip>
                </div>
                {[standard, enhanced].map((row, i) => (
                  <div key={row.label} className={cn("px-6 py-6", i > 0 && "border-t border-[#F1E9DA] bg-[#FBF6EC]")}>
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                      <h3 className="text-[1.0625rem] font-bold tracking-[-0.01em] text-[#4A3B33]">{row.label}</h3>
                      <span className={cn("font-mono text-[1rem] font-semibold tabular-nums", i > 0 ? "text-[#B45309]" : "text-[#57534E]")}>
                        {row.value}
                      </span>
                    </div>
                    <div aria-hidden className="mb-3 h-[6px] w-full bg-[#EFE6D6]">
                      <div
                        className={cn("h-full", i > 0 ? "bg-[#B45309]" : "bg-[#A8A29E]")}
                        style={{ width: `${(row.tokens / standard.tokens) * 100}%` }}
                      />
                    </div>
                    <p className="text-[0.875rem] leading-[1.6] text-[#78716C]">{row.note}</p>
                  </div>
                ))}
              </SpecCard>
            </FadeUp>
          </div>
        );
      },
    },
    {
      key: "runs",
      eyebrow: "Where it runs",
      render: (eyebrow) => (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader align="left" rule={false} className="!mb-8" eyebrow={eyebrow} title={uc.runs.title} />
            <FadeUp standalone>
              <p className="mb-8 max-w-[56ch] text-[1.0625rem] leading-[1.8] text-[#57534E]">{uc.runs.body}</p>
              <BrandButton href="/security" variant="text" arrow>
                Security &amp; compliance
              </BrandButton>
            </FadeUp>
          </div>

          <FadeUp standalone delay={0.1} className="lg:col-span-6 lg:pt-10">
            <SpecCard interactive={false} className="overflow-hidden">
              <div className="border-b border-[#E4D9BC]/70 px-6 py-4">
                <Eyebrow>Deployment</Eyebrow>
              </div>
              <ul>
                {DEPLOYMENTS.map((d, i) => (
                  <li key={d.title} className={cn("px-6 py-5", i > 0 && "border-t border-[#F1E9DA]")}>
                    <div className="mb-1.5 flex items-center justify-between gap-4">
                      <h3 className="text-[1.0625rem] font-bold tracking-[-0.01em] text-[#4A3B33]">{d.title}</h3>
                      {d.tag && <Chip>{d.tag}</Chip>}
                    </div>
                    <p className="text-[0.9375rem] leading-[1.65] text-[#57534E]">{d.body}</p>
                  </li>
                ))}
              </ul>
            </SpecCard>
          </FadeUp>
        </div>
      ),
    },
    uc.faqs && {
      key: "faqs",
      eyebrow: "Questions",
      render: (eyebrow) => (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader align="left" rule={false} className="!mb-0" eyebrow={eyebrow} title="Frequently asked questions" />
          </div>
          <Stagger className="flex flex-col gap-3 lg:col-span-8">
            {uc.faqs!.map((faq) => (
              <FadeUp key={faq.q}>
                <details className="faq group rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)] transition-colors open:border-[#E4C090]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[1.0625rem] font-bold text-[#4A3B33]">
                    {faq.q}
                    <span aria-hidden className="relative h-3 w-3 shrink-0 text-[#B45309]">
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="border-t border-[#F1E9DA] px-6 pb-6 pt-4">
                    <p className="text-[0.9375rem] leading-[1.75] text-[#57534E]">{faq.a}</p>
                  </div>
                </details>
              </FadeUp>
            ))}
          </Stagger>
        </div>
      ),
    },
    {
      key: "rest",
      eyebrow: "The rest",
      render: (eyebrow) => (
        <>
          <SectionHeader
            eyebrow={eyebrow}
            title="The same API, a different mixture"
            lead={
              <>
                Each of these leads with a different job, pulls from a different set of sources and needs a different
                call.{" "}
                <Link href="/use-cases" className="link-brand">
                  All of them, by job
                </Link>
                .
              </>
            }
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {others.map((u, i) => (
              <FadeUp standalone key={u.slug} delay={(i % 4) * 0.04} className="h-full">
                <UseCaseCard uc={u} showJob className="p-4 sm:p-5" />
              </FadeUp>
            ))}
          </div>
        </>
      ),
    },
  ];
  const sections = blocks.filter((b): b is Block => !!b);

  return (
    <PageShell>
      <ArticleSchema headline={uc.title} description={uc.description} url={path} datePublished="2026-09-26" />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      )}

      <PageHero
        width="wide"
        crumbs={[{ name: "Use cases", path: "/use-cases" }, { name: uc.name }]}
        currentPath={path}
        eyebrow={`Use case · ${uc.name}`}
        title={uc.title}
        titleClassName="max-w-[24ch]"
        lead={uc.lead}
      >
        <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#78716C]">The mixture</p>
        <MixtureStrip uc={uc} />
      </PageHero>

      {/* ── 01 What breaks ─────────────────────────────────── */}
      <Section tone="paper" pad="none" innerClassName="pb-20 md:pb-28">
        <SectionHeader rule={false} eyebrow="01 · What breaks" eyebrowTone="red" title={uc.breaks.title} lead={uc.breaks.lead} />
        <Stagger as="ol" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {uc.breaks.items.map((item, i) => (
            <FadeUp as="li" key={item.title} className="flex">
              <SpecCard interactive={false} className="flex w-full flex-col p-7">
                <span className="mb-6 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#991B1B]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                  {item.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{item.body}</p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      {sections.map((s, i) => (
        <Section key={s.key} id={s.key} tone={i % 2 === 0 ? "sand" : "paper"} bordered className="scroll-mt-20">
          {s.render(`${String(i + 2).padStart(2, "0")} · ${s.eyebrow}`)}
        </Section>
      ))}

      {/* ── Closing ────────────────────────────────────────── */}
      <Section tone="dark" grid>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FadeUp standalone className="mb-7">
              <Eyebrow>Talk to us</Eyebrow>
            </FadeUp>
            <RevealText
              as="h2"
              className="mb-6 text-[clamp(1.875rem,3.8vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#F5F5F4] text-balance"
            >
              {uc.cta.title}
            </RevealText>
            <FadeUp standalone delay={0.15}>
              <p className="max-w-[40rem] text-[1.0625rem] leading-[1.75] text-[#A8A29E]">{uc.cta.body}</p>
              {uc.cta.note && (
                <p className="mt-6 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#D6D3D1]">
                  <span aria-hidden className="h-[6px] w-[6px] bg-[#E4C090]" />
                  {uc.cta.note}
                </p>
              )}
            </FadeUp>
          </div>
          <FadeUp standalone delay={0.2} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <BrandButton href={SALES_CALL} external arrow>
              Talk to us
            </BrandButton>
            <BrandButton href={PLATFORM} variant="outline-dark" external>
              Start building free
            </BrandButton>
          </FadeUp>
        </div>
      </Section>
    </PageShell>
  );
}
