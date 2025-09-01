"use client"; // ✅ required for Framer Motion

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { m } from "motion/react"; // ✅ motion
import { Typewriter } from "react-simple-typewriter";
const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-16 px-4 md:px-12 overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Abstract background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 z-10">
        <span className="text-8xl md:text-[200px] lg:text-[250px] font-extrabold text-white text-stroke-2">
          WEB DESIGNER
        </span>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left Content (animated left -> right) */}
        <m.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3, once: false }} // ✅ animates every time you scroll
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:w-1/2 p-4 md:p-8 mt-4"
        >
          <p className="text-primaryRed text-lg font-medium uppercase tracking-wider">
            HELLO
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-darkText">
                 I'm Sheikh Ifty a{" "}<br />
                
                <span className="text-red-600">
                     <Typewriter
                       words={["Web Developer.", "Designer.", "Editor."]}
                      loop={true}             // makes it repeat forever
                       cursor
                        cursorStyle="|"
                        typeSpeed={80}          // typing speed
                        deleteSpeed={50}        // deleting speed
                         delaySpeed={3000}       // wait 3s before deleting
                          />
                       </span>
                    </h1>
          <p className="text-lg text-gray-400 max-w-lg">
            A personal portfolio is a collection of my work, achievements, and
            skills that highlights my abilities and professional growth.
          </p>
          <Link href="/allproject">
            <button className="flex items-center space-x-3 px-8 py-3 bg-primaryRed text-darkText font-semibold rounded-full shadow-lg hover:bg-red-800 transition-colors duration-500">
              <span>View Projects</span>
              <FaArrowRight />
            </button>
          </Link>
        </m.div>

        {/* Right Image (animated right -> left) */}
        <m.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3, once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center"
        >
          <div className="relative w-64 h-60 md:w-100 md:h-100 lg:w-[28rem] lg:h-[28rem] rounded-full flex items-center justify-center bg-white shadow-4xl border-4 border-red">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent transition-all duration-500 ease-in-out hover:border-red-950 hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]">
              <Image
                src="/mydp.jpeg"
                alt="Sheikh Ifty - Web Developer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </m.div>
      </div>

      {/* Bottom right text */}
      <div className="absolute bottom-[-50px] right-[-50px] hidden lg:block opacity-10 z-20">
        <span className="text-8xl md:text-[180px] lg:text-[200px] font-extrabold text-white text-stroke-2">
          WEB DESIGNER
        </span>
      </div>

      <style jsx>{`
        .text-stroke-2 {
          -webkit-text-stroke: 1px white;
          -webkit-text-fill-color: transparent;
          text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Hero;
