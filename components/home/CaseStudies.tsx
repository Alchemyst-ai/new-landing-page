"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Ensure you import the CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Case Study 1',
    description: 'Helped a tech startup increase their sales by 200% in 6 months using our AI-powered outreach tools.',
    image: '/images/startup-icon.png',
  },
  {
    id: 2,
    title: 'Case Study 2',
    description: 'Streamlined the sales process for a Fortune 500 company, resulting in a 35% increase in conversion rates.',
    image: '/images/enterprise-icon.png',
  },
  {
    id: 3,
    title: 'Case Study 3',
    description: 'Enabled a small business to acquire 1000+ new customers in just 3 months through targeted AI campaigns.',
    image: '/images/smb-icon.png',
  },
  {
    id: 4,
    title: 'Case Study 4',
    description: 'Generated over 10,000 qualified leads for a B2B SaaS company using our advanced AI algorithms.',
    image: '/images/b2b-icon.png',
  },
  {
    id: 5,
    title: 'Case Study 5',
    description: 'Increased sales team productivity by 50% for a mid-sized company by automating routine tasks.',
    image: '/images/productivity-icon.png',
  },
  {
    id: 6,
    title: 'Case Study 6',
    description: 'Increased sales team productivity by 50% for a mid-sized company by automating routine tasks.',
    image: '/images/productivity-icon.png',
  },
];

const CaseStudyCard: React.FC<CaseStudy> = ({ title, description, image }) => (
  <motion.div
    className="bg-gradient-to-b from-gray-900 via-gray-900 to-black p-6 rounded-lg shadow-lg h-full mb-6 border border-gray-700"
    whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(254,152,51,255)' }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-start mb-4">
      <Image src={image} alt={title} width={30} height={30} className="rounded-full" />
      
    </div>
    <h3 className="text-xl font-bold text-gray-300">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const CaseStudies: React.FC = () => {           
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="flex flex-col w-full h-full relative px-4 py-16">
      <h1 className="flex text-4xl items-center justify-center text-gray-400 mt-16 mb-16">Case Studies</h1>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {caseStudies.map((study) => (
            <div key={study.id} className="px-2 mt-4">
              <CaseStudyCard {...study} />
            </div>
          ))}
        </Slider>
        {caseStudies.length > 3 && (
          <>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md z-10"
              onClick={goToPrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md z-10"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;

