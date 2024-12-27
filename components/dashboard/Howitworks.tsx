"use client";
import Flow from "@/app/types/dashboard_howitworks";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Button from "@/components/home/Button";


interface FlowLayoutProps {
  flows: Flow[];
}

const Howitworks: React.FC<FlowLayoutProps> = ({ flows }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const scrollAmount = containerRef.current.scrollWidth * scrollPercentage;
        containerRef.current.scrollLeft = scrollAmount;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full" style={{ height: `${flows.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start overflow-hidden">
        <h2 className="text-4xl font-bold mb-8 mt-18 text-center">
          How It Works
        </h2>
        <div
          ref={containerRef}
          className="w-full flex-1 flex overflow-x-hidden"
        >
          {flows.map((flow, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center justify-center p-4"
              initial="visible"
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 300 },
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              ref={ref}
            >
              <div className="video-container w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden">
                <video
                  className="w-full h-full object-cover border border-gray-600 rounded-xl"
                  src={flow.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
              <div className="text-container mt-8 text-center max-w-2xl">
                <h3 className="text-6xl font-bold text-white">
                  {flow.title}
                </h3>
                <p className="mt-4 text-xl text-gray-400">{flow.description}</p>
              </div>
              <div className="mt-8">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  className="flex-1"
                >
                  <Button variant="primary" className="text-sm py-2">
                    Request a demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Howitworks;

