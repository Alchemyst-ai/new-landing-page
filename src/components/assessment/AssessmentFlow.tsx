"use client";

import { AssessmentStepper, stepNumber, type FlowStep } from "@/components/assessment/AssessmentStepper";
import { ChoiceField, QuestionField, TextInputField } from "@/components/assessment/QuestionField";
import { ResultSkeleton, ResultView } from "@/components/assessment/ResultView";
import { ReviewStep } from "@/components/assessment/ReviewStep";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { BRANCHES, FAMILIARITY_DESCRIPTIONS } from "@/lib/assessment/questions";
import {
  answersByRole,
  assessmentRequestSchema,
  FAMILIARITY_OPTIONS,
  identitySchema,
  ROLE_BY_FAMILIARITY,
  type AssessmentInputs,
  type GenerateApiResponse,
  type Role,
} from "@/lib/assessment/schema";
import { renderMarkdownWithTicks } from "@/lib/assessment/markdown";
import {
  clearAssessment,
  loadAssessment,
  saveAssessment,
  type StoredAssessment,
} from "@/lib/assessment/storage";
import { ArrowLeft, ArrowRight, History, Sparkles } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type IdentityInputs = {
  name: string;
  designation: string;
  linkedin: string;
  email: string;
  familiarity: string;
};

const EMPTY_INPUTS: IdentityInputs = { name: "", designation: "", linkedin: "", email: "", familiarity: "" };
const EMPTY_ANSWERS: Record<string, string | number> = {};

