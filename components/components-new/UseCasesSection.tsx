"use client";

import { useState } from "react";
import { IconHeadset, IconBrain, IconRobot, IconShoppingBag } from "@/components/ui/icons";

const UseCaseCard = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

const TabButton = ({
  label,
  isActive,
  onClick
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
        isActive
          ? "border-[#FF9E3C] text-[#FF9E3C]"
          : "border-transparent text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState("Healthcare");

  const tabs = ["Healthcare", "BFSI / Auto Servicing", "EdTech", "Manufacturing"];

  const useCases = {
    "Healthcare": [
      {
        title: "Smarter Patient Support, Lower Costs",
        description: "Alchemyst cuts per-interaction costs by over 40% right away—and up to 99.7% at scale. Memory-enabled agents deliver personalized care without needing costly data integration each time."
      },
      {
        title: "Fewer Claim Denials, Better Accuracy",
        description: "Data-aware agents reduce errors in patient info, slashing denial rates from 8.5% to 6.8%. Support accuracy jumps by 34%, leading to faster, more reliable claims processing."
      },
      {
        title: "Trust Through Context",
        description: "Alchemyst remembers patient history, treatment paths, and conversation details—turning AI into a reliable, context-aware care partner that patients can actually trust."
      }
    ],
    "BFSI / Auto Servicing": [
      {
        title: "Predictive, Personalized, Profitable",
        description: "Whether it's maintenance, warranty, or customer comms—Alchemyst links siloed logs, notes, and specs to cut unplanned downtime by 50% and reduce claim turnaround by 70%."
      },
      {
        title: "Context Turns Into Cash",
        description: "Context-rich data unlocks 3.5× savings in corrective maintenance and 3.6× higher customer engagement through tailored outreach grounded in real vehicle + owner history."
      },
      {
        title: "Decisions That Learn, Not Lag",
        description: "No more waiting on incomplete or out-of-sync data. Alchemyst agents pull context from across silos—VINs, repairs, parts, claims—and act in real time with full story recall."
      }
    ],
    "EdTech": [
      {
        title: "Teach Less Admin, Learn More",
        description: "With Alchemyst, teacher-facing AI cuts up to 60% of admin workload by syncing attendance, grading, and LMS data—freeing 8+ hours per week for real instruction."
      },
      {
        title: "Every Learner, Fully Understood",
        description: "Alchemyst builds a 360° learner profile by unifying SIS, clickstream, and prior knowledge data. Result: 14 pp higher engagement and up to 30% gains in learning outcomes."
      },
      {
        title: "Trustworthy Agents for Safe Classrooms",
        description: "Governed AI matters in education. Alchemyst enforces access rules, prevents leakage, and reduces unintended AI behavior by over 70%—keeping learning secure and on track."
      }
    ],
    "Manufacturing": [
      {
        title: "Rapid NPI Document & SOP Automation",
        description: "When R&D releases a new SKU, Alchemyst's agent ingests design files, CADs, and specs to auto-generate SOPs and multimedia work instructions—synced to MES in under a week. Unlike memoryless LLM pilots or rigid PLM tools, it retains every version and spec update, turning a 6-month doc cycle into days."
      },
      {
        title: "Autonomous Procurement & Sourcing Intelligence",
        description: "Alchemyst ingests live market feeds, ESG data, and contracts into a persistent memory graph—letting agents analyze, negotiate, and route POs with context. It handles unstructured data, recalls past vendor terms, and reduces token costs by 40%, enabling <$0.40 decisions grounded in history."
      },
      {
        title: "Predictive Maintenance & Work-Order Generation",
        description: "By merging sensor data, logs, and engineer notes, Alchemyst builds a 'maintenance brain' that predicts failures, auto-generates BOMs, and dispatches work orders. It updates context in real time, works across OEMs, and slashes deployment time from 6 months to 2 weeks via a single API."
      }
    ]
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            USE CASES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-lg">
            Perfect For Your AI Agents
          </h2>
          <p className="text-center text-gray-300 max-w-3xl leading-relaxed">
            We&apos;re developers building tools for developers. Our mission: to make AI applications that understand
            context and remember users, creating more natural and efficient interactions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>

        {/* Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases[activeTab as keyof typeof useCases].map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 