"use client";

import { team } from "@/app/constants/team";
import { motion } from "framer-motion";
import GridLayout from "../GridLayout";
import TeamMemberCard from "./TeamMemberCard";

const Team: React.FC = () => {
  return (
    <section id="team">
      <motion.div
        initial={{ opacity: 0.6, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: false }}
        className="flex flex-col items-center justify-center w-[90vw] md:w-[70vw] my-20"
      >
        <h1 className="mb-10 text-4xl md:text-7xl text-center flex flex-row sm:flex-col md:flex-row">
          <b>Our Team</b>
        </h1>
        <div className="flex flex-row gap-x-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Team;
