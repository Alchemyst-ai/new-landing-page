"use client";

import { team } from "@/app/constants/team";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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
    <div className="flex flex-col items-center justify-center w-[85vw] md:w-2/3 my-20">
      <h1 className="mb-10 text-4xl md:text-5xl flex flex-col md:flex-row">
        <span>The great minds&nbsp;</span>
        <span className="text-blue-500 underline-curved">behind our work</span>
      </h1>
      <div className="w-full px-8">
        <Slider {...settings} lazyLoad={"progressive"}>
          {team.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
}) => (
  <div
    className="absolute top-1/2 -right-8 z-10 w-8 h-8 text-white bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
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
    className="absolute top-1/2 -left-8 z-10 w-8 h-8 text-black bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transform -translate-y-1/2"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
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
