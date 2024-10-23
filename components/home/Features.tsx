"use client";
import Feature from "@/app/types/feature";
import { motion } from "framer-motion";
import GridLayout from "../GridLayout";

interface FeatureProps {
  features: Feature[];
}

const Features: React.FC<FeatureProps> = ({ features }) => {
  const horizontalRadius = 30;
  const verticalRadius = 40;
  const center = { top: "47%", left: "46%" };

  const centerCircle = (
    <div
      style={center}
      className="absolute shadow-2xl shadow-pink-400 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 128 128"
        id="AiSetting"
        className="h-16 w-16"
      >
        <path
          stroke="#ffffff"
          stroke-width="6"
          d="M86.3629 27.5387C88.9451 24.9565 93.1316 24.9565 95.7138 27.5387L100.262 32.0869C102.954 34.7791 102.954 39.1442 100.262 41.8365L99.6558 42.4427C97.8499 44.2486 97.5047 47.033 98.4628 49.4003C99.4343 51.8006 101.655 53.5309 104.244 53.5309H105.112C108.916 53.5309 112 56.6147 112 60.4188V66.5812C112 70.3853 108.916 73.4691 105.112 73.4691H104.244C101.655 73.4691 99.4343 75.1994 98.4628 77.5997C97.5047 79.967 97.8499 82.7514 99.6558 84.5573L100.262 85.1635C102.954 87.8558 102.954 92.2208 100.262 94.9131L95.7138 99.4613C93.1316 102.044 88.945 102.044 86.3628 99.4613L86.0017 99.1001C84.0809 97.1794 81.0988 96.8619 78.6064 97.9419C76.193 98.9876 74.4691 101.253 74.4691 103.883V104.38C74.4691 108.036 71.5052 111 67.8489 111H60.7603C57.3199 111 54.5308 108.211 54.5308 104.77C54.5308 101.912 52.5746 99.4752 49.9144 98.4291C47.3419 97.4175 44.317 97.7815 42.3624 99.7361C39.932 102.167 35.9914 102.167 33.561 99.7361L28.0715 94.2466C25.7473 91.9224 25.7473 88.1542 28.0715 85.83C29.9917 83.9098 30.3209 80.951 29.2394 78.4601C29.1382 78.2271 29.0395 77.9932 28.9433 77.7585C27.9271 75.2807 25.625 73.4691 22.9468 73.4691C19.6625 73.4691 17 70.8066 17 67.5223L17 59.4777C17 56.1933 19.6625 53.5308 22.9468 53.5308C25.625 53.5308 27.9271 51.7193 28.9433 49.2414C29.0395 49.0068 29.1382 48.7729 29.2394 48.5399C30.3209 46.049 29.9917 43.0902 28.0715 41.17C25.7473 38.8458 25.7473 35.0775 28.0715 32.7533L33.5609 27.2639C35.9914 24.8335 39.932 24.8335 42.3624 27.2639C44.317 29.2185 47.342 29.5824 49.9145 28.5708C52.5746 27.5247 54.5309 25.0879 54.5309 22.2295C54.5309 18.789 57.32 16 60.7604 16L67.849 16C71.5053 16 74.4692 18.964 74.4692 22.6202V23.1167C74.4692 25.7469 76.1931 28.0124 78.6065 29.0581C81.0989 30.1381 84.0809 29.8206 86.0016 27.8999L86.3629 27.5387Z"
          className="colorStroke1b1b1b svgStroke"
        ></path>
        <path
          stroke="#ffffff"
          stroke-linecap="round"
          stroke-width="6"
          d="M46 77L58.0909 51.2123C58.1517 51.0828 58.2819 51 58.425 51V51C58.5718 51 58.7046 51.087 58.7632 51.2215L70 77M51 70H63M81 77V51"
          className="colorStroke1b1b1b svgStroke"
        ></path>
      </svg>
    </div>
  );

  const positions = features.map((_, index) => {
    const angle = (index / features.length) * 2 * Math.PI;
    const top = 41 - verticalRadius * Math.sin(angle) + "%";
    const left = 41 + horizontalRadius * Math.cos(angle) + "%";

    return { top, left };
  });

  return (
    <GridLayout>
      <section className="relative mb-40 mt-40">
        <motion.div
          initial={{ opacity: 0.6, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-center"
        >
          <div className="mb-20 text-4xl md:text-5xl text-center mx-4">
            <h3 className="text-lg text-gray-400">
              From knowledge silos to organized context
            </h3>
            <h3 className="text-2xl md:text-3xl text-center mx-4">
              Supercharge Organization Productivity with
            </h3>
            <h2 className="text-[#21dbd8]">
              Alchemyst personas
            </h2>
          </div>
          <div className="relative w-[80vw] h-[70vh] hidden md:block">
            {centerCircle}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1C1C1A] min-w-[15rem] absolute p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                style={{
                  top: positions[index].top,
                  left: positions[index].left,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <div className="w-14 h-14 mb-4">{feature.icon}</div>
                <h2 className="text-lg font-semibold">{feature.title}</h2>
                <motion.div
                  className="hidden sm:block absolute -bottom-2.5 w-5 h-5 border-2 border-gray-800 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-0 sm:gap-4 mx-2 md:hidden">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1C1C1A] m-2 min-h-[10rem] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
                viewport={{ once: false }}
              >
                <div className="w-12 h-12 mb-2">{feature.icon}</div>
                <h2 className="text-lg font-semibold text-gray-300">
                  {feature.title}
                </h2>
                <motion.div
                  className="absolute -bottom-2.5 w-5 h-5 border-2 border-gray-800 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full hidden"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </GridLayout>
  );
};

export default Features;
