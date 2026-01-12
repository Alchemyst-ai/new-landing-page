"use client";

import { motion } from "framer-motion";
import { 
  GitBranch, 
  Zap, 
  Clock, 
  UserCheck, 
  Languages, 
  MessageSquare 
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Unlimited calls",
    description: "Auto-scales up and down to handle calling volume",
  },
  {
    icon: Zap,
    title: "Live actions on call",
    description: "Send payment links, pull data real-time and transfer to human",
  },
  {
    icon: Clock,
    title: "15 min+ calls",
    description: "Conversations as long as humans' with no hallucination",
  },
  {
    icon: UserCheck,
    title: "Call in <1 min of drop-off",
    description: "Leads called real-time upon entering funnel for max. connection",
  },
  {
    icon: Languages,
    title: "Language switching",
    description: "Switches languages on-call based on user's preference",
  },
  {
    icon: MessageSquare,
    title: "Interruption handling",
    description: "Handles customer interruptions just like a human",
  },
];

const VoiceFeatures = () => {
  return (
    <section id="features" className="relative py-24 overflow-hidden" style={{ background: '#0d0d0f' }}>
      <div className="relative z-10 mx-auto px-4 max-w-7xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-2">
            AI Voice Bot that doesn&apos;t just sound human
          </h2>
          <p className="text-gradient-italic text-2xl sm:text-3xl font-semibold">
            it works like one, and outperforms.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="feature-card-gradient rounded-2xl p-8 border border-border/50 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <feature.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground text-center mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-primary text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Parallel horizontal lines with vertical lines in between */}
      <div className="relative h-40 overflow-visible mt-12">
        {/* Top horizontal line */}
        <div
          className="absolute top-4 left-0 right-0 h-px z-10"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        {/* Bottom horizontal line */}
        <div
          className="absolute bottom-4 left-0 right-0 h-px z-10"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        {/* Vertical lines between horizontal parallels */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px"
              style={{
                left: `${(i / 199) * 100}%`,
                height: "calc(100% - 2rem)",
                marginTop: "1rem",
                marginBottom: "1rem",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.06) 75%)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceFeatures;

