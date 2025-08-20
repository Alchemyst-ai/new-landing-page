"use client";

import { Button } from "@/components/ui/button";
import { Mail, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

export default function SignInPage() {
  // Backend URL - can be configured via environment variables later
  const backendUrl = "http://localhost:3001";

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
                src="/logo.png" 
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

            <div className="mt-auto pt-4">
              <p className="text-xs font-medium text-white/50 text-center">
                © 2025 Alchemyst AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spline 3D animation - hidden on mobile */}
      <div className="relative w-full h-screen hidden lg:block">
        <Spline
          scene="https://prod.spline.design/by4zIh4LPsvdRGFD/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
} 