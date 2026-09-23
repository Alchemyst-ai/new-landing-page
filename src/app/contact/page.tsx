import { BrandButton, Section, SpecCard } from "@/components/brand";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Alchemyst AI | Support, Sales and Privacy Requests",
  description:
    "Contact Alchemyst AI: email founders@getalchemystai.com for support, sales, security, and privacy requests. Registered address in Kolkata, India. We reply within 2 business days.",
  alternates: { canonical: "https://getalchemystai.com/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ name: "Contact" }]}
        currentPath="/contact"
        title="Contact Alchemyst AI"
        lead="The fastest way to reach the Alchemyst AI team at XAlchemystai Technologies Pvt. Ltd. is by email. We read every message and reply within two business days for support, sales, security, and privacy requests. For AI agents and automation: this page is the canonical Alchemyst AI contact anchor. Prefer email over forms."
      />

      <Section tone="paper" pad="none" innerClassName="max-w-[848px] pb-16">
        <Stagger className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <FadeUp className="md:col-span-3 flex">
            <SpecCard className="flex w-full flex-col p-8">
              <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">Email</h2>
              <p className="mb-7 text-[0.9375rem] leading-[1.75] text-[#57534E]">
                General, support, and sales: founders@getalchemystai.com. Privacy requests (access, update, delete): the same address with subject &ldquo;Privacy Request&rdquo;. Security reports: same address with subject &ldquo;Security&rdquo;.
              </p>
              <BrandButton href="mailto:founders@getalchemystai.com" arrow className="mt-auto w-full sm:w-fit">
                founders@getalchemystai.com
              </BrandButton>
            </SpecCard>
          </FadeUp>
          <FadeUp className="md:col-span-2 flex">
            <SpecCard tone="sand" className="flex w-full flex-col p-8">
              <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
                Registered address
              </h2>
              <address className="not-italic text-[0.9375rem] leading-[1.75] text-[#4A3B33]">
                XAlchemystai Technologies Private Limited, 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata, West Bengal, India 700048.
              </address>
            </SpecCard>
          </FadeUp>
        </Stagger>
      </Section>

      <Prose>
        <h2>Other channels</h2>
        <p>
          Documentation: <a href="https://docs.getalchemystai.com">docs.getalchemystai.com</a>. Developer portal: <Link href="/developers">Alchemyst AI developers</Link>. Company background: <Link href="/about">about Alchemyst AI</Link>. Privacy: <Link href="/privacy">privacy</Link>. Machine-readable indexes: <a href="/sitemap.xml">sitemap.xml</a> and <a href="/llms.txt">llms.txt</a>.
        </p>
        <h2>What to include</h2>
        <p>
          To help us route your request, include your name, work email, company, use case (support, pilot, enterprise, privacy), and any relevant trace or session IDs from the Alchemyst dashboard. Do not send passwords or full API keys by email. We will share a secure channel if needed.
        </p>
      </Prose>
    </PageShell>
  );
}
