"use client";

import { CaseStudyCard } from "@/components/assessment/CaseStudyCard";
import { ChecklistCard } from "@/components/assessment/ChecklistCard";
import { EmailReportDialog } from "@/components/assessment/EmailReportDialog";
import { ReportView } from "@/components/assessment/ReportView";
import { ScoreCard } from "@/components/assessment/ScoreCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ROLE_LABELS } from "@/lib/assessment/schema";
import { scoreBand } from "@/lib/assessment/score";
import type { StoredAssessment } from "@/lib/assessment/storage";
import { AlertCircle, CircleCheck, Copy, Mail, Printer, RefreshCw, RotateCcw, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

/* ── Action bar ───────────────────────────────────────────────────────────── */

function ActionBar({
  stored,
  displayMarkdown,
  regenerating,
  onRegenerate,
  onStartOver,
}: {
  stored: StoredAssessment;
  displayMarkdown: string;
  regenerating: boolean;
  onRegenerate: () => void;
  onStartOver: () => void;
}) {
  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(displayMarkdown);
      toast.success("Copied as Markdown", { description: "Paste it into your notes, doc, or issue tracker." });
    } catch {
      toast.error("Could not copy", {
        description: "Open the Full report tab and select the text to copy it manually.",
      });
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        role="toolbar"
        aria-label="Report actions"
        className="assessment-no-print flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2"
      >
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer data-icon="inline-start" />
          Print / Save PDF
        </Button>
        <Button variant="outline" size="sm" onClick={copyMarkdown}>
          <Copy data-icon="inline-start" />
          Copy as Markdown
        </Button>
        <EmailReportDialog
          payload={{
            to: stored.inputs.email,
            name: stored.inputs.name,
            linkedin: stored.inputs.linkedin,
            designation: stored.inputs.designation,
            role: stored.result.role,
            profile: stored.result.profile,
            checklist: stored.result.checklist,
            checked: stored.checked,
            case_study: stored.result.case_study,
            reportMarkdown: displayMarkdown,
          }}
        >
          <Button variant="outline" size="sm">
            <Mail data-icon="inline-start" />
            Email report
          </Button>
        </EmailReportDialog>

        <Separator orientation="vertical" className="mx-1 hidden h-5 sm:block" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={onRegenerate} disabled={regenerating}>
              {regenerating ? (
                <Spinner data-icon="inline-start" aria-hidden="true" />
              ) : (
                <RefreshCw data-icon="inline-start" />
              )}
              {regenerating ? "Regenerating" : "Regenerate"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Same answers, fresh report. Ticks are kept for matching items.</TooltipContent>
        </Tooltip>

        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" disabled={regenerating}>
                  <RotateCcw data-icon="inline-start" />
                  Start over
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Clear this report and answer again.</TooltipContent>
          </Tooltip>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Start a new assessment?</DialogTitle>
              <DialogDescription>
                This clears the saved report and your checklist ticks from this browser. Copy or email the
                report first if you want to keep it.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Keep report</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={onStartOver}>
                  Clear and start over
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

/* ── Profile tab ──────────────────────────────────────────────────────────── */

function ProfileCard({ stored }: { stored: StoredAssessment }) {
  const { profile, role } = stored.result;
  return (
    <Card>
      <CardHeader>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {ROLE_LABELS[role]} profile
        </p>
        <CardTitle className="text-xl">{profile.archetype}</CardTitle>
        <CardDescription>Focus: {profile.focus_theme}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <p className="text-sm leading-relaxed">{profile.summary}</p>
        <div className="grid gap-6 md:grid-cols-2">
          <section aria-labelledby="profile-strengths" className="flex flex-col gap-2">
            <h3 id="profile-strengths" className="text-sm font-medium">
              Strengths
            </h3>
            <ItemGroup className="gap-2">
              {profile.strengths.map((strength) => (
                <Item key={strength} role="listitem" variant="outline" size="sm" className="items-start bg-background">
                  <ItemMedia variant="icon" className="text-primary">
                    <CircleCheck aria-hidden="true" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-none font-normal leading-relaxed">{strength}</ItemTitle>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </section>
          <section aria-labelledby="profile-risks" className="flex flex-col gap-2">
            <h3 id="profile-risks" className="text-sm font-medium">
              Risks
            </h3>
            <ItemGroup className="gap-2">
              {profile.risks.map((risk) => (
                <Item key={risk} role="listitem" variant="outline" size="sm" className="items-start bg-background">
                  <ItemMedia variant="icon" className="text-destructive">
                    <TriangleAlert aria-hidden="true" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-none font-normal leading-relaxed">{risk}</ItemTitle>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Result view ──────────────────────────────────────────────────────────── */

export function ResultView({
  stored,
  displayMarkdown,
  regenerating,
  regenerateError,
  onToggle,
  onReset,
  onRegenerate,
  onStartOver,
}: {
  stored: StoredAssessment;
  displayMarkdown: string;
  regenerating: boolean;
  regenerateError: string | null;
  onToggle: (id: string) => void;
  onReset: () => void;
  onRegenerate: () => void;
  onStartOver: () => void;
}) {
  const { profile, checklist, role, case_study } = stored.result;
  const doneCount = checklist.filter((item) => stored.checked[item.id]).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="assessment-print-only hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
          Context Assessment: {stored.inputs.name || stored.inputs.designation} ({stored.inputs.linkedin})
        </p>
        <p className="text-xs">Generated {new Date(stored.updatedAt).toLocaleDateString()}</p>
      </div>

      <ScoreCard
        score={profile.maturity_score}
        focusTheme={profile.focus_theme}
        role={role}
        archetype={profile.archetype}
      />

      <ActionBar
        stored={stored}
        displayMarkdown={displayMarkdown}
        regenerating={regenerating}
        onRegenerate={onRegenerate}
        onStartOver={onStartOver}
      />

      {regenerateError && !regenerating && (
        <Alert variant="destructive" className="assessment-no-print">
          <AlertCircle />
          <AlertTitle>Could not regenerate the report</AlertTitle>
          <AlertDescription>{regenerateError} Your current report is unchanged.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="checklist" className="assessment-tabs flex flex-col gap-4">
        <TabsList className="assessment-no-print w-full sm:w-fit">
          <TabsTrigger value="checklist">
            Checklist
            <Badge variant="secondary" className="ml-1 tabular-nums">
              {doneCount}/{checklist.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="report">Full report</TabsTrigger>
        </TabsList>
        <TabsContent value="checklist" forceMount className="data-[state=inactive]:hidden">
          <ChecklistCard checklist={checklist} checked={stored.checked} onToggle={onToggle} onReset={onReset} />
        </TabsContent>
        <TabsContent value="profile" forceMount className="data-[state=inactive]:hidden">
          <ProfileCard stored={stored} />
        </TabsContent>
        <TabsContent value="report" forceMount className="data-[state=inactive]:hidden">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Full report</CardTitle>
              <CardDescription>The same Markdown you get when you copy or email the report.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportView markdown={displayMarkdown} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CaseStudyCard
        caseStudy={case_study}
        score={profile.maturity_score}
        band={scoreBand(profile.maturity_score).band}
        focusTheme={profile.focus_theme}
      />
    </div>
  );
}

/* ── Loading skeleton shaped like the result ──────────────────────────────── */

export function ResultSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <Card>
        <CardHeader className="gap-4 sm:flex sm:flex-row sm:justify-between">
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-16 w-28" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
      <Skeleton className="h-11 w-full" />
      <Card>
        <CardContent className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex gap-3 rounded-lg border border-border p-3">
              <Skeleton className="size-4 shrink-0" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
