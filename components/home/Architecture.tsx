"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    slidesToShow: 5,
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

const logos = [
  "/security/1.svg",
  "/security/2.svg",
  "/security/3.webp",
  "/security/4.webp",
  "/security/5.webp",
  "/security/6.webp",
  "/security/7.webp",
  "/security/8.webp",
];

const Architecture: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center p-4">
      <header className="mb-20 text-3xl md:text-4xl flex flex-col md:flex-row text-center">
        <span>Service Oriented&nbsp;</span>
        <span className="text-[#21dbd8]">Architecture</span>
      </header>

      <motion.div
        className="border p-2 w-[80vw] md:w-[25vw] h-[10vh] md:h-[12vh] rounded-lg md:rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="border border-dashed rounded-lg md:rounded-3xl p-4 h-[10vh] md:h-[12vh] w-[80vw] md:w-[25vw] bg-[#1F1F1C] flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-[#ff9933]">
            Gen-AI Employees
          </h2>
        </div>
      </motion.div>

      <div className="w-1 mt-3 border-l border-dashed h-8 border-gray-400"></div>
      <div className="h-8 w-4/5 md:w-3/5 border-x border-t rounded-t-full border-dashed border-gray-400 hidden sm:block"></div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-4">
        <motion.div
          className="p-2 w-[80vw] md:w-[12vw] h-0 md:h-[8vh] flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h2 className="text-lg text-gray-400 mt-5"></h2>
        </motion.div>

        <motion.div
          className="border sm:hidden block p-2 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] rounded-lg md:rounded-3xl "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-lg md:rounded-3xl p-4 md:p-8 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#21dbd8]">Personas</h2>
          </div>
        </motion.div>

        <motion.div
          className="border hidden sm:block p-2 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] rounded-tl-lg md:rounded-tl-3xl "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-tl-lg md:rounded-tl-3xl p-4 md:p-8 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#21dbd8]">Sales</h2>
          </div>
        </motion.div>

        <motion.div
          className="border p-2 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] rounded-lg hidden sm:block"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-lg p-4 md:p-8 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#21dbd8]">Marketing</h2>
          </div>
        </motion.div>

        <motion.div
          className="border p-2 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] rounded-lg hidden sm:block"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-lg p-4 md:p-8 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#21dbd8]">HR-Tech</h2>
          </div>
        </motion.div>

        <motion.div
          className="border p-2 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] rounded-lg hidden sm:block"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-lg p-4 md:p-8 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] bg-[#1F1F1C] sm:flex flex-col justify-center items-center hidden">
            <h2 className="text-2xl font-semibold text-[#21dbd8]">
              Customer Support
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="border p-2 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] rounded-tr-lg md:rounded-tr-3xl hidden sm:block"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-tr-lg md:rounded-tr-3xl p-4 md:p-8 w-[80vw] md:w-[12vw] h-[10vh] md:h-[8vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#21dbd8]">Analytics</h2>
          </div>
        </motion.div>

        <motion.div
          className="p-2 w-[80vw] md:w-[12vw] h-[8vh] flex justify-center items-center -ml-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h2 className="text-lg text-gray-400 mt-5">+ more in pipeline</h2>
        </motion.div>
      </div>

      <div className="h-8 w-4/5 md:w-3/5 border-x border-b border-gray-400 rounded-b-full border-dashed mt-3 flex justify-center items-center">
        <div className="hidden w-1/2 h-8 border-x border-b border-gray-400 rounded-b-full border-dashed sm:flex justify-center items-center">
          <div className="w-1 h-full border-l border-gray-400 border-dashed"></div>
        </div>
      </div>

      <div className="w-1 border-l border-dashed h-8"></div>

      <motion.div
        className="border p-2 w-[80vw] md:w-[25vw] h-[12vh] md:h-[14vh] rounded-lg md:rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="border border-dashed rounded-lg md:rounded-3xl p-4 h-[12vh] md:h-[14vh] w-[80vw] md:w-[25vw] bg-[#1F1F1C] flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#ff9933]">
            Application Layer
          </h2>
        </div>
      </motion.div>

      <h2 className="text-3xl text-[#ffffffbc] my-6">+</h2>

      <motion.div
        className="border p-2 w-[80vw] md:w-[18vw] h-[8vh] md:h-[10vh] rounded-lg md:rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="border border-dashed rounded-lg md:rounded-3xl p-4 h-[8vh] md:h-[10vh] w-[80vw] md:w-[18vw] bg-[#1F1F1C] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-[#21dbd8] text-center">
            Security + Governance Layer
          </h2>
        </div>
      </motion.div>

      <h2 className="text-3xl text-[#ffffffbc] my-6">+</h2>

      <motion.div
        className="border p-2 w-[80vw] md:w-[25vw] h-[12vh] md:h-[14vh] rounded-lg md:rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="border border-dashed rounded-lg md:rounded-3xl p-4 h-[12vh] md:h-[14vh] w-[80vw] md:w-[25vw] bg-[#1F1F1C] flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#ff9933]">
            Infrastructure Layer
          </h2>
        </div>
      </motion.div>

      <div className="w-full bg-radial-gradient rounded-full"></div>

      <div className="flex flex-col justify-center items-center overflow-hidden mt-36">
        <h2 className="text-xl mb-16 text-gray-300 text-center">
          ENTERPRISE LEVEL SECURITY AND COMPLIANCE
        </h2>
        <div className="w-[80vw]">
          <Slider {...settings}>
            {logos.map((logo, index) => (
              <div key={index}>
                <Image
                  src={logo}
                  alt={`Company ${index + 1}`}
                  width={250}
                  height={250}
                  className="h-20 md:h-28 w-auto rounded"
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