function issuesToErrors(issues: { path: readonly PropertyKey[]; message: string }[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[issue.path.length - 1] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

function roleFor(familiarity: string): Role | null {
  return familiarity === "managing" || familiarity === "building" || familiarity === "stakeholder"
    ? ROLE_BY_FAMILIARITY[familiarity]
    : null;
}

function identityFrom(stored: StoredAssessment): IdentityInputs {
  return {
    name: stored.inputs.name ?? "",
    designation: stored.inputs.designation,
    linkedin: stored.inputs.linkedin,
    email: stored.inputs.email,
    familiarity: stored.inputs.familiarity,
  };
}

async function requestReport(body: unknown): Promise<GenerateApiResponse> {
  const response = await fetch("/api/assessment/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.detail || data?.title || "Generation failed.");
  return data as GenerateApiResponse;
}

function toStored(
  inputs: AssessmentInputs,
  result: GenerateApiResponse,
  checked: Record<string, boolean>,
): StoredAssessment {
  return {
    version: 1,
    inputs,
    result: {
      assessmentId: result.assessmentId,
      role: result.role,
      profile: result.profile,
      checklist: result.checklist,
      case_study: result.case_study,
    },
    reportMarkdown: result.reportMarkdown,
    checked,
    updatedAt: new Date().toISOString(),
  };
}

/** Card frame shared by the three input steps. */
function StepCard({
  step,
  title,
  description,
  headingRef,
  children,
  footer,
  onSubmit,
}: {
  step: FlowStep;
  title: string;
  description: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  children: React.ReactNode;
  footer: React.ReactNode;
  onSubmit?: () => void;
}) {
  const number = stepNumber(step);
  const body = (
    <Card className="gap-0 py-0">
      <CardHeader className="gap-1.5 border-b border-border py-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Step {number} of 4
        </p>
        <CardTitle className="text-xl">
          <h2 ref={headingRef} tabIndex={-1} className="outline-none">
            {title}
          </h2>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="py-6">{children}</CardContent>
      <CardFooter className="flex-wrap justify-between gap-2">{footer}</CardFooter>
    </Card>
  );

  if (!onSubmit) return body;
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {body}
    </form>
  );
}

export function AssessmentFlow() {
  const [step, setStep] = useState<FlowStep>("identity");
  const [inputs, setInputs] = useState<IdentityInputs>(EMPTY_INPUTS);
  const [answers, setAnswers] = useState<Record<string, string | number>>(EMPTY_ANSWERS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stored, setStored] = useState<StoredAssessment | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateError, setRegenerateError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const saved = loadAssessment();
    if (saved) {
      setStored(saved);
      setShowResume(true);
    }
  }, []);

  // Move focus and scroll to the new step for keyboard and screen reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const role = roleFor(inputs.familiarity);
  const identityValid = useMemo(() => identitySchema.safeParse(inputs).success, [inputs]);
  const branchValid = useMemo(
    () => (role ? answersByRole[role].safeParse(answers).success : false),
    [role, answers],
  );

  const busy = submitting || regenerating;
  const reachable: Record<FlowStep, boolean> = {
    identity: !busy,
    branch: !busy && identityValid,
    review: !busy && identityValid && branchValid,
    result: !busy && !!stored,
  };
  const completed: Record<FlowStep, boolean> = {
    identity: identityValid,
    branch: identityValid && branchValid,
    review: identityValid && branchValid && !!stored,
    result: false,
  };

  const setInput = (key: keyof IdentityInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    if (key === "familiarity" && value !== inputs.familiarity) setAnswers(EMPTY_ANSWERS);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const setAnswer = (key: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const goTo = (next: FlowStep) => {
    setErrors({});
    setStep(next);
  };

  const goBranch = () => {
    const parsed = identitySchema.safeParse(inputs);
    if (!parsed.success) {
      setErrors(issuesToErrors(parsed.error.issues));
      return;
    }
    goTo("branch");
  };

  const goReview = () => {
    if (!role) return;
    const parsed = answersByRole[role].safeParse(answers);
    if (!parsed.success) {
      setErrors(issuesToErrors(parsed.error.issues));
      return;
    }
    goTo("review");
  };

  const submit = async () => {
    if (submitting) return;
    const parsed = assessmentRequestSchema.safeParse({ ...inputs, answers });
    if (!parsed.success) {
      setErrors(issuesToErrors(parsed.error.issues));
      setStep(identitySchema.safeParse(inputs).success ? "branch" : "identity");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fullInputs = { ...inputs, answers } as AssessmentInputs;
      const result = await requestReport(fullInputs);
      const next = toStored(fullInputs, result, {});
      saveAssessment(next);
      setStored(next);
      setShowResume(false);
      setStep("result");
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : "Generation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = (id: string) => {
    if (!stored) return;
    const checked = { ...stored.checked, [id]: !stored.checked[id] };
    if (!checked[id]) delete checked[id];
    const next: StoredAssessment = { ...stored, checked, updatedAt: new Date().toISOString() };
    saveAssessment(next);
    setStored(next);
  };

  const resetTicks = () => {
    if (!stored) return;
    const next: StoredAssessment = { ...stored, checked: {}, updatedAt: new Date().toISOString() };
    saveAssessment(next);
    setStored(next);
    toast("Ticks reset", { description: "Your checklist is back to zero." });
  };

  const resume = () => {
    if (!stored) return;
    setInputs(identityFrom(stored));
    setAnswers(stored.inputs.answers);
    setShowResume(false);
    goTo("result");
  };

  const startOver = () => {
    clearAssessment();
    setStored(null);
    setShowResume(false);
    setInputs(EMPTY_INPUTS);
    setAnswers(EMPTY_ANSWERS);
    setErrors({});
    setSubmitError(null);
    setRegenerateError(null);
    goTo("identity");
  };

  const regenerate = async () => {
    if (!stored || regenerating) return;
    const previous = { ...stored.checked };
    setInputs(identityFrom(stored));
    setAnswers(stored.inputs.answers);
    setRegenerating(true);
    setRegenerateError(null);
    try {
      const result = await requestReport(stored.inputs);
      const kept: Record<string, boolean> = {};
      for (const item of result.checklist) {
        if (previous[item.id]) kept[item.id] = true;
      }
      const next = toStored(stored.inputs, result, kept);
      saveAssessment(next);
      setStored(next);
      toast.success("Report regenerated", {
        description: Object.keys(kept).length
          ? `Kept ${Object.keys(kept).length} ticks for matching items.`
          : "Fresh checklist ready.",
      });
    } catch (cause) {
      setRegenerateError(cause instanceof Error ? cause.message : "Generation failed.");
    } finally {
      setRegenerating(false);
    }
  };

  const displayMarkdown = stored
    ? renderMarkdownWithTicks(stored.reportMarkdown, stored.result.checklist, stored.checked)
    : "";

  const branch = role ? BRANCHES[role] : null;

  return (
    <div ref={rootRef} className="flex scroll-mt-28 flex-col gap-8">
      {showResume && stored && step !== "result" && (
        <Alert className="assessment-no-print bg-card">
          <History />
          <AlertTitle>Welcome back</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-3">
            <p>
              You have a saved assessment: <span className="font-medium text-foreground">{stored.result.profile.archetype}</span>{" "}
              ({Math.round(stored.result.profile.maturity_score)}/100).
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={resume}>
                Resume last assessment
              </Button>
              <Button size="sm" variant="outline" onClick={startOver}>
                Start fresh
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <AssessmentStepper
        step={step}
        reachable={reachable}
        completed={completed}
        loading={submitting}
        onStepChange={goTo}
      />

      {step === "identity" && (
        <StepCard
          step="identity"
          title="About you"
          description="We use this to tailor the report and send it to you. Nothing here is stored on our side."
          headingRef={headingRef}
          onSubmit={goBranch}
          footer={
            <>
              <span className="text-xs text-muted-foreground">About 3 minutes in total.</span>
              <Button type="submit">
                Continue
                <ArrowRight data-icon="inline-end" />
              </Button>
            </>
          }
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInputField
                id="assessment-name"
                label="Full name (optional)"
                autoComplete="name"
                value={inputs.name}
                onChange={(e) => setInput("name", e.target.value)}
                placeholder="Ada Lovelace"
                error={errors.name}
              />
              <TextInputField
                id="assessment-designation"
                label="What is your designation?"
                autoComplete="organization-title"
                value={inputs.designation}
                onChange={(e) => setInput("designation", e.target.value)}
                placeholder="Senior Platform Engineer"
                error={errors.designation}
              />
              <TextInputField
                id="assessment-linkedin"
                label="What is your LinkedIn?"
                hint="Paste your linkedin.com/in profile URL."
                inputMode="url"
                autoComplete="url"
                value={inputs.linkedin}
                onChange={(e) => setInput("linkedin", e.target.value)}
                placeholder="linkedin.com/in/your-name"
                error={errors.linkedin}
              />
              <TextInputField
                id="assessment-email"
                label="What is your email address?"
                hint="Professional domain based emails only."
                type="email"
                autoComplete="email"
                value={inputs.email}
                onChange={(e) => setInput("email", e.target.value)}
                placeholder="you@company.com"
                error={errors.email}
              />
            </div>
            <FieldSeparator />
            <ChoiceField
              name="familiarity"
              legend="What is your familiarity with writing GenAI agents in your team?"
              hint="This picks the next four questions."
              options={FAMILIARITY_OPTIONS.map((o) => ({
                value: o.label,
                description: FAMILIARITY_DESCRIPTIONS[o.value],
              }))}
              value={FAMILIARITY_OPTIONS.find((o) => o.value === inputs.familiarity)?.label ?? ""}
              onChange={(label) => {
                const found = FAMILIARITY_OPTIONS.find((o) => o.label === label);
                if (found) setInput("familiarity", found.value);
              }}
              error={errors.familiarity}
            />
          </FieldGroup>
        </StepCard>
      )}

      {step === "branch" && branch && (
        <StepCard
          step="branch"
          title={branch.title}
          description={branch.description}
          headingRef={headingRef}
          onSubmit={goReview}
          footer={
            <>
              <Button type="button" variant="outline" onClick={() => goTo("identity")}>
                <ArrowLeft data-icon="inline-start" />
                Back
              </Button>
              <Button type="submit">
                Review answers
                <ArrowRight data-icon="inline-end" />
              </Button>
            </>
          }
        >
          <FieldGroup>
            {branch.questions.map((question, index) => (
              <Fragment key={question.key}>
                {index > 0 && <FieldSeparator />}
                <QuestionField question={question} answers={answers} errors={errors} onAnswer={setAnswer} />
              </Fragment>
            ))}
          </FieldGroup>
        </StepCard>
      )}

      {step === "review" && role && (
        <>
          <StepCard
            step="review"
            title="Review your answers"
            description="Check everything looks right, then generate your personalized report."
            headingRef={headingRef}
            footer={
              <>
                <Button variant="outline" onClick={() => goTo("branch")} disabled={submitting}>
                  <ArrowLeft data-icon="inline-start" />
                  Back
                </Button>
                <Button onClick={submit} disabled={submitting}>
                  {submitting ? (
                    <Spinner data-icon="inline-start" aria-hidden="true" />
                  ) : (
                    <Sparkles data-icon="inline-start" />
                  )}
                  {submitting ? "Generating report" : "Generate my report"}
                </Button>
              </>
            }
          >
            <ReviewStep
              inputs={inputs}
              answers={answers}
              role={role}
              submitting={submitting}
              submitError={submitError}
              onEditIdentity={() => goTo("identity")}
              onEditBranch={() => goTo("branch")}
              onRetry={submit}
            />
          </StepCard>
          {submitting && <ResultSkeleton />}
        </>
      )}

      {step === "result" && stored && (
        <section aria-labelledby="assessment-result-heading" className="flex flex-col gap-6">
          <h2 id="assessment-result-heading" ref={headingRef} tabIndex={-1} className="sr-only">
            Your Context Assessment report
          </h2>
          <ResultView
            stored={stored}
            displayMarkdown={displayMarkdown}
            regenerating={regenerating}
            regenerateError={regenerateError}
            onToggle={toggle}
            onReset={resetTicks}
            onRegenerate={regenerate}
            onStartOver={startOver}
          />
        </section>
      )}
    </div>
  );
}
