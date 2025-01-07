// "use client";
// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Button from "./Button";

// interface FeatureCardProps {
//   title: string;
//   description: string;
//   imageSrc: string;
//   type: "split" | "overlay" | "stacked";
//   buttonText?: string;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({
//   title,
//   description,
//   imageSrc,
//   type,
//   buttonText,
// }) => {
//   const cardContent = (
//     <>
//       <h3 className="font-bold text-white mb-4 text-2xl md:text-3xl">
//         {title}
//       </h3>
//       <div
//         className="text-gray-400 mb-6"
//         dangerouslySetInnerHTML={{ __html: description }}
//       />
//       {buttonText && (
//         <Button variant="primary" className="mb-6 max-w-52">
//           {buttonText}
//         </Button>
//       )}
//     </>
//   );

//   return (
//     <motion.div
//       className="bg-gradient-to-br from-orange-950 via-black to-orange-950 rounded-xl p-8 flex flex-col border border-gray-500 shadow-gray-600 shadow-md h-full"
//       whileHover={{ scale: 1.05 }}
//       transition={{ duration: 0.5 }}
//     >
//       {type === "split" && (
//         <div className="flex flex-col md:flex-row h-full">
//           <div className="md:w-1/2 md:pr-4 mb-6 md:mb-8">{cardContent}</div>
//           <div className="md:w-1/2 relative h-64 md:h-full">
//             <Image
//               src={imageSrc}
//               alt={title}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-md"
//             />
//           </div>
//         </div>
//       )}
//       {type === "overlay" && (
//         <div className="relative h-full">
//           <Image
//             src={imageSrc}
//             alt={title}
//             layout="fill"
//             objectFit="cover"
//             className="rounded-md"
//           />
//           <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black bg-opacity-50 rounded-lg">
//             {cardContent}
//           </div>
//         </div>
//       )}
//       {type === "stacked" && (
//         <>
//           {cardContent}
//           <div className="relative flex-grow">
//             <Image
//               src={imageSrc}
//               alt={title}
//               objectFit="cover"
//               className="rounded-xl"
//               width={500}
//               height={500}
//             />
//           </div>
//         </>
//       )}
//     </motion.div>
//   );
// };

// const Features: React.FC = () => {
//   const features = [
//     {
//       title: "Secure and Compliant Sales Tools",
//       description: `
//         <ul class="list-disc pl-5">
//           <li>Top-Notch Sales Data Security: <br /> Stay compliant with industry-leading standards, including SOC 2 and ISO 27001, while safeguarding your sales data.</li>
//           <br />
//           <li>Unparalleled Sales Platform Reliability: <br /> with 100% observability, redundancy, and no manual interference, Maya guarantees seamless sales operations every time.</li>
//         </ul>
//       `,
//       imageSrc: "/media/sandcsalestools.png",
//       type: "split" as const,
//     },
//     {
//       title: "Why Choose Alchemyst.ai?",
//       description: `
//         <ul class="list-disc pl-5">
//           <li>Increase B2B lead generation efficiency.</li>
//           <li>Enhance sales automation with AI.</li>
//           <li>Achieve secure, compliant, and reliable results.</li>
//         </ul>
//       `,
//       imageSrc: "/media/whyalchemyst.png",
//       type: "overlay" as const,
//     },
//     {
//       title: "AI-Powered Lead Generation & Personalized Outreach",
//       description: `
//         <ul class="list-disc pl-5">
//           <li>Find the Best B2B Sales Leads Instantly: <br /> Leverage Alchemyst's AI for lead generation and access a database of over 300M+ B2B leads to identify perfect prospects faster.</li>
//           <br />
//           <li>Personalized Sales Automation for Higher Engagement: <br /> Say goodbye to low-response outreach! Alchemyst.ai uses AI-driven sales automation to create tailored campaigns that boost engagement and conversions.</li>
//         </ul>
//       `,
//       imageSrc: "/media/ledgenandpersonal.png",
//       type: "stacked" as const,
//       buttonText: "Explore All Features",
//     },
//   ];

//   return (
//     <section className="w-full py-16 px-4 md:px-8">
//       <div className="container mx-auto">
//         <h2 className="text-4xl font-bold text-gray-400 mb-20 text-center">
//           Features
//         </h2>
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="w-full md:w-1/2 flex flex-col gap-8">
//             <FeatureCard {...features[0]} />
//             <FeatureCard {...features[1]} />
//           </div>
//           <div className="w-full md:w-1/2">
//             <FeatureCard {...features[2]} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;




// // "use client";
// // import React from "react";
// // import Image from "next/image";
// // import { motion } from "framer-motion";

// // interface FeatureCardProps {
// //   title: string;
// //   description: string;
// //   imageSrc: string;
// //   isLarge?: boolean;
// // }

// // const FeatureCard: React.FC<FeatureCardProps> = ({
// //   title,
// //   description,
// //   imageSrc,
// //   isLarge = false,
// // }) => {
// //   return (
// //     <motion.div
// //       className={`bg-gradient-to-br from-black via-black to-teal-950 rounded-lg p-6 flex flex-col border border-gray-700 ${
// //         isLarge ? "h-full" : ""
// //       }`}
// //       whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(4,44,43,255)" }}
// //       transition={{ duration: 0.3 }}
// //     >
// //       <h3
// //         className={`font-bold text-white mb-4 ${
// //           isLarge ? "text-3xl" : "text-2xl"
// //         }`}
// //       >
// //         {title}
// //       </h3>
// //       <p
// //         className={`text-gray-500 mb-6 flex-grow ${
// //           isLarge ? "text-lg" : "text-base"
// //         }`}
// //       >
// //         {description}
// //       </p>
// //       <div className={`relative w-full ${isLarge ? "h-96" : "h-14"}`}>
// //         <Image
// //           src={imageSrc}
// //           alt={title}
// //           layout="fill"
          
// //           className="rounded-md"
// //         />
// //       </div>
// //     </motion.div>
// //   );
// // };

// // const Features: React.FC = () => {
// //   const features = [
// //     {
// //       title: "AI-Powered Insights",
// //       description:
// //         "Leverage cutting-edge AI to gain deep insights into your customer base and market trends.",
// //       imageSrc: "/media/sandcsalestools.png",
// //     },
// //     {
// //       title: "Automated Outreach",
// //       description:
// //         "Streamline your sales process with intelligent automation tools designed for maximum efficiency.",
// //       imageSrc: "/images/automated-outreach.jpg",
// //     },
// //     {
// //       title: "AI-Powered Lead Generation & Personalized Outreach",
// //       description:
// //         "Find the Best B2B Sales Leads Instantly: Leverage Alchemyst AI for lead generation and access a database of over 300M+ B2B leads to identify perfect prospects faster. Personalized Sales Automation for Higher Engagement: Say goodbye to low-response outreach! Alchemyst.ai uses AI-driven sales automation to create tailored campaigns that boost engagement and conversions.",
// //       imageSrc: "/media/ledgenandpersonal.png",
// //     },
// //   ];

// //   return (
// //     <div className="w-full py-16">
// //       <div className="max-w-6xl mx-auto px-4">
// //         <h2 className="text-4xl font-bold text-gray-400 mb-12 text-center">
// //           Features
// //         </h2>
// //         <div className="grid md:grid-cols-2 gap-8">
// //           <div className="space-y-8">
// //             <FeatureCard {...features[0]} />
// //             <FeatureCard {...features[1]} />
// //           </div>
// //           <div className="md:row-span-2">
// //             <FeatureCard {...features[2]} isLarge={true} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Features;
