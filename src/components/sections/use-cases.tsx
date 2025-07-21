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
} from "lucide-react";
import Image from "next/image";

const containerVariants = {
  initial: {},
  whileHover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Card1() {
  return (
    <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer">
        <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b">
          <div className="relative flex flex-col items-center justify-center gap-y-2 p-10 w-full h-full">
            <Image
              src="/use-cases/customerLanding.gif"
              alt="Customer Support Use Case"
              width={400}
              height={300}
              className="w-full h-full object-contain rounded-md"
              unoptimized
            />
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
      </div>
    </div>
  );
}

const Card2 = () => {
  return (
    <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer">
        <div className="border-b items-center justify-center overflow-hidden bg-transparent rounded-t-xl h-4/5 w-full flex">
          <div className="relative flex flex-col items-center justify-center gap-y-2 p-10 w-full h-full">
            <Image
              src="/use-cases/healthLanding.gif"
              alt="Healthcare Use Case"
              width={400}
              height={300}
              className="w-full h-full object-contain rounded-md"
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Healthcare
          </h2>
          <p className="text-sm text-muted-foreground">
            Smarter care, lesser costs. AI your patients can trust. Powered by Memory.
          </p>
        </div>
      </div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="p-0 min-h-[500px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 -z-0">
      <div className="relative flex flex-col gap-y-5 items-center justify-between h-full w-full">
        <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex">
          <div className="relative flex items-center justify-center h-full w-full p-10">
            <Image
              src="/use-cases/financeLanding.gif"
              alt="Finance Use Case"
              width={400}
              height={300}
              className="w-full h-full object-contain rounded-md"
              unoptimized
            />
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
