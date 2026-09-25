// /security: Security and compliance overview. Hero with posture strip, why
// the context layer is security-critical (with a posture spec card), the
// frameworks we track as a ruled status table, platform controls, what it
// means for teams, the protection lifecycle and a dark closing chapter for
// security reviews and responsible disclosure.
//
// Icons are Tabler Icons (MIT, see /security/LICENSE-tabler-icons.txt),
// rendered through TintedLogo so they take the palette colour.

import { BrandButton, Chip, Eyebrow, Section, SpecCard, SpecStrip, TintedLogo } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { DrawLine, FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const PAGE_PATH = "/security";
const SECURITY_EMAIL = "mailto:founders@getalchemystai.com?subject=Security";
const DOCS_EMAIL = "mailto:founders@getalchemystai.com?subject=Security%20documentation%20request";
const SALES_CALL = "https://cal.com/uttaran-nayak-alchemyst/30min";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "How Alchemyst AI protects the context your AI agents run on: encryption, scoped and isolated context, Context Traces for auditability, SSO and SAML, dedicated infrastructure, and our status on SOC 2, GDPR, DPDP, CCPA, ISO/IEC 27001, HIPAA and PCI-DSS.",
  keywords: [
    "Alchemyst AI security",
    "AI context layer compliance",
    "SOC 2 AI memory",
    "GDPR AI agents",
    "AI agent audit trail",
    "responsible disclosure",
  ],
  alternates: { canonical: "https://getalchemystai.com/security" },
};

/* ── Content ───────────────────────────────────────────────────────────────── */

type Status = "In progress" | "Aligned" | "Via Razorpay" | "Roadmap";

const FRAMEWORKS: { icon: string; name: string; full: string; body: string; status: Status }[] = [
  {
    icon: "/security/shield-check.svg",
    name: "SOC 2",
    full: "AICPA Trust Services Criteria",
    body: "Our SOC 2 program is under way: security, availability and confidentiality controls are being mapped to the Trust Services Criteria ahead of an independent audit.",
    status: "In progress",
  },
  {
    icon: "/security/scale.svg",
    name: "GDPR",
    full: "EU General Data Protection Regulation",
    body: "Personal data is processed only with a valid legal basis. Data subjects can access, correct and delete their data, or withdraw consent, at any time.",
    status: "Aligned",
  },
  {
    icon: "/security/fingerprint.svg",
    name: "DPDP Act",
    full: "India Digital Personal Data Protection Act, 2023",
    body: "As an India-headquartered company, we process personal data only for specified purposes and honour the rights of every Data Principal.",
    status: "Aligned",
  },
  {
    icon: "/security/user-shield.svg",
    name: "CCPA",
    full: "California Consumer Privacy Act",
    body: "We do not sell personal information. California residents can request access to, or deletion of, the data we hold about them.",
    status: "Aligned",
  },
  {
    icon: "/security/certificate.svg",
    name: "ISO/IEC 27001",
    full: "Information security management",
    body: "Our information security management practices are being structured around the ISO/IEC 27001 control set.",
    status: "Roadmap",
  },
  {
    icon: "/security/stethoscope.svg",
    name: "HIPAA",
    full: "US Health Insurance Portability and Accountability Act",
    body: "Support for teams handling Protected Health Information is on our roadmap. Please do not send PHI to Alchemyst until a BAA is in place.",
    status: "Roadmap",
  },
  {
    icon: "/security/credit-card.svg",
    name: "PCI-DSS",
    full: "Payment Card Industry Data Security Standard",
    body: "Card payments are handled by Razorpay, a PCI-DSS compliant processor. Card data never touches Alchemyst servers.",
    status: "Via Razorpay",
  },
];

const STATUS_STYLE: Record<Status, string> = {
  "In progress": "text-[#B45309] bg-[rgba(180,83,9,0.07)] border-[rgba(180,83,9,0.22)]",
  Aligned: "text-[#4A3B33] bg-[#F1E9DA] border-[#E4C090]",
  "Via Razorpay": "text-[#57534E] bg-white border-[#E4D9BC]",
  Roadmap: "text-[#78716C] bg-[#F8F4EE] border-[#E4D9BC]",
};

