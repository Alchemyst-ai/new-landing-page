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
      question: "How does Alchemyst AI enhance my business conversations?",
      answer: "Alchemyst AI uses advanced voice technology to create natural, engaging conversations with your customers. Our platform analyzes context, remembers previous interactions, and delivers personalized responses that sound human-like, improving customer satisfaction and conversion rates."
    },
    {
      question: "What integration options are available for Alchemyst AI?",
      answer: "Right off the platform, we offer seamless integration with popular CRM systems, e-commerce platforms, and communication tools. With our API? As many as you can build :)"
    },
    {
      question: "How secure is my data with Alchemyst AI?",
      answer: "Security is our top priority. All data is encrypted end-to-end, and we comply with global data protection regulations including GDPR and CCPA. We implement strict access controls, regular security audits, and never share your data with third parties without explicit consent."
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
            Questions & Answers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-12"
          >
            Get answers to commonly asked questions about Alchemyst AI and how it can transform your business.
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