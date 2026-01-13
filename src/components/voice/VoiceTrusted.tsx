"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import VoiceGridDivider from "./VoiceGridDivider";

const logos1 = [
    { name: "NVIDIA", text: "NVIDIA", hasIcon: true },
    { name: "SAMSUNG", text: "SAMSUNG", hasIcon: false },
    { name: "servicenow", text: "servicenow", hasIcon: false },
    { name: "Decagon", text: "Decagon", hasIcon: true },
    { name: "wonderful", text: "wonderful", hasIcon: false },
    { name: "NVIDIA", text: "NVIDIA", hasIcon: true },
    { name: "SAMSUNG", text: "SAMSUNG", hasIcon: false },
    { name: "Decagon", text: "Decagon", hasIcon: true },
];

const logos2 = [
    { name: "Decagon", text: "Decagon", hasIcon: true },
    { name: "wonderful", text: "wonderful", hasIcon: false },
    { name: "servicenow", text: "servicenow", hasIcon: false },
    { name: "NVIDIA", text: "NVIDIA", hasIcon: true },
    { name: "SAMSUNG", text: "SAMSUNG", hasIcon: false },
    { name: "servicenow", text: "servicenow", hasIcon: false },
    { name: "Decagon", text: "Decagon", hasIcon: true },
    { name: "wonderful", text: "wonderful", hasIcon: false },
];

const NvidiaIcon = () => (
    <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.948 8.798v-1.43c.146-.018.296-.028.448-.028 2.15 0 3.95 1.592 4.25 3.663h1.466c-.308-2.892-2.744-5.143-5.716-5.143-.208 0-.412.014-.448.023V4.4l-3.783 2.2 3.783 2.198zm0 1.543v1.203c.146.018.296.028.448.028 1.302 0 2.418-.78 2.912-1.898H9.396v.667H8.948zm0 2.598v1.43c.146.018.296.028.448.028 2.972 0 5.408-2.25 5.716-5.143h-1.466c-.3 2.07-2.1 3.662-4.25 3.662-.152 0-.302-.01-.448-.028v.051zm-1.548-6.89L3.617 8.25l3.783 2.2V8.05h1.548V5.85c-.036-.009-.24-.023-.448-.023-2.972 0-5.408 2.25-5.716 5.143H4.25c.3-2.07 2.1-3.663 4.25-3.663.152 0 .302.01.448.028v-.286H7.4z" />
    </svg>
);

const DecagonIcon = () => (
    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.9 3.82L12 11.82 5.1 8 12 4.18zM5 9.82l6 3.33v6.03l-6-3.33V9.82zm8 9.36v-6.03l6-3.33v6.03l-6 3.33z" />
    </svg>
);

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
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8">
                        {logos1.map((_, idx) => (
                            <div
                                key={idx}
                                className="flex group items-center justify-center p-4 border-r border-t border-gray-800 h-40
                  [&:nth-child(2n)]:border-r-0
                  sm:[&:nth-child(2n)]:border-r
                  sm:[&:nth-child(4n)]:border-r-0
                  md:[&:nth-child(4n)]:border-r
                  md:[&:nth-child(8n)]:border-r-0
                  [&:nth-child(-n+2)]:border-t-0
                  sm:[&:nth-child(-n+4)]:border-t-0
                  md:[&:nth-child(-n+8)]:border-t-0"
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
                                        <div className="flex items-center text-gray-400 text-xl font-medium tracking-wide hover:text-gray-300 transition-colors cursor-default">
                                            {currentSet[idx].name === "NVIDIA" && <NvidiaIcon />}
                                            {currentSet[idx].name === "Decagon" && <DecagonIcon />}
                                            <span className={currentSet[idx].name === "wonderful" ? "font-normal" : ""}>
                                                {currentSet[idx].text}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <VoiceGridDivider />
        </section>
    );
};

export default VoiceTrusted;

