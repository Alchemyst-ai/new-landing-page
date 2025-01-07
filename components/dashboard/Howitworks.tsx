// "use client";
// import Flow from "@/app/types/dashboard_howitworks";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import Link from "next/link";
// import Button from "@/components/home/Button";
// import useScreenDimensions from "@/app/hooks/useScreenDimensions";


// interface FlowLayoutProps {
//   flows: Flow[];
// }

// const Howitworks: React.FC<FlowLayoutProps> = ({ flows }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(
//     null
//   );


//   useEffect(() => {
//     if (!containerRef) {
//       setContainerRef (document.getElementById("how-it-works") as never);
//     }
//   }, []);

//   const { width, height, scrollHeight, scrollY } = useScreenDimensions();

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef) {
//         const scrollPercentage = scrollY / (scrollHeight - height) - 0.5;
//         const scrollAmount = Math.max(
//           0,
//           containerRef.scrollWidth * scrollPercentage
//         );
//         containerRef.scrollLeft = scrollAmount;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="w-full" style={{ height: `${flows.length * 100}vh` }}>
//       <div className="sticky top-0 h-screen flex flex-col items-center justify-start overflow-hidden">
//         <h2 className="text-4xl font-bold mb-8 mt-18 text-center">
//           How It Works
//         </h2>
//         <div
//           ref={containerRef as never}
//           className="w-full flex-1 flex overflow-x-hidden"
//         >
//           {flows.map((flow, index) => (
//             <motion.div
//               key={index}
//               className="w-full flex-shrink-0 flex flex-col items-center justify-center px-2 py-4"
//               initial="visible"
//               animate={controls}
//               variants={{
//                 visible: { opacity: 1, x: 0 },
//                 hidden: { opacity: 0, x: 300 },
//               }}
//               transition={{ duration: 0.2, delay: index * 0.2 }}
//               ref={ref}
//             >
//               <div className="video-container w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden">
//                 <video
//                   className="w-full h-full object-cover border border-gray-600 rounded-xl"
//                   src={flow.video}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 ></video>
//               </div>
//               <div className="text-container mt-8 text-center max-w-2xl">
//                 <h3 className="text-6xl font-bold text-white">{flow.title}</h3>
//                 <p className="mt-4 text-xl text-gray-400">{flow.description}</p>
//               </div>
//               <div className="mt-8">
//                 <Link
//                   href="https://calendly.com/uttaran-getalchemystai/30min"
//                   className="flex-1"
//                 >
//                   <Button variant="primary" className="text-sm py-2">
//                     Request a demo
//                   </Button>
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Howitworks;


"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/home/Button";
import Link from "next/link";
import { Target } from "lucide-react";

// Data for each option
const options = [
  {
    title: "Sign Up",
    description: "Start your free trial in minutes.",
    // image: "/media/defineyouricp.png",
    video: "/media/icp.mp4",
    buttonText: "Requeset a Demo",
    link: "https://calendly.com/uttaran-getalchemystai/30min",
  },
  {
    title: "Accelerate",
    description: "Let Maya handle the heavy lifting while you close more deals",
    // image: "/media/generatehighqualityleads.png",
    video: "/media/data_enrichment.mp4",
    buttonText: "Requeset a Demo",
    link: "https://calendly.com/uttaran-getalchemystai/30min",
  },
  {
    title: "Integrate",
    description: "Sync Maya with your CRM for a seamless experience.",
    // image: "/media/automateyouroutreach.png",
    video: "/media/campaign.mp4",
    buttonText: "Requeset a Demo",
    link: "https://calendly.com/uttaran-getalchemystai/30min",
  },
];

const Steps: React.FC = () => {
  const [activeOption, setActiveOption] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll through options every 60 seconds (desktop only)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 768) {
        setActiveOption((prev) => (prev + 1) % options.length);
        if (containerRef.current) {
          const nextScroll =
            (containerRef.current.scrollWidth / options.length) *
            ((activeOption + 1) % options.length);
          containerRef.current.scrollTo({
            left: nextScroll,
            behavior: "smooth",
          });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [activeOption]);

  return (
    <div className="w-full  py-16 ">
      <h1 className="text-5xl font-bold text-center mb-16">How to Get Started</h1>
      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Horizontal Clickable Options */}
        <div
          ref={containerRef}
          className="w-full max-w-6xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              {/* Options */}
              <div
                onClick={() => setActiveOption(index)}
                className={`flex-shrink-0 flex items-center justify-center w-48 h-20 px-4 py-2 cursor-pointer border-2 border-dashed rounded-full transition duration-300 ${
                  activeOption === index
                    ? "text-yellow-700 border-yellow-700 drop-shadow-[0_0_5px_rgba(255,255,0,0.3)]"
                    : "text-gray-400 border-gray-600 hover:text-yellow-700 hover:border-yellow-700"
                }`}
              >
                <span className="text-lg font-semibold text-center">
                  {option.title}
                </span>
              </div>

              {/* Displaying arrow from first two options (except from the last option) */}
              {index < options.length - 1 && (
                <div className="flex items-center mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="20"
                    viewBox="0 0 48 20"
                    fill="none"
                  >
                    <line
                      x1="0"
                      y1="10"
                      x2="40"
                      y2="10"
                      stroke="gray"
                      strokeWidth="2"
                      strokeDasharray="5, 5"
                    />
                    <polygon points="40,5 48,10 40,15" fill="#c77626" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamically Rendered Content with Animation */}
        <div className="relative max-w-6xl mx-auto mt-16 px-4 h-96 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOption}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute w-full h-full flex items-center"
            >
              {/* Dynamically Rendered Content */}
              <div className="flex items-center w-full">
                <div className="w-3/5 pr-8">
                  {/* Title of the dynamic content */}
                  <h2 className="text-8xl font-bold mb-6 text-white">
                    {options[activeOption].title}
                  </h2>

                  {/* Description of the dynamic content */}
                  <p className="text-gray-400 text-2xl mb-6">
                    {options[activeOption].description}
                  </p>

                  {/* Button of the dynamic content */}
                  <Link
                    href={options[activeOption].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary">
                      {options[activeOption].buttonText}
                    </Button>
                  </Link>
                </div>

                {/* Video of the dynamic content */}
                <div className="w-full">
                  <video
                    src={options[activeOption].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    width="95%"
                    height="100%"
                    className="rounded-xl shadow-lg border border-orange-400"
                  ></video>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile View - Displaying all options as cards */}
      <div className="md:hidden p-4 ">
        {options.map((option, index) => (
          <div
            key={index}
            className="mb-8 bg-black border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-5xl font-bold mb-4 text-white">
              {option.title}
            </h2>
            <p className="text-gray-400 mb-6">{option.description}</p>
            <Link href={option.link} className="mb-6 inline-block">
              <Button variant="primary">{option.buttonText}</Button>
            </Link>
            <video
              src={option.video}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg w-full"
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
