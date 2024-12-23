import { motion } from "framer-motion";

interface PricingToggleProps {
  billingCycle: "monthly" | "annually" | "topup";
  setBillingCycle: (cycle: "monthly" | "annually" | "topup") => void;
}

export default function PricingToggle({
  billingCycle,
  setBillingCycle,
}: PricingToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex bg-gray-900 rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] border border-orange-400">
        {["monthly", "annually", "topup"].map((cycle) => (
          <button
            key={cycle}
            className={`relative z-10 px-10 py-3 text-sm font-medium rounded-full focus:outline-none transition-colors duration-200 ${
              billingCycle === cycle ? "text-gray-900" : "text-white"
            }`}
            onClick={() =>
              setBillingCycle(cycle as "monthly" | "annually" | "topup")
            }
          >
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
          </button>
        ))}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-orange-400"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 25 }}
          style={{
            width: `${100 / 3 - 3}%`,
            left: `${
              (["monthly", "annually", "topup"].indexOf(billingCycle) * 100 / 3 + 2)}%`,
          }}
        />
      </div>
    </div>
  );
}
