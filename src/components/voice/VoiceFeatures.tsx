"use client";

import { motion } from "framer-motion";
import {
  Timer,
  Target,
  SmilePlus,
  TrendingDown,
  UserMinus,
  TrendingUp,
} from "lucide-react";
import VoiceGridDivider from "./VoiceGridDivider";
import { Section } from "../section";

export const features = [
  {
    icon: Timer,
    title: "Instant AI Call Pickup",
    description: "AI voice agent answers calls in under 1 second, reducing wait time by 94%",
    metric: "94% faster response",
  },
  {
    icon: Target,
    title: "High Qualification Accuracy",
    description: "Accurately qualifies leads using real-time intent and context",
    metric: "91% accuracy",
  },
  {
    icon: SmilePlus,
    title: "CSAT Improvement",
    description: "Delivers natural, human-like conversations that improve customer satisfaction",
    metric: "+70% CSAT",
  },
  {
    icon: TrendingDown,
    title: "Reduced Lead Drop-Offs",
    description: "Engages leads instantly to prevent funnel abandonment",
    metric: "45% fewer drop-offs",
  },
  {
    icon: UserMinus,
    title: "Lower SDR Workload",
    description: "Automates repetitive calling and qualification tasks",
    metric: "65% fewer SDR hours",
  },
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description: "Drives renewals, subscriptions, and cross-sells through intelligent follow-ups",
    metric: "6–12% revenue boost",
  },
];

const VoiceFeatures = () => {
  return (
    <section id="features" className="relative py-12 md:py-16 lg:py-24 overflow-hidden" style={{ background: '#151515' }}>
      <div className="relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 leading-tight px-2">
          Voice Agent that reads between the lines. 
          </h2>
          <p className="text-gradient-italic text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-2">
          Manages escalations. Remembers context.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className=" bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 border border-border/50 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="mb-4 sm:mb-5 md:mb-6 flex justify-center">
                  <div className="relative">
                    <feature.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
                    <div className="absolute inset-0 blur-xl bg-[#f59025]/20 rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#f59025] text-center mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
       
      <VoiceGridDivider className="mt-8 sm:mt-10 md:mt-12" />
    </section>
  );
};

export default VoiceFeatures;

