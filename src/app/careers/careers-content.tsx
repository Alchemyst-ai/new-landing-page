import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BrainCircuit, Globe, Rocket } from "lucide-react";
import Link from "next/link";

interface JobPosition {
  id: string;
  name: string;
  title: string;
  tags: string[];
  createdAt: string;
}

async function fetchJobs(): Promise<JobPosition[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/careers`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      console.error("Failed to fetch careers data");
      return [];
    }
    const data = await response.json();
    return data.jobs || [];
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return [];
  }
}

export async function CareersContent() {
  const jobs = await fetchJobs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-background py-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="careers-gradient from-orange-500/50 to-transparent fixed inset-0 pointer-events-none"></div>
        <div className="mx-auto max-w-4xl text-center relative">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Join Our Team
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            Context is <b>THE</b> next frontier, but it needs to be verifiable.
            Help us build the <b>ONLY</b> AI context engine you can verify.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* About Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Why Join Alchemyst?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <BrainCircuit className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-lg">
                  Solving for the frontier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You will be working at the frontier of combining AI and
                  context.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Rocket className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-lg">Rocketship Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience what rocketship growth feels like. Here&apos;s some{" "}
                  <Link
                    className="font-bold text-orange-500 hover:underline"
                    href="https://x.com/AnuranRoy/status/1998080417870885225"
                    target="_blank"
                  >
                    proof
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-lg">Global Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  GenAI is the biggest shift after electricity. Help the world
                  make automated agents <b>TRULY</b> intelligent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Jobs Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Open Positions {`(${jobs.length})`}
          </h2>

          {jobs.length === 0 && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No open positions at the moment. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}

          {jobs.length > 0 && (
            <div className="space-y-4 pr-2">
              {jobs.map((job, jobIdx) => (
                <Card
                  key={job.id}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-foreground">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="my-2">
                          {(job.tags ?? []).map((tag, idx) => (
                            <Badge
                            variant="outline"
                              className="text-xs px-2 rounded-full mr-2 align-text-top"
                              key={`job-${jobIdx + 1}-tag-${idx + 1}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="ml-4 whitespace-nowrap"
                      >
                        Open
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50">
                      <div className="text-sm text-muted-foreground">
                        Posted {formatDate(job.createdAt)}
                      </div>
                      <Link
                        href={`https://tally.so/r/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Don&apos;t see your role?
              </h3>
              <p className="text-muted-foreground mb-6">
                People breaking the mould are always welcome - reach out to us!
              </p>
              <Link
                href="mailto:founders@getalchemystai.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get in Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return "recently";
  }
}
