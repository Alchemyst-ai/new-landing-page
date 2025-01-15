"use client";

import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

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
    <div className="bg-gradient-to-r from-[#272626] to-black border border-gray-800 shadow-[0_0_5px_2px_rgba(50,37,41,255)] rounded-3xl p-6 h-[40vh] relative overflow-hidden">
      <Image
        src={image}
        alt={`${title} image`}
        className="absolute w-full h-full p-2 pt-24"
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

const EnterpriseComponent = () => {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  const features = [
    {
      title: "DNS Management",
      description:
        "Ensure SPF, DKIM, and DMARC alignment for security and compliance",
      image: "/solutions/enterprise/feature01.svg",
    },
    {
      title: "Warmups at Scale",
      description: "Maintain sender reputation even with high-volume emails",
      image: "/solutions/enterprise/feature02.svg",
    },
    {
      title: "Custom Campaign Playbooks",
      description: "Strategies tailored to your enterprise goals",
      image: "/solutions/enterprise/feature03.svg",
    },
    {
      title: "Comprehensive Reporting",
      description: "Track and optimize campaigns with real-time data",
      image: "/solutions/enterprise/feature04.svg",
    },
  ];

  return (
    <div className="container mx-auto max-w-full">
      {/* Section 1 - Enterprise-Grade Email Deliverability and Compliance */}
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Enterprise-Grade Email Deliverability and Compliance
              </h1>
              <p className="text-xl text-gray-400 mt-4">
                Streamline large-scale email campaigns with Alchemyst AI&apos;s
                robust infrastructure and advanced tools.
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
                src="/solutions/enterprise/01.svg"
                alt="Image for the Enterprise-Grade Email Deliverability and Compliance section"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Why Enterprises Choose Us */}
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
                <span className="text-orange-400"> Enterprises </span>Choose Us
              </h1>
              <h3 className="text-2xl md:text-2xl font-bold mb-4">
                Deliver Emails at Scale with Confidence
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5 md:pl-32 md:pr-32">
            {[
              {
                title: "Scalable infrastructure for high-volume campaigns",
                image: "/solutions/enterprise/card01.svg",
              },
              {
                title:
                  "Compliance with global regulations like GDPR, SOC-2, and ISO.",
                image: "/solutions/enterprise/card02.svg",
              },
              {
                title: "Advanced DNS and mailbox health management.",
                image: "/solutions/enterprise/card03.svg",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-72 relative transition-all duration-500 ease-in-out hover:scale-105"
              >
                <Image
                  src={feature.image}
                  alt="feature Image"
                  className="absolute w-full h-full pb-16"
                  layout="fill"
                  objectFit="contain"
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black via-transparent to-transparent opacity-90 md:opacity-100"></div>

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

      {/* Section 3 - Why Enterprises trust Alchemysts */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="w-full flex flex-col justify-center items-center px-4 py-8 md:py-16"
      >
        <h1 className="text-4xl md:text-5xl mb-14">
          Why <span className="text-orange-400">Enterprises</span> trust{" "}
          <span className="text-orange-400">Alchemysts</span>
        </h1>
        <div className="border border-gray-800 relative w-full max-w-7xl h-[300px] md:h-[500px] overflow-hidden rounded-3xl transition-all duration-500 ease-in-out hover:scale-105">
          <Image
            src="/solutions/startups/startup_02.svg"
            alt="All in one subscription Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white transition-all duration-500 ease-in-out hover:scale-105">
              All Included In One Subscription
            </h3>
            <p className="text-lg md:text-xl text-white max-w-2xl transition-all duration-500 ease-in-out hover:scale-105">
              Access all of these features and so many more with Maya.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Section 4 -  Key Features for Enterprises */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 px-4 mt-20 md:px-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-4 text-center">
          Key<span className="text-orange-400"> Features </span>Tailored for{" "}
          <span className="text-orange-400">Enterprises</span>
        </h2>
        <p className="text-xl text-center mb-14">
          Tools to Optimize Large-Scale Campaigns
        </p>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6 p-8 md:pl-20 md:pr-20">
          <div className="md:col-span-3">
            <FeatureCard {...features[0]} />
          </div>
          <div className="md:col-span-4">
            <FeatureCard {...features[1]} />
          </div>
          <div className="md:col-span-4">
            <FeatureCard {...features[2]} />
          </div>
          <div className="md:col-span-3">
            <FeatureCard {...features[3]} />
          </div>
        </div>
      </motion.section>

      {/* Section 4 -  Key Features for Enterprises */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 px-4 mt-20"
      >
        <div className="flex flex-col items-center justify-center py-20 min-h-screen relative w-full">
          <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
            <div className="text-content">
              <h2 className="text-center text-xl md:text-4xl font-bold">
                Why choose{" "}
                <span className="text-orange-400">Alchemyst AI </span>
                for <span className="text-orange-400">Enterprises?</span>
              </h2>
              <p className="text-center md:text-lg mt-2 mx-auto">
                The Preferred Choice for Global Enterprises
              </p>
              <p className="text-center md:text-2xl mt-4 mx-auto">
                Access to global databases of over{" "}
                <span className="text-4xl text-orange-400">300M+</span> B2B
                Contacts across the world.
              </p>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="relative h-[30rem] md:h-[40rem]"
            >
              <div className="absolute w-full inset-x-0 top-0 h-40 pointer-events-none select-none z-40" />
              <div className="absolute w-full inset-x-0 bottom-0 h-40 pointer-events-none select-none z-40" />
              <div className="absolute w-full h-full z-10">
                <World data={sampleArcs} globeConfig={globeConfig} />
              </div>
            </motion.div>
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

export default EnterpriseComponent;
