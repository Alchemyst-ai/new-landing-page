import { z } from "zod";

/* ── Role mapping ─────────────────────────────────────────────────────────── */

export const FAMILIARITY_OPTIONS = [
  { value: "managing", label: "Managing (not building)" },
  { value: "building", label: "Building on it everyday" },
  { value: "stakeholder", label: "High level stakeholder" },
] as const;

export type Familiarity = (typeof FAMILIARITY_OPTIONS)[number]["value"];

export const ROLE_BY_FAMILIARITY: Record<Familiarity, Role> = {
  managing: "manager",
  building: "builder",
  stakeholder: "stakeholder",
};

export type Role = "builder" | "manager" | "stakeholder";

export const ROLE_LABELS: Record<Role, string> = {
  builder: "Builder",
  manager: "Manager",
  stakeholder: "Stakeholder",
};

/* ── Shared option sets ───────────────────────────────────────────────────── */

export const LIKERT_OPTIONS = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Almost always",
] as const;

export const TRACKING_OPTIONS = [
  "Nothing whatsoever",
  "Basic logging",
  "Full scale observability",
] as const;

export const SELF_IMPROVE_OPTIONS = ["Yes", "No", "Not sure"] as const;

export const COLLABORATION_OPTIONS = [
  "They do not collaborate",
  "Custom orchestration code",
  "Message passing / A2A / MCP",
  "Shared memory or context layer",
  "Write a custom answer",
] as const;

export const BOTTLENECK_OPTIONS = [
  "I am not sure",
  "I don't trust it",
  "It can't collaborate",
  "None of the above",
] as const;

const CUSTOM_COLLABORATION = "Write a custom answer";
const CUSTOM_BOTTLENECK = "None of the above";

/* ── Identity validation ──────────────────────────────────────────────────── */

const FREE_EMAIL_DOMAINS = new Set(
  [
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "yahoo.co.in",
    "yahoo.co.uk",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "msn.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "proton.me",
    "protonmail.com",
    "aol.com",
    "gmx.com",
    "gmx.de",
    "yandex.com",
    "zoho.com",
    "mail.com",
    "inbox.com",
  ].map((d) => d.toLowerCase()),
);

export function emailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;
  return email.slice(at + 1).trim().toLowerCase();
}

export function isWorkEmail(email: string): boolean {
  const domain = emailDomain(email);
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain);
}

/** Normalize a LinkedIn input to a canonical URL, or null when invalid. */
export function normalizeLinkedin(raw: string): string | null {
  const trimmed = raw.trim().replace(/\s+/g, "");
  if (!trimmed) return null;
  const withHost = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed.replace(/^\/+/, "")}`;
  let url: URL;
  try {
    url = new URL(withHost);
  } catch {
    return null;
  }
  if (!/^(www\.)?linkedin\.com$/i.test(url.hostname)) return null;
  const match = url.pathname.match(/^\/in\/([A-Za-z0-9\-_%.]+)\/?$/);
  if (!match) return null;
  return `https://www.linkedin.com/in/${match[1]}/`;
}

const emailField = z
  .string()
  .trim()
  .min(1, "Work email is required.")
  .email("Enter a valid email address.")
  .max(254, "Email is too long.")
  .refine((value) => isWorkEmail(value), {
    message: "Please use your work email. Free email providers are not accepted.",
  })
  .transform((value) => value.toLowerCase());

const linkedinField = z
  .string()
  .trim()
  .min(1, "LinkedIn profile is required.")
  .max(300, "LinkedIn URL is too long.")
  .refine((value) => normalizeLinkedin(value) !== null, {
    message: "Enter a valid LinkedIn profile URL, e.g. linkedin.com/in/your-name.",
  })
  .transform((value) => normalizeLinkedin(value) as string);

export const identitySchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, "Name is too long.")
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  designation: z
    .string()
    .trim()
    .min(2, "Designation is required.")
    .max(100, "Designation is too long."),
  linkedin: linkedinField,
  email: emailField,
  familiarity: z.enum(["managing", "building", "stakeholder"], {
    message: "Choose the option closest to your role.",
  }),
});

export type AssessmentInputs = z.infer<typeof identitySchema> & {
  answers: Record<string, string | number>;
};

/* ── Branch answers ───────────────────────────────────────────────────────── */

const longText = (min: number, max: number, requiredMessage: string) =>
  z.string().trim().min(min, requiredMessage).max(max, `Keep it under ${max} characters.`);

const builderAnswersSchema = z
  .object({
    blocker: longText(10, 1000, "Describe your biggest blocker in at least 10 characters."),
    collaboration: z.enum(COLLABORATION_OPTIONS as unknown as [string, ...string[]], {
      message: "Choose how your agents collaborate.",
    }),
    collaboration_custom: z.string().trim().max(500).optional().default(""),
    tracking: z.enum(TRACKING_OPTIONS as unknown as [string, ...string[]], {
      message: "Choose how you track agent context.",
    }),
    self_improve: z.enum(SELF_IMPROVE_OPTIONS as unknown as [string, ...string[]], {
      message: "Choose whether your tracking enables self-improvement.",
    }),
  })
  .refine(
    (data) =>
      data.collaboration !== CUSTOM_COLLABORATION || data.collaboration_custom.trim().length >= 3,
    {
      message: "Describe your custom collaboration setup.",
      path: ["collaboration_custom"],
    },
  );

