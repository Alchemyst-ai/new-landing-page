"use client";
import mediaItems from "@/app/constants/media";
import { motion } from "framer-motion";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GridLayout from "../GridLayout";
import CoverageCard from "./CoverageCard";

const Arrow: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { direction: "next" | "prev" }
> = ({ direction, onClick, ...props }) => (
  <div
    {...props}
    className={`absolute top-1/2 ${
      direction === "next" ? "-right-12" : "-left-12"
    } w-8 h-8 text-gray-400 bg-gradient-to-br from-[#0a0c1f] to-[#0c124e] rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2`}
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
        d={direction === "next" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
      />
    </svg>
  </div>
);

const NextArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <Arrow direction="next" {...props} />
);
const PrevArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <Arrow direction="prev" {...props} />
);

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

const MediaAndCoverage: React.FC = () => {
  return (
    <section id="media" className="my-20">
      <GridLayout>
        <motion.div
          initial={{ opacity: 0.6, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="flex flex-col items-center justify-center"
        >
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl flex flex-col md:flex-row">
              <span>Stay Updated with&nbsp;</span>
              <span className="text-[#21dbd8]">Highlights & Coverages</span>
            </h1>
          </header>
          <div className="w-[90vw] md:w-[70vw]">
            <Slider {...settings} className="mx-4 md:mx-20">
              {mediaItems.map((item, index) => (
                <CoverageCard key={index} {...item} />
              ))}
            </Slider>
          </div>
        </motion.div>
      </GridLayout>
    </section>
  );
};

export default MediaAndCoverage;
