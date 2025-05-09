"use client";

import EndingCard from "@/components/home/EndingCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const FeatureCard: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <div className="mt-4 flex items-center p-2 md:p-8 gap-4 bg-gray-950 border border-gray-600 rounded-2xl shadow-md">
    {icon}
    <p className="font-medium md:text-xl text-start"> {text} </p>
  </div>
);

const ProductComponent: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-full p-20">
      {/* SECTION 1 - Sales Automation */}
      <motion.section
        id="sales-automation"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="text-center mb-16 mt-20"
      >
        <h1 className="text-4xl md:text-7xl font-base-neue mt-8 md:mt-4 mb-4">
          Sales Automation
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-helvetica">
          Close Deals Faster with Sales Automation
        </p>
        <p className="text-sm md:text-xl mb-8 text-gray-400 font-helvetica">
          Maya&#39;s sales automation tools are built to streamline your <br />
          pipeline, prioritize leads, and ensure follow-ups happen at the right
          time
        </p>
        <Image
          src="/products/products_01.svg"
          alt="Maya Platform"
          width={900}
          height={900}
          className="mt-16 mx-auto transition-all duration-500 ease-in-out hover:scale-110 max-w-full h-auto"
          loading="lazy"
        />
      </motion.section>

      {/* SECTION 2 - Feature Cards */}
      <motion.section
        id="feature-cards"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 px-4 md:px-20"
      >
        <div className="flex justify-center mb-12">
          <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
            Features
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title:
                "Intelligent lead management to track and nurture prospects",
              image: "/products/card_01.svg",
            },
            {
              title: "Automated follow-ups to keep conversations going.",
              image: "/products/card_02.svg",
            },
            {
              title: "Visualized sales pipelines for clear progress tracking.",
              image: "/products/card_03.svg",
            },
            {
              title: "Real-time analytics for data-backed decisions.",
              image: "/products/card_04.svg",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-80 relative ${
                index % 2 === 0 ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <Image
                src={feature.image}
                alt="FEATURE-IMAGE"
                className="absolute top-0 bottom-0 w-full h-full p-5 pt-0"
                layout="fill"
                objectFit="fit"
              />

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black via-transparent to-transperant bg-opacity-90"></div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center transition-all duration-500 ease-in-out hover:scale-105">
                <h3 className="text-center font-helvetica text-xl md:text-2xl md:mb-2">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 3 - WhatsApp Automation */}
      <motion.section
        id="whatsapp-automation"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 p-4 md:p-20"
      >
        <div className="w-full max-w-9xl mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold text-white">
                WhatsApp Automation
              </h2>
              <p className="text-xl mt-2 text-gray-300">
                Supercharge Communication with WhatsApp Automation
              </p>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-auto order-2 lg:order-1 transition-all duration-500 ease-in-out hover:scale-105">
                <img
                  src="/products/whatsapp_automation.svg"
                  alt="WhatsApp Automation"
                  className="w-full h-auto object-cover rounded-lg mt-8 md:mt-0"
                />
              </div>
              <div className="lg:w-2/3 order-1 lg:order-2 md:mt-4">
                <p className="text-xl mb-6 text-gray-400 text-center md:mt-8 md:text-start">
                  Reach your customers directly on their favorite messaging app.
                  Maya automates everything from instant replies to bulk
                  broadcasts, ensuring your business stays connected
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Gradual email volume scaling to improve sender reputation."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="45"
                        viewBox="0 0 44 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.5635 25.3823C40.8153 25.1288 40.9569 24.7857 40.9569 24.4285C40.9569 24.071 40.8153 23.7279 40.5635 23.4744L36.5047 19.4156H36.5043C36.2526 19.1655 35.9122 19.0245 35.5573 19.0232V9.55201C35.5566 8.44892 35.1072 7.39421 34.3126 6.62945C33.561 5.86943 32.5401 5.43672 31.4713 5.42529H7.11751C6.07448 5.42563 5.07142 5.82779 4.3168 6.54815C3.51382 7.31387 3.05928 8.37467 3.05859 9.48412V25.7203C3.06665 26.7804 3.48895 27.7953 4.23551 28.5482C4.99283 29.3276 6.03083 29.771 7.11742 29.7791H24.1382L22.3791 31.5244V31.5248C22.126 31.7799 21.9847 32.1257 21.9867 32.4852V36.5444C21.9884 36.9059 22.1344 37.2517 22.3926 37.5048C22.6447 37.7549 22.9847 37.8959 23.3399 37.8972H27.4937H27.4934C27.8502 37.8922 28.191 37.7462 28.4407 37.4914L40.5635 25.3823ZM37.6816 24.4215L36.8967 25.2198L34.705 23.028L35.1243 22.6221L35.5033 22.2431L37.6816 24.4215ZM30.5784 23.3392L24.2734 17.6025L32.8242 9.83624V21.1069L30.5784 23.3392ZM26.8441 27.0734H7.90176L16.3039 19.429L16.5882 19.6321C17.3324 20.2975 18.2955 20.6657 19.2942 20.6657C20.2925 20.6657 21.256 20.2974 22.0002 19.6321L22.2436 19.4022L28.6433 25.22L26.8441 27.0734ZM5.7645 9.83607L14.2885 17.6023L5.7645 25.3686V9.83607ZM30.6597 8.13141L21.2565 16.6959L20.2011 17.6567V17.6564C19.9516 17.8847 19.626 18.0112 19.288 18.0112C18.9496 18.0112 18.624 17.8847 18.3745 17.6564L17.3056 16.6956L7.90237 8.13142L30.6597 8.13141ZM26.9255 35.1914L24.7066 35.1911V33.04L28.3734 29.3869L32.8243 24.9487L35.0027 27.127L26.9255 35.1914ZM40.9427 37.8971C40.9427 38.2559 40.8004 38.6 40.5466 38.8538C40.2929 39.1076 39.9488 39.2503 39.5899 39.2503H31.4718C30.9884 39.2503 30.5416 38.9921 30.2999 38.5735C30.0582 38.1549 30.0582 37.6393 30.2999 37.2207C30.5416 36.8021 30.9884 36.5443 31.4718 36.5443H39.5899C39.9487 36.5443 40.2928 36.6866 40.5466 36.9404C40.8004 37.1942 40.9427 37.5382 40.9427 37.8971Z"
                          fill="white"
                        />
                      </svg>
                    }
                    text="Monitoring tools to track deliverability rates."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Personalized engagement to mimic human behavior."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Compatibility with major email platforms like Gmail and Outlook."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4 - Telegram Automation */}
      <motion.section
        id="telegram-automation"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 p-4 md:p-20"
      >
        <div className="w-full max-w-9xl mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold text-white">
                Telegram Automation
              </h2>
              <p className="text-xl mt-2 text-gray-300">
                Scale Your Outreach with Telegram
              </p>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="order-2 lg:order-1 transition-all duration-500 ease-in-out hover:scale-105">
                <img
                  src="/products/telegram_automation.svg"
                  alt="WhatsApp Automation"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3 order-1 lg:order-2 md:mt-8 md:text-start text-center">
                <p className="text-xl mb-6 text-gray-400">
                  With Telegram&#39;s growing popularity, Maya enables
                  businesses to leverage this platform efficiently. Automate
                  your group interactions, broadcast messages, and manage
                  customer queries effortlessly
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Bulk messaging to reach large audiences"
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="45"
                        viewBox="0 0 44 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.5635 25.3823C40.8153 25.1288 40.9569 24.7857 40.9569 24.4285C40.9569 24.071 40.8153 23.7279 40.5635 23.4744L36.5047 19.4156H36.5043C36.2526 19.1655 35.9122 19.0245 35.5573 19.0232V9.55201C35.5566 8.44892 35.1072 7.39421 34.3126 6.62945C33.561 5.86943 32.5401 5.43672 31.4713 5.42529H7.11751C6.07448 5.42563 5.07142 5.82779 4.3168 6.54815C3.51382 7.31387 3.05928 8.37467 3.05859 9.48412V25.7203C3.06665 26.7804 3.48895 27.7953 4.23551 28.5482C4.99283 29.3276 6.03083 29.771 7.11742 29.7791H24.1382L22.3791 31.5244V31.5248C22.126 31.7799 21.9847 32.1257 21.9867 32.4852V36.5444C21.9884 36.9059 22.1344 37.2517 22.3926 37.5048C22.6447 37.7549 22.9847 37.8959 23.3399 37.8972H27.4937H27.4934C27.8502 37.8922 28.191 37.7462 28.4407 37.4914L40.5635 25.3823ZM37.6816 24.4215L36.8967 25.2198L34.705 23.028L35.1243 22.6221L35.5033 22.2431L37.6816 24.4215ZM30.5784 23.3392L24.2734 17.6025L32.8242 9.83624V21.1069L30.5784 23.3392ZM26.8441 27.0734H7.90176L16.3039 19.429L16.5882 19.6321C17.3324 20.2975 18.2955 20.6657 19.2942 20.6657C20.2925 20.6657 21.256 20.2974 22.0002 19.6321L22.2436 19.4022L28.6433 25.22L26.8441 27.0734ZM5.7645 9.83607L14.2885 17.6023L5.7645 25.3686V9.83607ZM30.6597 8.13141L21.2565 16.6959L20.2011 17.6567V17.6564C19.9516 17.8847 19.626 18.0112 19.288 18.0112C18.9496 18.0112 18.624 17.8847 18.3745 17.6564L17.3056 16.6956L7.90237 8.13142L30.6597 8.13141ZM26.9255 35.1914L24.7066 35.1911V33.04L28.3734 29.3869L32.8243 24.9487L35.0027 27.127L26.9255 35.1914ZM40.9427 37.8971C40.9427 38.2559 40.8004 38.6 40.5466 38.8538C40.2929 39.1076 39.9488 39.2503 39.5899 39.2503H31.4718C30.9884 39.2503 30.5416 38.9921 30.2999 38.5735C30.0582 38.1549 30.0582 37.6393 30.2999 37.2207C30.5416 36.8021 30.9884 36.5443 31.4718 36.5443H39.5899C39.9487 36.5443 40.2928 36.6866 40.5466 36.9404C40.8004 37.1942 40.9427 37.5382 40.9427 37.8971Z"
                          fill="white"
                        />
                      </svg>
                    }
                    text="Custom bot workflows for group management."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Real-time notifications for customer engagement."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Analytics to measure campaign effectiveness."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 - Email Warm-up */}
      <motion.section
        id="email-warmup"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 p-4 md:p-20"
      >
        <div className="w-full max-w-9xl mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold text-white">Email Warm-Up</h2>
              <p className="text-xl mt-2 text-gray-300">
                Land in Inboxes, Not Spam, with Email Warm-Up
              </p>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="order-2 lg:order-1 transition-all duration-500 ease-in-out hover:scale-105">
                <img
                  src="/products/email_warmup.svg"
                  alt="WhatsApp Automation"
                  className="w-full h-auto object-cover rounded-lg "
                />
              </div>
              <div className="lg:w-2/3 order-1 lg:order-2 md:mt-4">
                <p className="text-xl mb-6 text-gray-400 mt-8 text-center md:text-start">
                  Increase your email deliverability with Maya&#39;s automated
                  email warm-up tool. Gradually build credibility with email
                  providers to ensure your campaigns are seen.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Gradual email volume scaling to improve sender reputation."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="45"
                        viewBox="0 0 44 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.5635 25.3823C40.8153 25.1288 40.9569 24.7857 40.9569 24.4285C40.9569 24.071 40.8153 23.7279 40.5635 23.4744L36.5047 19.4156H36.5043C36.2526 19.1655 35.9122 19.0245 35.5573 19.0232V9.55201C35.5566 8.44892 35.1072 7.39421 34.3126 6.62945C33.561 5.86943 32.5401 5.43672 31.4713 5.42529H7.11751C6.07448 5.42563 5.07142 5.82779 4.3168 6.54815C3.51382 7.31387 3.05928 8.37467 3.05859 9.48412V25.7203C3.06665 26.7804 3.48895 27.7953 4.23551 28.5482C4.99283 29.3276 6.03083 29.771 7.11742 29.7791H24.1382L22.3791 31.5244V31.5248C22.126 31.7799 21.9847 32.1257 21.9867 32.4852V36.5444C21.9884 36.9059 22.1344 37.2517 22.3926 37.5048C22.6447 37.7549 22.9847 37.8959 23.3399 37.8972H27.4937H27.4934C27.8502 37.8922 28.191 37.7462 28.4407 37.4914L40.5635 25.3823ZM37.6816 24.4215L36.8967 25.2198L34.705 23.028L35.1243 22.6221L35.5033 22.2431L37.6816 24.4215ZM30.5784 23.3392L24.2734 17.6025L32.8242 9.83624V21.1069L30.5784 23.3392ZM26.8441 27.0734H7.90176L16.3039 19.429L16.5882 19.6321C17.3324 20.2975 18.2955 20.6657 19.2942 20.6657C20.2925 20.6657 21.256 20.2974 22.0002 19.6321L22.2436 19.4022L28.6433 25.22L26.8441 27.0734ZM5.7645 9.83607L14.2885 17.6023L5.7645 25.3686V9.83607ZM30.6597 8.13141L21.2565 16.6959L20.2011 17.6567V17.6564C19.9516 17.8847 19.626 18.0112 19.288 18.0112C18.9496 18.0112 18.624 17.8847 18.3745 17.6564L17.3056 16.6956L7.90237 8.13142L30.6597 8.13141ZM26.9255 35.1914L24.7066 35.1911V33.04L28.3734 29.3869L32.8243 24.9487L35.0027 27.127L26.9255 35.1914ZM40.9427 37.8971C40.9427 38.2559 40.8004 38.6 40.5466 38.8538C40.2929 39.1076 39.9488 39.2503 39.5899 39.2503H31.4718C30.9884 39.2503 30.5416 38.9921 30.2999 38.5735C30.0582 38.1549 30.0582 37.6393 30.2999 37.2207C30.5416 36.8021 30.9884 36.5443 31.4718 36.5443H39.5899C39.9487 36.5443 40.2928 36.6866 40.5466 36.9404C40.8004 37.1942 40.9427 37.5382 40.9427 37.8971Z"
                          fill="white"
                        />
                      </svg>
                    }
                    text="Monitoring tools to track deliverability rates."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Personalized engagement to mimic human behavior."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Compatibility with major email platforms like Gmail and Outlook."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 - Unified Automation Platform */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 p-4 md:p-20"
      >
        <div className="w-full max-w-9xl mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold text-white">
                Unified Automation Platform
              </h2>
              <p className="text-xl mt-2 text-gray-300">
                One Platform, Endless Possibilities
              </p>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="order-2 lg:order-1 transition-all duration-500 ease-in-out hover:scale-105 p-8">
                <img
                  src="/products/unified_automation_platform.svg"
                  alt="WhatsApp Automation"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3 order-1 lg:order-2 md:mt-14 text-center md:text-start">
                <p className="text-xl mb-6 text-gray-400">
                  Maya seamlessly integrates all its tools - sales, WhatsApp,
                  Telegram, and email automation - into one unified platform, so
                  you can manage everything without switching between multiple
                  systems.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="All-in-one dashboard for complete visibility."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="45"
                        viewBox="0 0 44 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.5635 25.3823C40.8153 25.1288 40.9569 24.7857 40.9569 24.4285C40.9569 24.071 40.8153 23.7279 40.5635 23.4744L36.5047 19.4156H36.5043C36.2526 19.1655 35.9122 19.0245 35.5573 19.0232V9.55201C35.5566 8.44892 35.1072 7.39421 34.3126 6.62945C33.561 5.86943 32.5401 5.43672 31.4713 5.42529H7.11751C6.07448 5.42563 5.07142 5.82779 4.3168 6.54815C3.51382 7.31387 3.05928 8.37467 3.05859 9.48412V25.7203C3.06665 26.7804 3.48895 27.7953 4.23551 28.5482C4.99283 29.3276 6.03083 29.771 7.11742 29.7791H24.1382L22.3791 31.5244V31.5248C22.126 31.7799 21.9847 32.1257 21.9867 32.4852V36.5444C21.9884 36.9059 22.1344 37.2517 22.3926 37.5048C22.6447 37.7549 22.9847 37.8959 23.3399 37.8972H27.4937H27.4934C27.8502 37.8922 28.191 37.7462 28.4407 37.4914L40.5635 25.3823ZM37.6816 24.4215L36.8967 25.2198L34.705 23.028L35.1243 22.6221L35.5033 22.2431L37.6816 24.4215ZM30.5784 23.3392L24.2734 17.6025L32.8242 9.83624V21.1069L30.5784 23.3392ZM26.8441 27.0734H7.90176L16.3039 19.429L16.5882 19.6321C17.3324 20.2975 18.2955 20.6657 19.2942 20.6657C20.2925 20.6657 21.256 20.2974 22.0002 19.6321L22.2436 19.4022L28.6433 25.22L26.8441 27.0734ZM5.7645 9.83607L14.2885 17.6023L5.7645 25.3686V9.83607ZM30.6597 8.13141L21.2565 16.6959L20.2011 17.6567V17.6564C19.9516 17.8847 19.626 18.0112 19.288 18.0112C18.9496 18.0112 18.624 17.8847 18.3745 17.6564L17.3056 16.6956L7.90237 8.13142L30.6597 8.13141ZM26.9255 35.1914L24.7066 35.1911V33.04L28.3734 29.3869L32.8243 24.9487L35.0027 27.127L26.9255 35.1914ZM40.9427 37.8971C40.9427 38.2559 40.8004 38.6 40.5466 38.8538C40.2929 39.1076 39.9488 39.2503 39.5899 39.2503H31.4718C30.9884 39.2503 30.5416 38.9921 30.2999 38.5735C30.0582 38.1549 30.0582 37.6393 30.2999 37.2207C30.5416 36.8021 30.9884 36.5443 31.4718 36.5443H39.5899C39.9487 36.5443 40.2928 36.6866 40.5466 36.9404C40.8004 37.1942 40.9427 37.5382 40.9427 37.8971Z"
                          fill="white"
                        />
                      </svg>
                    }
                    text="Easy integration with your existing tools and workflows."
                  />
                  <FeatureCard
                    icon={
                      <svg
                        width="44"
                        height="35"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 20.8386H4V15.8386L14.5858 5.25278C15.3668 4.47173 16.6332 4.47173 17.4142 5.25278L19.5858 7.42435C20.3668 8.2054 20.3668 9.47173 19.5858 10.2528L9 20.8386ZM9 20.8386H21"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    text="Enhanced productivity with centralized automation."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 7 - Ending Card */}
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

export default ProductComponent;
