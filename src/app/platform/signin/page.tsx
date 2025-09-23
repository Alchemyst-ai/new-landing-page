"use client";

import { Button } from "@/components/ui/button";
import { Mail, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

export default function PlatformSignInPage() {

  // Backend URL - Baad me change krr dunga 
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const handleGoogleSignIn = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="flex min-h-screen dark bg-zinc-950">
      {/* Authentication form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen">
        <div className="max-w-[500px] w-full p-8 bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-tr from-white/10 via-white/5 to-transparent -z-10" />

          <div className="flex flex-col gap-8 items-center">
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
              <h1 className="text-2xl font-semibold text-white">
                Welcome to Alchemyst Labs
              </h1>
              <p className="text-white/60 text-center">
                Your Data. Your AI. Our Memory.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button
                variant="outline"
                className="w-full py-6 opacity-70 cursor-not-allowed border-white/20 text-white/60 hover:text-white/60 hover:bg-transparent"
                disabled
              >
                <Github className="mr-2 h-5 w-5" />
                Continue with GitHub (Coming Soon)
              </Button>

              <Button
                variant="outline"
                className="w-full py-6 bg-white hover:bg-gray-50 text-zinc-950 hover:text-zinc-950 border-white/20 hover:cursor-pointer"
                onClick={handleGoogleSignIn}
              >
                <Mail className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </div>

            <div className="mt-auto pt-6 w-full flex flex-col items-center gap-3">
              <div className="flex gap-4 justify-center items-center">
                <a
                  href="https://github.com/Alchemyst-ai/awesome-saas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a
                  href="https://x.com/getalchemyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    height="18"
                    viewBox="0 0 1200 1227"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                    // {...props}
                  >
                    <path
                      fill="currentColor"
                      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                    />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/3HjypQNw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg fill="none" stroke="currentColor" stroke-width="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"/></svg>
                </a>
                <a
                  href="https://in.linkedin.com/company/alchemystai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>

              <p className="text-xs font-medium text-white/50">
                © 2025 Alchemyst AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spline 3D animation - hidden on mobile */}
      <div className="relative w-1/2 h-screen hidden lg:block">
        <Spline
          scene="https://prod.spline.design/by4zIh4LPsvdRGFD/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
} 