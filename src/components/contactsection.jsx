'use client';
import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contactCards = [
  {
    id: 1,
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: "Address",
    desc: "Gawair, Mazibari, Dhakshinkhan Dhaka-1230",
    link: "https://www.google.com/maps/place/SKY+Tower/@23.860784,90.4202417,19z/data=!4m10!1m2!2m1!1sgawair+Mazibari+sky+tower!3m6!1s0x3755c5ed8cbd3bbf:0xba284e5a3488b47b!8m2!3d23.8607917!4d90.4202475!15sChlnYXdhaXIgTWF6aWJhcmkgc2t5IHRvd2VykgEMaG9tZV9idWlsZGVyqgFREAEqDSIJc2t5IHRvd2VyKAAyHxABIhsPKMvWTLPtOsb757JO8nKYch4fIGurhXxpFl4yHRACIhlnYXdhaXIgbWF6aWJhcmkgc2t5IHRvd2Vy4AEA!16s%2Fg%2F11l1p3l_wf?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: 2,
    icon: <FaEnvelope className="text-3xl" />,
    title: "E-Mail",
    desc: "sheikhiftekhar003@gmail.com",
    link: "mailto:sheikhiftekhar003@gmail.com",
  },
  {
    id: 3,
    icon: <FaPhoneAlt className="text-3xl" />,
    title: "Call Me",
    desc: "01924388916",
    link: "tel:+8801924388916",
  },
];

const ContactSection = () => {
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
      transition: { duration: 0.2, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  return (
    <div className="bg-neutral-950 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-center mb-8 mt-12"
        >
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="text-gray-400 mt-2 mb-6">
            <span className="text-white">Home</span> &gt; <span className="text-red-500">Contact</span>
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9"
        >
          {contactCards.map((card) => {
            const content = (
              <>
                <div className="flex justify-center items-center mb-4 mt-2 ">
                  <div className="p-4 rounded-full bg-red-800/20 text-red-500">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{card.title}</h3>
                <p className="text-gray-400 text-center">{card.desc}</p>
              </>
            );

            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className="block bg-neutral-800 rounded-2xl overflow-hidden shadow-lg border border-transparent transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-500 hover:scale-105"
              >
                {card.link ? (
                  <a href={card.link} className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
