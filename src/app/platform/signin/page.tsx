// Sign-in page: warm-charcoal glass card beside the Spline 3D scene.
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://platform-backend.getalchemystai.com";

  const handleGoogleSignIn = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div data-theme="dark" className="dark relative flex min-h-screen flex-col bg-[#1C1917] text-[#F5F5F4]">
      {/* Promo banner */}
      <div className="relative z-10 flex w-full items-center justify-center gap-2.5 border-b border-[#E4C090]/20 bg-[#E4C090]/[0.07] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#F2DABA]">
        <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-[#E4C090]" />
        Signup with business email and get 5 million tokens free!
      </div>

      <div className="flex flex-1">
        {/* Authentication form */}
        <div className="relative flex w-full items-center justify-center px-6 py-16 lg:w-1/2">
          <div aria-hidden className="plate-grid absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="group relative w-full max-w-[460px] rounded-[calc(var(--radius)+4px)] border border-white/[0.09] bg-[#232020]/80 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-10"
          >
            <span aria-hidden className="tick tick-tl" />
            <span aria-hidden className="tick tick-tr" />
            <span aria-hidden className="tick tick-bl" />
            <span aria-hidden className="tick tick-br" />

            <div className="flex flex-col gap-8 items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/signlogo.png"
                  alt="Alchemyst AI Logo"
                  width={150}
                  height={115}
                  className="w-[150px] h-[115px] object-contain"
                  priority
                />
              </Link>

              <div className="flex flex-col gap-2 items-center w-full">
                <h1 className="text-[1.625rem] font-bold tracking-[-0.02em] text-[#F5F5F4]">
                  Welcome to Alchemyst AI
                </h1>
                <p className="text-center text-[#A8A29E]">
                  The ONLY Context Engine you can verify.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                {/* GitHub - coming soon */}
                <Button
                  variant="outline"
                  className="w-full rounded-[var(--radius)] py-6 opacity-60 cursor-not-allowed border-white/[0.12] bg-transparent text-[#A8A29E] hover:text-[#A8A29E] hover:bg-transparent"
                  disabled
                >
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  Continue with GitHub (Coming Soon)
                </Button>

                {/* Google sign-in */}
                <Button
                  variant="outline"
                  className="w-full rounded-[var(--radius)] py-6 font-bold bg-[#FDFBF7] hover:bg-[#F2DABA] text-[#1C1917] hover:text-[#1C1917] border-transparent hover:cursor-pointer transition-[background-color,transform] hover:-translate-y-px"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="mr-2 h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              {/* Footer: socials + copyright */}
              <div className="mt-auto pt-6 w-full flex flex-col items-center gap-3">
                <div className="flex gap-4 justify-center items-center">
                  <a
                    href="https://github.com/Alchemyst-ai/awesome-saas?utm_source=landing_page&utm_medium=redirect&utm_campaign=sign_up"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#78716C] hover:text-[#E4C090] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/getalchemyst?utm_source=landing_page&utm_medium=redirect&utm_campaign=twitter"
                    aria-label="X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#78716C] hover:text-[#E4C090] transition-colors"
                  >
                    <svg height="18" viewBox="0 0 1200 1227" width="18" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="currentColor"
                        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://discord.gg/H2StAaSeJ8?utm_source=landing_page&utm_medium=redirect&utm_campaign=discord_join"
                    aria-label="Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#78716C] hover:text-[#E4C090] transition-colors"
                  >
                    <svg fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z" />
                    </svg>
                  </a>
                  <a
                    href="https://in.linkedin.com/company/alchemystai?utm_source=landing_page&utm_medium=redirect&utm_campaign=linkedin"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#78716C] hover:text-[#E4C090] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#78716C]">
                  © {new Date().getFullYear()} Alchemyst AI. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spline 3D animation - hidden on mobile */}
        <div className="relative hidden h-[calc(100vh-41px)] w-1/2 border-l border-white/[0.06] lg:block">
          <iframe
            title="Alchemyst AI 3D scene"
            src="https://my.spline.design/alchemyst-ai-nav-section-3D-COPY-copy-03copy-9HxEZCGTtNjJZ3J6/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}