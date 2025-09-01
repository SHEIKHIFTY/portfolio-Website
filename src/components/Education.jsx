"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Education() {
  const educationData = [
    { title: "SSC", year: "2017-2018", desc: "I achieved a GPA of 4.56 out of 5.00 in the Science group from Kanchkura High School." },
    { title: "HSC", year: "2019-2020", desc: "I achieved a GPA of 4.92 out of 5.00 in the Science group from Nawab Habibullah Model School and College." },
    { title: "BSC in Computer Science and Engineering", year: "2021-2025", desc: "My CGPA was 3.52 out of 4.00 from the World University of Bangladesh." },
    { title: "MSC in Computer Science and Engineering", year: "NOT YET", desc: "NOT YET" },
  ];

  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [eduRef, eduInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [expRef, expInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, 
  };

  const leftVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.1, ease: "easeOut", delay: i * 0.2 } }),
  };

  const rightVariants = {
    hidden: { opacity: 0, x: "100vw" },
    visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.1, ease: "easeOut", delay: i * 0.2 } }),
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="uppercase text-red-500 text-sm font-bold tracking-widest">Education & Experience</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">Empowering Creativity <br /> through</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My education and experience, highlighting my commitment to excellence and adaptability, tailored to meet each client’s unique needs
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 relative inline-block">
            Education <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gray-600"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={eduRef}>
            {educationData.map((edu, index) => {
              const isLeft = index < 2;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={isLeft ? leftVariants : rightVariants}
                  initial="hidden"
                  animate={eduInView ? "visible" : "hidden"}
                  className="bg-neutral-900 rounded-2xl p-6 shadow-lg border border-transparent transition-all duration-700 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500"
                >
                  <h4 className="font-semibold transition-colors duration-500 ease-in-out hover:text-red-400">
                    {edu.title} <br />
                    <span className="text-red-500">{edu.year}</span>
                  </h4>
                  <p className="text-gray-400 text-sm mt-3">{edu.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Experience Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" ref={expRef}>
          {/* Left Text */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={expInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold mb-8 relative inline-block">
              Experiences <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gray-600"></span>
            </h3>
            <div className="space-y-10">
              <p className="uppercase text-red-500 text-sm font-bold">Experience</p>
              <h4 className="font-semibold mt-2">
                Singularity Limited <br />
                <span className="text-white/80">Internship in Frontend Development</span>
              </h4>
              <p className="text-gray-400 text-sm mt-3">
                I worked as a frontend developer for 4 months at Singularity Limited as an intern, where I gained valuable experience in web development and user interface design.
              </p>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={expInView ? "visible" : "hidden"}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img src="/webdev.jpg" alt="Experience" className="w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
