import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TrustedBySection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        // Increase scroll speed
        carouselRef.current.scrollLeft += 1;
        
        // Check if we've scrolled past half the total width
        const { scrollLeft, scrollWidth } = carouselRef.current;
        if (scrollLeft >= scrollWidth / 2) {
          // Reset scroll to create infinite effect
          carouselRef.current.scrollLeft = 0;
        }
      }
    };
    
    // Start the animation
    const intervalId = setInterval(scrollCarousel, 20);
    
    return () => clearInterval(intervalId);
  }, []);

  // Array of image sources from the trusted folder with scaling
  const images = [
    { src: '/trusted/AFT.png', scale: -0.5 },
    { src: '/trusted/chainrisk.png', scale: 1 },
    { src: '/trusted/hyundai.png', scale: 0.9 },
    { src: '/trusted/kotak.png', scale: 0.7 },
    { src: '/trusted/kuberns.png', scale: 0.5 },
    { src: '/trusted/toyota.png', scale: 0.85 },
  ];

  // Duplicate images to create infinite scroll effect
  const duplicatedImages = [...images, ...images];

  return (
    <div className="mt-16 animate-fade-in-up">
      <p className="text-lg text-gray-300 uppercase tracking-wider mb-8 font-medium text-center">Trusted by Developers from</p>
      
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex gap-16 md:gap-20 overflow-x-auto scrollbar-hide py-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {/* Duplicated images for infinite scroll */}
          {duplicatedImages.map((image, index) => (
            <div key={`img-${index}`} className="flex-shrink-0 flex items-center justify-center w-52 h-28">
              <div className="w-full h-full flex items-center justify-center p-4">
                <Image 
                  src={image.src} 
                  alt={`Trusted partner ${(index % images.length) + 1}`} 
                  width={180 * Math.abs(image.scale)}
                  height={90 * (image.scale < 0 ? Math.abs(image.scale) : image.scale)}
                  className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for fade effect */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </div>
  );
};

export default TrustedBySection; 