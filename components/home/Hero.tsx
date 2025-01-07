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
  // Logos and settings for the carousal
  const logos = [
    "/enterprises/decathlon.png",
    "/enterprises/bajajallianz.png",
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
    <div className="relative w-full h-screen overflow-hidden ">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        preload="none"
      >
        <source src="/media/landingpagevideo.mp4" type="video/mp4" />
      </video>

      <RetroGrid className="md:hidden block" />

      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black to-black opacity-90 hidden md:block" />

      <div>
        <Image
          src="/media/top_card.svg"
          alt=""
          width={100}
          height={100}
          className="h-[18%] w-auto rounded-3xl top-20 left-8 absolute"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Heading Section for Desktop */}
        <div className="mt-56 md:flex flex-col items-start pl-20 hidden font-bold">
          <h1 className="text-4xl md:text-7xl">Transform Your Sales with </h1>
          <h1 className="text-4xl md:text-7xl">AI-Driven Employees ✨</h1>
        </div>

        {/* Heading Section for Mobile */}
        <div className="mt-40 md:hidden flex flex-col items-center justify-center text-center font-bold">
          <h1 className="text-5xl pl-2 pr-2 md:pl-0 md:pr-0 md:text-7xl">
            Transform Your Sales with AI-Driven Employees ✨
          </h1>
        </div>

        {/* The description Section */}
        <div className="mt-8">
          <h2 className="text-gray-400 pl-10 pr-10 md:pl-20 md:pr-0 max-w-2xl text-center md:text-start font-semibold">
            Alchemyst AI empowers your team with an AI-powered sales platform
            that automates lead generation, outreach, and personalization -
            boosting productivity and driving growth.
          </h2>
        </div>

        {/* The button section */}
        <div className="flex items-center justify-center md:justify-start md:items-start md:pl-20 space-x-4 mt-14">
          <div className="flex items-center space-x-4">
            <Link
              href="https://calendly.com/uttaran-getalchemystai/30min"
              target="_blank"
            >
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
        <div className="flex flex-col justify-center items-center overflow-hidden mt-24">
          <div className="absolute w-[100vw] sm:w-[100vw] mt-8 mb-20 bottom-0 ">
            <Slider {...settings}>
              {logos.map((logo, index) => (
                <div key={index}>
                  <Image
                    src={logo}
                    alt={`Company ${index + 1}`}
                    width={125}
                    height={50}
                    className="h-12 w-auto rounded "
                    priority
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
