/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

const EdTechPage = () => {
  return (
    <div className="min-h-screen bg-[#0E0E0C] text-white">
      <Header />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-center mb-8">
            <span className="text-sm text-gray-400">Usecases / </span>
            <span className="text-sm text-white">Healthcare</span>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Transform Healthcare<br />with Intelligent Memory</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Enhance patient care with memory-powered AI that understands context, history, and individual needs.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16">
            <Link
              href="https://platform.getalchemystai.com/"
              className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:bg-gray-200"
            >
              Build Healthcare Solutions
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content with GIF */}
      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Large Healthcare GIF Display */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
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
      <div className="w-full bg-[#0E0E0C] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 inline-block">Challenges</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Problems Faced in Healthcare</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Current AI healthcare solutions struggle with context retention and personalization, leading to suboptimal patient care experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-red-900/20 p-6 rounded-xl border border-red-800/50">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Very Generic Suggestions</h3>
              <p className="text-gray-400">
                Agents can't retain context of previous conversations, leading to unreliable treatment plans suggested.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="bg-orange-900/20 p-6 rounded-xl border border-orange-800/50">
              <div className="mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No Connection for Patients</h3>
              <p className="text-gray-400">
                Patients have to give their details multiple times for each query.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-800/50">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No Progress Retention</h3>
              <p className="text-gray-400">
                Sessions are not stored making past conversations lost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 inline-block">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Healthcare Solutions with Alchemyst</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Transform healthcare with memory-powered AI that addresses core challenges in patient care and support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smarter Patient Support, Lower Costs</h3>
              <p className="text-gray-400">
                Alchemyst cuts per-interaction costs by over 40% right away—and up to 99.7% at scale. Memory-enabled agents deliver personalized care without needing costly data integration each time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Fewer Claim Denials, Better Accuracy</h3>
              <p className="text-gray-400">
                Data-aware agents reduce errors in patient info, slashing denial rates from 8.5% to 6.8%. Support accuracy jumps by 34%, leading to faster, more reliable claims processing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Trust Through Context</h3>
              <p className="text-gray-400">
                Alchemyst remembers patient history, treatment paths, and conversation details—turning AI into a reliable, context-aware care partner that patients can actually trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Token Optimization Section */}
      <div className="w-full bg-[#0E0E0C] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Cost optimized. Out of the box.
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Run agents with more power with lesser cost.
              </p>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Does the heavy lifting of memory offloading by itself.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Optimizes token expenditure with efficient prompts.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Highly capable of handling longer tasks.</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="https://platform.getalchemystai.com/"
                  className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:bg-gray-200"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Side Cards */}
            <div className="space-y-6">
              {/* Standard Agent Card */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Standard Agent</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Token Used (Avg)</span>
                    <span className="text-sm text-gray-300">3M tokens</span>
                  </div>
                  {/* Red Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">High token usage, short context window</p>
                </div>
              </div>

              {/* Alchemyst-Enhanced Agent Card */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <circle cx="12" cy="12" r="3" fill="currentColor" className="text-white" />
                      <path d="M12 1v6m0 8v6m11-7h-6m-8 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Alchemyst-enhanced Agent</h3>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Token Used (Avg)</span>
                    <span className="text-sm text-gray-300">1.8M tokens</span>
                  </div>
                  {/* Green Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Shorter prompt optimized with Alchemyst</p>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-400">Memory Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plug and Play Integration */}
      <div className="w-full bg-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Code Examples */}
            <div className="space-y-6">
              {/* JavaScript Code Block */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium mr-3">JavaScript</div>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">Python</div>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-purple-400">import MemoryClient</div>
                  <span className="text-white"> </span>
                  <span className="text-blue-400"></span>
                  <span className="text-white"> </span>
                  <div className="text-purple-400">from</div>
                  <span className="text-white"> </span>
                  <span className="text-green-400">&apos;@alchemyst/memory&apos;</span>
                  <span className="text-white">;</span>
                  <br /><br />
                  <div className="text-purple-400">const</div>
                  <span className="text-white"> </span>
                  <span className="text-blue-400">client</span>
                  <span className="text-white"> = </span>
                  <div className="text-purple-400">new</div>
                  <span className="text-white"> </span>
                  <span className="text-blue-400">MemoryClient</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">&apos;your-api-key&apos;</span>
                  <span className="text-white">);</span>
                </div>
              </div>

              {/* Python Code Block */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">JavaScript</div>
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium">Python</div>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-purple-400">import</div>
                  <span className="text-white"> </span>
                  <span className="text-blue-400">os</span>
                  <br />
                  <div className="text-purple-400">from</div>
                  <span className="text-white"> </span>
                  <span className="text-blue-400">alchemyst.memory</span>
                  <span className="text-white"> </span>
                  <div className="text-purple-400">import</div>
                  <span className="text-white"> </span>
                  <span className="text-blue-400">MemoryClient</span>
                  <br /><br />
                  <span className="text-blue-400">client</span>
                  <span className="text-white"> = </span>
                  <span className="text-blue-400">MemoryClient</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">&apos;your-api-key&apos;</span>
                  <span className="text-white">)</span>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Two liner integration
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Alchemyst connects seamlessly with your current setup. Just one copy-paste command away.
              </p>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Huge repertoire of compatible tools.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">SOC-2 and HIPAA compliant with secure storage.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Observability on runtime.</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="https://platform.getalchemystai.com/"
                  className="inline-block bg-white text-black px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:bg-gray-200"
                >
                  Integrate Alchemyst
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EdTechPage; 