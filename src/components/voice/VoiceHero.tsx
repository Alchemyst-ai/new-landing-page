"use client";

import { motion } from "framer-motion";
import { VoiceWaveform } from "./VoiceWaveform";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import rawCountryPhoneCodes from "@/lib/countryPhoneCodes.json";

const countryPhoneCodes = rawCountryPhoneCodes as Record<string, string>;

function normalizeDialCode(raw: string): string | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) return null;
  const match = trimmed.match(/\d+/);
  if (!match) return null;
  return `+${match[0]}`;
}

const VoiceHero = () => {
  const [startPilotOpen, setStartPilotOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [callingAgents, setCallingAgents] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; callingAgents?: string; phoneNumber?: string; accepted?: string } | null>(null);

  const phoneCodeOptions = useMemo(() => {
    return Object.entries(countryPhoneCodes)
      .map(([iso2, code]) => {
        const dial = normalizeDialCode(code);
        if (!dial) return null;
        return { iso2, dial };
      })
      .filter(Boolean)
      .sort((a, b) => {
        // Prefer numerically smaller codes first, then ISO.
        const aNum = parseInt((a as any).dial.replace("+", ""), 10);
        const bNum = parseInt((b as any).dial.replace("+", ""), 10);
        if (Number.isFinite(aNum) && Number.isFinite(bNum) && aNum !== bNum) return aNum - bNum;
        return (a as any).iso2.localeCompare((b as any).iso2);
      }) as Array<{ iso2: string; dial: string }>;
  }, []);

  const canSubmit = useMemo(() => {
    return !!email.trim() && !!callingAgents.trim() && accepted && !isSubmitting;
  }, [accepted, callingAgents, email, isSubmitting]);

  const resetForm = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setEmail("");
    setCallingAgents("");
    setPhoneCountryCode("+91");
    setPhoneNumber("");
    setAccepted(false);
    setErrors(null);
  };

  const validate = () => {
    const nextErrors: { email?: string; callingAgents?: string; phoneNumber?: string; accepted?: string } = {};

    if (!email.trim()) nextErrors.email = "Email is required";
    if (!callingAgents.trim()) nextErrors.callingAgents = "Number of calling agents is required";
    if (!accepted) nextErrors.accepted = "You must agree to the T&C and Privacy Policy";
    if (phoneNumber.trim() && !/^[0-9\s()-]{5,20}$/.test(phoneNumber.trim())) nextErrors.phoneNumber = "Invalid mobile number";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const sanitizedPhoneNumber = phoneNumber.trim();
      const sanitizedCountryCode = phoneCountryCode.trim();
      const phoneE164 = sanitizedPhoneNumber
        ? `${sanitizedCountryCode}${sanitizedPhoneNumber.replace(/[^0-9]/g, "")}`
        : "";

      const payload = {
        email: email.trim(),
        callingAgents: callingAgents.trim(),
        acceptedTerms: accepted,

        phoneCountryCode: sanitizedPhoneNumber ? sanitizedCountryCode : "",
        phoneNumber: sanitizedPhoneNumber ? sanitizedPhoneNumber : "",
        phoneE164: phoneE164,

        source: "voice-hero-start-pilot",
      };

      const response = await fetch("/api/voice-start-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        setErrors({ email: error.error || "Failed to submit. Please try again." });
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setStartPilotOpen(false);
        resetForm();
      }, 1200);
    } catch {
      setErrors({ email: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-16" style={{ height: '70vh', minHeight: '600px' }}>
      {/* Three.js Waveform Background */}
      <VoiceWaveform />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-4 pt-16 pb-20 lg:pt-20 lg:pb-24 max-w-7xl h-full">
        <div className="flex flex-col items-center text-center space-y-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            AI Voice Layer that<br />
            <span className="text-[#f59025] drop-shadow-[0_0_30px_rgba(255,165,0,0.5)]">Customers Trust.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            Every word visualized. Every interaction mapped. Know exactly how your voice AI performs before your customers tell you.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="https://cal.com/uttaran-nayak-alchemyst/30min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-10 py-4 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            Book a Demo
          </a>
          <button
            onClick={() => setStartPilotOpen(true)}
            className="cursor-pointer px-10 py-4 rounded-full bg-[#f59025] text-black font-semibold hover:bg-[#f89c3a] transition-all active:scale-95 shadow-[0_0_40px_rgba(255,165,0,0.4)] hover:shadow-[0_0_60px_rgba(255,165,0,0.6)]"
          >
            Start Pilot
          </button>
        </motion.div>
        </div>
      </div>

      <Dialog
        open={startPilotOpen}
        onOpenChange={(open) => {
          setStartPilotOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-[520px] bg-[#151515] text-white border border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white tracking-tight">LET&apos;S TALK</DialogTitle>
            <DialogDescription className="text-white/70">
              Share a couple details and we&apos;ll reach out.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-10 text-center">
              <div className="flex items-center justify-center">
                <Image src="/tick.png" alt="Success" width={88} height={88} priority />
              </div>
              <div className="text-white text-lg font-medium mt-4">Thanks!</div>
              <div className="text-white/70 text-sm mt-1">Our team will contact you shortly.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="voice-start-pilot-email" className="text-white">
                  Email
                </Label>
                <Input
                  id="voice-start-pilot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="bg-black/30 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#ffa500]"
                />
                {errors?.email ? <div className="text-sm text-red-400">{errors.email}</div> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-start-pilot-agents" className="text-white">
                  Number of calling agents
                </Label>
                <Input
                  id="voice-start-pilot-agents"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={callingAgents}
                  onChange={(e) => setCallingAgents(e.target.value)}
                  placeholder="Enter how many tele-callers you have today"
                  className="bg-black/30 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#ffa500]"
                />
                {errors?.callingAgents ? <div className="text-sm text-red-400">{errors.callingAgents}</div> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Mobile (optional)</Label>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <div className="relative">
                    <select
                      value={phoneCountryCode}
                      onChange={(e) => setPhoneCountryCode(e.target.value)}
                      style={{ colorScheme: "dark" }}
                      className="cursor-pointer h-10 w-full rounded-md bg-[#151515] border border-white/10 text-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa500]"
                      aria-label="Country code"
                    >
                      {phoneCodeOptions.map(({ iso2, dial }) => (
                        <option key={`${iso2}-${dial}`} className="bg-[#151515] text-white" value={dial}>
                          {iso2} {dial}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    id="voice-start-pilot-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Mobile number"
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#ffa500]"
                  />
                </div>
                {errors?.phoneNumber ? <div className="text-sm text-red-400">{errors.phoneNumber}</div> : null}
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/40 accent-[#ffa500]"
                  />
                  <span>
                    I have read and agree to the{" "}
                    <Link className="text-[#ffa500] hover:underline" href="/terms-of-use" target="_blank" rel="noreferrer">
                      T&amp;C
                    </Link>{" "}
                    and{" "}
                    <Link className="text-[#ffa500] hover:underline" href="/privacy-policy" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors?.accepted ? <div className="text-sm text-red-400">{errors.accepted}</div> : null}
              </div>

              <Button
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer w-full rounded-full bg-[#ffa500] text-black font-semibold hover:bg-[#ffb732] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Contact us"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

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

