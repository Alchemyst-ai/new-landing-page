"use client";

import { useState } from "react";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import CaseStudyModal from "@/components/case-studies/CaseStudyModal";
import Link from "next/link";
import Button from "@/components/home/Button";
import Newsletter from "@/components/home/Newsletter";
import EndingCard from "../home/EndingCard";

const caseStudies = [
  {
    id: 1,
    title:
      "Case Study: Scaling Educator Onboarding and Driving ₹8 Lakh+ Revenue for Forethought India",
    image: "/case-study/forethought.svg",
    imagePosition: "left" as const,
    customerUrl: "https://www.forethought.co.in/",
    content: `
    <i>
        <div>"This has helped me scale our operations and will continue to do so for the next 6 months. We're expecting this model to become even more structured and refined in the coming months." <strong>- Bhartesh Bhasker, Founder of Forethought India</strong></div>
    </i>
    <br/>
    <br/>
    <h2><b>Company Overview</b></h2>
    <p>Forethought India is a global Ed-Tech leader offering personalized 1-on-1 research and project programs through top-tier educators. They connect students with professors and scientists from prestigious universities such as Harvard, MIT, Oxford, and Stanford.</p>
    <br/>
    <br/>
    <h2><b>The Challenge</b></h2>
    <p>Before leveraging AI-driven automation, Forethought India struggled to efficiently identify, engage, and convert top-tier educators. Sourcing professors and scientists from elite institutions was a slow, manual process, taking months to onboard each educator. The challenge was to find Associate Professors, Assistant Professors, and Principal Scientists with a $200/hour teaching rate — a highly specific, demanding task.</p>
    <br/>
    <br/>
    <h2><b>The Solution: AI-Powered Automation</b></h2>
    <br/>
    <h3><b>Lead Generation Optimization</b></h3>
    <ul>
        <li>AI-enabled automation reduced lead identification from weeks to just 5-6 days.</li>
        <li>Quickly sourced professors and scientists from top universities, meeting the required qualification criteria.</li>
        <li>The platform identified, sourced, and reached out to 100+ qualified leads within the first week of implementation.</li>
    </ul>
    <br/>
    <h3><b>Automated Email Outreach and Negotiation</b></h3>
    <ul>
        <li>The AI model trained on Forethought's Brochures and DocX content automated multiple email follow-ups and built negotiations seamlessly.</li>
        <li>Reduced onboarding time from weeks to just days, improving response rates and conversion speeds.</li>
        <li>The system sent out 300+ emails across different outreach campaigns in just the first week.</li>
        <li>High conversion rate from email discussions to virtual meetings due to personalized and consistent communication.</li>
    </ul>
    <br/>
    <h3><b>Seamless Conversion to Virtual Meetings</b></h3>
    <ul>
        <li>AI powered personalized scheduling with a Calendly integration, booking virtual meetings with educators automatically.</li>
        <li>The AI booked 73 virtual meetings with educators, leading to successful sign-ups within just 3 weeks.</li>
        <li>90% of the meetings led to successful conversions, showcasing the high effectiveness of the process.</li>
    </ul>
    <br/>
    <br/>
    <h2><b>The Results</b></h2>
    <ul>
        <li><strong>Revenue Generated:</strong> Forethought India achieved ₹8 Lakh+ in revenue from the newly onboarded educators.</li>
        <li><strong>Educators Onboarded:</strong> Successfully onboarded 73 educators in just 3 weeks, reducing onboarding time from months to days.</li>
        <li><strong>Courses Launched:</strong> The new educators contributed to the creation of 400+ 1-on-1 courses, expanding their offerings significantly.</li>
        <li><strong>Time Savings:</strong> The AI-powered system saved ~30+ hours per week that would have otherwise been spent on manual tasks.</li>
    </ul>
    <br/>
    <br/>
    <h2><b>Testimonial</b></h2>
    <i>
        <div>"This AI-powered approach has been a game-changer for us. We onboarded 73 educators in just 3 weeks, generated ₹8 Lakh+ in revenue, and listed 400+ courses. This kind of scale and speed was previously unimaginable." <strong>- Bhartesh Bhasker, Founder, Forethought India Pvt. Ltd.</strong></div>
    </i>
    <br/>
    <br/>
    <h2>Conclusion</h2>
    <p>By integrating AI-powered automation, Forethought India streamlined its lead generation, automated email outreach, and accelerated educator onboarding. In just 3 weeks, they successfully onboarded 73 educators, driving ₹8 Lakh+ in revenue and expanding their program offerings by 400+ courses. The AI solution significantly cut down manual labor, enhanced lead conversions, and enabled efficient scaling of their Ed-Tech programs.</p>
    `,
  },
  {
    id: 2,
    title:
      "Case Study: Chainrisk - Transforming Web3 Outreach and Onboarding with Alchemyst AI",
    image: "/case-study/chainrisk.svg",
    imagePosition: "right" as const,
    customerUrl: "https://www.chainrisk.xyz/",
    content: `
    <i>
    <div>"Alchemyst AI has been a game-changer for us. Their platform helped us onboard our first two clients—Compound and Angle Protocol—generating $55k in revenue in just a few months. The AI-driven automation has not only streamlined our outreach but also validated our product in the market." <strong>- Arka Datta, Co-Founder & CPO of Chainrisk</strong></div>
    </i>
    <br/>
    <br/>
    <h2><b>Company Overview</b></h2>
    <p>Chainrisk is the world's first full-stack, chain-agnostic risk management company tailored for DeFi protocols. Backed by Antler and Momentum6, Chainrisk partners with top DeFi protocols like Compound, Angle, and Gyroscope, providing end-to-end economic risk management and dynamic parameter recommendations.</p>
    <br/>
    <br/>
    <h2><b>The Challenge</b></h2>
    <p>Building a global Web3 company from the ground up in the ideation phase was a challenge, especially when it came to outreach. With limited local presence in India, reaching DeFi protocols across Europe, Dubai, and the US proved to be time-consuming and inefficient. Chainrisk needed a way to quickly identify and engage with protocols worldwide to validate their market offering.</p>
    <br/>
    <br/>
    <h2><b>The Solution: Alchemyst AI's Outreach Automation</b></h2>
    <br/>
    <h3><b>Automated Lead Generation & Outreach</b></h3>
    <ul>
        <li>Alchemyst&apos;s AI-driven platform enabled automated prospecting to 25 DeFi protocols across Europe and Dubai.</li>
        <li>This reduced lead identification time from weeks to just days, driving faster market entry and validation.</li>
        <li>The platform helped identify high-quality leads, saving ~20 hours per week in manual research.</li>
    </ul>
    <br/>
    <h3><b>Personalized Email Outreach & Follow-Ups</b></h3>
    <ul>
        <li>Automated, personalized email campaigns helped establish meaningful communication with prospects, followed by regular automated follow-ups.</li>
        <li>The AI-generated emails were crafted to engage recipients, leading to higher response rates and faster conversions.</li>
        <li>Chainrisk successfully scheduled video calls with key stakeholders from top DeFi protocols, ensuring deeper engagement.</li>
    </ul>
    <br/>
    <h3><b>Successful Client Acquisition & Revenue Generation</b></h3>
    <ul>
        <li>Through AI-powered outreach, Chainrisk onboarded their first two clients—Compound and Angle Protocol—in under two months.</li>
        <li>These two clients generated $55k in revenue, proving the platform's effectiveness in driving conversions.</li>
    </ul>
    <br/>
    <br/>
    <h2><b>The Results</b></h2>
    <ul>
        <li><strong>Protocols Engaged:</strong> Reached out to 25 DeFi protocols across Europe, Dubai, and beyond, within 1.5 months.</li>
        <li><strong>Revenue Generated:</strong> $55k in revenue from the onboarding of Compound and Angle Protocol.</li>
        <li><strong>Time Savings:</strong> ~20 hours per week saved by automating lead generation and follow-up tasks.</li>
        <li><strong>Validated Market Demand:</strong> Helped validate the Chainrisk product with key DeFi players, accelerating the go-to-market strategy.</li>
    </ul>
    <br/>
    <br/>
    <h2><b>Testimonial</b></h2>
    <i>
        <div>"We&apos;ve seen a significant improvement in our outreach with Alchemyst AI. The ability to send automated personalized emails with follow-ups has streamlined our sales process. We onboarded Compound and Angle Protocol as our first clients, generating $55k in revenue. I&apos;m excited to see how Maya&apos;s integration with Telegram will further boost our sales efforts, as Web3 thrives on platforms like Twitter and Telegram." <strong>- Arka Datta, Co-Founder & CPO, Chainrisk</strong></div>
    </i>
    <br/>
    <br/>
    <h2><b>Conclusion</b></h2>
    <p>Alchemyst AI transformed Chainrisk&apos;s outreach and onboarding processes, enabling them to connect with 25 DeFi protocols in just 1.5 months. By automating lead generation and email outreach, Chainrisk saved significant time, secured valuable partnerships, and generated $55k in revenue from their first clients. This AI-driven approach validated their product in the market and positioned Chainrisk for future growth in the Web3 space.</p>
`,
  },
];

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<
    (typeof caseStudies)[0] | null
  >(null);

  return (
    <div>
      <div className="container mx-auto px-4 py-16 mt-32">
        <h2 className="text-7xl font-bold text-center mb-4">Case Studies</h2>
        <p className="text-xl text-center text-gray-300 mb-12">
          Your Gateway to Insights, Trends, and Stories from Alchemyst AI.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-8 mb-44">
          <div className="flex items-center space-x-4">
            <Link
              href="https://calendly.com/uttaran-getalchemystai/30min"
              target="_blank"
            >
              <Button variant="primary">Meet Your AI Employee</Button>
            </Link>

            <Link
              href="https://www.youtube.com/watch?v=m7qiEo9AXT8"
              target="_blank"
            >
              <Button
                variant="secondary"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0V11.25"
                    />
                  </svg>
                }
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-4xl font-bold mb-16 text-center text-white">
          Browse All Studies
        </p>
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              {...study}
              onVisitStudy={() => setSelectedStudy(study)}
            />
          ))}
        </div>
        {selectedStudy && (
          <CaseStudyModal
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </div>
      <div>
        <Newsletter />
      </div>
      <div>
        <EndingCard />
      </div>
    </div>
  );
}
