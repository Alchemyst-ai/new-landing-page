"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-white/10 py-5">
      <button
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 text-gray-400 pt-2">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Alchemyst AI enhance customer conversations?",
      answer: "Alchemyst blends voice AI with memory and context-awareness to deliver conversations that feel truly human. It remembers past interactions, adapts in real time, and personalizes every response—boosting satisfaction, loyalty, and conversion."
    },
    {
      question: "What integrations does Alchemyst support?",
      answer: "Alchemyst integrates effortlessly with your existing tools—from CRMs and e-commerce platforms to internal workflows—out of the box or via API. Anything can be connected to Alchemyst."
    },
    {
      question: "Is my data secure with Alchemyst?",
      answer: "Yes. Alchemyst encrypts data end-to-end, enforces strict access controls, and adheres to major global standards like GDPR, HIPAA, and CCPA. Your data stays private, protected, and audit-ready."
    },
    {
      question: "Is Alchemyst compliant with enterprise-grade standards?",
      answer: "Absolutely. Alchemyst is SOC Type 2 certified and HIPAA-ready. We back this with robust deployment options—cloud, VPC, or on-prem—and real-time audit trails."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 w-fit mx-auto rounded-full text-sm font-medium mb-4"
          >
            FAQ
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white bg-clip-text text-transparent"
          >
            Got Questions?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-12"
          >
            Get answers to commonly asked questions about Alchemyst AI and how it can transform your business. We're here to help.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-0 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/5"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400">
            More questions? <a href="#" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">Visit our documentation</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection; 