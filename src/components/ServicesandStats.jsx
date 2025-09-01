"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaLaptopCode, FaCube, FaLightbulb, FaEnvelopeOpenText } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Service Card Component
const ServiceCard = ({ icon: Icon, title, projects, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.2,  }}
    transition={{ duration: 0.4, delay }}
  >
    <Link
      href={link}
      className="flex flex-col items-center p-6 bg-surface rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:bg-red-500/20 hover:text-red-500 group"
    >
      <div className="text-4xl text-foreground mb-4 transition-colors duration-300 group-hover:text-red-500">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground transition-colors duration-300 group-hover:text-red-500">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-red-300">{projects} Projects</p>
    </Link>
  </motion.div>
);

const ServicesAndStats = () => {
  const services = [
    { icon: FaLaptopCode, title: "Web Design", projects: "3", link: "/services" },
    { icon: FaCube, title: "UI/UX Design", projects: "3", link: "/services" },
    { icon: FaLightbulb, title: "Website", projects: "3", link: "/allproject" },
    { icon: FaEnvelopeOpenText, title: "Research", projects: "0", link: "/" },
  ];

  const stats = [
    { value: 3, label: "Our Project Complete" },
    { value: 3, label: "Our Natural Products" },
    { value: 0, label: "Clients Reviews" },
    { value: 0, label: "Our Satisfied Clients" },
  ];

  // One observer for the stats section
  const [statsRef, statsInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <section className="bg-[#111111] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              projects={service.projects}
              link={service.link}
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
              <span className="block text-4xl text-foreground font-semibold">Years Of</span>{" "}
              <span className="block text-4xl text-foreground font-semibold">Experience</span>
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
                <h3 className="text-4xl font-extrabold text-foreground mb-2">
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

