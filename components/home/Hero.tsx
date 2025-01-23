"use client";
import React from "react";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { RetroGrid } from "../magicui/Retrogrid";

function Hero() {
  // Logos and settings for the carousel (unchanged)
  const logos = [
    "/enterprises/tesco.svg",
    "/enterprises/fourkites.svg",
    "/enterprises/decathlon.svg",
    "/enterprises/bajaj.svg",
    "/enterprises/fourthought.svg",
    "/enterprises/plat.svg",
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
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-screen h-screen object-cover hidden md:block"
        preload="auto"
      >
        <source src="/media/landingpagevideo60_2.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09] via-transparent to-transparent opacity-100" />

      <RetroGrid className="md:hidden block" />

      <div className="w-2/3 absolute inset-0 bg-gradient-to-l from-transparent via-[#0B0B09] to-[#0B0B09] opacity-90 hidden md:block" />

      <Image
        src="/media/topcard.svg"
        alt="Top GenAI Startup Card"
        width={50}
        height={50}
        className="h-14 md:h-20 w-auto rounded-3xl top-48 left-16 md:top-48 md:left-14 absolute"
        loading="eager"
        priority
        quality={100}
      />

      <div className="relative z-10 flex flex-col max-w-full py-16 md:py-0 mt-28 md:mt-0">
        {/* Heading Section for Desktop */}
        <div className="mt-32 md:mt-72 md:flex flex-col items-start md:ml-20 hidden font-bold">
          <h1 className="text-4xl md:text-6xl">Transform Your Sales with </h1>
          <h1 className="text-4xl md:text-6xl">AI-Driven Employees</h1>
        </div>

        {/* Heading Section for Mobile */}
        <div className="mt-20 md:hidden flex items-center justify-center self-center text-center font-bold px-4">
          <h1 className="text-4xl md:text-7xl">
            Transform Your Sales with AI-Driven Employees
          </h1>
        </div>

        {/* The description Section */}
        <div className="mt-4 px-4 md:px-0">
          <h2 className="text-lg text-gray-400 md:pl-20 md:pr-0 max-w-2xl text-center md:text-start font-semibold">
            Alchemyst AI empowers your team with an AI-powered sales platform
            that automates lead generation, outreach, and personalization -
            boosting productivity and driving growth.
          </h2>
        </div>

        {/* The button section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:items-start md:ml-20 space-y-4 md:space-y-0 md:space-x-4 mt-8 md:mt-14 px-4 md:px-0">
          <Link
            href="https://calendly.com/uttaran-getalchemystai/30min"
            target="_blank"
            className="w-full md:w-auto"
          >
            <Button variant="primary" className="w-full md:w-auto">
              Book a demo
            </Button>
          </Link>

          <Link
            href="https://www.youtube.com/watch?v=m7qiEo9AXT8"
            target="_blank"
            className="w-full md:w-auto"
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
              className="w-full md:w-auto"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* The company image carousel section */}
      <div className="flex flex-col justify-center items-center overflow-hidden mt-16 md:mt-24">
        <div className="w-full sm:w-[100vw] mt-8 md:mt-16 mb-20">
          <Slider {...settings}>
            {logos.map((logo, index) => (
              <div key={index} className="max-w-[100vw]">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`Company ${index + 1}`}
                  width={50}
                  height={10}
                  className="h-12 w-52"
                  loading="eager"
                  quality={100}
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
