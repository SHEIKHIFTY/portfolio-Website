"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Skills({ data }) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Split by category
  const designSkills = data?.filter((s) => s.category === "design") || [];
  const developmentSkills =
    data?.filter((s) => s.category === "development") || [];

  return (
    <section className="bg-black text-white py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Design Skills */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-bold mb-8">
            Design <span className="text-red-500">Skills</span>
          </h2>
          {designSkills.map((skill) => (
            <div key={skill._id} className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">{skill.name}</span>
                <span className="text-sm">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-red-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Development Skills */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-bold mb-8">
            Development <span className="text-red-500">Skills</span>
          </h2>
          {developmentSkills.map((skill) => (
            <div key={skill._id} className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">{skill.name}</span>
                <span className="text-sm">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-red-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
