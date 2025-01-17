// !!!!!!!!!!   DYNAMIC IMPORT APPROACH   !!!!!!!!!!!
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Head from "next/head";
import "./globals.css";

const CustomCursor = dynamic(() => import("@/components/home/CustomCursor"), {
  ssr: false,
});
const Architecture = dynamic(() => import("@/components/home/Architecture"));
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies"));
const EndingCard = dynamic(() => import("@/components/home/EndingCard"));
const Features = dynamic(() => import("@/components/home/Features"));
const AgentsCard = dynamic(() => import("@/components/home/AgentsCard"));
const InfoCard = dynamic(() => import("@/components/home/InfoCard"));
const AboutUs = dynamic(() => import("@/components/home/Aboutus"));
const Footer = dynamic(() => import("@/components/home/Footer"));
const Navbar = dynamic(() => import("@/components/home/Navbar"));
const Steps = dynamic(() => import("@/components/home/Steps"));
const Hero = dynamic(() => import("@/components/home/Hero"));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Alchemyst AI - Leading in AI and Technology</title>
        <meta
          name="description"
          content="Explore our cutting-edge AI technology, our team, features, and success stories. Backed by industry leaders."
        />
        <meta
          name="keywords"
          content="AI, Technology, Innovation, Features, Team, Integrations, Architecture, Applications"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Company Name - Leading in AI and Technology"
        />
        <meta
          property="og:description"
          content="Discover our powerful AI solutions and learn how we're shaping the future."
        />
        <meta property="og:url" content="https://yourcompany.com" />
        <meta property="og:type" content="website" />
      </Head>
      <noscript>
        <style>
          {`
            .no-js-header {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #0E0E0C;
              width: 100%;
            }
            .no-js-footer {
              display: block;
              width: 100%;
            }
          `}
        </style>
        <div className="no-js-header">
          <h1>Alchemyst AI - Leading in AI and Technology</h1>
        </div>
        <div className="no-js-footer">
          <p>
            Explore our cutting-edge AI technology, our team, features, and
            success stories. Backed by industry leaders.
          </p>
        </div>
      </noscript>
      <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
        <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
          <Navbar />
          <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
        </header>
        <div className="hidden lg:block">
          <CustomCursor />
        </div>

        <main className="flex-grow flex flex-col gap-8 justify-center items-center md:pt-16">
          {[
            { Component: Hero, title: null },
            { Component: Steps, title: null },
            { Component: Features, title: null },
            { Component: Architecture, title: null },
            { Component: AgentsCard, title: null },
            { Component: InfoCard, title: null },
            { Component: CaseStudies, title: null },
            { Component: AboutUs, title: null },
            { Component: EndingCard, title: null },
          ].map(({ Component, title }, index) => (
            <Component />
          ))}
        </main>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 2.0 }}
          className="w-full"
        >
          <Footer />
        </motion.section>
      </div>
    </div>
  );
}

// !!!!!!!!!!   STATIC IMPORT APPROACH   !!!!!!!!!!!
// "use client";

// import CustomCursor from "@/components/home/CustomCursor";
// import Architecture from "@/components/home/Architecture";
// import CaseStudies from "@/components/home/CaseStudies";
// import EndingCard from "@/components/home/EndingCard";
// import Features from "@/components/home/Features";
// import AgentsCard from "@/components/home/AgentsCard";
// import InfoCard from "@/components/home/InfoCard";
// import AboutUs from "@/components/home/Aboutus";
// import Footer from "@/components/home/Footer";
// import Navbar from "@/components/home/Navbar";
// import Steps from "@/components/home/Steps";
// import Hero from "@/components/home/Hero";
// import { motion } from "framer-motion";
// import Head from "next/head";
// import "./globals.css";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function HomePage() {
//   return (
//     <div>
//       <Head>
//         <title>Alchemyst AI - Leading in AI and Technology</title>
//         <meta
//           name="description"
//           content="Explore our cutting-edge AI technology, our team, features, and success stories. Backed by industry leaders."
//         />
//         <meta
//           name="keywords"
//           content="AI, Technology, Innovation, Features, Team, Integrations, Architecture, Applications"
//         />
//         <meta name="robots" content="index, follow" />
//         <meta
//           property="og:title"
//           content="Company Name - Leading in AI and Technology"
//         />
//         <meta
//           property="og:description"
//           content="Discover our powerful AI solutions and learn how we're shaping the future."
//         />
//         <meta property="og:url" content="https://yourcompany.com" />
//         <meta property="og:type" content="website" />
//       </Head>
//       <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
//         <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
//           <Navbar />
//           <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
//         </header>
//         <div className="hidden lg:block">
//           <CustomCursor />
//         </div>

//         <main className="flex-grow flex flex-col gap-8 justify-center items-center pt-16">
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <Hero />
//           </motion.section>
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <h1 className="text-5xl font-bold text-center mt-12 p-4 md:mt-16 md:mb-4">
//               3 Simple Steps to Boost Sales with AI-Powered Precision
//             </h1>
//             <Steps />
//           </motion.section>
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <Features />
//           </motion.section>

//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <Architecture />
//           </motion.section>

//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <AgentsCard />
//           </motion.section>

//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <InfoCard />
//           </motion.section>

//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <CaseStudies />
//           </motion.section>

//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <AboutUs />
//           </motion.section>

//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInUp}
//             transition={{ duration: 2.0 }}
//             className="w-full"
//           >
//             <EndingCard />
//           </motion.section>
//         </main>
//         <motion.section
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeInUp}
//           transition={{ duration: 2.0 }}
//           className="w-full"
//         >
//           <Footer />
//         </motion.section>
//       </div>
//     </div>
//   );
// }
