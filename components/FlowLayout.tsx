/* eslint-disable @next/next/no-img-element */
"use client";
import Flow from "@/app/types/flow";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import React, { useEffect } from "react";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

interface FlowLayoutProps {
  flows: Flow[];
}

const FlowLayout: React.FC<FlowLayoutProps> = ({ flows }) => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0.5 });

      const animation = gsap.to(".photo:not(:first-child)", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 1,
      });

      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".leftblock",
        animation: animation,
        scrub: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="gallery flex w-4/5 md:w-2/3">
      <div className="leftblock hidden w-2/3 h-screen md:flex flex-col justify-center shadow-2xl">
        <div className="relative  w-full h-[50vh] bg-[#0B0B09] rounded-2xl border border-[#242422] ">
          {flows.map((flow, index) => (
            <div key={index} className="photo absolute bg-[#0B0B09] m-8">
              <img
                src={flow.image}
                alt={`img-${index}`}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="right hidden md:block w-1/3 pl-8">
        {flows.map((flow, index) => (
          <div
            key={index}
            className="details h-screen flex flex-col justify-center text-3xl font-extrabold"
          >
            <h1 className="text-6xl text-[#cecec5]">{flow.title}</h1>
            <h2 className="text-base my-5 text-[#cecec5]">{flow.moto}</h2>
            <p className="text-base">{flow.description}</p>
            <Link href={flow.link} className="text-base mt-4">
              <Button variant="secondaryWithBg" icon={flow.icon}>
                {flow.linkText}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        {flows.map((flow, index) => (
          <div key={index}>
            <div className="bg-[#0B0B09] md:hidden rounded-2xl border border-[#242422]">
              <img
                src={flow.image}
                alt={`img-${index}`}
                className="w-full h-full"
              />
            </div>
            <div
              key={index}
              className="md:details my-10 md:my-auto md:h-screen flex flex-col justify-center text-3xl font-extrabold"
            >
              <h1 className="text-6xl text-[#cecec5]">{flow.title}</h1>
              <h2 className="text-base my-5 text-[#cecec5]">{flow.moto}</h2>
              <p className="text-base">{flow.description}</p>
              <Link href={flow.link} className="text-base mt-4">
                <Button variant="secondaryWithBg" icon={flow.icon}>
                  {flow.linkText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowLayout;
