"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome } from "lucide-react";

function isChromiumBrowser(): boolean {
  if (typeof navigator === "undefined") return false;

  if ((navigator as any).userAgentData) {
    const brands = (navigator as any).userAgentData.brands || [];
    return brands.some((brand: any) => brand.brand.includes("Chromium") || brand.brand.includes("Google Chrome"));
  } else {
    const ua = navigator.userAgent;
    return ua.includes("Chrome") || ua.includes("Chromium") || ua.includes("Edg");
  }
}

export function InstallExtensionIsland() {
  const [expanded, setExpanded] = useState(false);
  const [isChromium, setIsChromium] = useState(false);

  useEffect(() => {
    setIsChromium(isChromiumBrowser());
  }, []);

  if (!isChromium) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-full flex items-center px-4 py-2 cursor-pointer select-none"
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        onClick={() =>
          window.open(
            "https://chromewebstore.google.com/detail/alchemyst-ai/aihninjmajjplfkgioojlgfdmagcmgkk",
            "_blank"
          )
        }
        initial={{ width: 56 }}
        animate={{ width: expanded ? "auto" : 56 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Chrome className="text-white w-6 h-6" />

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="overflow-hidden whitespace-nowrap text-white text-sm ml-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <span>Install Alchemyst On your browser</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
