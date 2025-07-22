"use client";

import { Section } from "@/components/section";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { cubicBezier, motion } from "framer-motion";
import {
  AlertTriangleIcon,
  BrainCircuitIcon,
  DatabaseIcon,
  GitForkIcon,
  HeadsetIcon,
  InfoIcon,
  MessageSquareIcon,
  SearchIcon,
  SquareTerminal,
  UserSearch,
  XCircleIcon,
  LineChartIcon,
  TargetIcon,
  RefreshCcwIcon,
  WalletIcon,
  HandCoinsIcon,
} from "lucide-react";

const containerVariants = {
  initial: {},
  whileHover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Card1() {
  const variant1 = {
    initial: {
      scale: 0.87,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      scale: 0.8,
      boxShadow:
        "rgba(245,40,145,0.35) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant2 = {
    initial: {
      y: -27,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      y: -55,
      scale: 0.87,
      boxShadow:
        "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant3 = {
    initial: {
      y: -25,
      opacity: 0,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      y: -45,
      opacity: 1,
      scale: 1,
      boxShadow:
        "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
      >
        <div className="flex h-full w-full items-start justify-center rounded-t-xl border-b p-6">
          <div className="relative flex flex-col items-stretch justify-start gap-y-6 w-full max-w-md">
            <motion.div
              variants={variant1}
              className="z-[1] flex h-full w-[85%] items-start gap-x-2 rounded-lg border bg-background/80 p-4 self-end flex-row-reverse"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <MessageSquareIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-1 items-end">
                <div className="text-sm text-foreground/80 font-medium">Customer</div>
                <div className="text-sm text-muted-foreground">I was charged twice. Please fix this.</div>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className="z-[2] flex h-full w-[85%] items-start gap-x-2 rounded-lg border bg-background/80 p-4 self-start"
            >
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <HeadsetIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="text-sm text-foreground/80 font-medium">Agent</div>
                <div className="text-sm text-muted-foreground">Network error. The second pending payment will auto-refund in 5-7 days. I'll notify you once it's cleared.</div>
              </div>
            </motion.div>
            <motion.div
              variants={variant3}
              className="z-[3] flex h-full w-[85%] items-start gap-x-2 rounded-lg border bg-background/80 p-4 self-end flex-row-reverse"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <MessageSquareIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-1 items-end">
                <div className="text-sm text-foreground/80 font-medium">Customer</div>
                <div className="text-sm text-muted-foreground">Thank you.</div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Customer Support
          </h2>
          <p className="text-sm text-muted-foreground">
            Add human touch to your chatbots with memory so it retains context. Speed up resolution times upto 64%.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const Card2 = () => {
  const logs = [
    {
      id: 1,
      type: "context",
      timestamp: "2025-07-14 10:02:15",
      message: "Detected prior note: \"Mild reaction to penicillin\"",
      icon: (
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
          <InfoIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 2,
      type: "memory_update",
      timestamp: "2025-07-15 10:02:18",
      message: "Allergen logged: penicillin. Added to permanent avoidance list.",
      icon: (
        <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
          <AlertTriangleIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 3,
      type: "request",
      timestamp: "2025-07-15 10:03:00",
      message: "Patient asked to refill sinus infection meds.",
      icon: (
        <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
          <MessageSquareIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 4,
      type: "decision",
      timestamp: "2025-07-20 10:03:08",
      message: "Antibiotics refill initiated. Avoiding penicillin-class drugs.",
      icon: (
        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
          <BrainCircuitIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
  ];
  return (
    <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
      >
        <div className="border-b items-center justify-center overflow-hidden bg-transparent rounded-t-xl h-4/5 w-full flex">
          <motion.div className="p-6 rounded-t-md cursor-pointer overflow-hidden h-[270px] flex flex-col gap-y-4 w-full max-w-md">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                className="p-4 bg-background/80 backdrop-blur-md shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] border border-border origin-right w-full rounded-lg flex items-center gap-x-3"
                custom={index}
                variants={{
                  initial: (index: number) => ({
                    y: 0,
                    scale: index === 3 ? 0.9 : 1,
                    opacity: 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: cubicBezier(0.22, 1, 0.36, 1),
                    },
                  }),
                  whileHover: (index: number) => ({
                    y: -85,
                    opacity: index === 3 ? 1 : 0.6,
                    scale: index === 0 ? 0.85 : index === 3 ? 1.1 : 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: cubicBezier(0.22, 1, 0.36, 1),
                    },
                  }),
                }}
                transition={{
                  type: "spring",
                  damping: 40,
                  stiffness: 600,
                }}
              >
                <div className="flex-shrink-0">{log.icon}</div>
                <div className="flex-grow">
                  <p className="text-foreground/80 text-xs font-medium">
                    [{log.timestamp}] | {log.type.toUpperCase()}
                  </p>
                  <p className="text-muted-foreground text-sm">{log.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Healthcare
          </h2>
          <p className="text-sm text-muted-foreground">
            Smarter care, lesser costs. AI your patients can trust. Powered by Memory.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="p-0 min-h-[500px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 -z-0">
      <div className="relative flex flex-col gap-y-5 items-center justify-between h-full w-full">
        <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex">
          <div className="relative flex items-center justify-center h-full w-full">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle,hsl(var(--accent)/0.3)_0%,transparent_100%)]"></div>
            <OrbitingCircles duration={15} delay={0} radius={40} reverse>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <LineChartIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles duration={15} delay={20} radius={80}>
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                <TargetIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={120} duration={20} delay={20}>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                <RefreshCcwIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={160} duration={40} delay={20}>
              <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <WalletIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={200} duration={30}>
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                <HandCoinsIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Finance
          </h2>
          <p className="text-sm text-muted-foreground">
            Transactions that think ahead. Memory backed ledger.
          </p>
        </div>
      </div>
    </div>
  );
};

export function UseCases() {
  return (
    <Section id="use-cases" title="Use Cases">
      <div className="grid lg:grid-cols-3 h-full border border-b-0">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </Section>
  );
}