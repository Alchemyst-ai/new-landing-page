"use client";

import { Section } from "@/components/section";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe2,
  Layers,
  Zap,
  ArrowRight,
  Database,
  Search,
  BrainCircuit,
  Bot,
  FileText,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Description } from "@radix-ui/react-dialog";

// Dummy data for the bento items
const items = [
  {
    title: "Context-Aware Memory",
    description: "Agents that remember user preferences across sessions, enabling truly personalized automation.",
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Database className="h-4 w-4 text-card-foreground" />,
  },
  {
    title: "Real-time Sync",
    description: "Ensure your data is always up-to-date. Seamlessly sync information across teams and applications in real-time.",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <BarChart3 className="h-4 w-4 text-card-foreground" />,
  },
  {
    title: "Customer Support",
    description: "Add human touch to your chatbots with memory so it retains context.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Globe2 className="h-4 w-4 text-card-foreground" />,
  },
  {
    title: "Integrated Tooling",
    description: "Connect your existing stack with a single powerful API layer.",
    header: <SkeletonFour />,
    className: "md:col-span-1",
    icon: <Layers className="h-4 w-4 text-card-foreground" />,
  },
  {
    title: "LLMs with Memory",
    description: "Empower Large Language Models with long-term memory for richer, continuous conversations.",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <BrainCircuit className="h-4 w-4 text-card-foreground" />,
  },
  {
    title: "Agentic AI",
    description: "Build autonomous agents that can reason, plan, and execute complex tasks using context.",
    header: <SkeletonSix />,
    className: "md:col-span-1",
    icon: <Bot className="h-4 w-4 text-card-foreground" />,
  },
];

export function UseCases() {
  return (
    <Section id="use-cases" title="Use Cases" className="border-r border-l">
      <div className="mx-auto m-4 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </div>
    </Section>
  );
}

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-card border border-border justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden relative">
        {header}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="flex items-center gap-2 mb-2 text-card-foreground">
          {icon}
          <div className="font-sans font-bold text-card-foreground mb-2 mt-2">
            {title}
          </div>
        </div>
        <div className="font-sans font-normal text-muted-foreground text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

// --- Animations / Skeletons ---

function SkeletonOne() {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[8rem] dark:bg-zinc-950/60 bg-zinc-100 flex-col space-y-2 relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-4">
        <motion.div
          variants={variants}
          className="h-24 w-24 rounded-2xl bg-background border border-orange-400 p-4 flex flex-col items-center justify-center shadow-lg transform rotate-6 z-10"
        >
          <div className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center mb-2">
            <Search className="h-4 w-4 text-accent" />
          </div>
          <div className="w-12 h-2 bg-white/40 rounded-full"></div>
        </motion.div>
        <motion.div
          variants={variantsSecond}
          className="h-24 w-24 rounded-2xl bg-card border border-orange-400 p-4 flex flex-col items-center justify-center shadow-lg -rotate-6 z-0 brightness-90"
        >
          <div className="w-12 h-2 bg-white/80 rounded-full mb-2"></div>
          <div className="w-8 h-2 bg-white/50 rounded-full"></div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </motion.div>
  );
}

function SkeletonTwo() {
  const bars = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center dark:bg-zinc-950/60 bg-zinc-100 relative overflow-hidden">
      <div className="flex gap-2 items-end h-20">
        {bars.map((i) => (
          <motion.div
            key={i}
            className="w-3 bg-white border-orange-400 rounded-t-sm"
            initial={{ height: 20 }}
            whileInView={{ height: [20, 20 + Math.random() * 40, 30] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1
            }}
          />
        ))}
      </div>
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent-foreground/30 blur-xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}

function SkeletonThree() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center dark:bg-zinc-950/60 bg-zinc-100 relative group/globe">
      <div className="relative h-20 w-20">
        {/* Core */}
        <div className="absolute inset-0 m-auto h-8 w-8 bg-foreground rounded-full z-10 flex items-center justify-center">
          <Zap className="h-4 w-4 text-background fill-background" />
        </div>

        {/* Orbit 1 */}
        <motion.div
          className="absolute inset-0 border border-muted-foreground/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(var(--accent),0.8)]" />
        </motion.div>

        {/* Orbit 2 */}
        <motion.div
          className="absolute inset-2 border border-muted-foreground/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full" />
        </motion.div>

      </div>
      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}

