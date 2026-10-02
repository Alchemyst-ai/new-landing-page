import { caseStudyPath, CASE_STUDY_BY_SLUG } from "@/lib/caseStudies";
import { ROLE_LABELS, type CaseStudyRef, type ChecklistItem, type Profile, type Role } from "@/lib/assessment/schema";
import { scoreBand } from "@/lib/assessment/score";

export interface ReportIdentity {
  name?: string;
  designation: string;
  linkedin: string;
}

const SITE_URL = "https://getalchemystai.com";

function itemLine(item: ChecklistItem, done: boolean): string {
  const box = done ? "x" : " ";
  return `- [${box}] **${item.title}** (${item.priority}, Effort ${item.effort}, ${item.category}): ${item.detail}`;
}

export function buildAssessmentMarkdown(
  identity: ReportIdentity,
  role: Role,
  profile: Profile,
  checklist: ChecklistItem[],
  caseStudy: CaseStudyRef,
): string {
  const { band } = scoreBand(profile.maturity_score);
  const study = CASE_STUDY_BY_SLUG[caseStudy.slug];
  const lines: string[] = [
    `# Context Assessment: ${profile.archetype} (${Math.round(profile.maturity_score)}/100, ${band})`,
    "",
    `Name: ${identity.name || identity.designation}`,
    `Designation: ${identity.designation}`,
    `LinkedIn: ${identity.linkedin}`,
    `Role: ${ROLE_LABELS[role]}`,
    `Focus: ${profile.focus_theme}`,
    "",
    "## Profile",
    "",
    profile.summary,
    "",
    "## Strengths",
    "",
    ...profile.strengths.map((s) => `- ${s}`),
    "",
    "## Risks",
    "",
    ...profile.risks.map((r) => `- ${r}`),
    "",
    `## Checklist (0/${checklist.length} done)`,
    "",
    ...checklist.map((item) => itemLine(item, false)),
    "",
    "## Closest customer story",
    "",
    `${study.shortLabel} (${study.industry}): ${study.h1}`,
    "",
    `Why this matches: ${caseStudy.reason}`,
    "",
    `Link: ${SITE_URL}${caseStudyPath(caseStudy.slug)}`,
    "",
    "Generated at /assessment. Your tick state is stored only in this browser.",
  ];
  return lines.join("\n");
}

function checklistIdFromLine(line: string, checklist: ChecklistItem[]): string | null {
  const titleMatch = line.match(/^-\s\[[ x]\]\s\*\*(.+?)\*\*/);
  if (!titleMatch) return null;
  const found = checklist.find((item) => item.title === titleMatch[1]);
  return found ? found.id : null;
}

/** Rewrite checkbox markers and the done count to reflect current tick state. */
export function renderMarkdownWithTicks(
  baseMarkdown: string,
  checklist: ChecklistItem[],
  checked: Record<string, boolean>,
): string {
  const doneCount = checklist.filter((item) => checked[item.id]).length;
  return baseMarkdown
    .split("\n")
    .map((line) => {
      if (/^## Checklist \(\d+\/\d+ done\)/.test(line)) {
        return `## Checklist (${doneCount}/${checklist.length} done)`;
      }
      if (/^-\s\[[ x]\]\s\*\*/.test(line)) {
        const id = checklistIdFromLine(line, checklist);
        const done = id ? !!checked[id] : false;
        return line.replace(/^-\s\[[ x]\]/, done ? "- [x]" : "- [ ]");
      }
      return line;
    })
    .join("\n");
}
