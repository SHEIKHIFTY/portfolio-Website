"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function Education() {

  const [experienceData, setExperienceData] = useState([]);


  // Fetch Experience from backend
  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperienceData(data);
    } catch (err) {
      console.error("Error fetching experience:", err);
    }
  };

  useEffect(() => {
  
    fetchExperience();
  }, []);

  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [eduRef, eduInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [expRef, expInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const headerVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const leftVariants = { hidden: { opacity: 0, x: "-100vw" }, visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.1, ease: "easeOut", delay: i * 0.2 } }) };
  const rightVariants = { hidden: { opacity: 0, x: "100vw" }, visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.1, ease: "easeOut", delay: i * 0.2 } }) };
  const textVariants = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  const imageVariants = { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <section className="bg-black text-white py-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

       
        

        {/* Experience Section */}
        <div className="mb-20" ref={expRef}>
          <h3 className="text-2xl font-bold mb-8 relative inline-block">
            Experiences <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gray-600"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp._id}
                custom={index}
                variants={index % 2 === 0 ? leftVariants : rightVariants}
                initial="hidden"
                animate={expInView ? "visible" : "hidden"}
                className="bg-neutral-900 rounded-2xl p-6 shadow-lg border border-transparent transition-all duration-700 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500"
              >
                <h4 className="font-semibold text-red-500">{exp.title}</h4>
                <p className="text-white/80 font-medium">{exp.company} • {exp.year}</p>
                <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