const CONTROLS: { icon: string; title: string; body: string; tag?: string }[] = [
  {
    icon: "/security/lock.svg",
    title: "Encryption in transit and at rest",
    body: "Traffic to the API, SDKs and MCP server is encrypted over TLS, and stored context is encrypted at rest.",
  },
  {
    icon: "/security/stack-2.svg",
    title: "Scoped, isolated context",
    body: "Context is scoped to its owner at write time, so an agent only ever retrieves what it is entitled to see.",
  },
  {
    icon: "/security/route.svg",
    title: "Context Traces",
    body: "Every retrieval records its sources, scores and the rules applied: a complete record of what each agent knew, and why.",
  },
  {
    icon: "/security/key.svg",
    title: "Access control, SSO and SAML",
    body: "Role-based access controls for your team, with single sign-on through SSO and SAML authentication.",
    tag: "SSO on Enterprise",
  },
  {
    icon: "/security/cloud-lock.svg",
    title: "Dedicated infrastructure",
    body: "Run on dedicated infrastructure with VPC peering when your data cannot share a network boundary.",
    tag: "Enterprise",
  },
  {
    icon: "/security/database-export.svg",
    title: "Export and deletion",
    body: "Export your context at any time and have it deleted on request. Your context is never locked to one model or vendor.",
  },
];

const PRINCIPLES = [
  {
    title: "Least access by default",
    body: "Agents see only the context scoped to them. Nothing is shared across tenants, teams or projects unless you decide it should be.",
  },
  {
    title: "Every retrieval on the record",
    body: "Each answer an agent gives can be traced back to the exact context it was served, so decisions are explainable and defensible.",
  },
  {
    title: "Your context stays yours",
    body: "We never sell your data. Context is model-agnostic, exportable, and retained no longer than 36 months after account termination.",
  },
];

const POSTURE: [string, string][] = [
  ["SOC 2", "In progress"],
  ["Uptime SLA", "99.9%"],
  ["Retrievals traced", "100%"],
  ["Personal data sold", "Never"],
  ["Retention after termination", "Max 36 months"],
  ["Card payments", "Razorpay, PCI-DSS"],
  ["SSO and SAML", "Enterprise"],
  ["Dedicated infra, VPC peering", "Enterprise"],
];

const OUTCOMES = [
  {
    title: "Reduce risk",
    body: "Minimize exposure to regulatory fines and data breaches with controls that are on by default, not bolted on after launch.",
  },
  {
    title: "Pass security reviews faster",
    body: "Hand procurement a clear posture, documentation and real traces instead of rebuilding answers for every questionnaire.",
  },
  {
    title: "Keep agents accountable",
    body: "When an agent acts, show exactly what context it used and why. Debug in minutes and defend decisions with evidence.",
  },
  {
    title: "Stay ahead of regulation",
    body: "Our program tracks evolving global standards, so your compliance posture improves without re-architecting your agents.",
  },
];

const STEPS = [
  {
    verb: "Ingest",
    title: "Scoped on write",
    body: "Data arrives over encrypted connections and is scoped to its owner the moment it is written.",
  },
  {
    verb: "Store",
    title: "Encrypted and isolated",
    body: "Context is encrypted at rest and isolated per organization, on shared or dedicated infrastructure.",
  },
  {
    verb: "Retrieve",
    title: "Checked on every call",
    body: "Each request is checked against its scope before any context is served to an agent.",
  },
  {
    verb: "Audit",
    title: "Traced end to end",
    body: "Every retrieval produces a Context Trace you can review, export and hand to your auditors.",
  },
];

/* ── Local pieces ──────────────────────────────────────────────────────────── */

function IconTile({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] border border-[#E4D9BC] bg-[#F8F4EE] text-[#B45309] transition-colors duration-300",
        className,
      )}
    >
      <TintedLogo src={src} alt="" width={24} height={24} displayHeight={24} />
    </span>
  );
}

