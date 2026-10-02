"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { answerLabels } from "@/lib/assessment/questions";
import { FAMILIARITY_OPTIONS, ROLE_LABELS, type Role } from "@/lib/assessment/schema";
import { AlertCircle, Pencil } from "lucide-react";

type Row = { label: string; value: string };

function ReviewSection({
  title,
  rows,
  onEdit,
  disabled,
}: {
  title: string;
  rows: Row[];
  onEdit: () => void;
  disabled?: boolean;
}) {
  return (
    <section aria-label={title} className="flex flex-col gap-2">
      <ItemHeader>
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </h3>
        <Button variant="ghost" size="sm" onClick={onEdit} disabled={disabled}>
          <Pencil data-icon="inline-start" />
          Edit
        </Button>
      </ItemHeader>
      <ItemGroup className="gap-0 rounded-lg border border-border bg-background">
        {rows.map((row, index) => (
          <Item
            key={row.label}
            role="listitem"
            size="sm"
            className={index > 0 ? "rounded-none border-t border-t-border" : "rounded-b-none"}
          >
            <ItemContent className="gap-1">
              <ItemDescription className="line-clamp-none text-xs">{row.label}</ItemDescription>
              <ItemTitle className="line-clamp-none w-full whitespace-pre-wrap break-words font-normal">
                {row.value}
              </ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </section>
  );
}

export function ReviewStep({
  inputs,
  answers,
  role,
  submitting,
  submitError,
  onEditIdentity,
  onEditBranch,
  onRetry,
}: {
  inputs: { name: string; designation: string; linkedin: string; email: string; familiarity: string };
  answers: Record<string, string | number>;
  role: Role;
  submitting: boolean;
  submitError: string | null;
  onEditIdentity: () => void;
  onEditBranch: () => void;
  onRetry: () => void;
}) {
  const familiarity = FAMILIARITY_OPTIONS.find((o) => o.value === inputs.familiarity)?.label;
  const identityRows: Row[] = [
    ...(inputs.name ? [{ label: "Name", value: inputs.name }] : []),
    { label: "Designation", value: inputs.designation },
    { label: "LinkedIn", value: inputs.linkedin },
    { label: "Work email", value: inputs.email },
    { label: "Familiarity", value: `${familiarity ?? inputs.familiarity} (${ROLE_LABELS[role]})` },
  ];

  const labels = answerLabels(role);
  const branchRows: Row[] = Object.keys(labels)
    .filter((key) => String(answers[key] ?? "").trim().length > 0)
    .map((key) => ({
      label: labels[key],
      value: key === "roi_pct" ? `${answers[key]}%` : String(answers[key]),
    }));

  return (
    <div className="flex flex-col gap-6">
      <ReviewSection title="About you" rows={identityRows} onEdit={onEditIdentity} disabled={submitting} />
      <ReviewSection title="Your setup" rows={branchRows} onEdit={onEditBranch} disabled={submitting} />
      {submitError && !submitting && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>We could not generate your report</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-3">
            <p>{submitError} Your answers are still here.</p>
            <Button size="sm" variant="outline" onClick={onRetry}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {submitting && (
        <Item variant="muted" role="status" aria-live="polite">
          <ItemActions>
            <Spinner aria-hidden="true" />
          </ItemActions>
          <ItemContent>
            <ItemTitle>Generating your report</ItemTitle>
            <ItemDescription>
              Scoring your answers and building a checklist. This usually takes upto 2 minutes.
            </ItemDescription>
          </ItemContent>
        </Item>
      )}
    </div>
  );
}
