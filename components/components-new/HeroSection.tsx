"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TrustedBySection from "./TrustedBySection";
import Link from "next/link";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Use refs for constants to avoid them being dependencies in useEffect
  const typingSpeed = useRef(50);
  const deletingSpeed = useRef(50);
  const delayAfterWord = useRef(1000);

  // Use useMemo to prevent the words array from being recreated on each render
  const words = useMemo(() => ["Agent", "Project", "Copilot"], []);
  const maxWordLength = useMemo(() => Math.max(...words.map(word => word.length)), [words]);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Deleting mode
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));

        // If all characters are deleted, switch to typing mode and move to next word
        if (displayText.length <= 1) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }, deletingSpeed.current);
    } else {
      // Typing mode
      if (displayText === currentWord) {
        // Word is complete, wait before starting to delete
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayAfterWord.current);
      } else {
        // Still typing the word
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, typingSpeed.current);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words]);

  return (
    <section className="pt-10 md:pt-20 pb-16 md:pb-32 px-4 relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Gradient & Blur Overlays */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-black/15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-background"></div>
      </div>

      <div className="w-full max-w-8xl mt-10 md:mt-20 mx-auto text-center relative z-10 px-4">
        {/* F6S Badge */}
        <div className="inline-flex items-center tracking-tighter gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-black/70 rounded-full text-white text-sm md:text-base font-medium animate-fade-in">
          <span>✨ #1 in Gen AI category</span>
          <Image
            src="/public-new/f6s_0.png"
            alt="F6S"
            width={30}
            height={30}
            className="h-auto w-6 md:w-auto"
          />
        </div>

        <div className="w-full md:w-[80%] xl:w-[60%] mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-lg relative pb-3 md:pb-6">
              The Memory and Retrieval Layer for your next GenAI
            </span>
            <br />
            <span className="py-2 md:py-3">
              <span className="bg-clip-text drop-shadow-lg relative text-transparent bg-gradient-to-b from-white to-gray-400">
                for your next GenAI
              </span>
              &nbsp;
              <span
                className="inline-block text-left bg-gradient-to-br to-[#ff0000] from-[#ffee00] h-[80px] sm:h-[100px] md:h-[125px] w-[120px] sm:w-[180px] md:w-[220px] lg:w-[250px] text-transparent bg-clip-text"
              >
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </span>
          </h1>
        </div>


        <div className="text-sm sm:text-base md:text-lg text-gray-200 max-w-6xl mx-auto mb-6 md:mb-10 px-2">
          Deliver products, not surveys on the next AI tool to use. <br /><b className="text-bold">Ship 20x faster with the cookiecutter of the GenAI Stack.</b>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <Link href="#get-started"><Button className="bg-white hover:bg-white/90 text-black text-base md:text-lg py-4 md:py-6 px-6 md:px-8 font-bold">
            Get Started
          </Button></Link>
          <Link href="https://platform.getalchemystai.com/auth"><Button variant="outline" className="border-2 border-white text-white text-base md:text-lg py-4 md:py-6 px-6 md:px-8 bg-black/30 font-medium">
            Sign Up
          </Button></Link>
        </div>

        {/* Backed By Section */}
        <div className="mt-16 md:mt-32 animate-fade-in-up">
          <div className="text-base md:text-lg text-gray-300 uppercase tracking-wider mb-4 md:mb-8 font-medium">Backed by</div>
          <div className="flex flex-wrap gap-8 md:gap-16 -mt-6 md:-mt-10 items-center justify-center">
            <div className="relative h-20 w-20 md:h-32 md:w-32">
              <Image
                src="/public-new/ipv.png"
                alt="IPV"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="relative h-20 w-20 md:h-32 md:w-32">
              <Image
                src="/public-new/earlyseed.png"
                alt="Early Seed"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="relative h-16 w-20 md:h-24 md:w-32">
              <Image
                src="/public-new/100x.png"
                alt="100x"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 md:mt-32 animate-fade-in-up">
          <TrustedBySection />
        </div>
      </div>
    </section>
  );
} 