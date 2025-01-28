import { Check } from 'lucide-react';
import Link from 'next/link';

interface PricingCardProps {
  plan: {
    tier: string;
    originalPrice?: number;
    price: number;
    info: string[];
    features: string[];
  };
  billingCycle: "monthly" | "annually";
  country: string;
}

export default function PricingCard({ plan, billingCycle, country }: PricingCardProps) {
  // console.log('Rendering PricingCard for country:', country);
  return (
    <div className="bg-gray-900 hover:bg-orange-400 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_10px_rgba(255,165,0,0.5)] hover:border-yellow-400 hover:border-2 hover:scale-105 group h-[42rem]">
      <div className="px-6 py-8">
        <h2 className="text-5xl font-bold text-white mb-8 group-hover:text-white">
          {plan.tier}
        </h2>
        <p className="text-4xl font-bold text-white mb-6 group-hover:text-white">
          {billingCycle === "annually" ? (
            <>
              <span className="text-2xl line-through text-gray-400 mr-2">
                ${plan.originalPrice}
              </span>
              ${plan.price}
              <span className="text-xl font-normal text-gray-400 group-hover:text-white">
                /yr
              </span>
              <br />
              <span className="text-xl font-normal text-gray-400 group-hover:text-white">
                {`$${(plan.price / 12).toFixed(2)}/mo`}
              </span>
            </>
          ) : (
            `$${plan.price}`
          )}
          <span className="text-xl font-normal text-gray-400 group-hover:text-white">
            {billingCycle === "monthly" ? "/mo" : ""}
          </span>
          <span></span>
        </p>
        {plan.info.map((item, index) => (
          <p key={index} className="text-gray-400 mb-1 group-hover:text-white">
            {item}
          </p>
        ))}
        <Link href="https://calendly.com/uttaran-getalchemystai/30min" target="_blank">
          <button className="mt-8 w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-purple-600 hover:text-white transition-colors duration-300 group-hover:bg-white group-hover:text-orange-400 group-hover:hover:bg-purple-800 group-hover:hover:text-white">
            Start now
          </button>
        </Link>
      </div>

      <div className="px-6 pb-8">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-400 group-hover:text-white"
            >
              <Check className="h-5 w-5 text-green-500 group-hover:text-white mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

