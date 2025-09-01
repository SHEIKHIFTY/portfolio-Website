'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const designs = [
  { title: 'Game UI', image: '/gameui.png', url: 'https://sheikhifty.github.io/Gaming-site/' },
  { title: 'Flower Shop UI', image: '/flower.png', url: 'https://sheikhifty.github.io/Tailwindproject/' },
  { title: 'Summer Sales UI', image: '/summersale.png', url: 'https://sheikhifty.github.io/Project-2/' },
];

const WebDesign = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // One hook for the grid
  const [gridRef, gridInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  if (!isClient) return null;

  return (
    <div className="min-h-fit bg-neutral-950 text-white py-12 mt-9">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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
          ref={gridRef}
          initial={{ opacity: 0, x: -150 }}
          animate={gridInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }} // ✅ smooth slide-in
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {designs.map((design, index) => (
            <a
              key={index}
              href={design.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500 hover:scale-105"
            >
              {/* Image container */}
              <div className="relative w-full h-60 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-t-2xl">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Title */}
              <div className="p-4 bg-gray-800 transition-colors duration-300 hover:bg-red-600/30">
                <h2 className="text-xl sm:text-lg font-semibold text-center">
                  {design.title}
                </h2>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WebDesign;



