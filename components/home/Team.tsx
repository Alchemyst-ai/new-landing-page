"use client";

import { team } from "@/app/constants/team";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GridLayout from "../GridLayout";
import TeamMemberCard from "./TeamMemberCard";

const Team: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="team">
      <GridLayout>
        <motion.div
          initial={{ opacity: 0.6, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="flex flex-col items-center justify-center w-[90vw] md:w-[70vw] my-20"
        >
          <h1 className="mb-10 text-4xl md:text-5xl text-center flex flex-col md:flex-row">
            <span>The great minds&nbsp;</span>
            <span className="text-[#21dbd8]">behind Alchemyst AI</span>
          </h1>
          <div className="w-full px-8">
            <Slider {...settings} lazyLoad="progressive">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </GridLayout>
    </div>
  );
};

// Custom Arrow components for the slider
const NextArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
}) => (
  <div
    className="absolute top-1/2 -right-8 z-10 w-8 h-8 text-gray-400 bg-gradient-to-br from-[#0a0c1f] to-[#0c124e] rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2"
    onClick={onClick}
    aria-label="Next slide"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-7 h-7 p-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const PrevArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
}) => (
  <div
    className="absolute top-1/2 -left-8 z-10 w-8 h-8 text-gray-400 bg-gradient-to-br from-[#0a0c1f] to-[#0c124e] rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-7 h-7 p-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

export default Team;
