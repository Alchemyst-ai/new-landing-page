import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";

const faqs: { question: string; answer: ReactNode }[] = [
    {
        question: "What is Alchemyst AI?",
        answer:
          "Alchemyst AI is a context engine that provides AI applications with persistent memory, business data, and operational context so agents remain accurate, reliable, and production-ready. It is a standalone context layer that can be integrated into your stack through our APIs, SDKs and MCPs.",
      },
  {
    question: "How can I use Alchemyst AI?",
    answer: (
      <span>
        You can wire Alchemyst AI into your stack through our APIs, SDKs, MCPs, and
        browser extension - whatever fits your workflow best. Check more details
        in our{" "}
        <a
          href="https://docs.getalchemystai.com"
          className="text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>
        .
      </span>
    ),
  },
  {
    question: "What is an AI memory layer and why is it important?",
    answer: "An AI memory layer lets agents remember previous interactions, user preferences, tasks, and business data. It improves accuracy, reduces hallucinations, and allows AI systems to operate with human-like context. Alchemyst AI provides a built-in memory layer designed for production-grade agents.",
  },
  {
    question: "How does a context engine improve AI agent performance?",
    answer: "A context engine organizes and stores long-term and short-term information so AI agents can make better decisions. Alchemyst AI’s context engine adds persistent memory, intent detection, and data-aware reasoning to enhance agent reliability.",
  },
  {
    question: "Can AI agents have long-term memory across conversations?",
    answer: "Yes. With systems like Alchemyst AI, agents keep persistent memory across sessions, users, and workflows. This enables personalization and consistent task execution over time.",
  },

  {
    question: "How do context-aware AI agents compare to regular chatbots?",
    answer: "Context-aware agents remember past interactions, reference enterprise data, and perform end-to-end tasks. Regular chatbots usually respond only to the latest prompt.",
  }
];

export function FAQSection() {
  return (
    <Section
      id="faq"
      title="Frequently asked questions"
      description=""
      align="left"
    >
      <div className="border-x border-t">
        <Accordion
          type="single"
          collapsible
          className="divide-y divide-border"
          defaultValue="faq-0"
        >
          {faqs.map((faq, index) => (
            <AccordionItem value={`faq-${index}`} key={faq.question}>
              <AccordionTrigger className="text-lg text-left font-medium px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground px-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

