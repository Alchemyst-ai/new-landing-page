"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TrustedBySection from "./TrustedBySection";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Use refs for constants to avoid them being dependencies in useEffect
  const typingSpeed = useRef(150); // Speed for typing in ms
  const deletingSpeed = useRef(100); // Speed for deleting in ms
  const delayAfterWord = useRef(1000); // Delay after word is fully typed

  // Use useMemo to prevent the words array from being recreated on each render
  const words = useMemo(() => ["Agents", "Projects", "Copilot"], []);

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
    <section className="pt-20 pb-32 px-4 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* <video 
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/landingpagevideo60_2.mp4" type="video/mp4" />
        </video> */}

        {/* Gradient & Blur Overlays */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-black/15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-background"></div>
      </div>

      <div className="max-w-6xl mt-20 mx-auto text-center relative z-10">
        {/* F6S Badge */}
        <div className="inline-flex items-center tracking-tighter gap-2 px-4 py-2 bg-black/70 rounded-full text-white text-base font-medium animate-fade-in">
          <span>✨ #1 in Gen AI category</span>
          <Image
            src="/f6s_0.png"
            alt="F6S"
            width={30}
            height={30}
            className="h-auto"
          />
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
          The Memory Layer<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-lg relative">
            for your AI <span className="inline-block w-[120px] md:w-[180px] lg:w-[280px] text-left">
              {displayText}<span className="animate-pulse">|</span>
            </span>
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto mb-10">
          Alchemyst is a self-improving infrastructure layer for LLM-based AI Agents, enabling personalized experiences that save costs and help ship products 20x faster.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-white hover:bg-white/90 text-black text-lg py-6 px-8 font-bold">
            Get Started
          </Button>
          <Button variant="outline" className="border-2 border-white text-white text-lg py-6 px-8 bg-black/30 font-medium">
            Book a Demo
          </Button>
        </div>

        {/* Backed By Section */}
        <div className="mt-32 animate-fade-in-up">
          <p className="text-lg text-gray-300 uppercase tracking-wider mb-8 font-medium">Backed by</p>
          <div className="flex flex-wrap gap-16 -mt-10 items-center justify-center">
            <div className="relative h-32 w-32">
              <Image
                src="/ipv.png"
                alt="IPV"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="relative h-32 w-32">
              <Image
                src="/earlyseed.png"
                alt="Early Seed"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="relative h-24 w-32">
              <Image
                src="/100x.png"
                alt="100x"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>

          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-32 animate-fade-in-up">
          <TrustedBySection />
        </div>
      </div>
    </section>
  );
} 