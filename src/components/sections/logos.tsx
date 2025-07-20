"use client";

import { Section } from "@/components/section";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const images1 = [
  { src: '/trusted/AFT.png', alt: 'AFT', scale: 0.5 },
  { src: '/trusted/chainrisk.png', alt: 'Chain Risk', scale: 1 },
  { src: '/trusted/hyundai.png', alt: 'Hyundai', scale: 0.9 },
  { src: '/trusted/kotak.png', alt: 'Kotak', scale: 0.7 },
  { src: '/trusted/kuberns.png', alt: 'Kubernetes', scale: 0.5 },
  { src: '/trusted/toyota.png', alt: 'Toyota', scale: 0.85 },
];

const images2 = [
  { src: '/trusted/razorpay.png', alt: 'Razorpay', scale: 0.85 },
  { src: '/trusted/microsoft.png', alt: 'Microsoft', scale: 0.85 },
  { src: '/trusted/ycombinator.png', alt: 'Y Combinator', scale: 0.85 },
  { src: '/trusted/texasinstruments.png', alt: 'Texas Instruments', scale: 0.85 },
  { src: '/trusted/entrepreneurfirst.png', alt: 'Entrepreneur First', scale: 0.5 },
  { src: '/trusted/google1.png', alt: 'Google', scale: 0.85 },
];

export function Logos() {
  const [currentSet, setCurrentSet] = useState(images1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev === images1 ? images2 : images1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="logos">
      <div className="border-x border-t">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {images1.map((_, idx) => (
            <div
              key={idx}
              className="flex group items-center justify-center p-4 border-r border-t last:border-r-0 sm:last:border-r md:[&:nth-child(3n)]:border-r md:[&:nth-child(6n)]:border-r-0 md:[&:nth-child(3)]:border-r [&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+3)]:border-t-0 sm:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(-n+6)]:border-t-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSet[idx].src}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: Math.random() * 0.5,
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    width={120 * Math.abs(currentSet[idx].scale)}
                    height={60 * Math.abs(currentSet[idx].scale)}
                    src={currentSet[idx].src}
                    className="object-cover opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:brightness-0 dark:hover:invert"
                    alt={currentSet[idx].alt}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
