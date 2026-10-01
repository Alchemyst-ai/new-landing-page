// Tally API Reference: https://developers.tally.so/api-reference/endpoint/forms/list

interface TallyForm {
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

interface JobPosition {
  id: string;
  name: string;
  title: string;
  tags?: string[];
  createdAt: string;
}

export async function GET() {
  try {
    const tallyApiKey = process.env.TALLY_API_KEY;

    if (!tallyApiKey) {
      console.warn("TALLY_API_KEY is not set. Add it to your environment variables.");
      return Response.json({
        jobs: [],
        message: "No TALLY_API_KEY configured, no live job listings",
      });
    }

    const formsResponse = await fetch("https://api.tally.so/forms", {
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
      throw new Error(`Tally API responded with status ${formsResponse.status}`);
    }

    const formsData = (await formsResponse.json()) as {
      items?: TallyForm[];
    };

    const jobs: JobPosition[] = (formsData.items || [])
      .filter((entry) => entry.status === "PUBLISHED" && !entry.isClosed)
      .map((form: TallyForm) => ({
        id: form.id,
        name: form.name.split(" | ")[0],
        title: form.name.split(" | ")[0],
        tags: form.name.split(" | ").slice(1) ?? [],
        createdAt: form.createdAt,
      }))
      .sort(
        (a: JobPosition, b: JobPosition) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    console.log("Successfully fetched", jobs.length, "job forms from Tally");
    return Response.json({ jobs });
  } catch (error) {
    console.error("Error fetching careers from Tally:", error);
    return Response.json({
      jobs: [],
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to fetch job listings. Set TALLY_API_KEY to fetch real data.",
    });
  }
}
