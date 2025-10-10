/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { UseCaseFeature } from "@/components/ui/use-case-feature";

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
            <span className="text-sm text-foreground">Customer Support</span>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Transform Support<br />With Memory-Powered AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Enhance customer experience with AI agents that remember context, learn from interactions,
              and deliver personalized support at scale.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16">
            <Link
              href="/platform/signin"
              className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
            >
              Build Smarter Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content with GIF */}
      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Large EdTech GIF Display */}
          <div className="flex justify_center mb-16">
            <div className="relative w-full max-w-5xl bg-card rounded-2xl overflow-hidden border border-border">
              <Image
                src="/use-cases/customer-support.gif"
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Problems Faced</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Current support systems struggle with coordination, prioritization, and context retention.
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
              <h3 className="text-xl font-semibold text-foreground mb-3">Escalation Ping-Pong</h3>
              <p className="text-muted-foreground">
                Issues bounce between departments without resolution ownership.
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
              <h3 className="text-xl font-semibold text-foreground mb-3">Priority Paralysis</h3>
              <p className="text-muted-foreground">
                Critical issues buried in queue without proper urgency detection.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="bg-muted p-6 rounded-xl border border-border">
              <div className="mb-4">
                <div className="w-12 h-12 bg_secondary rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Case History Blackouts</h3>
              <p className="text-muted-foreground">
                Previous interactions invisible, forcing customers to restart explanations.
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Smart Support Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform customer support with memory-powered AI that delivers personalized, context-aware experiences.
            </p>
          </div>

          {/* Use Case Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <UseCaseFeature
              title="Retain Customer History"
              description="Agents remember past conversations and customer context without having to ask them."
              imagePath="/use-cases/customer-care/customer01.png"
              imageAlt="Customer history retention interface showing past conversations"
            />
            <UseCaseFeature
              title="Tailored Solutions"
              description="Each reply of the agent feels personalized for the customer."
              imagePath="/use-cases/customer-care/customer02.png"
              imageAlt="Personalized solution interface showing contextual responses"
            />
            <UseCaseFeature
              title="Pattern Recognition"
              description="Helps agents detect patterns in customer interactions to help prepare them for the unexpected."
              imagePath="/use-cases/customer-care/customer03.png"
              imageAlt="Pattern recognition dashboard showing interaction trends"
            />
            <UseCaseFeature
              title="Feels Human"
              description="Past conversation context helps Agents remember things about the customer, making the customer feel more connected to the Agent."
              imagePath="/use-cases/customer-care/customer04.png"
              imageAlt="Human-like interaction interface showing personalized engagement"
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
                Efficient Support at Scale
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Handle more support tickets with less resources while maintaining quality.
              </p>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Automated context management reduces agent cognitive load.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Smart token usage cuts operational costs by up to 40%.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Handle complex, multi-turn conversations effortlessly.</span>
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
                  <div className="flex justify-between items_center mb-2">
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

      {/* Plug and Play Integration */}
      <div className="w-full bg-card py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Code Examples */}
            <div className="space-y-6">
              {/* JavaScript Code Block */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium mr-3">JavaScript</div>
                  <div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium">Python</div>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-muted-foreground">import MemoryClient</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground"></span>
                  <span className="text-foreground"> </span>
                  <div className="text-muted-foreground">from</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground">'@alchemyst/memory'</span>
                  <span className="text-foreground">;</span>
                  <br /><br />
                  <div className="text-muted-foreground">const</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground">client</span>
                  <span className="text-foreground"> = </span>
                  <div className="text-muted-foreground">new</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground">MemoryClient</span>
                  <span className="text-foreground">(</span>
                  <span className="text-muted-foreground">'your-api-key'</span>
                  <span className="text-foreground">);</span>
                </div>
              </div>

              {/* Python Code Block */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium mr-3">JavaScript</div>
                  <div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium">Python</div>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-muted-foreground">import</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground">os</span>
                  <br />
                  <div className="text-muted-foreground">from</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground">alchemyst.memory</span>
                  <span className="text-foreground"> </span>
                  <div className="text-muted-foreground">import</div>
                  <span className="text-foreground"> </span>
                  <span className="text-muted-foreground">MemoryClient</span>
                  <br /><br />
                  <span className="text-muted-foreground">client</span>
                  <span className="text-foreground"> = </span>
                  <span className="text-muted-foreground">MemoryClient</span>
                  <span className="text-foreground">(</span>
                  <span className="text-muted-foreground">'your-api-key'</span>
                  <span className="text-foreground">)</span>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Two liner integration
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Alchemyst connects seamlessly with your current setup. Just one copy-paste command away.
              </p>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Huge repertoire of compatible tools.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">SOC-2 and HIPAA compliant with secure storage.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground">Observability on runtime.</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="/platform/signin"
                  className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
                >
                  Integrate Alchemyst
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default EdTechPage; 