import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { PageBody, PageHero, PageShell } from "@/components/page";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "Context Assessment | Alchemyst AI",
  description:
    "Answer 8 questions about how your team builds, coordinates, and measures AI agents. Get a personalized context maturity profile and checklist.",
  robots: { index: false, follow: false },
};

export default function AssessmentPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ name: "Assessment" }]}
        currentPath="/assessment"
        eyebrow="Context Assessment"
        title="How mature is your agent context?"
        lead="Answer 8 questions about how your team builds, coordinates, and measures AI agents. You get a personalized maturity score, a profile, and a checklist you can keep."
        meta="8 questions, about 3 minutes, no signup"
        width="narrow"
      />
      <PageBody width="narrow">
        <AssessmentFlow />
      </PageBody>
      <Toaster theme="light" position="bottom-center" />
    </PageShell>
  );
}
