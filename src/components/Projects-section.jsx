'use client';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const projects = [
    { title: "E-commerce site", desc: "Modern e-commerce with react, next-js, Mongodb.", img: "/e-commerce.png", url: "https://glow-and-gadgets.vercel.app/" },
    { title: "My Cafe Website", desc: "Modern Coffee shop website with react, Tailwind, firebase.", img: "/coffee.jpg", url: "https://my-cafe-003.netlify.app/" },
  ];

  const useScrollAnimation = (threshold = 0.2) => {
    return useInView({ triggerOnce: false, threshold });
  };

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

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => {
            const [ref, inView] = useScrollAnimation();

            const variants = {
              hidden: { opacity: 0, x: i % 2 === 0 ? -120 : 120 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 40, damping: 20 }, // 🔥 smoother stop
              },
            };

            return (
              <motion.a
                key={i}
                ref={ref}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                className="block bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all hover:shadow-[0_0_25px_rgba(255,99,132,0.7)] hover:bg-neutral-900/80 hover:border-red-700"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold transition-colors duration-500 hover:text-red-500">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-3">{p.desc}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/allproject"
            className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
