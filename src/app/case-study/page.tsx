import { PageHero, PageShell } from "@/components/page";
import type { Metadata } from "next";

// Placeholder: content to follow.
export const metadata: Metadata = {
  title: "Case Studies",
  alternates: { canonical: "https://getalchemystai.com/case-study" },
  robots: { index: false, follow: true },
};

export default function CaseStudyPage() {
  return (
    <PageShell cta>
      <PageHero crumbs={[{ name: "Case Studies" }]} currentPath="/case-study" title="Case Studies" />
    </PageShell>
  );
}
