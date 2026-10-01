// /case-study: where context-aware agents run today, one industry per card.
// The channel and the workflow change; the context layer underneath them,
// and what it carries into every conversation, does not.

import { BrandButton, Eyebrow, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { CaseStudyCard } from "@/components/case-studies";
import { FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { CASE_STUDIES, CASE_STUDIES_PATH, caseStudyPath } from "@/lib/caseStudies";
import type { Metadata } from "next";
import Link from "next/link";

const SALES_CALL = "https://cal.com/uttaran-nayak-alchemyst/30min";
const DOCS = "https://docs.getalchemystai.com";

const title = "Case Studies: The Context Layer in Production";
const description =
  "How the Alchemyst context and memory layer runs underneath voice and text agents in hospitals, EdTech, D2C logistics, banking, real estate, automotive retail and HR services: every call carries the customer's history, and every answer is written back for the next one.";
const url = `https://getalchemystai.com${CASE_STUDIES_PATH}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI case studies",
    "context-aware voice AI",
    "AI memory layer case study",
    "voice AI for hospitals",
    "voice AI for BFSI",
    "persistent memory for AI agents",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

/** What every deployment below has in common, drawn from the case studies. */
const COMMON: { title: string; body: string }[] = [
  {
    title: "Context before the first word",
    body: "The customer's record, language and history are retrieved and filtered before the call connects, so the agent opens with specifics instead of a script.",
  },
  {
    title: "Memory across attempts",
    body: "Every retry starts from what the last one learned: the objection, the failure reason, the promise made. Second and third touches stop collapsing.",
  },
  {
    title: "Written back to the system of record",
    body: "Outcomes flow back to the HIMS, CRM, ATS or DMS without a human touching them, so the next agent and the next person both see the latest truth.",
  },
  {
    title: "A sidecar, not a replacement",
    body: "Existing databases, models, telephony and agents stay in place. The context layer sits underneath them and changes what they can see.",
  },
];

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero
        width="wide"
        crumbs={[{ name: "Case studies" }]}
        currentPath={CASE_STUDIES_PATH}
        eyebrow="Case studies"
        title={
          <>
            Seven industries. <span className="italic text-[#B45309]">One context layer underneath.</span>
          </>
        }
        titleClassName="max-w-[22ch]"
        lead="Hospitals, EdTech, D2C logistics, banking, real estate, dealerships and staffing. The voice, the channel and the workflow change from one to the next. What makes each of them work is the same: every conversation carries the customer's history, and every answer is written back for the next one."
      >
        <nav aria-label="Industries">
          <ol className="flex flex-wrap gap-2.5">
            {CASE_STUDIES.map((cs, i) => (
              <li key={cs.slug}>
                <Link
                  href={caseStudyPath(cs.slug)}
                  className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-3.5 py-2 text-[0.875rem] font-bold text-[#4A3B33] shadow-[var(--shadow-soft)] transition-[border-color,color,transform] duration-200 hover:-translate-y-px hover:border-[#E4C090] hover:text-[#B45309]"
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#B45309]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {cs.shortLabel}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <Section tone="paper" pad="none" innerClassName="pb-20 md:pb-28">
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <FadeUp key={cs.slug} className="h-full">
              <CaseStudyCard cs={cs} index={i} />
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      <Section tone="sand" bordered id="common">
        <SectionHeader
          eyebrow="In every case study"
          title="What the context layer carries into every conversation"
          lead="Seven industries and 39 workflows between them. Underneath all of them, the same four things are doing the work."
        />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {COMMON.map((t, i) => (
            <FadeUp key={t.title} className="flex">
              <SpecCard as="article" interactive={false} className="flex w-full flex-col p-7">
                <span className="mb-6 flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#B45309]">
                  <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                  {t.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{t.body}</p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>
        <FadeUp standalone>
          <p className="mt-10 max-w-[72ch] text-[1rem] leading-[1.8] text-[#57534E]">
            The same API runs well beyond these seven. See what teams build on it{" "}
            <Link href="/use-cases" className="link-brand">
              by use case
            </Link>
            , or how it handles{" "}
            <Link href="/use-cases/voice-agents" className="link-brand">
              voice agents
            </Link>{" "}
            specifically.
          </p>
        </FadeUp>
      </Section>

      <Section tone="dark" grid>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FadeUp standalone className="mb-7">
              <Eyebrow>Your industry next</Eyebrow>
            </FadeUp>
            <RevealText
              as="h2"
              className="mb-6 text-[clamp(1.875rem,3.8vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#F5F5F4] text-balance"
            >
              Your agents already have the channel. Give them the memory.
            </RevealText>
            <FadeUp standalone delay={0.15}>
              <p className="max-w-[40rem] text-[1.0625rem] leading-[1.75] text-[#A8A29E]">
                Tell us which systems hold your customer&apos;s history and which conversations keep starting from
                zero. We will show you where the context layer slots in.
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