const likert = z.enum(LIKERT_OPTIONS as unknown as [string, ...string[]], {
  message: "Choose a frequency.",
});

const managerAnswersSchema = z
  .object({
    ship_slower: likert,
    coordination_pain: likert,
    bottleneck: z.enum(BOTTLENECK_OPTIONS as unknown as [string, ...string[]], {
      message: "Choose the biggest bottleneck.",
    }),
    bottleneck_custom: z.string().trim().max(500).optional().default(""),
    team_tracking: z.enum(TRACKING_OPTIONS as unknown as [string, ...string[]], {
      message: "Choose how your team tracks agent context.",
    }),
  })
  .refine(
    (data) =>
      data.bottleneck !== CUSTOM_BOTTLENECK || data.bottleneck_custom.trim().length >= 3,
    {
      message: "Describe the bottleneck in your own words.",
      path: ["bottleneck_custom"],
    },
  );

const stakeholderAnswersSchema = z.object({
  strategy_state: longText(10, 1000, "Describe your AI transformation state in at least 10 characters."),
  strategy_goal: longText(10, 500, "Describe the first goal in at least 10 characters."),
  roi_pct: z.coerce
    .number({ message: "Enter a number, or 0 when not available." })
    .min(0, "RoI cannot be negative.")
    .max(1000, "RoI looks unrealistic. Check the value."),
  roi_timeline: longText(5, 500, "Describe your timeline, even if it is not fixed yet."),
});

export const answersByRole: Record<Role, z.ZodTypeAny> = {
  builder: builderAnswersSchema,
  manager: managerAnswersSchema,
  stakeholder: stakeholderAnswersSchema,
};

/** Full request validation: identity plus the branch answers for its role. */
export const assessmentRequestSchema = identitySchema.and(
  z.object({ answers: z.record(z.string(), z.union([z.string(), z.number()])) }),
).refine(
  (data) => {
    const role = ROLE_BY_FAMILIARITY[data.familiarity];
    return answersByRole[role].safeParse(data.answers).success;
  },
  { message: "Some answers are missing or invalid for your role.", path: ["answers"] },
);

export type AssessmentRequest = z.infer<typeof assessmentRequestSchema>;

/* ── Generated result ─────────────────────────────────────────────────────── */

export const profileSchema = z.object({
  archetype: z.string().min(3).max(80),
  maturity_score: z.number().min(0).max(100),
  summary: z.string().min(20).max(1200),
  strengths: z.array(z.string().min(5).max(300)).min(2).max(4),
  risks: z.array(z.string().min(5).max(300)).min(2).max(4),
  focus_theme: z.string().min(5).max(200),
});

export type Profile = z.infer<typeof profileSchema>;

export const checklistItemSchema = z.object({
  id: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Checklist id must be a slug."),
  title: z.string().min(5).max(70),
  detail: z.string().min(10).max(240),
  category: z.enum(["Trust", "Collaboration", "Observability", "Improvement", "ROI"]),
  priority: z.enum(["P0", "P1", "P2"]),
  effort: z.enum(["S", "M", "L"]),
});

export type ChecklistItem = z.infer<typeof checklistItemSchema>;

export const caseStudySlugs = [
  "healthcare",
  "edtech",
  "agrotech",
  "bfsi",
  "real-estate",
  "auto-retail",
  "hr-services",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export const caseStudyRefSchema = z.object({
  slug: z.enum(caseStudySlugs),
  reason: z.string().min(10).max(240),
});

export type CaseStudyRef = z.infer<typeof caseStudyRefSchema>;

export const generatedResultSchema = z.object({
  profile: profileSchema,
  checklist: z.array(checklistItemSchema).min(6).max(9),
  case_study: caseStudyRefSchema,
});

export type GeneratedResult = z.infer<typeof generatedResultSchema>;

export const generateResponseSchema = generatedResultSchema.and(
  z.object({
    assessmentId: z.string().min(1),
    role: z.enum(["builder", "manager", "stakeholder"]),
  }),
);

export type GenerateResponse = z.infer<typeof generateResponseSchema>;

/** Full API payload: the stored shape plus the report markdown for localStorage.
 *  The route guarantees this is returned even when persistence fails. */
export const generateApiResponseSchema = generateResponseSchema.and(
  z.object({
    reportMarkdown: z.string().min(1).max(30000),
    persisted: z.boolean(),
  }),
);

export type GenerateApiResponse = z.infer<typeof generateApiResponseSchema>;

/* ── Email request ────────────────────────────────────────────────────────── */

export const emailRequestSchema = z.object({
  to: emailField,
  name: z.string().trim().max(100).optional(),
  linkedin: z.string().trim().max(300).optional(),
  designation: z.string().trim().max(100).optional(),
  role: z.enum(["builder", "manager", "stakeholder"]),
  profile: profileSchema,
  checklist: z.array(checklistItemSchema).min(6).max(9),
  checked: z.record(z.string(), z.boolean()),
  case_study: caseStudyRefSchema,
  reportMarkdown: z.string().trim().min(50).max(30000),
});

export type EmailRequest = z.infer<typeof emailRequestSchema>;
