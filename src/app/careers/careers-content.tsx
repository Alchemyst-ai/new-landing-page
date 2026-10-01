import { BrandButton, Chip, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { cn } from "@/lib/utils";
import { BrainCircuit, Globe, Rocket } from "lucide-react";

interface JobPosition {
  id: string;
  name: string;
  title: string;
  tags: string[];
  createdAt: string;
}

async function fetchJobs(): Promise<JobPosition[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const response = await fetch(`${baseUrl}/api/careers`, {
      next: { revalidate: 1800 },
    });
    if (!response.ok) {
      console.error("Failed to fetch careers data");
      return [];
    }
    const data = await response.json();
    return data.jobs || [];
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return [];
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays <= 0) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return "recently";
  }
}

const PILLARS = [
  {
    icon: BrainCircuit,
    title: "Solving for the frontier",
    body: "You will be working at the frontier of combining AI and context.",
  },
  {
    icon: Rocket,
    title: "Rocketship growth",
    body: "Experience what rocketship growth feels like.",
    link: { label: "See proof", href: "https://x.com/AnuranRoy/status/1998080417870885225" },
  },
  {
    icon: Globe,
    title: "Global impact",
    body: "GenAI is the biggest shift after electricity. Help the world make automated agents truly intelligent.",
  },
];

export default async function CareersContent() {
  const jobs = await fetchJobs();

  return (
    <PageShell cta>
      <PageHero
        width="wide"
        crumbs={[{ name: "Careers" }]}
        currentPath="/careers"
        eyebrow="Careers at Alchemyst AI"
        title={
          <>
            Join our <span className="italic text-[#B45309]">team.</span>
          </>
        }
        lead="Context is the next frontier, but it needs to be verifiable. Help us build the only AI context engine you can verify."
        meta={`Open positions: ${jobs.length}`}
      />

      {/* Server-rendered agent-readable summary. The open-position list above
          is fetched live from Tally, so this section states what the page
          offers even when no listings are cached. */}
      <section aria-label="Careers overview" className="sr-only">
        <h2>Careers at Alchemyst AI</h2>
        <p>
          Alchemyst AI is hiring for the team building the context layer for
          the trillion-agent world. Reasons to join: work at the frontier of
          AI and context, rocketship growth, and global impact on automated
          agents.
        </p>
        <h3>How to apply</h3>
        <p>
          Open positions are listed on https://getalchemystai.com/careers and
          each listing links to its application form. If no role fits, send a
          general application to founders@getalchemystai.com.
        </p>
      </section>

      <Section tone="paper" pad="none" innerClassName="pb-20 md:pb-28">
        <SectionHeader
          rule={false}
          eyebrow="Why join Alchemyst"
          title="Work at the frontier of AI and context."
          lead="We are building the context layer for the trillion-agent world. Small team, high ownership, and problems that have no playbook yet."
        />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <FadeUp key={p.title} className="flex">
              <SpecCard className="flex w-full flex-col p-7">
                <span
                  aria-hidden
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-[#E4D9BC] bg-[#F8F4EE] text-[#B45309]"
                >
                  <p.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mb-3 text-[1.25rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#4A3B33]">
                  {p.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">
                  {p.body}{" "}
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-brand font-bold"
                    >
                      {p.link.label}
                    </a>
                  )}
                </p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      <Section tone="sand" bordered>
        <SectionHeader
          eyebrow={`Open positions · ${jobs.length}`}
          title="Find the role you were meant for."
          lead="Every listing below links to its application form. Applications are reviewed by the team that owns the work."
        />

        {jobs.length === 0 && (
          <FadeUp standalone>
            <SpecCard interactive={false} className="p-10 text-center md:p-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B45309]">
                No open positions
              </p>
              <p className="mx-auto mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.75] text-[#57534E]">
                No open positions at the moment. Check back soon, or introduce yourself below.
              </p>
            </SpecCard>
          </FadeUp>
        )}

        {jobs.length > 0 && (
          <Stagger as="ul" className="grid grid-cols-1 gap-5">
            {jobs.map((job) => (
              <FadeUp as="li" key={job.id} className="flex">
                <SpecCard className="flex w-full flex-col p-7 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="text-[1.375rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#4A3B33]">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius)] border border-[rgba(180,83,9,0.22)] bg-[rgba(180,83,9,0.07)] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
                      <span aria-hidden className="h-[5px] w-[5px] bg-current" />
                      Open
                    </span>
                  </div>
                  {(job.tags ?? []).length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(job.tags ?? []).map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </div>
                  )}
                  <div
                    className={cn(
                      "mt-6 flex flex-col gap-4 border-t border-[#F1E9DA] pt-6 sm:flex-row sm:items-center sm:justify-between"
                    )}
                  >
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#78716C]">
                      Posted {formatDate(job.createdAt)}
                    </p>
                    <BrandButton href={`https://tally.so/r/${job.id}`} external arrow>
                      Apply now
                    </BrandButton>
                  </div>
                </SpecCard>
              </FadeUp>
            ))}
          </Stagger>
        )}
      </Section>

      <Section tone="paper" bordered>
        <FadeUp standalone>
          <SpecCard interactive={false} tone="sand" className="p-10 text-center md:p-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B45309]">
              General applications
            </p>
            <h2 className="mx-auto mt-4 max-w-[22ch] text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[#4A3B33]">
              Do not see your role?
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[1rem] leading-[1.75] text-[#57534E]">
              People breaking the mould are always welcome. Reach out and tell us what you would build.
            </p>
            <div className="mt-8 flex justify-center">
              <BrandButton href="mailto:founders@getalchemystai.com" arrow>
                Get in touch
              </BrandButton>
            </div>
          </SpecCard>
        </FadeUp>
      </Section>
    </PageShell>
  );
}
