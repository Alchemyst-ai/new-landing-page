import { motion } from "framer-motion";

interface PricingToggleProps {
  billingCycle: "monthly" | "annually" | "custom";
  setBillingCycle: (cycle: "monthly" | "annually" | "custom") => void;
}

export default function PricingToggle({
  billingCycle,
  setBillingCycle,
}: PricingToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex bg-gray-900 p-1 rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] border border-orange-400">
        {["monthly", "annually", "custom"].map((cycle) => (
          <button
            key={cycle}
            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full focus:outline-none transition-colors duration-200 ${
              billingCycle === cycle ? "text-gray-900" : "text-white"
            }`}
            onClick={() => setBillingCycle(cycle as "monthly" | "annually" | "custom")}
          >
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
          </button>
        ))}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-orange-400"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{
            width: `${100 / 3 - 4}%`,
            left: `${(["monthly", "annually", "custom"].indexOf(billingCycle) * 100) / 3 + 2}%`,
          }}
        />
      </div>
    </div>
  );
}

