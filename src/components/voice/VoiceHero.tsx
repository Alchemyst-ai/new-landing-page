"use client";

import { motion } from "framer-motion";
import { VoiceWaveform } from "./VoiceWaveform";

const VoiceHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Three.js Waveform Background */}
      <VoiceWaveform />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-4 pt-24 pb-32 lg:pt-32 lg:pb-36 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            Intelligent Voice. <br />
            <span className="text-[#ffa500] drop-shadow-[0_0_30px_rgba(255,165,0,0.5)]">Reimagined.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            Experience the future of audio interfaces with our advanced waveform visualization technology.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <button className="px-10 py-4 rounded-full bg-[#ffa500] text-black font-black hover:bg-[#ffb732] transition-all active:scale-95 shadow-[0_0_40px_rgba(255,165,0,0.4)] hover:shadow-[0_0_60px_rgba(255,165,0,0.6)]">
            Get Started
          </button>
          <button className="px-10 py-4 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
            View Documentation
          </button>
        </motion.div>
        </div>
      </div>

      {/* Atmospheric Layers */}
      
      {/* 0. Central Vignette for Text Legibility */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.7)_0%,transparent_80%)]" />

      {/* 1. Vibrant Orange Backlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at 15% 50%, rgba(255, 165, 0, 0.2) 0%, transparent 60%)"
        }}
      />

      {/* 2. Noise/Glitter Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 165, 0, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 165, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }}
      />
    </section>
  );
};

export default VoiceHero;

