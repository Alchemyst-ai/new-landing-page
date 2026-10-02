import { CASE_STUDY_BY_SLUG, type CaseStudy } from "@/lib/caseStudies";
import type { CaseStudySlug } from "@/lib/assessment/schema";

/** Keyword signals mapped to case study slugs, checked in order. */
const SIGNAL_MAP: { slug: CaseStudySlug; keywords: string[] }[] = [
  {
    slug: "healthcare",
    keywords: ["hospital", "clinic", "patient", "hims", "discharge", "doctor", "nurse", "pharma"],
  },
  {
    slug: "edtech",
    keywords: ["student", "parent", "enrollment", "enrolment", "coaching", "course", "edtech", "school", "university", "tutor"],
  },
  {
    slug: "agrotech",
    keywords: ["delivery", "dispatch", "ndr", "rto", "cod", "farmer", "logistics", "shipment", "agri"],
  },
  {
    slug: "bfsi",
    keywords: ["bank", "loan", "collection", "mortgage", "fraud", "insurance", "kyc", "nbfc", "fintech"],
  },
  {
    slug: "real-estate",
    keywords: ["property", "buyer", "real estate", "realty", "crm", "channel partner", "workspace", "proptech"],
  },
  {
    slug: "auto-retail",
    keywords: ["dealership", "dms", "vehicle", "vin", "service reminder", "auto", "car ", "oem"],
  },
  {
    slug: "hr-services",
    keywords: ["hiring", "ats", "staffing", "recruit", "shift", "onboarding", "worker", "hr ", "payroll"],
  },
];

export function matchCaseStudy(text: string): CaseStudySlug {
  const haystack = text.toLowerCase();
  for (const entry of SIGNAL_MAP) {
    if (entry.keywords.some((keyword) => haystack.includes(keyword))) return entry.slug;
  }
  return "bfsi";
}

/** Resolve a slug to a case study, falling back to the keyword map then bfsi. */
export function resolveCaseStudy(slug: string | undefined, text: string): CaseStudy {
  if (slug && slug in CASE_STUDY_BY_SLUG) return CASE_STUDY_BY_SLUG[slug];
  const matched = matchCaseStudy(text);
  return CASE_STUDY_BY_SLUG[matched] ?? CASE_STUDY_BY_SLUG["bfsi"];
}
