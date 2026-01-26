"use client";

import { Section } from "@/components/section";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  HeadsetIcon,
  BrainCircuitIcon,
  Mic2Icon,
  HandCoinsIcon,
  RocketIcon
} from "lucide-react";

const useCasesTimeline = [
  {
    id: 1,
    title: "Context Layer for Agents",
    date: "2025 Q4",
    content:
      "A SaaS startup leverages the context layer to enable their AI agents to remember user preferences, automate onboarding, and deliver personalized support at scale.",
    category: "Startup",
    icon: RocketIcon,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Marketing: Voice Agents",
    date: "2025 Q3",
    content:
      "A marketing company deploys voice agents to engage leads, qualify prospects, and run interactive campaigns, all with memory of past interactions.",
    category: "Marketing",
    icon: Mic2Icon,
    relatedIds: [1, 4],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 3,
    title: "Healthcare: Patient Memory",
    date: "2025 Q2",
    content:
      "Healthcare provider uses context memory to track patient history, allergies, and automate follow-ups, improving care and compliance.",
    category: "Healthcare",
    icon: BrainCircuitIcon,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Fintech: Secure Voice Transactions",
    date: "2025 Q1",
    content:
      "Fintech startup enables secure, context-aware voice transactions, reducing fraud and improving user experience.",
    category: "Fintech",
    icon: HandCoinsIcon,
    relatedIds: [2],
    status: "pending" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Customer Care: AI with Memory",
    date: "2024 Q4",
    content:
      "A B2C company deploys AI agents with memory to resolve customer issues faster, remember previous tickets, and provide a human-like experience.",
    category: "Customer Care",
    icon: HeadsetIcon,
    relatedIds: [3],
    status: "completed" as const,
    energy: 85,
  },
];

export function UseCases() {
  return (
    <Section id="use-cases" title="Use Cases" className=" border-b lg:border-b-0 lg:border-r lg:border-l bg-transparent">
      <div className="w-full flex justify-center items-center">
        <RadialOrbitalTimeline timelineData={useCasesTimeline} />
      </div>
    </Section>
  );
}