"use client";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type FlowStep = "identity" | "branch" | "review" | "result";

export const FLOW_STEPS: { step: FlowStep; title: string; description: string }[] = [
  { step: "identity", title: "About you", description: "Role and contact" },
  { step: "branch", title: "Your setup", description: "Four questions" },
  { step: "review", title: "Review", description: "Check and submit" },
  { step: "result", title: "Report", description: "Score and checklist" },
];

export function stepNumber(step: FlowStep) {
  return FLOW_STEPS.findIndex((s) => s.step === step) + 1;
}

export function AssessmentStepper({
  step,
  reachable,
  completed,
  loading,
  onStepChange,
}: {
  step: FlowStep;
  /** Steps the user may jump to right now. */
  reachable: Record<FlowStep, boolean>;
  /** Steps that show a check mark. */
  completed: Record<FlowStep, boolean>;
  loading?: boolean;
  onStepChange: (step: FlowStep) => void;
}) {
  return (
    <Stepper
      value={stepNumber(step)}
      onValueChange={(value) => {
        const next = FLOW_STEPS[value - 1];
        if (next && reachable[next.step]) onStepChange(next.step);
      }}
      indicators={{
        completed: <Check className="size-3.5" aria-hidden="true" />,
        loading: <Spinner className="size-3.5" aria-label="Generating report" />,
      }}
      aria-label="Assessment progress"
      className="assessment-no-print"
    >
      <StepperNav className="gap-0">
        {FLOW_STEPS.map((item, index) => {
          const number = index + 1;
          const isLast = index === FLOW_STEPS.length - 1;
          return (
            <StepperItem
              key={item.step}
              step={number}
              completed={completed[item.step] && item.step !== step}
              disabled={!reachable[item.step] && item.step !== step}
              loading={loading && item.step === step}
              className="relative items-start"
            >
              <StepperTrigger
                className="flex flex-col items-start gap-2 rounded-md text-left sm:flex-row sm:items-center sm:gap-2.5"
                aria-label={`Step ${number}: ${item.title}`}
              >
                <StepperIndicator className="size-7 font-mono text-[11px] font-semibold data-[state=inactive]:border data-[state=inactive]:border-border data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground">
                  {number}
                </StepperIndicator>
                <div className="flex flex-col gap-1">
                  <StepperTitle
                    className={cn(
                      "text-xs sm:text-sm",
                      "data-[state=inactive]:text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </StepperTitle>
                  <StepperDescription className="hidden text-xs md:block">
                    {item.description}
                  </StepperDescription>
                </div>
              </StepperTrigger>
              {!isLast && (
                <StepperSeparator className="mx-3 mt-3.5 bg-border group-data-[state=completed]/step:bg-primary sm:mt-0 sm:self-center" />
              )}
            </StepperItem>
          );
        })}
      </StepperNav>
    </Stepper>
  );
}
