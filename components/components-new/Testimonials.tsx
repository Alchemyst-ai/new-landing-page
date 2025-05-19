"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Dominic Steil",
    username: "@domsteil",
    body: "Integrating Alchemyst AI was incredibly easy and immediately enhanced the memory of our Agents. It has simplified the way we reason about personalization and the time to value is excellent.",
    img: "https://avatar.vercel.sh/dominic",
  },
  {
    name: "Lior",
    username: "@AlphaSignalAI",
    body: "It's a new memory layer for LLMs that allows you to directly add, update, and search memories in your models. It's crucial for AI systems that require persistent context, like customer support and personalized recommendations.",
    img: "https://avatar.vercel.sh/lior",
  },
  {
    name: "Ali Madad",
    username: "@amadad",
    body: "@alchemystai is fantastic! The integration was seamless and our AI responses are now much more contextual and personalized.",
    img: "https://avatar.vercel.sh/ali",
  },
  {
    name: "Sarah Chen",
    username: "@sarahdev",
    body: "We reduced our LLM costs by 75% while improving response quality. Alchemyst AI's memory layer is a game-changer for our production systems.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Michael Rodriguez",
    username: "@mrodriguez",
    body: "The ability to maintain context across sessions has transformed our customer support experience. Our users are much happier with the personalized interactions.",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Emma Wilson",
    username: "@emmawilson",
    body: "As a developer, I appreciate how easy it was to implement Alchemyst AI into our existing stack. The documentation is clear and the API is intuitive.",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "David Park",
    username: "@dpark",
    body: "The memory persistence across conversations is incredible. Our customers feel like they're talking to someone who truly knows them, not just an AI.",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Jessica Lee",
    username: "@jlee",
    body: "Alchemyst AI has been a game-changer for our customer support team. The context retention has reduced our resolution times by over 40%.",
    img: "https://avatar.vercel.sh/jessica",
  }
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <div className="bg-[#0f1419] rounded-xl p-6 w-full h-full flex flex-col min-w-[320px] mx-3">
      <div className="flex items-center gap-3 mb-4">
        <Image 
          src={img} 
          alt={name} 
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{username}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
    </div>
  );
};

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        // Reset scroll position to start when reaching the end
        scrollContainer.scrollLeft = 0;
      } else {
        // Scroll by 1px every 30ms for smooth scrolling
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            What Our Users Are Saying
          </h2>
          <p className="text-center text-gray-400 max-w-3xl leading-relaxed">
            Discover how Alchemyst AI is transforming AI app development across industries. 
            Our users share their experiences of enhanced performance, reduced costs, and improved user satisfaction.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide py-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  username={review.username}
                  body={review.body}
                  img={review.img}
                />
              ))}
              {/* Duplicate the first few cards to create a seamless loop effect */}
              {reviews.slice(0, 3).map((review, index) => (
                <ReviewCard
                  key={`duplicate-${index}`}
                  name={review.name}
                  username={review.username}
                  body={review.body}
                  img={review.img}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
} 