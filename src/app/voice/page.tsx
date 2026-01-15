import type { Metadata } from "next";
import VoiceHero from "@/components/voice/VoiceHero";
import VoiceTrusted from "@/components/voice/VoiceTrusted";
import VoiceRealCustomerCalls from "@/components/voice/VoiceRealCustomerCalls";
import VoiceFeatures from "@/components/voice/VoiceFeatures";
import VoiceStatistics from "@/components/voice/VoiceStatistics";
import { VoiceIntegrations } from "@/components/voice/VoiceIntegrations";
import VoiceTestimonials from "@/components/voice/VoiceTestimonials";

export const metadata: Metadata = {
  title: "Voice AI - Built for India | Alchemyst AI",
  description: "Powering India's businesses with AI Voice Agents from customer service to recruitment. Handle thousands of calls with natural, multilingual intelligence.",
  keywords: ["Voice AI", "AI Voice Agents", "India", "Customer Service", "Multilingual", "Call Automation"],
  openGraph: {
    title: "Voice AI - Built for India | Alchemyst AI",
    description: "Powering India's businesses with AI Voice Agents from customer service to recruitment.",
    type: "website",
  },
};

export default function VoicePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d0d0f' }}>
      {/* Left border line - hidden on mobile */}
      <div 
        className="hidden md:block fixed left-12 md:left-24 lg:left-32 xl:left-48 2xl:left-64 top-0 bottom-0 w-px z-50"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(128, 128, 128, 0.3) 10%, rgba(128, 128, 128, 0.3) 90%, transparent 100%)' }}
      />
      {/* Right border line - hidden on mobile */}
      <div 
        className="hidden md:block fixed right-12 md:right-24 lg:right-32 xl:right-48 2xl:right-64 top-0 bottom-0 w-px z-50"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(128, 128, 128, 0.3) 10%, rgba(128, 128, 128, 0.3) 90%, transparent 100%)' }}
      />
      
      {/* Main content container - full width on mobile, constrained on desktop */}
      <div className="mx-0 md:mx-24 lg:mx-32 xl:mx-48 2xl:mx-64">
        <VoiceHero />
        <VoiceTrusted />
        <VoiceRealCustomerCalls />
        <VoiceFeatures />
        <VoiceStatistics />
        <VoiceIntegrations />
        <VoiceTestimonials />
      </div>
    </div>
  );
}

