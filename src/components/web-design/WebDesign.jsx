'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const designs = [
  { title: 'Game UI', image: '/gameui.png', url: 'https://sheikhifty.github.io/Gaming-site/' },
  { title: 'Flower Shop UI', image: '/flower.png', url: 'https://sheikhifty.github.io/Tailwindproject/' },
  { title: 'Summer Sales UI', image: '/summersale.png', url: 'https://sheikhifty.github.io/Project-2/' },
];

const WebDesign = () => {
  // Ensure client-only rendering for SSR safety
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

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

  if (!isClient) return null; // prevent SSR crashes

  return (
    <div className="min-h-fit bg-neutral-950 text-white py-12 mt-9">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Services</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            <span className="text-white">Home</span> &gt;{' '}
            <span className="text-red-500">Web Designs</span>
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
          {designs.map((design, index) => (
            <motion.a
              key={index}
              href={design.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="block bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500 hover:scale-105"
            >
              {/* Image container with responsive height */}
              <div className="relative w-full h-60 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-t-2xl">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Title */}
              <div className="p-4 bg-gray-800 transition-colors duration-300 hover:bg-red-600/30">
                <h2 className="text-xl sm:text-lg font-semibold text-center">{design.title}</h2>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WebDesign;


