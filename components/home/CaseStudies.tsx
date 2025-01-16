"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Forethought India",
    description:
      '"This has helped me scale our operations and will continue to do so for the next 6 months. We\'re expecting this model to become even more structured and refined in the coming months."',
    image: "/media/casestudiesicon.png",
  },
  {
    id: 2,
    title: "Chainrisk",
    description:
      '"Alchemyst AI has been a game-changer for us. Their platform helped us onboard our first two clients—Compound and Angle Protocol—generating $55k in revenue in just a few months. The AI-driven automation has not only streamlined our outreach but also validated our product in the market."',
    image: "/media/casestudiesicon.png",
  },
];

const CaseStudyCard: React.FC<CaseStudy> = ({ title, description, image }) => (
  <motion.div
    className="bg-gradient-to-b from-gray-900 via-gray-900 to-black rounded-lg shadow-lg h-full mb-6 border border-gray-700"
    whileHover={{ scale: 1.02, boxShadow: "0 0 5px 1px rgba(254,152,51,255)" }}
    transition={{ duration: 0.3 }}
  >
    <Link href={`/case-study/`}>
      <div className="flex justify-between items-start pt-6 pl-6">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
      <div className="p-6">
        <h3 className="text-4xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-gray-400">{description}</p>
      </div>
    </Link>
  </motion.div>
);

const CaseStudies: React.FC = () => {
  return (
    <div className="flex flex-col md:w-[80%] h-full relative -mt-14 md:mt-0 px-4 py-16 mx-auto">
      <h1 className="font-bold flex text-5xl items-center justify-center text-center mt-16 mb-16">
        Real Stories, Real Results: <br /> How Alchemyst AI Transforms B2B Sales
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} {...study} />
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
