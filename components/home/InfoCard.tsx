"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function InfoCard() {
  return (
    <div className="flex gap-6">
      <CardSpotlight className="h-auto w-96">
        <p className="text-xl font-bold relative z-20 mt-2 text-white">
          Sales Automation Section
        </p>
        <p className="text-gray-500 relative z-20 text-sm mt-2">
          Smarter Sales, Every Step of the Way
        </p>
        <div className="text-neutral-200 mt-4 relative z-20 ">
          <ul className="list-item mt-2">
            <li>End-to-End Automation:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Streamline your workflow with AI-driven B2B sales solutions that
              manage outreach, follow-ups, and lead qualification.
            </p>
            <li>Omni-Channel Reach:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Connect with prospects through emails, WhatsApp, Telegram, and
              more — all in one platform.
            </p>
            <li>Boost Deliverability:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Maya&apos;s email warm-up features enhance open rates and prevent
              spam issues, keeping your campaigns effective.
            </p>
          </ul>
        </div>
      </CardSpotlight>

      <CardSpotlight className="h-auto w-96">
        <p className="text-xl font-bold relative z-20 mt-2 text-white">
          B2B Data Section
        </p>
        <p className="text-gray-500 relative z-20 text-sm mt-2">
          Quality Leads, No Guesswork
        </p>
        <div className="text-neutral-200 mt-4 relative z-20">
          <ul className="list-item  mt-2">
            <li>300M+ B2B Sales Leads Database:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Tap into one of the largest repositories of business contacts,
              tailored to your ICP.
            </p>
            <li>Web Search & Personalization:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Maya combines advanced web search capabilities with AI to create a
              hyper-personalized list of prospects.
            </p>
            <li>Affordable & Accurate:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Enjoy more cost-effective solutions than traditional providers
              without sacrificing personalization.
            </p>
          </ul>
        </div>
      </CardSpotlight>

      <CardSpotlight className="h-auto w-96">
        <p className="text-xl font-bold relative z-20 mt-2 text-white">
          Security and Compliance Section
        </p>
        <p className="text-gray-500 relative z-20 text-sm mt-2">
          Built on Trust: Secure and Scalable
        </p>

        <div className="text-neutral-200 mt-4 relative z-20">
          <ul className="list-item  mt-2">
            <li>Enterprise-Grade Compliance:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Your business data is protected with SOC 2, ISO 27001, and PCI-DSS
              certifications.
            </p>
            <li>High Performance & Scalability:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Designed to handle high-volume operations while ensuring seamless
              uptime.
            </p>
            <li>Spam-Free Deliverability:</li>
            <p className="text-gray-500 pt-2 pl-4 relative pb-4">
              Achieve higher inbox placement rates and avoid spam filters with
              intelligent safeguards.
            </p>
          </ul>
        </div>
      </CardSpotlight>
    </div>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
