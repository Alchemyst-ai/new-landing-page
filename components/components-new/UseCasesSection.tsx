"use client";

import { IconHeadset, IconBrain, IconRobot, IconShoppingBag } from "@/components/ui/icons";

const UseCaseCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4 text-foreground">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default function UseCasesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            USE CASES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Perfect For Your AI Agents
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl leading-relaxed">
            We&apos;re developers building tools for developers. Our mission: to make AI applications that understand
            context and remember users, creating more natural and efficient interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
          <UseCaseCard
            icon={<IconHeadset className="w-10 h-10" />}
            title="Customer Support"
            description="Enhance customer satisfaction with chatbots that remember past interactions, reducing repetition and speeding up resolution times"
          />

          <UseCaseCard
            icon={<IconBrain className="w-10 h-10" />}
            title="Personal AI Companion"
            description="Create AI companions that truly know you, recalling preferences and past conversations for more meaningful interactions."
          />

          <UseCaseCard
            icon={<IconRobot className="w-10 h-10" />}
            title="AI Agents"
            description="Develop smarter AI agents that learn from each interaction, becoming more personalized and effective over time"
          />

          {/* <UseCaseCard
            icon={<IconShoppingBag className="w-10 h-10" />}
            title="E-Commerce"
            description="Increase sales with AI that remembers customer preferences, providing tailored product recommendations that feel personal"
          />

          <UseCaseCard
            icon={<IconShoppingBag className="w-10 h-10" />}
            title="E-Commerce"
            description="Increase sales with AI that remembers customer preferences, providing tailored product recommendations that feel personal"
          />

          <UseCaseCard
            icon={<IconShoppingBag className="w-10 h-10" />}
            title="E-Commerce"
            description="Increase sales with AI that remembers customer preferences, providing tailored product recommendations that feel personal"
          /> */}
        </div>
      </div>
    </section>
  );
} 