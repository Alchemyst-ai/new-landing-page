// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// const alchemysts = [
//   { id: 1, name: "Maya", role: "AI Sales Representative" },
//   { id: 2, name: "Alex", role: "AI Product Specialist" },
//   { id: 3, name: "Zoe", role: "AI Customer Support" },
//   { id: 4, name: "Ethan", role: "AI Technical Advisor" },
//   { id: 5, name: "Olivia", role: "AI Marketing Strategist" },
// ];

// export default function MeetAlchemysts() {
//   const [activeCard, setActiveCard] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

//   const handleScroll = (e: WheelEvent) => {
//     if (isHovering) {
//       e.preventDefault();
//       const direction = e.deltaY > 0 ? 1 : -1;
//       setActiveCard((prev) => {
//         const next = prev + direction;
//         return Math.max(0, Math.min(next, alchemysts.length - 1));
//       });
//     }
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleMouseEnter = () => setIsHovering(true);
//     const handleMouseLeave = () => setIsHovering(false);

//     const debouncedScroll = (e: WheelEvent) => {
//       if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
//       scrollTimeout.current = setTimeout(() => handleScroll(e), 100);
//     };

//     container.addEventListener("mouseenter", handleMouseEnter);
//     container.addEventListener("mouseleave", handleMouseLeave);
//     window.addEventListener("wheel", debouncedScroll, { passive: false });

//     return () => {
//       container.removeEventListener("mouseenter", handleMouseEnter);
//       container.removeEventListener("mouseleave", handleMouseLeave);
//       window.removeEventListener("wheel", debouncedScroll);
//     };
//   }, [isHovering]);

//   return (
//     <div className="w-full max-w-[90vw] mx-auto px-4 py-8">
//       <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
//         Meet Your Alchemysts
//       </h1>
//       <div ref={containerRef} className="relative h-[70vh] overflow-hidden">
//         <AnimatePresence initial={false}>
//           {alchemysts.map((alchemyst, index) => (
//             <motion.div
//               key={alchemyst.id}
//               initial={{ opacity: 0, x: index > activeCard ? "100%" : "-100%" }}
//               animate={{
//                 opacity: index === activeCard ? 1 : 0,
//                 x:
//                   index === activeCard
//                     ? "0%"
//                     : index > activeCard
//                     ? "100%"
//                     : "-100%",
//                 zIndex: index === activeCard ? 1 : 0,
//               }}
//               exit={{ opacity: 0, x: index < activeCard ? "-100%" : "100%" }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//                 duration: 1.0,
//               }}
//               className="absolute inset-0 flex items-center justify-center px-4"
//             >
//               <AlchemystCard {...alchemyst} />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       <div className="mt-4 text-center text-gray-500">
//         {isHovering
//           ? "Scroll to navigate Alchemysts"
//           : "Hover and scroll to explore Alchemysts"}
//       </div>
//     </div>
//   );
// }

// interface AlchemystCardProps {
//   id: number;
//   name: string;
//   role: string;
// }

// function AlchemystCard({ id, name, role }: AlchemystCardProps) {
//   return (
//     <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden">
//       <Image
//         src={`/media/agent-${id}.svg`}
//         loading="eager"
//         alt={`${name} background`}
//         layout="fit"
//         width={1000}
//         height={1000}
//         objectFit="cover"
//         className="h-full w-full transition-opacity duration-300"
//         style={{ opacity: 1 }}
//       />
//       <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
//         <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
//           {name}, The {role}
//         </h2>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import chevron icons

const alchemysts = [
  { id: 1, name: "Maya", role: "The Sales Representative" },
  { id: 2, name: "Ron", role: "The Voice-based Customer Support Alchemyst" },
  { id: 3, name: "Moh", role: "The Marketing Alchemyst" },
  { id: 4, name: "Leela", role: "The HR Alchemyst" },
  { id: 5, name: "Sam", role: "The Analytics Alchemyst" },
];

export default function MeetAlchemysts() {
  const [activeCard, setActiveCard] = useState(0);

  const handleNext = () => {
    setActiveCard((prev) => (prev < alchemysts.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveCard((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full max-w-[90vw] mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-[#8f8f8f] font-bold text-center mt-20">
        Meet Your Alchemysts
      </h1>
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute top-0 left-4 z-10 mb-10">
          <button
            onClick={handlePrev}
            disabled={activeCard === 0}
            className="p-2 bg-black text-white rounded-full hover:bg-gray-700 disabled:opacity-50"
          >
            <FaChevronLeft size={28} /> {/* Left chevron */}
          </button>
        </div>
        <div className="absolute top-0 right-4 z-10">
          <button
            onClick={handleNext}
            disabled={activeCard === alchemysts.length - 1}
            className="p-2 bg-black text-white rounded-full hover:bg-gray-700 disabled:opacity-50"
          >
            <FaChevronRight size={28} /> {/* Right chevron */}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {alchemysts.map((alchemyst, index) => (
            <motion.div
              key={alchemyst.id}
              className="absolute inset-0 flex items-center justify-center px-4"
              initial={{ opacity: 0, x: index > activeCard ? "100%" : "-100%" }}
              animate={{
                opacity: index === activeCard ? 1 : 0,
                x:
                  index === activeCard
                    ? "0%"
                    : index > activeCard
                    ? "100%"
                    : "-100%",
                zIndex: index === activeCard ? 1 : 0,
              }}
              exit={{ opacity: 0, x: index < activeCard ? "-100%" : "100%" }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 50,
                duration: 1.5,
              }}
            >
              <AlchemystCard {...alchemyst} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface AlchemystCardProps {
  id: number;
  name: string;
  role: string;
}

function AlchemystCard({ id, name, role }: AlchemystCardProps) {
  return (
    <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden">
      <Image
        src={`/media/agent-${id}.svg`}
        loading="eager"
        alt={`${name} background`}
        blurDataURL={`/media/agent-${id}.svg`}
        placeholder="blur"
        width={1000}
        height={1000}
        className="w-full h-full transition-opacity duration-300 hidden md:block"
        style={{ opacity: 1 }}
      />
      <Image
        src={`/media/mobileagent-${id}.svg`}
        loading="eager"
        alt={`${name} background`}
        blurDataURL={`/media/mobileagent-${id}.svg`}
        placeholder="blur"
        width={1000}
        height={1000}
        className="w-full h-full transition-opacity duration-300 block md:hidden"
        style={{ opacity: 1 }}
      />
    </div>
  );
}
