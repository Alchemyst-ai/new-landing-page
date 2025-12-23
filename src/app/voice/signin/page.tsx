"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Eye, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VoiceSignInPage() {

  return (
    <div className="flex min-h-screen dark bg-zinc-950">
      {/* Left side - Text content */}
      <div className="w-full lg:w-2/5 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-[600px] w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Transform your business with
            <span className="text-blue-400"> AI Voice Agents</span>
          </h1>

          <p className="text-lg text-white/70 mb-6 leading-relaxed">
            Create intelligent voice campaigns, automate customer interactions, and scale your business with our powerful AI voice agents. Experience seamless conversations that convert prospects into customers.
          </p>

          <div className="flex flex-col gap-3 text-white/60">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>24/7 automated customer engagement</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Natural conversation flows with AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Real-time analytics and insights</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Seamless CRM integrations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Authentication form */}
      <div className="w-full -mr-5 lg:w-3/5 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-[600px] w-full p-8 bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-tr from-white/10 via-white/5 to-transparent -z-10" />

          <div className="flex flex-col gap-6 items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/signlogo.png"
                alt="Alchemyst AI Logo"
                width={150}
                height={115}
                className="w-[150px] h-[115px] object-contain"
              />
            </Link>

            <div className="flex flex-col gap-2 items-center w-full">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <LinkIcon className="h-6 w-6 text-blue-400" />
                API Key Required
              </h2>
              <p className="text-white/60 text-center">
                Please Enter your Alchemyst platform API Key here
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-zinc-800/50 border border-yellow-500/20 rounded-lg p-4 w-full">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-white/80">
                  Your API key is stored securely in your browser&apos;s local storage and is never transmitted to our servers.
                </p>
              </div>
            </div>

            {/* API Key Input Section */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">
                  API Key
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    className="w-full bg-zinc-800/50 border-white/20 text-white placeholder:text-white/40 pr-10"
                    disabled
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-white/50">
                  Enter your Alchemyst platform API key to authenticate and access the voice dashboard
                </p>
              </div>

              <Button
                disabled
                className="w-full py-6 bg-white hover:bg-gray-50 text-zinc-950 hover:text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Connect to Voice Dashboard
              </Button>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 w-full">
                <div className="flex items-center justify-center gap-2">
                  <ExternalLink className="h-3 w-3 text-blue-400" />
                  <p className="text-xs text-blue-400 text-center">
                    Redirects with API key to: alchemyst-voice-campaigns.vercel.app
                  </p>
                </div>
              </div>
            </div>

            {/* Need API Key Section */}
            <div className="bg-zinc-800/30 border border-white/10 rounded-lg p-4 w-full">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 border-2 border-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-white">
                    Need an API Key?
                  </h3>
                  <p className="text-xs text-white/60">
                    Head over to{" "}
                    <a
                      href="/platform/signin?utm_source=voice_platform&utm_campaign=voice_signin_page&utm_medium=website&utm_content=head_over_to"
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      our Context Platform
                    </a>
                    , sign up on the platform, and get your API key from the Settings page!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <p className="text-xs font-medium text-white/50 text-center">
                © 2025 Alchemyst AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}