import { BrandButton, Chip, Eyebrow, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { fetchTallyJobs, tallyApplyUrl } from "@/lib/tally";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const PAGE_PATH = "/careers";

export const metadata: Metadata = {
  title: "Careers: Build the Context Layer for Enterprise AI",
  description:
    "Open roles at Alchemyst AI. Join the team building the model-agnostic context layer that gives enterprise AI agents persistent, auditable memory.",
  keywords: [
    "Alchemyst AI careers",
    "AI context layer jobs",
    "AI engineer jobs",
    "full stack developer jobs",
    "devops engineer jobs",
    "AI startup hiring",
  ],
  alternates: {
    canonical: "https://getalchemystai.com/careers",
  },
  openGraph: {
    title: "Careers at Alchemyst AI",
    description:
      "Open roles at Alchemyst AI. Build the context layer for enterprise AI.",
    url: "https://getalchemystai.com/careers",
    type: "website",
  },
};

function formatPosted(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function CareersPage() {
  const { jobs } = await fetchTallyJobs();

  const meta =
    jobs.length > 0
      ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}`
      : "No open roles right now";

  return (
    <PageShell cta>
      <PageHero
        width="medium"
        crumbs={[{ name: "Careers" }]}
        currentPath={PAGE_PATH}
        eyebrow="Open Roles"
        title="Build the context layer for enterprise AI"
        lead="We are a small, senior team turning institutional memory into a primitive for AI agents. If you want your work to sit under every agent an enterprise runs, you are in the right place."
        meta={meta}
      />

      <Section tone="paper" pad="none" innerClassName="max-w-[1000px] pb-20 md:pb-28">
        <SectionHeader
          align="split"
          rule={false}
          title="Open Positions"
          lead="Every role is a form. Pick one and apply directly, no account required."
          className="!mb-12"
        />

        {jobs.length > 0 ? (
          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {jobs.map((job) => {
              const tags = job.tags?.filter(Boolean) ?? [];
              return (
                <FadeUp key={job.id} className="flex">
                  <SpecCard
                    as="article"
                    className="flex w-full flex-col overflow-hidden p-7"
                  >
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-[#B45309]" />
                    <Eyebrow className="mb-4">{job.name}</Eyebrow>
                    <h3 className="text-[1.25rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#4A3B33]">
                      {job.title}
                    </h3>
                    {job.description ? (
                      <p className="mt-4 text-[0.9375rem] leading-[1.7] text-[#57534E]">
                        {job.description}
                      </p>
                    ) : null}
                    {tags.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#F1E9DA] pt-5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#78716C]">
                        Posted {formatPosted(job.createdAt)}
                      </span>
                      <BrandButton
                        href={tallyApplyUrl(job.id)}
                        external
                        variant="text"
                        arrow
                      >
                        Apply
                      </BrandButton>
                    </div>
                  </SpecCard>
                </FadeUp>
              );
            })}
          </Stagger>
        ) : (
          <FadeUp standalone>
            <SpecCard interactive={false} className="p-8 md:p-10">
              <Eyebrow className="mb-4">No Open Roles</Eyebrow>
              <h3 className="text-[1.25rem] font-bold tracking-[-0.01em] text-[#4A3B33]">
                Nothing open at the moment
              </h3>
              <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-[#57534E]">
                We hire as the roadmap demands. If you do exceptional work on
                context, retrieval or agent infrastructure, we still want to hear
                from you.
              </p>
              <div className="mt-7">
                <BrandButton href="mailto:founders@getalchemystai.com" arrow>
                  Get in touch
                </BrandButton>
              </div>
            </SpecCard>
          </FadeUp>
        )}
      </Section>
    </PageShell>
  );
}
