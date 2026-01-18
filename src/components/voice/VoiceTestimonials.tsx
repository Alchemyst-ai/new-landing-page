"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote: "Their voice agents are truly impressive, delivering natural, accurate, and seamless interactions that significantly enhanced our customer engagement.",
    details: "What stood out the most was their ability to help us develop the",
    highlight1: "voice agent in Tamil,",
    midText: undefined,
    highlight2: undefined,
    endText: "tailored perfectly to our local customer base.",
    footer: "The team is highly responsive, proactive, and extremely supportive. We strongly recommend Alchemyst AI for powerful, multilingual voice AI solutions.",
    author: "Anirudh, Lanson Toyota",
    company: "Lanson Toyota",
    logo: "/voice/testimonials/toyota.png",
    logoScale: 1.0,
  },
  {
    quote: "Alchemyst AI is by far the best voice AI solution we have worked with. They competed against many leading providers during our evaluation process.",
    details: "We were highly impressed by the",
    highlight1: "exceptional quality and natural output",
    endText: "of their voice agents, which outperformed all competitors.",
    footer: "Their technical expertise and commitment to excellence made them our clear choice. We look forward to this long-standing partnership.",
    author: "VP at Unacademy",
    company: "Unacademy",
    logo: "/voice/testimonials/un.png",
    logoScale: 1.25,
    midText: undefined,
    highlight2: undefined,
  },
];

const VoiceTestimonials = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden" style={{ background: '#0d0d0f' }}>

      <div className="relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 md:mb-4">
            Testimonials
          </h2>
          <p className="text-orange-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            from Enterprise Teams
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative isolate overflow-hidden testimonial-surface rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-14 border border-border/30 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.75)] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex flex-col justify-between"
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl testimonial-pattern mix-blend-soft-light" />
              <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/4 via-transparent to-primary/10 opacity-70" />
              <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-20px_50px_rgba(0,0,0,0.35)]" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  {/* Quote Icon */}
                  <div className="mb-5 sm:mb-6 md:mb-8">
                    <svg
                      viewBox="0 0 40 30"
                      className="w-10 h-8 sm:w-12 sm:h-9 md:w-14 md:h-10 lg:w-16 lg:h-12 text-orange-400 drop-shadow-[0_6px_18px_rgba(255,148,51,0.45)]"
                      fill="currentColor"
                    >
                      <path d="M0 30V18.5C0 12.5 1.5 7.8 4.5 4.5C7.5 1.5 11.5 0 16.5 0V7C13.5 7.5 11.2 8.8 9.5 11C7.8 13.2 7 15.8 7 19H16V30H0ZM24 30V18.5C24 12.5 25.5 7.8 28.5 4.5C31.5 1.5 35.5 0 40.5 0V7C37.5 7.5 35.2 8.8 33.5 11C31.8 13.2 31 15.8 31 19H40V30H24Z" />
                    </svg>
                  </div>

                  {/* Quote Content */}
                  <div className="mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                    <p className="text-foreground/90 font-medium">
                      {testimonial.quote}
                    </p>
                    {testimonial.details && (
                      <p className="mt-4 sm:mt-5 md:mt-6 text-foreground/90 font-medium">
                        {testimonial.details}{" "}
                        <span className="font-bold text-orange-400">
                          {testimonial.highlight1}
                        </span>
                        {testimonial.midText && (
                          <>
                            {" "}{testimonial.midText}{" "}
                            <span className="font-bold text-orange-400">
                              {testimonial.highlight2}
                            </span>
                          </>
                        )}
                        {testimonial.endText && ` ${testimonial.endText}`}
                      </p>
                    )}
                    {!testimonial.details && testimonial.highlight1 && (
                      <span className="font-bold text-orange-400">
                        {" "}{testimonial.highlight1}
                      </span>
                    )}
                    {testimonial.footer && (
                      <p className="mt-4 sm:mt-5 md:mt-6 text-foreground/90 font-medium">{testimonial.footer}</p>
                    )}
                  </div>
                </div>

                {/* Author and Logo */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400">
                      {testimonial.author}
                    </p>
                  </div>
                  {testimonial.logo && (
                    <div className="flex-shrink-0 mt-6 sm:mt-8 md:mt-12">
                      <Image
                        src={testimonial.logo}
                        alt={testimonial.company}
                        width={90}
                        height={45}
                        className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        style={{ 
                          height: 'auto', 
                          width: 'clamp(50px, 15vw, 90px)',
                          maxHeight: '45px',
                          transform: `scale(${testimonial.logoScale ?? 1.0})` 
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceTestimonials;

