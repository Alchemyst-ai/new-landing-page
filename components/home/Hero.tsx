"use client";
import GridLayout from "@/components/GridLayout";
import Announcement from "@/components/home/Announcement";
import Button from "@/components/home/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Typewriter from "typewriter-effect";
import RotatingMaya from "./RotatingMaya";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRandomDelay = () => `${Math.random() * 5}s`;

  const verticalLines = Array.from({ length: 10 }).map((_, index) => (
    <motion.div
      key={`v-${index}`}
      className="h-screen absolute top-0 animated-line hidden sm:flex flex-col justify-end items-end"
      style={{
        right: `${20 + Math.random() * 20}%`,
        animationDelay: getRandomDelay(),
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: Math.random() * 2 }}
    >
      <div className="w-[1px] bg-gradient-to-b from-black via-gray-300 to-white h-64"></div>
    </motion.div>
  ));

  const horizontalLines = Array.from({ length: 10 }).map((_, index) => (
    <motion.div
      key={`h-${index}`}
      className="w-screen absolute right-0 animated-line-w hidden sm:flex flex-col justify-start items-start"
      style={{
        top: `${20 + Math.random() * 60}%`,
        animationDelay: getRandomDelay(),
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: Math.random() * 2 }}
    >
      <div className="h-[1px] w-32 bg-gradient-to-l from-black via-gray-300 to-white"></div>
    </motion.div>
  ));

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
        breakpoint : 375,
        settings: {
          slidesToShow : 1
        }
      }
    ],
  };

  if (!mounted) return null;

  return (
    <GridLayout>
      <section className="relative z-20 flex h-full w-full items-center justify-center">
        {verticalLines}
        {horizontalLines}
        <motion.div
          className="relative mt-20 md:mt-40 w-full md:w-[76%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          style={{ y: y1 }}
        >
          <div className="flex justify-between items-center">
            <div className="w-full min-w-[90%] md:min-w-[60%] md:m-auto mx-5 my-2 md:w-1/2">
              <header className="text-[clamp(1.8rem,4vw,5rem)] text-left  md:text-6xl  md:text-start font-bold leading-tight md:leading-[1.1]">
                <div className="flex">
                  <p className="text-blue-">Revolutionize&nbsp;</p>
                  <Typewriter
                    options={{
                      strings: [
                        `<span style="color: #ff9933;">Productivity</span>`,
                        `<span style="color: #ff9933;">Business</span>`,
                        `<span style="color: #ff9933;">Growth</span>`,
                        `<span style="color: #ff9933;">Innovation</span>`,
                        `<span style="color: #ff9933;">Automation</span>`,
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
                with your Next-Gen AI Digital Employees
              </header>
              <p className="my-6 w-full md:w-2/3 text-xl font-medium text-left sm:text-center md:text-start text-gray-400">
                Transform your business with the next ecosystem of gen-AI
                digital employees built on Alchemyst&apos;s Infrastructure that
                interacts with each other and form highly intelligent functional
                components across enterprises.
              </p>
              <div className="flex flex-col md:flex-row gap-2">
                  <Link
                    href="https://calendly.com/getalchemystai/alchemyst-ai"
                    target="_blank noopener"
                  >
                    <Button variant={"primary"} className="w-full sm:w-full md:w-auto">
                      Book a demo
                    </Button>
                  </Link>
                <Link href="https://tripetto.app/run/60HWNW0WQN">
                  <Button
                    variant={"secondary"}
                    className="w-full md:w-auto"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    }
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-1/2 -mr-40 -mt-10">
              <RotatingMaya />
            </div>
          </div>
          <div className="w-full px-2">
            <Announcement />
          </div>
          <div className="flex flex-col justify-center items-center overflow-hidden mb-16">
            <h2 className="text-xl sm:text-2xl mb-8 text-center">
              Best Enterprises and Startups trust us
            </h2>
            <div className="w-[70vw] sm:w-[60vw]">
              <Slider {...settings}>
                {logos.map((logo, index) => (
                  <div key={index}>
                    <Image
                      src={logo}
                      alt={`Company ${index + 1}`}
                      width={150}
                      height={50}
                      className="h-12 w-auto rounded"
                      priority
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </motion.div>
      </section>
    </GridLayout>
  );
};

export default Hero;
