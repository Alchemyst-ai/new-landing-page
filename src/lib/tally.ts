// Tally careers client.
//
// Open roles are published as Tally forms. Each published, open form becomes a
// job listing on /careers. The form name encodes the role and its tags using
// the "Title | Tag | Tag" convention.
//
// Environment variable:
//   TALLY_API_KEY - Tally API token (https://developers.tally.so/api-reference)
//
// When the key is missing or the upstream call fails we return no openings so
// the page renders its empty state instead of inventing roles.

export interface TallyForm {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isNameModifiedByUser: boolean;
  workspaceId: string;
  organizationId: string;
  status: "PUBLISHED" | "DRAFT";
  hasDraftBlocks: boolean;
  numberOfSubmissions: number;
  index: number;
  isClosed: boolean;
}

export interface JobPosition {
  id: string;
  name: string;
  title: string;
  description?: string;
  tags?: string[];
  createdAt: string;
}

export interface TallyJobsResult {
  jobs: JobPosition[];
  message?: string;
  error?: string;
}

const TALLY_FORMS_URL = "https://api.tally.so/forms";

/** Public application link for a Tally form. */
export function tallyApplyUrl(formId: string): string {
  return `https://tally.so/r/${formId}`;
}

export async function fetchTallyJobs(): Promise<TallyJobsResult> {
  try {
    const tallyApiKey = process.env.TALLY_API_KEY;

    if (!tallyApiKey) {
      console.warn(
        "TALLY_API_KEY is not set. Add it to your environment variables.",
      );
      return {
        jobs: [],
        message: "No current openings - set TALLY_API_KEY to fetch job listings",
      };
    }

    const formsResponse = await fetch(TALLY_FORMS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tallyApiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!formsResponse.ok) {
      const errorText = await formsResponse.text();
      console.error("Tally API error:", formsResponse.status, errorText);
      throw new Error(
        `Tally API responded with status ${formsResponse.status}`,
      );
    }

    const formsData = (await formsResponse.json()) as {
      items?: TallyForm[];
    };

    // Transform forms to job positions - display all published, open forms as
    // career opportunities.
    const jobs: JobPosition[] = (formsData.items || [])
      .filter((entry) => entry.status === "PUBLISHED" && !entry.isClosed)
      .map((form: TallyForm) => ({
        id: form.id,
        name: form.name.split(" | ")[0],
        title: form.name.split(" | ")[0],
        tags: form.name.split(" | ").slice(1),
        createdAt: form.createdAt,
      }))
      .sort(
        (a: JobPosition, b: JobPosition) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    console.log("Successfully fetched", jobs.length, "job forms from Tally");
    return { jobs };
  } catch (error) {
    console.error("Error fetching careers from Tally:", error);
    return {
      jobs: [],
      error: error instanceof Error ? error.message : "Unknown error",
      message:
        "No current openings. Set TALLY_API_KEY to fetch real data from your Tally workspace.",
    };
  }
}
