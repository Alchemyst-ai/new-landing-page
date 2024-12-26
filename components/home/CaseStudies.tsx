/*
The feature to show chevron arrows on both ends of these cards in the event that there are more than 3 cards is already built in the slider component.
The component only needs to be adjusted to handle the case where there are less than 3 cards.
*/

"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Ensure you import the CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Case Study 1",
    description:
      '"With Maya, our small team was able to double lead conversions and cut outreach time in half. The AI-powered sales platform is a game-changer!" - InnovateTech',
    image: "/media/casestudiesicon.png",
  },
  {
    id: 2,
    title: "Case Study 2",
    description:
      '"We scaled from 10 to 100 qualified leads weekly using Maya\'s sales copilot for small teams - a must have for startups." - GrowthEdge',
    image: "/media/casestudiesicon.png",
  },
  {
    id: 3,
    title: "Case Study 3",
    description:
      "Reward your customers and incentivize engagement with our innovative digital credit tokens. Our tokens can be customized to match.",
    image: "/media/casestudiesicon.png",
  },
];

const CaseStudyCard: React.FC<CaseStudy> = ({ title, description, image }) => (
  <motion.div
    className="bg-gradient-to-b from-gray-900 via-gray-900 to-black rounded-lg shadow-lg h-full mb-6 border border-gray-700"
    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(254,152,51,255)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-start">
      <Image
        src={image}
        alt={title}
        width={80}
        height={80}
        className="rounded-full"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-300 mb-4">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </motion.div>
);

const CaseStudies: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="flex flex-col w-full h-full relative -mt-14 md:mt-0 px-4 py-16">
      <h1 className="flex text-4xl items-center justify-center text-center text-gray-400 mt-16 mb-16">
        Real Stories, Real Results: <br /> How Alchemyst.ai Transforms B2B Sales
      </h1>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {caseStudies.map((study) => (
            <div key={study.id} className="px-2 mt-4">
              <CaseStudyCard {...study} />
            </div>
          ))}
        </Slider>
        {caseStudies.length > 3 && (
          <>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md z-10"
              onClick={goToPrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md z-10"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