function SkeletonFour() {
  return (
    <div className="flex flex-col flex-1 w-full h-full min-h-[8rem] dark:bg-zinc-950/60 bg-zinc-100 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-background rounded-lg border border-border flex items-center justify-center shadow-sm cursor-pointer hover:border-accent hover:shadow-md transition-colors"
            >
              <div className={`w-6 h-6 rounded-full opacity-80 ${i === 1 ? 'bg-orange-400' : i === 2 ? 'bg-gray-400' : i === 3 ? 'bg-zinc-800' : 'bg-orange-300'
                }`} />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Connecting lines graphic (simplified) */}
      <svg className="absolute inset-0 pointer-events-none opacity-20" width="100%" height="100%">
        <line x1="50%" y1="50%" x2="40%" y2="40%" stroke="currentColor" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="60%" y2="40%" stroke="currentColor" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="40%" y2="60%" stroke="currentColor" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="60%" y2="60%" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  )
}

function SkeletonFive() {
  // Lists style reference - "Memory Stack"
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center dark:bg-zinc-950/60 bg-zinc-100 relative overflow-hidden p-4">
      <div className="flex flex-col gap-2 w-full max-w-[200px] relative z-10">
        {/* Passive Items */}
        <div className="flex items-center gap-3 p-2 rounded-lg border border-border bg-card/50 opacity-40">
          <div className="h-6 w-6 rounded bg-white/70"></div>
          <div className="h-2 w-16 bg-white/70 rounded"></div>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg border border-border bg-card/50 opacity-60">
          <div className="h-6 w-6 rounded bg-white/70"></div>
          <div className="h-2 w-20 bg-white/70 rounded"></div>
        </div>

        {/* Active Memory Item */}
        <motion.div
          className="flex items-center gap-3 p-2 rounded-lg border border-[#f59025]/40 bg-gradient-to-r from-card to-[#f59025]/5 shadow-[0_0_15px_rgba(245,144,37,0.1)]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-6 w-6 rounded-full bg-[#f59025]/20 flex items-center justify-center">
            <Check className="h-3 w-3 text-[#f59025]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-24 bg-white/80 rounded animate-pulse"></div>
            <div className="h-1.5 w-12 bg-[#f59025] rounded"></div>
          </div>
          {/* Floating Cursor/Action Indicator */}
          <motion.div
            className="absolute -right-2 top-6 w-3 h-3 text-[#f59025] fill-[#f59025]"
            animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full transform rotate-12 drop-shadow-md">
              <path d="M5.5 3.21l10.8 5.4a1 1 0 0 1 0 1.78L10 13.5l-6 1.5a1 1 0 0 1-1.2-1.2l1.5-6a1 1 0 0 1 .8-1.78l.4-.2z" />
            </svg>
          </motion.div>

        </motion.div>
      </div>
      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}

function SkeletonSix() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center dark:bg-zinc-950/60 bg-zinc-100 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59025_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.05]" />

      {/* Node A: Context/Trigger */}
      <motion.div
        className="absolute top-[20%] left-[20%] bg-card border border-border p-2.5 rounded-xl flex items-center gap-2 shadow-sm z-10"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center border border-white/5">
          <FileText className="h-3.5 w-3.5 text-white/50" />
        </div>
        <div className="hidden sm:block w-10 h-2 bg-white/50 rounded-full" />
      </motion.div>

      {/* Node B: Action/Result */}
      <motion.div
        className="absolute bottom-[20%] right-[20%] bg-[#1a1a1a] border border-[#f59025]/30 p-2.5 rounded-xl flex items-center gap-2 shadow-[0_4px_20px_-2px_rgba(245,144,37,0.2)] z-10"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex flex-col gap-1">
          <div className="w-8 h-2 bg-[#f59025]/20 rounded-full" />
          <div className="w-12 h-2 bg-white/80 rounded-full" />
        </div>
        <div className="h-7 w-7 rounded-full bg-[#f59025] flex items-center justify-center shadow-inner">
          <Zap className="h-3.5 w-3.5 text-white fill-white" />
        </div>
      </motion.div>

      {/* Connection Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#555" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#f59025" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#555" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Curved Path */}
        <path
          d="M 80 50 C 140 50, 140 110, 200 110"
          // Note: Fixed coordinates for simplicity in this snippet, ideally use responsive refs or flexible SVG coord system
          // Adjusting to relative coordinates via simple CSS positioning simulation below instead for better responsiveness
          className="hidden"
        />
      </svg>

      {/* CSS-based Connector for Responsiveness */}
      <div className="absolute top-[35%] left-[30%] w-[40%] h-[40%] border-t border-r border-[#f59025]/30 rounded-tr-[30px] pointer-events-none opacity-50"></div>

      {/* Traveling Energy Particle */}
      <motion.div
        className="absolute w-2 h-2 bg-[#f59025] rounded-full shadow-[0_0_10px_#f59025] z-20"
        animate={{
          top: ["35%", "35%", "75%"],
          left: ["30%", "70%", "70%"],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-[35%] right-[30%] -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-[#151515] border border-[#f59025]/50 flex items-center justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-[#f59025] animate-ping" />
      </div>
      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}
