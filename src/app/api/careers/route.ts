// Tally API Reference: https://developers.tally.so/api-reference/endpoint/forms/list

interface TallyForm {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

interface JobPosition {
  id: string;
  name: string;
  title: string;
  description?: string;
  createdAt: string;
}

export async function GET(request: Request) {
  try {
    const tallyApiKey = process.env.TALLY_API_KEY;

    if (!tallyApiKey) {
      console.warn(
        "TALLY_API_KEY is not set. Add it to your environment variables.",
      );
      // Return demo jobs instead of erroring
      return Response.json({
        jobs: [
          {
            id: "demo-1",
            name: "demo",
            title: "Senior AI Engineer",
            description:
              "Help us build the context engine. Experience with Python, LLMs, and distributed systems required.",
            createdAt: new Date().toISOString(),
          },
          {
            id: "demo-2",
            name: "demo",
            title: "Full Stack Developer",
            description:
              "Build and scale our platform. JavaScript, React, Node.js expertise needed.",
            createdAt: new Date().toISOString(),
          },
        ],
        message: "Demo data - set TALLY_API_KEY to fetch real job listings",
      });
    }

    // GET /forms returns list of all forms with correct authorization header
    const formsResponse = await fetch("https://api.tally.so/forms", {
      method: "GET",
      headers: {
        Authorization: `Bearer tly-eISK8ykinPjBJjjOnWXgmC97oqBjJbMQ`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log();

    if (!formsResponse.ok) {
      const errorText = await formsResponse.text();
      console.error("[v0] Tally API error:", formsResponse.status, errorText);
      throw new Error(
        `Tally API responded with status ${formsResponse.status}`,
      );
    }

    const formsData = (await formsResponse.json()) as {
      items?: TallyForm[];
    };

    // Transform forms to job positions - display all forms as career opportunities
    const jobs: JobPosition[] = (formsData.items || [])
      .map((form: TallyForm) => ({
        id: form.id,
        name: form.name,
        title: form.name,
        description: form.description,
        createdAt: form.createdAt,
      }))
      .sort(
        (a: JobPosition, b: JobPosition) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    console.log(
      "[v0] Successfully fetched",
      jobs.length,
      "job forms from Tally",
    );
    return Response.json({ jobs });
  } catch (error) {
    console.error("[v0] Error fetching careers from Tally:", error);
    return Response.json({
      jobs: [
        {
          id: "demo-1",
          name: "demo",
          title: "Senior AI Engineer",
          description:
            "Help us build the context engine. Experience with Python, LLMs, and distributed systems required.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "demo-2",
          name: "demo",
          title: "Full Stack Developer",
          description:
            "Build and scale our platform. JavaScript, React, Node.js expertise needed.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "demo-3",
          name: "demo",
          title: "DevOps Engineer",
          description:
            "Scale infrastructure for thousands of concurrent requests. Kubernetes and AWS experience required.",
          createdAt: new Date().toISOString(),
        },
      ],
      error: error instanceof Error ? error.message : "Unknown error",
      message:
        "Showing demo job listings. Set TALLY_API_KEY to fetch real data from your Tally workspace.",
    });
  }
}
