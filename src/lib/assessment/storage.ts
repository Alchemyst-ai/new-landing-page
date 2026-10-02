"use client";

import type { AssessmentInputs, GenerateResponse } from "@/lib/assessment/schema";
import { assessmentRequestSchema, generateResponseSchema } from "@/lib/assessment/schema";
import { buildAssessmentMarkdown } from "@/lib/assessment/markdown";

export const STORAGE_KEY = "alchemyst:assessment:v1";

export interface StoredAssessment {
  version: 1;
  inputs: AssessmentInputs;
  result: GenerateResponse;
  reportMarkdown: string;
  checked: Record<string, boolean>;
  updatedAt: string;
}

function isStorageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function loadAssessment(): StoredAssessment | null {
  if (!isStorageAvailable()) return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredAssessment;
    if (parsed.version !== 1) return null;
    const inputs = {
      ...parsed.inputs,
      answers: parsed.inputs.answers ?? {},
    };
    if (!assessmentRequestSchema.safeParse(inputs).success) return null;
    if (!generateResponseSchema.safeParse(parsed.result).success) return null;
    const checked: Record<string, boolean> = {};
    for (const item of parsed.result.checklist) {
      if (parsed.checked?.[item.id] === true) checked[item.id] = true;
    }
    let reportMarkdown = typeof parsed.reportMarkdown === "string" ? parsed.reportMarkdown : "";
    if (!reportMarkdown) {
      reportMarkdown = buildAssessmentMarkdown(
        { name: inputs.name, designation: inputs.designation, linkedin: inputs.linkedin },
        parsed.result.role,
        parsed.result.profile,
        parsed.result.checklist,
        parsed.result.case_study,
      );
    }
    return {
      version: 1,
      inputs: inputs as AssessmentInputs,
      result: parsed.result,
      reportMarkdown,
      checked,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveAssessment(stored: StoredAssessment): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    return true;
  } catch {
    return false;
  }
}

export function clearAssessment(): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable: ignore */
  }
}
