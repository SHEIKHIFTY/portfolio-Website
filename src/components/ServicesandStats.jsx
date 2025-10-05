"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Service Card Component
const ServiceCard = ({ icon, title, projects, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.2 }}
    transition={{ duration: 0.4, delay }}
  >
    <div
      href={link}
      className="flex flex-col items-center p-6 bg-surface rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:bg-red-500/20 hover:text-red-500 group"
    >
      <div className="text-4xl mb-4 transition-colors duration-300 group-hover:text-red-500">
        {/* ✅ render API icon */}
        <img src={icon} alt={title} className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-red-500">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-red-300">{projects} Projects</p>
    </div>
  </motion.div>
);

const ServicesAndStats = ({data}) => {
  const [services, setServices] = useState([]);

  // Fetch from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio"); // 👈 your API endpoint
        const data = await res.json();
        setServices(data.services || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  // Example stats
  const stats = [
    { value: 3, label: services.length, label: "Our Project Complete" },
    { value: 1, label: "Years of Experience" },
    { value: 0, label: "Clients Reviews" },
    { value: 0, label: "Our Satisfied Clients" },
  ];

  const [statsRef, statsInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <section className="bg-[#111111] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Services Grid (from API) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
         {data?.map((service, i) => (
  <ServiceCard
    key={service._id}
    icon={service.icon}
    title={service.name}
    projects={service.projects || 0} // ✅ use actual projects count
    link="/"
    delay={i * 0.15}
  />
))}

        </div>

        {/* Experience and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" ref={statsRef}>
          {/* Left: Years of Experience */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8 }}
            className="bg-surface p-8 rounded-lg shadow-lg flex flex-col justify-center min-h-[300px]"
          >
            <h2 className="text-6xl md:text-8xl font-extrabold text-red-500 leading-tight mb-4">
              {statsInView && <CountUp start={0} end={1} duration={2} />}{" "}
              <span className="block text-4xl font-semibold">Years Of</span>{" "}
              <span className="block text-4xl font-semibold">Experience</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-md">
              Business consulting consultants provide expert advice and guide businesses to improve their performance and efficiency.
            </p>
          </motion.div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-surface p-6 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-4xl font-extrabold mb-2">
                  {statsInView && <CountUp start={0} end={stat.value} duration={2} />}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesAndStats;
