"use client";
import accelerators from "@/app/constants/accelerators";
import useWindowDimensions from "@/hooks/useWindowDimentions";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const GlobalAccelerators: React.FC = () => {

  const windowDimen = useWindowDimensions()

  const [settings, setSettings] = useState({})   

  const slidesToShow = (() => {
    if (windowDimen.width >= 1200) return 4; 
    if (windowDimen.width >= 992) return 3; 
    if (windowDimen.width >= 768) return 2;
    return 1;
  })();

  useEffect(() => {
    setSettings({
      infinite: true,
      speed: 5000,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: "linear",
      pauseOnHover: false,
      arrows: false,
      slidesToShow: slidesToShow,
    });
  },[slidesToShow])


  return (
    <section className="mt-20" id="featured-in">
      <div className="flex w-full justify-center items-center">
        <div className="w-full bg-gradient-to-r from-[#0b0b09] to-[#ffffff42] h-[2px]"></div>
        <h1
          className="text-base text-nowrap mx-3"
          aria-label="Backed by the best"
        >
          GLOBAL ACCELERATORS TRUSTING US
        </h1>
        <div className="w-full bg-gradient-to-r to-[#0b0b09] from-[#ffffff42] h-[2px]"></div>
      </div>

      <div className="w-[70vw] md:w-[70vw]">
        <Slider {...settings} >
          {accelerators.map((company, index) => (
            <div key={index} className="h-[18rem]">
                <div className="px-10 rounded-md w-full h-full flex justify-center items-center">
                    <Image
                    className="object-contain rounded-md"
                    src={company.image}
                    alt={`Logo of ${company.image}`}
                    width={400}
                    height={400}
                    />
                </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );

  


};

export default GlobalAccelerators;
