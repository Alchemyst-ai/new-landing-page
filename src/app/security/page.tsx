import { PageHero, PageShell } from "@/components/page";
import type { Metadata } from "next";

// Placeholder: content to follow.
export const metadata: Metadata = {
  title: "Security",
  alternates: { canonical: "https://getalchemystai.com/security" },
  robots: { index: false, follow: true },
};

export default function SecurityPage() {
  return (
    <PageShell cta>
      <PageHero crumbs={[{ name: "Security" }]} currentPath="/security" title="Security" />
    </PageShell>
  );
}
