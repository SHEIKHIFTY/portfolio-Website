'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const allProjects = [
  {
    title: "Portfolio Website",
    desc: "Next.js + Tailwind portfolio.",
    img: "/portfolio.png",
    url: "https://myportfolio.com",
  },
  {
    title: "My Coffee Shop",
    desc: "Modern e-commerce with Firebase.",
    img: "/coffee.jpg",
    url: "https://my-cafe-003.netlify.app/",
  },
  {
    title: "Movie Site",
    desc: "Auth + Markdown blog.",
    img: "/moviemania.png",
    url: "https://movie-haat.netlify.app/",
  },
];

export default function Projects() {
  // Client-only rendering
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Intersection Observer
  const [ref, inView] = useInView({
    triggerOnce: false, // animate every time you scroll into view
    threshold: 0.2,
  });

  // Container and item variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  if (!isClient) return null;

  return (
    <section className="bg-neutral-950 text-white py-20 min-h-fit">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">All Projects</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            <span className="text-white">Home</span> &gt; <span className="text-red-500">Projects</span>
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref || null}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {allProjects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="block bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500 hover:scale-105"
            >
              {/* Image container */}
              <div className="relative w-full h-60 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Project title & description */}
              <div className="p-4 bg-gray-800 transition-colors duration-300 hover:bg-red-600/30">
                <h3 className="text-xl sm:text-lg font-semibold text-center">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-2 text-center">{project.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
