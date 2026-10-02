import "server-only";

import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let initPromise: Promise<void> | null = null;

function getClient(): Client | null {
  if (client) return client;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) return null;
  client = createClient({ url, authToken });
  return client;
}

export function isAssessmentStoreConfigured(): boolean {
  return !!process.env.TURSO_DATABASE_URL;
}

async function init(): Promise<Client | null> {
  const db = getClient();
  if (!db) return null;
  if (!initPromise) {
    initPromise = db
      .execute(
        `CREATE TABLE IF NOT EXISTS assessments (
          id TEXT PRIMARY KEY,
          role TEXT NOT NULL,
          answers_json TEXT NOT NULL,
          profile_json TEXT NOT NULL,
          checklist_json TEXT NOT NULL,
          case_study_slug TEXT NOT NULL,
          model TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
      )
      .then(() =>
        db.execute(
          `CREATE INDEX IF NOT EXISTS idx_assessments_created ON assessments(created_at DESC)`,
        ),
      )
      .then(() => undefined)
      .catch((error) => {
        initPromise = null;
        throw error;
      });
  }
  await initPromise;
  return db;
}

export interface AssessmentRow {
  id: string;
  role: string;
  answers: Record<string, string | number>;
  profile: unknown;
  checklist: unknown;
  caseStudySlug: string;
  model: string;
}

/** Persist a generated assessment without any PII. Returns false when unconfigured. */
export async function saveAssessmentRow(row: AssessmentRow): Promise<boolean> {
  const db = await init().catch(() => null);
  if (!db) return false;
  await db.execute({
    sql: `INSERT INTO assessments
      (id, role, answers_json, profile_json, checklist_json, case_study_slug, model)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      row.id,
      row.role,
      JSON.stringify(row.answers),
      JSON.stringify(row.profile),
      JSON.stringify(row.checklist),
      row.caseStudySlug,
      row.model,
    ],
  });
  return true;
}
