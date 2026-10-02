"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ChoiceOption, Question } from "@/lib/assessment/questions";
import { cn } from "@/lib/utils";

function slug(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "").toLowerCase();
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && !error ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

/* ── Plain text input (identity step) ─────────────────────────────────────── */

export function TextInputField({
  id,
  label,
  hint,
  error,
  ...inputProps
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & Omit<React.ComponentProps<typeof Input>, "id">) {
  return (
    <Field data-invalid={!!error || undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...inputProps}
      />
      {hint && !error && <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription>}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </Field>
  );
}

/* ── Long text with a character counter ───────────────────────────────────── */

export function TextareaField({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  rows,
  max,
  placeholder,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  max: number;
  placeholder?: string;
}) {
  const remaining = max - value.length;
  const nearLimit = remaining <= Math.max(50, Math.round(max * 0.1));
  return (
    <Field data-invalid={!!error || undefined}>
      <FieldLabel htmlFor={id} className="leading-relaxed">
        {label}
      </FieldLabel>
      {hint && !error && <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription>}
      <InputGroup>
        <InputGroupTextarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={rows}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, hint, error)}
          className="min-h-0"
        />
        <InputGroupAddon align="block-end" className="justify-end">
          <InputGroupText
            aria-live="polite"
            className={cn("font-mono text-[11px] tabular-nums", remaining < 0 && "text-destructive")}
          >
            {nearLimit ? `${Math.max(remaining, 0)} left` : `${value.length} / ${max}`}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </Field>
  );
}

/* ── Choice group as selectable option cards ──────────────────────────────── */

export function ChoiceField({
  name,
  legend,
  hint,
  options,
  value,
  onChange,
  error,
  layout = "list",
  children,
}: {
  name: string;
  legend: string;
  hint?: string;
  options: ChoiceOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  layout?: "list" | "scale";
  children?: React.ReactNode;
}) {
  const legendId = `${name}-legend`;
  return (
    <FieldSet data-invalid={!!error || undefined}>
      <FieldLegend id={legendId} variant="label" className="leading-relaxed">
        {legend}
      </FieldLegend>
      {hint && <FieldDescription>{hint}</FieldDescription>}
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        aria-labelledby={legendId}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(layout === "scale" ? "grid-cols-1 sm:grid-cols-5" : "grid-cols-1")}
      >
        {options.map((option) => {
          const id = `${name}-${slug(option.value)}`;
          return (
            <FieldLabel
              key={option.value}
              htmlFor={id}
              className={cn(
                "cursor-pointer border-input bg-background transition-colors",
                error && "border-destructive/60",
              )}
            >
              <Field
                orientation="horizontal"
                className={cn(layout === "scale" && "sm:h-full sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:text-center")}
              >
                <RadioGroupItem id={id} value={option.value} aria-invalid={!!error} />
                <FieldContent className={cn(layout === "scale" && "sm:flex-none")}>
                  <FieldTitle className={cn("font-normal", layout === "scale" && "sm:w-full sm:justify-center")}>
                    {option.value}
                  </FieldTitle>
                  {option.description && (
                    <FieldDescription className="text-xs">{option.description}</FieldDescription>
                  )}
                </FieldContent>
              </Field>
            </FieldLabel>
          );
        })}
      </RadioGroup>
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
      {children}
    </FieldSet>
  );
}

/* ── Config driven renderer for branch questions ──────────────────────────── */

export function QuestionField({
  question,
  answers,
  errors,
  onAnswer,
}: {
  question: Question;
  answers: Record<string, string | number>;
  errors: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
}) {
  const value = String(answers[question.key] ?? "");
  const id = `assessment-${slug(question.key)}`;

  if (question.kind === "text") {
    return (
      <TextareaField
        id={id}
        label={question.label}
        hint={question.hint}
        error={errors[question.key]}
        value={value}
        onChange={(next) => onAnswer(question.key, next)}
        rows={question.rows}
        max={question.max}
        placeholder={question.placeholder}
      />
    );
  }

  if (question.kind === "number") {
    const error = errors[question.key];
    return (
      <Field data-invalid={!!error || undefined}>
        <FieldLabel htmlFor={id} className="leading-relaxed">
          {question.label}
        </FieldLabel>
        {question.hint && !error && <FieldDescription id={`${id}-hint`}>{question.hint}</FieldDescription>}
        <InputGroup className="max-w-48">
          <InputGroupInput
            id={id}
            inputMode="decimal"
            value={value}
            onChange={(event) => onAnswer(question.key, event.target.value)}
            placeholder={question.placeholder}
            aria-invalid={!!error}
            aria-describedby={describedBy(id, question.hint, error)}
            className="tabular-nums"
          />
          {question.suffix && (
            <InputGroupAddon align="inline-end">
              <InputGroupText>{question.suffix}</InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
        {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
      </Field>
    );
  }

  const custom = question.custom;
  return (
    <ChoiceField
      name={question.key}
      legend={question.label}
      hint={question.hint}
      options={question.options}
      value={value}
      onChange={(next) => onAnswer(question.key, next)}
      error={errors[question.key]}
      layout={question.layout}
    >
      {custom && value === custom.when && (
        <TextareaField
          id={`assessment-${slug(custom.key)}`}
          label={custom.label}
          error={errors[custom.key]}
          value={String(answers[custom.key] ?? "")}
          onChange={(next) => onAnswer(custom.key, next)}
          rows={3}
          max={custom.max}
        />
      )}
    </ChoiceField>
  );
}
