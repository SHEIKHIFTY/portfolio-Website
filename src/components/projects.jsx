"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


export default function Projects() {
  const [isClient, setIsClient] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const [gridRef, gridInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (!isClient) return null;

  return (
    <section className="bg-neutral-950 text-white py-20 min-h-fit">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">All Projects</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            <span className="text-white">Home</span> &gt;{" "}
            <span className="text-red-500">Projects</span>
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.a
                key={project._id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="block bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500 hover:scale-105"
              >
                {/* Image */}
                <div className="relative w-full h-60 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-t-2xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="p-4 bg-gray-800 transition-colors duration-300 hover:bg-red-600/30">
                  <h3 className="text-xl sm:text-lg font-semibold text-center">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 text-center">
                    {project.service}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 text-center">
                    {project.technology?.join(", ")}
                  </p>
                </div>
              </motion.a>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No projects found.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