function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius)] border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
        STATUS_STYLE[status],
      )}
    >
      <span aria-hidden className="h-[5px] w-[5px] bg-current" />
      {status}
    </span>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function SecurityPage() {
  return (
    <PageShell>
      <PageHero
        width="wide"
        crumbs={[{ name: "Security" }]}
        currentPath={PAGE_PATH}
        eyebrow="Security & Compliance"
        title={
          <>
            Secure, auditable, and <span className="italic text-[#B45309]">compliant by design.</span>
          </>
        }
        titleClassName="max-w-[20ch]"
        lead="Your context layer holds the institutional knowledge your agents act on. Alchemyst AI treats it like a system of record: scoped at write time, encrypted in transit and at rest, and traceable on every retrieval, so security reviews move as fast as your roadmap."
        meta="Last updated: September 2026"
      >
        <div className="flex flex-wrap items-center gap-3">
          <BrandButton href={DOCS_EMAIL} arrow>
            Request security docs
          </BrandButton>
          <BrandButton href={SALES_CALL} variant="outline" external>
            Talk to our team
          </BrandButton>
        </div>
        <div className="mt-12 overflow-x-auto">
          <SpecStrip
            className="w-fit"
            items={[
              { value: "In progress", label: "SOC 2" },
              { value: "99.9%", label: "uptime SLA" },
              { value: "100%", label: "retrievals traced" },
            ]}
          />
        </div>
      </PageHero>

      {/* ── Why it matters ─────────────────────────────────── */}
      <Section tone="paper" pad="none" innerClassName="pb-20 md:pb-28">
        <SectionHeader
          rule={false}
          eyebrow="Why it matters"
          title={
            <>
              Agents are only as trustworthy as the <span className="italic text-[#B45309]">context they read.</span>
            </>
          }
          lead="Security compliance is no longer optional. As agents take on real operations, the context layer joins your attack surface and your audit scope. Every fact, rule and decision it serves has to be protected, attributable and removable."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <Stagger as="ul" className="lg:col-span-7">
            {PRINCIPLES.map((p, i) => (
              <FadeUp
                as="li"
                key={p.title}
                className={cn("py-7", i > 0 && "border-t border-[#E4D9BC]/70", i === 0 && "pt-0")}
              >
                <h3 className="mb-3 flex items-center gap-3 text-[1.25rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#4A3B33]">
                  <span aria-hidden className="h-[7px] w-[7px] shrink-0 bg-[#B45309]" />
                  {p.title}
                </h3>
                <p className="max-w-[56ch] pl-[19px] text-[0.9375rem] leading-[1.75] text-[#57534E]">{p.body}</p>
              </FadeUp>
            ))}
          </Stagger>

          <FadeUp standalone delay={0.1} className="lg:col-span-5">
            <SpecCard interactive={false} className="overflow-hidden">
              <div className="border-b border-[#E4D9BC]/70 px-6 py-4">
                <Eyebrow>Posture at a glance</Eyebrow>
              </div>
              <dl>
                {POSTURE.map(([label, value], i) => (
                  <div
                    key={label}
                    className={cn(
                      "flex items-baseline justify-between gap-6 px-6 py-3.5",
                      i > 0 && "border-t border-[#F1E9DA]",
                    )}
                  >
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#78716C]">{label}</dt>
                    <dd className="text-right text-[0.9375rem] tabular-nums text-[#4A3B33]">{value}</dd>
                  </div>
                ))}
              </dl>
            </SpecCard>
          </FadeUp>
        </div>
      </Section>

      {/* ── Frameworks and standards ───────────────────────── */}
      <Section tone="sand" bordered>
        <SectionHeader
          eyebrow="Certifications and standards"
          title="The frameworks security teams ask about."
          lead="Where we stand today on each standard. Status changes as our program matures; request our security documentation for the current detail."
        />

        <FadeUp standalone>
          <SpecCard interactive={false} className="overflow-hidden">
            <ul>
              {FRAMEWORKS.map((f, i) => (
                <li
                  key={f.name}
                  className={cn(
                    "group/row grid grid-cols-1 gap-x-8 gap-y-4 px-6 py-6 transition-colors duration-300 hover:bg-[#FDFBF7] md:grid-cols-12 md:items-center md:px-8",
                    i > 0 && "border-t border-[#E4D9BC]/70",
                  )}
                >
                  <div className="flex items-center gap-4 md:col-span-4">
                    <IconTile src={f.icon} className="group-hover/row:border-[#E4C090] group-hover/row:bg-white" />
                    <div>
                      <h3 className="text-[1.1875rem] font-bold leading-[1.25] tracking-[-0.015em] text-[#4A3B33]">{f.name}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.1em] text-[#78716C]">{f.full}</p>
                    </div>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-[#57534E] md:col-span-6">{f.body}</p>
                  <div className="md:col-span-2 md:justify-self-end">
                    <StatusChip status={f.status} />
                  </div>
                </li>
              ))}
            </ul>
          </SpecCard>
        </FadeUp>
      </Section>

      {/* ── Platform controls ──────────────────────────────── */}
      <Section tone="paper" bordered>
        <SectionHeader
          eyebrow="Platform controls"
          title={
            <>
              Security built into the <span className="italic text-[#B45309]">context layer.</span>
            </>
          }
          lead="The controls that protect your context are part of the platform, not an add-on. They apply to every ingest, every retrieval and every agent."
        />

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map((c) => (
            <FadeUp key={c.title} className="flex">
              <SpecCard className="flex w-full flex-col p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <IconTile src={c.icon} className="group-hover:border-[#E4C090] group-hover:bg-white" />
                  {c.tag && <Chip>{c.tag}</Chip>}
                </div>
                <h3 className="mb-3 text-[1.25rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#4A3B33]">{c.title}</h3>
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{c.body}</p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      {/* ── Outcomes ───────────────────────────────────────── */}
      <Section tone="sand" bordered>
        <SectionHeader
          eyebrow="What it means for your team"
          title="Compliance made simple, secure and scalable."
          lead="Strong controls should speed teams up, not slow them down. Here is what a secure context layer changes day to day."
        />

        <ol>
          {OUTCOMES.map((o, i) => (
            <li key={o.title}>
              {i > 0 && <DrawLine />}
              <Stagger className="grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <FadeUp className="md:col-span-5">
                  <h3 className="flex items-center gap-3 text-[1.375rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#4A3B33]">
                    <span aria-hidden className="h-[7px] w-[7px] shrink-0 bg-[#B45309]" />
                    {o.title}
                  </h3>
                </FadeUp>
                <FadeUp className="md:col-span-7">
                  <p className="text-[1rem] leading-[1.8] text-[#57534E]">{o.body}</p>
                </FadeUp>
              </Stagger>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Lifecycle ──────────────────────────────────────── */}
      <Section tone="paper" bordered>
        <SectionHeader
          eyebrow="How it works"
          title="How Alchemyst keeps your context secure."
          lead="Protection follows your data through its whole lifecycle, from the first write to the final audit."
        />

        <Stagger as="ol" className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <FadeUp as="li" key={s.verb}>
              <div aria-hidden className="mb-6 flex gap-1">
                {STEPS.map((_, j) => (
                  <span key={j} className={cn("h-[3px] flex-1", j <= i ? "bg-[#B45309]" : "bg-[#E4D9BC]")} />
                ))}
              </div>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                {String(i + 1).padStart(2, "0")} · {s.verb}
              </p>
              <h3 className="mb-3 text-[1.25rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#4A3B33]">{s.title}</h3>
              <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{s.body}</p>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      {/* ── Closing dark chapter ───────────────────────────── */}
      <Section tone="dark" grid>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <FadeUp standalone className="mb-7">
              <Eyebrow>Trust Center</Eyebrow>
            </FadeUp>
            <RevealText
              as="h2"
              className="mb-6 text-[clamp(1.875rem,3.8vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#F5F5F4] text-balance"
            >
              Security questions? Talk to the team that built it.
            </RevealText>
            <FadeUp standalone delay={0.15}>
              <p className="max-w-[36rem] text-[1.0625rem] leading-[1.75] text-[#A8A29E]">
                Request our security documentation, start a vendor review, or report a vulnerability.
                We reply within two business days.
              </p>
            </FadeUp>
          </div>

          <Stagger className="grid grid-cols-1 gap-5 lg:col-span-6 sm:grid-cols-2">
            <FadeUp className="flex">
              <SpecCard tone="dark" className="flex w-full flex-col p-7">
                <IconTile
                  src="/security/shield-check.svg"
                  className="mb-6 border-white/[0.1] bg-white/[0.04] text-[#E4C090]"
                />
                <h3 className="mb-3 text-[1.1875rem] font-bold tracking-[-0.015em] text-[#F5F5F4]">Security review</h3>
                <p className="mb-7 text-[0.9375rem] leading-[1.7] text-[#A8A29E]">
                  Get our security overview, policies and questionnaire answers for your vendor assessment.
                </p>
                <BrandButton href={DOCS_EMAIL} arrow className="mt-auto self-start">
                  Request docs
                </BrandButton>
              </SpecCard>
            </FadeUp>
            <FadeUp className="flex">
              <SpecCard tone="dark" className="flex w-full flex-col p-7">
                <IconTile src="/security/bug.svg" className="mb-6 border-white/[0.1] bg-white/[0.04] text-[#E4C090]" />
                <h3 className="mb-3 text-[1.1875rem] font-bold tracking-[-0.015em] text-[#F5F5F4]">
                  Responsible disclosure
                </h3>
                <p className="mb-7 text-[0.9375rem] leading-[1.7] text-[#A8A29E]">
                  Found a vulnerability? Email us with the subject &ldquo;Security&rdquo; and give us reasonable
                  time to fix it before public disclosure.
                </p>
                <BrandButton href={SECURITY_EMAIL} variant="outline-dark" arrow className="mt-auto self-start">
                  Report an issue
                </BrandButton>
              </SpecCard>
            </FadeUp>
          </Stagger>
        </div>
      </Section>
    </PageShell>
  );
}
