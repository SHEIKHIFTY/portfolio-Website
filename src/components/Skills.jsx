"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Skills() {
  const designSkills = [
    { name: "PHOTOSHOP", level: "55%" },
    { name: "FIGMA", level: "15%" },
    { name: "ADOBE ILLUSTRATOR", level: "5%" },
  ];

  const developmentSkills = [
    { name: "HTML, CSS", level: "80%" },
    { name: "JAVASCRIPT", level: "60%" },
    { name: "REACT", level: "50%" },
  ];

  // Intersection Observer for the whole section
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="bg-black text-white py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Skills Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Design Skill */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="text-2xl font-bold mb-8">
              Design <span className="text-red-500">Skill</span>
            </h2>
            {designSkills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold">{skill.name}</span>
                  <span className="text-sm">{skill.level}</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-red-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? skill.level : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Development Skill */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="text-2xl font-bold mb-8">
              Development <span className="text-red-500">Skill</span>
            </h2>
            {developmentSkills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold">{skill.name}</span>
                  <span className="text-sm">{skill.level}</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-red-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? skill.level : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-20"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="uppercase text-red-500 text-sm font-bold tracking-widest">
            Latest Service
          </p>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-3">
            Inspiring The World One <br /> Project
          </h3>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Transforming ideas into digital reality, one line of code at a time. Designing the future. Developing the present
          </p>
        </motion.div>
      </div>
    </section>
  );
}
