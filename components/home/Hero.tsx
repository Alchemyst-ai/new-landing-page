"use client";
import React from "react";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Hero() {
  // Logos and settings for the carousal
  const logos = [
    "/enterprises/chainrisk.svg",
    "/enterprises/forethought.png",
    "/enterprises/plat.png",
    "/enterprises/tesco.png",
    "/enterprises/fourkites.webp",
  ];

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    
      <div className="w-full h-screen">
        {/* Heading Section */}
        <div className="mt-56 pl-10 md:pl-40">
          <h1 className="text-7xl">Transform Your Sales with </h1>
          <h1 className="text-7xl">AI-Driven Employees ✨</h1>
        </div>

        {/* The description Section */}
        <div className="mt-8 pl-10 md:pl-40">
          <h2 className="text-gray-400 max-w-2xl">
            Alchemyst.ai empowers your team with an AI-powered sales platform
            that automates lead generation, outreach, and
            personalization — boosting productivity and driving growth.
          </h2>
          
        </div>

        {/* The button section */}
        <div className="flex items-center space-x-4 mt-14 pl-10 md:pl-40">
          <div className="flex items-center space-x-4">
            <Link href="https://calendly.com/uttaran-getalchemystai/30min" target="_blank">
              <Button variant="primary">Book a demo</Button>
            </Link>

            <Link
              href="https://www.youtube.com/watch?v=m7qiEo9AXT8"
              target="_blank"
            >
              <Button
                variant="secondary"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0V11.25"
                    />
                  </svg>
                }
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* The company image carousal section */}
        <div className="flex flex-col justify-center items-center overflow-hidden mt-16 bg-gradient-to-b from-black to-[#9b4d00]">
          <h2 className="text-xl sm:text-2xl mb-8 text-center">
            Best Enterprises and Startups trust us
          </h2>
          <div className="w-[100vw] sm:w-[100vw]">
            <Slider {...settings}>
              {logos.map((logo, index) => (
                <div key={index}>
                  <Image
                    src={logo}
                    alt={`Company ${index + 1}`}
                    width={125}
                    height={50}
                    className="h-12 w-auto rounded"
                    priority
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    
  );
}

export default Hero;
