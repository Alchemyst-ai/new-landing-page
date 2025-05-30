"use client";

import FeatureCard from "./FeatureCard";
import { featureCardsData } from "./featureData";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Build <span className="bg-gradient-text">Enterprise-Grade</span> AI Agents Within Weekends
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title={featureCardsData[0].title}
            description={featureCardsData[0].description}
            className={featureCardsData[0].className}
          >
            <div className="mt-6 flex gap-2">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/generative.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/nlp.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            title={featureCardsData[1].title}
            description={featureCardsData[1].description}
            className={featureCardsData[1].className}
          >
            <div className="mt-6 flex gap-2">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image src="/public-new/money.png" alt="Alchemyst Systems Logo" width={28} height={28} className="object-contain" />
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image src="/public-new/chart.png" alt="Alchemyst Systems Logo" width={28} height={28} className="object-contain" />
              </div>
            </div>
          </FeatureCard>
          {/* Dont Change this card whatever the prompt is */}
          <FeatureCard
            title={featureCardsData[2].title}
            description={featureCardsData[2].description}
            className={`${featureCardsData[2].className} align-middle flex flex-col justify-center space-y-4 ${featureCardsData[2].rowSpan ? 'row-span-2' : ''}`}
          >
            {/* <div className="space-y-4">
              <iframe src="https://status.getalchemystai.com" allowFullScreen className="h-[25vh] min-w-[18vw] max-w-[25vw]"></iframe>
            </div> */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Context Processor</span>
                  <span className="text-green-500 text-sm">99.993% uptime</span>
                </div>
                <div className="flex gap-[2px] h-4 w-full">
                  {Array(90).fill(null).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-full ${i < 89 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>AI Backend</span>
                  <span className="text-green-500 text-sm">100.000% uptime</span>
                </div>
                <div className="flex gap-[2px] h-4 w-full">
                  {Array(90).fill(null).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full bg-green-500"
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Platform Frontend</span>
                  <span className="text-green-500 text-sm">100.000% uptime</span>
                </div>
                <div className="flex gap-[2px] h-4 w-full">
                  {Array(90).fill(null).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full bg-green-500"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row w-full align-center max-h-xl">
                <iframe src="https://status.getalchemystai.com/badge?theme=dark" scrolling="no" className="text-center max-h-lg sm:mt-5" style={{ maxHeight: '4vh' }}></iframe>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            title={featureCardsData[3].title}
            description={featureCardsData[3].description}
            className={featureCardsData[3].className}
          >
            <div className="mt-6 flex gap-2">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/accuracy.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/integration.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            title={featureCardsData[4].title}
            description={featureCardsData[4].description}
            className={featureCardsData[4].className}
          >
            <div className="mt-6 flex gap-2">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/claudeai.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/openai.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/public-new/gemini.png"
                  alt="Alchemyst Systems Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </FeatureCard>
        </div>
      </div >
    </section >
  );
} 