// /case-study/[slug]: one industry, told through the context layer underneath
// its agents. Hero with the headline metric, then the four fixed sections
// (problem, context layer, where it fits, why it works), the other case
// studies, and a dark closing chapter.

import ArticleSchema from "@/components/ArticleSchema";
import { BrandButton, Eyebrow, Section } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { CaseStudyCard, HeroMetric } from "@/components/case-studies";
import { DrawLine, FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import {
  CASE_STUDIES,
  CASE_STUDIES_PATH,
  CASE_STUDY_BY_SLUG,
  SECTION_LABELS,
  caseStudyPath,
  sectionTitle,
  splitBullet,
} from "@/lib/caseStudies";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL = "https://getalchemystai.com";
const SALES_CALL = "https://cal.com/uttaran-nayak-alchemyst/30min";
const PLATFORM = "https://platform.getalchemystai.com";

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDY_BY_SLUG[slug];
  if (!cs) return { title: "Case study not found" };
  const url = `${SITE_URL}${caseStudyPath(slug)}`;
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: cs.h1, description: cs.metaDescription, url, type: "article" },
    twitter: { card: "summary_large_image", title: cs.h1, description: cs.metaDescription },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = CASE_STUDY_BY_SLUG[slug];
  if (!cs) notFound();

  const path = caseStudyPath(cs.slug);
  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug);

  return (
    <PageShell>
      <ArticleSchema headline={cs.h1} description={cs.metaDescription} url={path} datePublished="2026-10-01" />

      <PageHero
        width="wide"
        crumbs={[{ name: "Case studies", path: CASE_STUDIES_PATH }, { name: cs.shortLabel }]}
        currentPath={path}
        eyebrow={`Case study · ${cs.industry}`}
        title={cs.h1}
        titleClassName="max-w-[24ch]"
        lead={cs.tldr}
      >
        <div className="flex flex-col gap-6 border-y border-[#E4D9BC]/80 py-6 sm:flex-row sm:items-end sm:justify-between">
          <HeroMetric cs={cs} />
          <p className="max-w-[36ch] text-[1.0625rem] italic leading-[1.6] text-[#B45309] sm:text-right">
            {cs.tagline}
          </p>
        </div>
      </PageHero>

      {cs.sections.map((section, i) => {
        const label = SECTION_LABELS[i] ?? "Section";
        const eyebrow = `${String(i + 1).padStart(2, "0")} · ${label}`;
        const bullets = section.bullets?.map(splitBullet) ?? [];
        const rows = bullets.length > 0 && bullets.every((b) => b.title);
        const first = i === 0;

        return (
          <Section
            key={section.heading}
            id={label.toLowerCase().replace(/\s+/g, "-")}
            tone={i % 2 === 0 ? "paper" : "sand"}
            bordered={!first}
            pad={first ? "none" : "default"}
            innerClassName={first ? "pb-20 md:pb-28" : undefined}
            className="scroll-mt-20"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <FadeUp standalone className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow tone={first ? "red" : "amber"} className="mb-6">
                    {eyebrow}
                  </Eyebrow>
                  <h2 className="text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-[1.14] tracking-[-0.028em] text-[#4A3B33] text-balance">
                    {sectionTitle(section.heading)}
                  </h2>
                </div>
              </FadeUp>

              <div className="lg:col-span-7">
                <FadeUp standalone delay={0.08}>
                  <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">{section.body}</p>
                </FadeUp>

                {bullets.length > 0 && !rows && (
                  <Stagger as="ul" className="mt-10 border-t border-[#E4D9BC]/70">
                    {bullets.map((b) => (
                      <FadeUp
                        as="li"
                        key={b.body}
                        className="flex items-start gap-3 border-b border-[#E4D9BC]/70 py-4 text-[0.9375rem] leading-[1.7] text-[#4A3B33]"
                      >
                        <span aria-hidden className="mt-[0.6em] h-[6px] w-[6px] shrink-0 bg-[#B45309]" />
                        {b.title ? `${b.title}: ${b.body}` : b.body}
                      </FadeUp>
                    ))}
                  </Stagger>
                )}
              </div>
            </div>

            {rows && (
              <ol className="mt-14 md:mt-16">
                {bullets.map((b, j) => (
                  <li key={b.title}>
                    {j > 0 && <DrawLine />}
                    <Stagger className="grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-10">
                      <FadeUp className="md:col-span-4">
                        <h3 className="flex items-baseline gap-3 text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                          <span className="shrink-0 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#B45309]">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          {b.title}
                        </h3>
                      </FadeUp>
                      <FadeUp className="md:col-span-8">
                        <p className="text-[0.9375rem] leading-[1.75] text-[#57534E]">{b.body}</p>
                      </FadeUp>
                    </Stagger>
                  </li>
                ))}
              </ol>
            )}
          </Section>
        );
      })}

      <Section tone={cs.sections.length % 2 === 0 ? "paper" : "sand"} bordered id="more">
        <SectionHeader
          eyebrow="More case studies"
          title="Same context layer, a different industry"
          lead={
            <>
              Each of these connects different systems and runs different workflows. The memory underneath works the
              same way.{" "}
              <Link href={CASE_STUDIES_PATH} className="link-brand">
                All case studies
              </Link>
              .
            </>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c, i) => (
            <FadeUp standalone key={c.slug} delay={(i % 3) * 0.04} className="h-full">
              <CaseStudyCard cs={c} compact className="p-6" />
            </FadeUp>
          ))}
        </div>
      </Section>

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
              Every conversation should start from what you already know.
            </RevealText>
            <FadeUp standalone delay={0.15}>
              <p className="max-w-[40rem] text-[1.0625rem] leading-[1.75] text-[#A8A29E]">
                Tell us which systems hold your customer&apos;s history and which workflows keep starting from zero. We
                will show you where the context layer slots in, without replacing what already works.
              </p>
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
