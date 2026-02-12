"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import VoiceGridDivider from "./VoiceGridDivider";

type TrustedLogo = { name: string; src: string; scale?: number };

const logos1: TrustedLogo[] = [
    { name: "Citron", src: "/voice/citron.png", scale: 1.0 },
    { name: "Flipkart", src: "/voice/flipkart.png", scale: 1.55 },
    { name: "Honda", src: "/voice/honda.png", scale: 1.35 },
    { name: "Hyundai", src: "/voice/hyundai.png", scale: 1.65 },
    { name: "Katyani", src: "/voice/katyani.png", scale: 1.55 },
    { name: "Sunstone", src: "/voice/sunstone.png", scale: 1.55 },
    { name: "Toyota", src: "/voice/toyota.png", scale: 1.55 },
];

const logos2: TrustedLogo[] = [
    { name: "Univarity", src: "/voice/univarity.png", scale: 1.55 },
    { name: "Veranda", src: "/voice/veranda.png", scale: 1.55 },
    { name: "Wonder", src: "/voice/wonder.png", scale: 2.25 },
    { name: "Yantra", src: "/voice/yantra.png", scale: 2.55 },
    { name: "Citron", src: "/voice/citron.png", scale: 1.0 },
    { name: "Flipkart", src: "/voice/flipkart.png", scale: 1.55 },
    { name: "Unacademy", src: "/voice/un.png", scale: 1.35 },
];

const VoiceTrusted = () => {
    const [currentSet, setCurrentSet] = useState(logos1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSet((prev) => (prev === logos1 ? logos2 : logos1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pb-12" style={{ background: '#0d0d0f' }}>
            {/* Logo grid */}
            <div>
                <div className="border-t border-gray-800">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7">
                        {logos1.map((_, idx) => {
                            // Hide 7th logo on mobile and small screens
                            if (idx === 6) {
                                return (
                                    <div
                                        key={idx}
                                        className="hidden md:flex group items-center justify-center px-6 py-3 border-r border-t border-gray-800 h-24
                          md:[&:nth-child(7n)]:border-r-0
                          md:[&:nth-child(-n+7)]:border-t-0"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentSet[idx].name + idx}
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
                                                <div className="flex items-center justify-center w-full h-full">
                                                    <Image
                                                        src={currentSet[idx].src}
                                                        alt={currentSet[idx].name}
                                                        width={200}
                                                        height={80}
                                                        className="max-h-16 w-auto opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-transform origin-center"
                                                        style={{ transform: `scale(${currentSet[idx].scale ?? 1.35})` }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={idx}
                                    className="flex group items-center justify-center px-6 py-3 border-r border-t border-gray-800 h-24
                      [&:nth-child(2n)]:border-r-0
                      sm:[&:nth-child(2n)]:border-r
                      sm:[&:nth-child(3n)]:border-r-0
                      md:[&:nth-child(3n)]:border-r
                      md:[&:nth-child(7n)]:border-r-0
                      [&:nth-child(-n+2)]:border-t-0
                      sm:[&:nth-child(-n+3)]:border-t-0
                      md:[&:nth-child(-n+7)]:border-t-0"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentSet[idx].name + idx}
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
                                            <div className="flex items-center justify-center w-full h-full">
                                                <Image
                                                    src={currentSet[idx].src}
                                                    alt={currentSet[idx].name}
                                                    width={200}
                                                    height={80}
                                                    className="max-h-16 w-auto opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-transform origin-center"
                                                    style={{ transform: `scale(${currentSet[idx].scale ?? 1.35})` }}
                                                />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <VoiceGridDivider />
        </section>
    );
};

export default VoiceTrusted;

