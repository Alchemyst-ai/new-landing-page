// Declarative questionnaire config. Drives both the branch step form and the
// review step labels, so copy lives in one place. Validation stays in
// schema.ts; limits here only drive character counters.

import {
  BOTTLENECK_OPTIONS,
  COLLABORATION_OPTIONS,
  LIKERT_OPTIONS,
  SELF_IMPROVE_OPTIONS,
  TRACKING_OPTIONS,
  type Familiarity,
  type Role,
} from "@/lib/assessment/schema";

export type ChoiceOption = { value: string; description?: string };

export type TextQuestion = {
  kind: "text";
  key: string;
  label: string;
  hint?: string;
  placeholder?: string;
  rows: number;
  max: number;
};

export type NumberQuestion = {
  kind: "number";
  key: string;
  label: string;
  hint?: string;
  placeholder?: string;
  suffix?: string;
};

export type ChoiceQuestion = {
  kind: "choice";
  key: string;
  label: string;
  hint?: string;
  layout: "list" | "scale";
  options: ChoiceOption[];
  custom?: { when: string; key: string; label: string; max: number };
};

export type Question = TextQuestion | NumberQuestion | ChoiceQuestion;

export type BranchConfig = {
  title: string;
  description: string;
  questions: Question[];
};

const plain = (values: readonly string[]): ChoiceOption[] => values.map((value) => ({ value }));

const TRACKING_DESCRIPTIONS: Record<(typeof TRACKING_OPTIONS)[number], string> = {
  "Nothing whatsoever": "No record of what context an agent saw or produced.",
  "Basic logging": "Prompts and outputs are logged, but rarely reviewed.",
  "Full scale observability": "Traces, context lineage, and evaluations per run.",
};

const trackingOptions = TRACKING_OPTIONS.map((value) => ({
  value,
  description: TRACKING_DESCRIPTIONS[value],
}));

export const FAMILIARITY_DESCRIPTIONS: Record<Familiarity, string> = {
  building: "You write, ship, or maintain agents yourself.",
  managing: "You lead a team that builds or runs agents.",
  stakeholder: "You own AI strategy, budget, or business outcomes.",
};

export const BRANCHES: Record<Role, BranchConfig> = {
  builder: {
    title: "Your setup as a builder",
    description: "Four questions on trust, collaboration, and how your agents learn.",
    questions: [
      {
        kind: "text",
        key: "blocker",
        label:
          "What is your current biggest blocker from trusting the AI agent(s) you (or your team) build?",
        hint: "A sentence or two is enough.",
        placeholder: "Agents forget decisions from earlier runs, so we re-check every output.",
        rows: 4,
        max: 1000,
      },
      {
        kind: "choice",
        key: "collaboration",
        label: "How do your agents collaborate with one another?",
        layout: "list",
        options: plain(COLLABORATION_OPTIONS),
        custom: {
          when: "Write a custom answer",
          key: "collaboration_custom",
          label: "Describe your setup",
          max: 500,
        },
      },
      {
        kind: "choice",
        key: "tracking",
        label: "How do you track the context that your AI agent works on, everyday?",
        layout: "list",
        options: trackingOptions,
      },
      {
        kind: "choice",
        key: "self_improve",
        label: "Can your tracking allow the agents to self-improve?",
        layout: "list",
        options: plain(SELF_IMPROVE_OPTIONS),
      },
    ],
  },
  manager: {
    title: "Your setup as a manager",
    description: "Four questions on shipping speed, coordination, and visibility.",
    questions: [
      {
        kind: "choice",
        key: "ship_slower",
        label: "How often do you feel your team is shipping AI agents slower?",
        layout: "scale",
        options: plain(LIKERT_OPTIONS),
      },
      {
        kind: "choice",
        key: "coordination_pain",
        label:
          "How often do you feel the lack of coordination of AI agents hamper you and/or your team?",
        layout: "scale",
        options: plain(LIKERT_OPTIONS),
      },
      {
        kind: "choice",
        key: "bottleneck",
        label: "What do you think is the biggest bottleneck for coordinating AI agents?",
        layout: "list",
        options: plain(BOTTLENECK_OPTIONS),
        custom: {
          when: "None of the above",
          key: "bottleneck_custom",
          label: "Describe the bottleneck",
          max: 500,
        },
      },
      {
        kind: "choice",
        key: "team_tracking",
        label: "How does your team currently track agent context?",
        layout: "list",
        options: trackingOptions,
      },
    ],
  },
  stakeholder: {
    title: "Your setup as a stakeholder",
    description: "Four questions on strategy, goals, and return on investment.",
    questions: [
      {
        kind: "text",
        key: "strategy_state",
        label: "What is the current state of your AI transformation strategy?",
        hint: "One to three sentences. Pilot, scaling, stalled, and similar.",
        rows: 4,
        max: 1000,
      },
      {
        kind: "text",
        key: "strategy_goal",
        label: "What is the first goal of your AI transformation strategy?",
        rows: 3,
        max: 500,
      },
      {
        kind: "number",
        key: "roi_pct",
        label:
          "How much RoI (in percentage) are you able to derive out of your current quarter's budget?",
        hint: "If none or not available, write 0.",
        placeholder: "0",
        suffix: "%",
      },
      {
        kind: "text",
        key: "roi_timeline",
        label:
          "What does your timeline look for attaining greater than 125% RoI over your AI transformation initiatives?",
        hint: "Example: Q2 2027, or no fixed timeline yet.",
        rows: 3,
        max: 500,
      },
    ],
  },
};

/** Flat key to label map, including conditional custom answers. */
export function answerLabels(role: Role): Record<string, string> {
  const labels: Record<string, string> = {};
  for (const question of BRANCHES[role].questions) {
    labels[question.key] = question.label;
    if (question.kind === "choice" && question.custom) {
      labels[question.custom.key] = question.custom.label;
    }
  }
  return labels;
}
