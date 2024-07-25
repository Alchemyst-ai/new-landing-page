/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import GridLayout from "../GridLayout";
import Button from "../home/Button";

const data = [
  {
    id: 1,
    title: "Maya Engages Prospects on Multiple Channels to Book Meetings.",
    imageSrc: "/product/1.webp",
  },
  {
    id: 2,
    title: "Maya empowers your entire Go-To-Market, Growth, Marketing.",
    imageSrc: "/product/2.webp",
  },
  {
    id: 3,
    title: "Stop prospecting, Start connecting.",
    imageSrc: "/product/3.webp",
  },
  {
    id: 4,
    title: "Maya Personalizes Outreach to Drive Conversions.",
    imageSrc: "/product/4.webp",
  },
];

const ProductDescription: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <GridLayout>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center items-center w-3/4 gap-12 py-36">
            <div className="flex flex-col justify-center items-center space-y-8 w-full md:w-1/2 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-semibold"
              >
                <span className="text-[#ff9933]">First Indian</span> Human-Like
                AI Employees
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300"
              >
                Alchemysts can become integral members of your business and
                start-up teams.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full"
              >
                <Button
                  variant={"primary"}
                  className="px-8 md:px-12 text-lg md:text-xl md:w-auto"
                >
                  Hire Now
                </Button>
              </motion.div>
            </div>
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              src="/product/hirethebest.webp"
              alt="Hire the best"
              className="w-full md:w-1/2 h-auto"
            />
          </div>
        </div>
      </GridLayout>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-3xl md:text-5xl font-semibold text-center my-12"
      >
        All <span className="text-[#ff9933]">Sales</span> Complexities
      </motion.h2>
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        src="/product/sales.webp"
        alt="Sales"
        className="w-3/4 mb-12"
      />
      <div className="flex flex-col md:flex-row justify-center items-center w-3/4 gap-12 py-36">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          src="/product/bestfit.png"
          alt="Hire the best"
          className="w-full md:w-2/5 h-auto"
        />
        <div className="flex flex-col justify-center items-center space-y-8 w-full md:w-1/2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl md:text-6xl font-semibold"
          >
            <span className="text-[#ff9933]">Discovers</span> Best fit for
            Customers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-lg md:text-xl text-gray-300"
          >
            Alchemysts can become integral members of your business and start-up
            teams.
          </motion.p>
        </div>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-3xl md:text-5xl font-semibold text-center my-12"
      >
        An Efficient <span className="text-[#ff9933]">Sales Deployer</span>
      </motion.h2>
      <div className="flex flex-wrap justify-center items-center gap-4 w-4/5 my-20">
        {data.map((item) => (
          <Card key={item.id} title={item.title} imageSrc={item.imageSrc} />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<{
  title: string;
  imageSrc: string;
}> = ({ title, imageSrc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="bg-[#1C1C1A] m-2 w-full md:w-1/5 h-96 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
  >
    <img src={imageSrc} alt={title} className="w-60 h-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
  </motion.div>
);

export default ProductDescription;
