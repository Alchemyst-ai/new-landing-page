import Image from "next/image";
import Link from "next/link";
// import { Header } from "@/components/sections/header";
// import { Footer } from "@/components/sections/footer";
import { UseCaseFeature } from "@/components/ui/use-case-feature";
// import { Plug } from "lucide-react";
import PlugAndPlayIntegration from "./PlugAndPlayIntegration";

const EdTechPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Header /> */}

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-center mb-8">
            <span className="text-sm text-muted-foreground">Usecases / </span>
            <span className="text-sm text-foreground">Education</span>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Make Learning<br />Truly Personalized</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              With memory, AI tutors can track progress, understand learning patterns,
              and personalize over time.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16">
            <Link
              href="/platform/signin"
              className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
            >
              Build Adaptive Tutors
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content with GIF */}
      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Large EdTech GIF Display */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-5xl bg-card rounded-2xl overflow-hidden border border-border">
              <Image
                src="/use-cases/edtech.gif"
                alt="EdTech AI Learning Interface"
                width={1200}
                height={800}
                className="w-full h-auto"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="w-full bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-muted-foreground mb-4 inline-block">Challenges</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Problems Faced in EdTech</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Current AI education tools struggle with context retention and personalization, leading to suboptimal learning experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-muted p-6 rounded-xl border border-border">
              <div className="mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Lack of Context of Previous Sessions</h3>
              <p className="text-muted-foreground">
                New sessions lack preferences and context awareness of user preferences and history.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="bg-muted p-6 rounded-xl border border-border">
              <div className="mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Too Generalised Teaching</h3>
              <p className="text-muted-foreground">
                The inability of retaining previous context makes the guidance generic and fruitless.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="bg-muted p-6 rounded-xl border border-border">
              <div className="mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">No User-Centric Content</h3>
              <p className="text-muted-foreground">
                Doesn&apos;t keep up with dynamic user pace or goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-card py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-muted-foreground mb-4 inline-block">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Intelligent Education Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform education with memory-powered AI that adapts and personalizes learning for each student.
            </p>
          </div>

          {/* Use Case Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <UseCaseFeature
              title="Personalized Learning at Scale"
              description="Retains student goals, past performance, and pace → suggests content that actually fits."
              imagePath="/use-cases/edtech/edtech01.png"
              imageAlt="Personalized learning dashboard showing student progress and content recommendations"
            />
            <UseCaseFeature
              title="Real-time Learner Context Sync"
              description="Keeps up with grading, attendance, quiz scores → reduces manual syncing & admin overhead."
              imagePath="/use-cases/edtech/edtech02.png"
              imageAlt="Real-time student data synchronization interface"
            />
            <UseCaseFeature
              title="Adaptive Tutoring Agents"
              description="Alchemyst agents adjust tone, difficulty, and pace  -  tuned to each learner's trajectory."
              imagePath="/use-cases/edtech/edtech03.png"
              imageAlt="Adaptive tutoring interface showing personalized learning paths"
            />
            <UseCaseFeature
              title="Secure, Governed Memory"
              description="Role-based access + context-aware AI → safe classrooms and compliant edtech systems."
              imagePath="/use-cases/edtech/edtech04.png"
              imageAlt="Security and compliance dashboard for educational data"
            />
          </div>
        </div>
      </div>

      {/* Token Optimization Section */}
      <div className="w-full bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Cost optimized. Out of the box.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Run agents with more power with lesser cost.
              </p>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Does the heavy lifting of memory offloading by itself.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Optimizes token expenditure with efficient prompts.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Highly capable of handling longer tasks.</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="/platform/signin"
                  className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Side Cards */}
            <div className="space-y-6">
              {/* Standard Agent Card */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Standard Agent</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Token Used (Avg)</span>
                    <span className="text-sm text-muted-foreground">3M tokens</span>
                  </div>
                  {/* Neutral Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-foreground h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">High token usage, short context window</p>
                </div>
              </div>

              {/* Alchemyst-Enhanced Agent Card */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <circle cx="12" cy="12" r="3" fill="currentColor" className="text-foreground" />
                      <path d="M12 1v6m0 8v6m11-7h-6m-8 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Alchemyst-enhanced Agent</h3>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Token Used (Avg)</span>
                    <span className="text-sm text-muted-foreground">1.8M tokens</span>
                  </div>
                  {/* Neutral Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-foreground h-3 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Shorter prompt optimized with Alchemyst</p>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mr-2"></div>
                  <span className="text-xs text-muted-foreground">Memory Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlugAndPlayIntegration />
    </div>
  );
};

export default EdTechPage;