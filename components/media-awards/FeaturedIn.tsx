"use client";
import featuredin from "@/app/constants/featuredin";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const FeaturedIn: React.FC = () => {
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
  };
  return (
    <div className="mt-20" id="featured-in">
      <div className="flex w-full justify-center items-center">
        <div className="w-full bg-gradient-to-r from-[#0b0b09] to-[#ffffff42] h-[2px]"></div>
        <h1
          className="text-base text-nowrap mx-3"
          aria-label="Backed by the best"
        >
          FEATURED IN THE BEST
        </h1>
        <div className="w-full bg-gradient-to-r to-[#0b0b09] from-[#ffffff42] h-[2px]"></div>
      </div>

      <div className="w-[70vw] md:w-[70vw]">
        <Slider {...settings}>
          {featuredin.map((company, index) => (
            <div key={index} className="px-10">
              <Link
                href={company.link}
                target="_blank"
                className="h-80 bg-ed-400 flex justify-center items-center"
              >
                <Image
                  src={company.image}
                  alt={`Logo of ${company.image}`}
                  width={400}
                  height={400}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedIn;
