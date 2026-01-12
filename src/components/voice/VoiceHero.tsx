"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AudioLines } from "lucide-react";

const VoiceHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Hero.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-4 pt-24 pb-32 lg:pt-32 lg:pb-36 max-w-7xl">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-white/90">
              Backed by{" "}
              <span className="text-emerald-400 font-semibold">Antler</span>
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl drop-shadow-2xl"
        >
          Voice AI
        </motion.h1>

        {/* Gradient headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl mt-2 drop-shadow-2xl"
        >
          <span className="gradient-text-india">Built for India</span>
        </motion.h2>

        {/* Supporting paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-center text-base text-white/90 sm:text-lg max-w-2xl leading-relaxed drop-shadow-lg"
        >
          Powering India&apos;s businesses with AI Voice Agents from customer service to recruitment, 
          and everything in between. Handle thousands of inbound and outbound calls 
          every minute with natural, multilingual intelligence.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10"
        >
          <Button 
            className="px-8 py-6 text-base font-medium rounded-lg bg-primary text-primary-foreground cta-glow transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
            size="lg"
          >
            Experience Maya
            <AudioLines className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceHero;

