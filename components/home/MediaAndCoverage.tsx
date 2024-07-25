"use client";
import { motion } from "framer-motion";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CoverageCard from "./CoverageCard";
import GridLayout from "../GridLayout";

const MediaAndCoverage: React.FC = () => {
  const mediaItems = [
    {
      title: "LAgMo - The Large AgentLarge Agent Model by Lyzr...",
      date: "June 12, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non temporibus iure pariatur laboriosam, nihil debitis voluptas eveniet exercitationem ab? Odit molestias voluptates dolorem aperiam sapiente, vitae soluta vero ratione amet aliquid delectus quisquam dolore laudantium beatae, rem quod itaque. Magni asperiores expedita corporis, fuga culpa obcaecati eaque quasi dignissimos error!",
      link: "#",
      imgSrc:
        "https://srepublic.in/uploads/images/2024/01/image_750x_65ababf63209d.jpg", // Replace with actual image source
    },
    {
      title: "Lyzr's Blueprint forBlueprint for Organizational General...",
      date: "May 13, 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non temporibus iure pariatur laboriosam, nihil debitis voluptas eveniet exercitationem ab? Odit molestias voluptates dolorem aperiam sapiente, vitae soluta vero ratione amet aliquid delectus quisquam dolore laudantium beatae, rem quod itaque. Magni asperiores expedita corporis, fuga culpa obcaecati eaque quasi dignissimos error!...",
      link: "#",
      imgSrc:
        "https://srepublic.in/uploads/images/2024/01/image_750x_65ababf63209d.jpg", // Replace with actual image source
    },
    {
      title: "27 Par Parameters Parameters Parameters, Techniques &...",
      date: "December 21, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non temporibus iure pariatur laboriosam, nihil debitis voluptas eveniet exercitationem ab? Odit molestias voluptates dolorem aperiam sapiente, vitae soluta vero ratione amet aliquid delectus quisquam dolore laudantium beatae, rem quod itaque. Magni asperiores expedita corporis, fuga culpa obcaecati eaque quasi dignissimos error!",
      link: "#",
      imgSrc:
        "https://srepublic.in/uploads/images/2024/01/image_750x_65ababf63209d.jpg", // Replace with actual image source
    },
  ];

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div id="media">
      <GridLayout>
        <motion.div
          initial={{ opacity: 0.6, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="relative flex flex-col items-center justify-center my-20"
        >
          <h1 className="mb-10 text-4xl md:text-5xl flex flex-col md:flex-row text-center">
            <span>Stay Updated with&nbsp;</span>
            <span className="text-[#21dbd8]">Highlights & Coverages</span>
          </h1>
          <div className="w-[90vw] md:w-[70vw]">
            <Slider {...settings} className="mx-4 md:mx-20">
              {mediaItems.map((item, index) => (
                <CoverageCard key={index} {...item} />
              ))}
            </Slider>
          </div>
        </motion.div>
      </GridLayout>
    </div>
  );
};

const NextArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
}) => (
  <div
    className="absolute top-1/2 -right-12 w-8 h-8 text-gray-400 bg-gradient-to-br from-[#0a0c1f] to-[#0c124e] rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2"
    onClick={onClick}
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
    className="absolute top-1/2 -left-12 z-10 w-8 h-8 text-gray-400 bg-gradient-to-br from-[#0a0c1f] to-[#0c124e] rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2"
    onClick={onClick}
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
export default MediaAndCoverage;
