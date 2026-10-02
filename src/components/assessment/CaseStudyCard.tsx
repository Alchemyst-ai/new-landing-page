"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveCaseStudy } from "@/lib/assessment/caseStudyMatch";
import type { CaseStudyRef } from "@/lib/assessment/schema";
import { caseStudyPath } from "@/lib/caseStudies";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CaseStudyCard({
  caseStudy,
  score,
  band,
  focusTheme,
}: {
  caseStudy: CaseStudyRef;
  score: number;
  band: string;
  focusTheme: string;
}) {
  const study = resolveCaseStudy(caseStudy.slug, "");
  return (
    <Card>
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Closest customer story
          </p>
          <Badge variant="outline">{study.industry}</Badge>
        </div>
        <CardTitle className="text-xl">See how {study.shortLabel} did it</CardTitle>
        <CardDescription className="leading-relaxed">
          Scored {Math.round(score)} ({band}). Teams at this stage usually stall on {focusTheme}.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-4 rounded-lg border border-border bg-background p-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <p className="flex flex-col">
            <span className="text-3xl font-bold leading-none tabular-nums text-primary">{study.heroMetric}</span>
            <span className="mt-1 text-xs text-muted-foreground">{study.heroMetricLabel}</span>
          </p>
          <p className="text-sm font-medium leading-snug sm:border-l sm:border-border sm:pl-4">{study.h1}</p>
        </div>
        <p className="text-sm leading-relaxed">
          <span className="font-medium">Why this matches: </span>
          <span className="text-muted-foreground">{caseStudy.reason}</span>
        </p>
      </CardContent>
      <CardFooter className="assessment-no-print">
        <Button asChild variant="outline" size="sm">
          <Link href={caseStudyPath(study.slug)}>
            Read the {study.shortLabel} story
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
