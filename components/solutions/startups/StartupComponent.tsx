"use client";

import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function FeatureCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div
      className="bg-gradient-to-r from-[#272626] to-black border border-gray-800 shadow-[0_0_5px_2px_rgba(50,37,41,255)] rounded-3xl p-6 h-[40vh] relative overflow-hidden"
    >
      <Image
        src={image}
        alt={`${title} image`}
        className="absolute w-full h-full p-5 pt-16"
        layout="fill"
      />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black to-transparent opacity-90 md:opacity-60"></div>
      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
          {title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base transition-all duration-500 ease-in-out hover:scale-105">
          {description}
        </p>
      </div>
    </div>
  );
}

const StartupComponent = () => {
  const reasons = [
    {
      icon: "/deliverability/feature_01.svg",
      title: "Warmups",
      description:
        "Build trust with ISPs by gradually increasing sending volume for new domains and IPs",
    },
    {
      icon: "/deliverability/feature_02.svg",
      title: "DNS Optimization",
      description:
        "Ensure your SPF, DKIM, and DMARC records are configured for maximum deliverability.",
    },
    {
      icon: "/deliverability/feature_03.svg",
      title: "Mailbox Health Monitoring",
      description:
        "Stay ahead with real-time reputation insights for your domain and IPs.",
    },
    {
      icon: "/deliverability/feature_04.svg",
      title: "Placement Tests",
      description:
        "Measure inbox versus spam placement and optimize campaigns for better results",
    },
  ];

	const features = [
    {
      title: "Domain and IP Warmups",
      description: "Boost your sender reputation to ensure inbox placement.",
      image: "/solutions/startups/feature01.svg",
    },
    {
      title: "Placement Tests",
      description:
        "Identify and fix deliverability issues before launching campaigns.",
      image: "/solutions/startups/feature02.svg",
    },
    {
      title: "Custom Playbooks",
      description: "Personalized strategies to maximize your early outreach.",
      image: "/solutions/startups/feature03.svg",
    },
    {
      title: "Real-Time Analytics",
      description: "Get actionable insights to refine your campaigns.",
      image: "/solutions/startups/feature04.svg",
    },
  ];

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
    ],
  };

  return (
    <div className="container mx-auto max-w-full">
      {/* Section 1 - Powering Startups with Seamless Email Deliverability */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Column */}
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
              <h1 className="text-4xl md:text-7xl font-bold mb-4">
                Powering Startups with Seamless Email Deliverability
              </h1>
              <p className="text-xl text-gray-400 mt-4">
                Set your email campaigns up for success from day one with
                Alchemyst AI.
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-4 mt-14">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Try Maya for Free</Button>
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/solutions/startups/startup_01.svg"
                alt="StartupComponent Image 01"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
        {/* Company Carousel */}
        <div className="mt-12 md:mt-24">
          <Slider {...settings}>
            {logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={logo}
                  alt={`Company ${index + 1}`}
                  width={125}
                  height={50}
                  className="h-8 md:h-12 w-auto rounded"
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* Section 2 - Why Startups Need Alchemyst AI */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div>
          <div>
            <div className="flex flex-col items-center text-center ">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Why
                <span className="text-orange-400"> Startups </span>Need
                <span className="text-orange-400"> Alchemyst AI</span>
              </h1>
              <h3 className="text-2xl md:text-2xl font-bold mb-4">
                Build a Strong Foundation for Your Email Strategy
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5 md:pl-32 md:pr-32">
            {[
              {
                title: "Warmup strategies for new domains and IPs",
                image: "/solutions/startups/card01.svg",
              },
              {
                title: "Scalable solutions that grow with your business",
                image: "/solutions/startups/card02.svg",
              },
              {
                title:
                  "Cost-effective packages designed for early-stage companies",
                image: "/solutions/startups/card03.svg",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-72 relative transition-all duration-500 ease-in-out hover:scale-105"
              >
                <Image
                  src={feature.image}
                  alt="feature Image"
                  className="absolute w-full h-full p-2"
                  layout="fill"
                  objectFit="contain"
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black to-transparent opacity-90 md:opacity-100"></div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:scale-105">
                  <h3 className="text-lg md:text-2xl font-bold mb-2">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 3 - All Included In One Subscription CARD */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="w-full flex justify-center items-center px-4 py-8 md:py-16"
      >
        <div className="border border-gray-800 relative w-full max-w-7xl h-[300px] md:h-[500px] overflow-hidden rounded-3xl transition-all duration-500 ease-in-out hover:scale-105">
          <Image
            src="/solutions/startups/startup_02.svg"
            alt="All in one subscription Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col bg-black bg-opacity-30 items-center justify-center text-center p-6">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white transition-all duration-500 ease-in-out hover:scale-105">
              All Included In One Subscription
            </h3>
            <p className="text-lg md:text-xl text-white max-w-2xl transition-all duration-500 ease-in-out hover:scale-105">
              Access all of these features and so many more with Maya.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Section 4 - Features Tailored for Startups */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 px-4 mt-20 md:px-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-4 text-center">
          <span className="text-orange-400">Features</span> Tailored for{" "}
          <span className="text-orange-400">Startups</span>
        </h2>
        <p className="text-xl text-center mb-14">
          Startup-Focused Deliverability Solutions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-8">
          <div className="md:col-span-1">
            <FeatureCard {...features[0]} />
          </div>
          <div className="md:col-span-2">
            <FeatureCard {...features[1]} />
          </div>
          <div className="md:col-span-2">
            <FeatureCard {...features[2]} />
          </div>
          <div className="md:col-span-1">
            <FeatureCard {...features[3]} />
          </div>
        </div>
      </motion.section>

      {/* Section 6 - Ending Card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16"
      >
        <EndingCard />
      </motion.section>
    </div>
  );
};

export default StartupComponent;
