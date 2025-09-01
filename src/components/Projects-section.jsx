"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const projects = [
    { title: "Portfolio Website", desc: "Next.js + Tailwind portfolio.", img: "/portfolio.png", url: "https://myportfolio.com" },
    { title: "My Coffee Shop", desc: "Modern e-commerce with Firebase.", img: "/coffee.jpg", url: "https://my-cafe-003.netlify.app/" },
  ];

  const [viewAllRef, viewAllInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="uppercase text-red-500 text-sm font-bold tracking-widest">
            My Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Some Highlighted Works
          </h2>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => {
            const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
            return (
              <motion.a
                key={i}
                ref={ref}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="block bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all hover:shadow-[0_0_25px_rgba(255,99,132,0.7)] hover:bg-neutral-900/80 hover:border-red-700"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold transition-colors duration-500 ease-in-out hover:text-red-500">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-3">{p.desc}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          ref={viewAllRef}
          initial={{ opacity: 0, y: 50 }}
          animate={viewAllInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-center mt-12"
        >
          <Link
            href="/allproject"
            className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            View All
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
