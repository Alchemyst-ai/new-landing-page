// import { motion } from "framer-motion";

// interface DashboardToggleProps {
//   mode: "copilot" | "autopilot";
//   setMode: (mode: "copilot" | "autopilot") => void;
// }

// export default function DashboardToggle({
//   mode,
//   setMode,
// }: DashboardToggleProps) {
//   return (
//     <div className="flex justify-center my-8">
//       <div className="relative inline-flex bg-gray-900 rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] border border-orange-400">
//         {["copilot", "autopilot"].map((option) => (
//           <button
//             key={option}
//             className={`relative z-10 px-8 py-3 text-sm font-medium rounded-full focus:outline-none transition-colors duration-200 ${
//               mode === option ? "text-gray-900" : "text-white"
//             }`}
//             onClick={() => setMode(option as "copilot" | "autopilot")}
//           >
//             As {option.charAt(0).toUpperCase() + option.slice(1)}
//           </button>
//         ))}
//         <motion.div
//           className="absolute top-1 bottom-1 rounded-full bg-orange-400"
//           layout
//           transition={{ type: "spring", stiffness: 700, damping: 25 }}
//           style={{
//             width: `${100 / 2 - 3}%`,
//             left: `${(["copilot", "autopilot"].indexOf(mode) * 100) / 2 + 2}%`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

interface DashboardToggleProps {
  mode: "copilot" | "autopilot";
  setMode: React.Dispatch<React.SetStateAction<"copilot" | "autopilot">>;
}

const DashboardToggle: React.FC<DashboardToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center my-8">
      <div className="relative inline-flex bg-gray-900 rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] border border-orange-400">
        {["copilot", "autopilot"].map((option) => (
          <button
            key={option}
            className={`relative z-10 px-8 py-3 text-sm font-medium rounded-full focus:outline-none transition-colors duration-200 ${
              mode === option ? "text-gray-900" : "text-white"
            }`}
            onClick={() => setMode(option as "copilot" | "autopilot")}
          >
            As {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-orange-400"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 25 }}
          style={{
            width: `${100 / 2 - 3}%`,
            left: `${(["copilot", "autopilot"].indexOf(mode) * 100) / 2 + 2}%`,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardToggle;

