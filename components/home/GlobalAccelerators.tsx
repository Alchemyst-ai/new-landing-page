"use client";
import accelerators from "@/app/constants/accelerators";
import Image from "next/image";
import Slider from "react-slick";

const GlobalAccelerators: React.FC = () => {

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
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        }
      ],
    }


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
                    className="filter grayscale-[100%] brightness-[1] contrast-80 saturate-[100%] "
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