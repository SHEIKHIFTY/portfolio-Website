"use client"; // ✅ required for Framer Motion

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { m } from "motion/react"; // ✅ motion
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useRef } from "react";

const Hero = ({data ={}}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    const STAR_COUNT = 100;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha > 1 || star.alpha < 0) star.delta = -star.delta;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

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

      {/* Star Canvas (top layer of background) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 z-20">
        <span className="text-8xl md:text-[200px] lg:text-[250px] font-extrabold text-white text-stroke-2">
          WEB DESIGNER
        </span>
      </div>

      {/* Content */}
      <div className="relative z-40 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left Content (animated left -> right) */}
        <m.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3, once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:w-1/2 p-4 md:p-8 mt-4"
        >
          <p className="text-primaryRed text-lg font-medium uppercase tracking-wider">
           {data?.header}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-darkText">
            I'm {data?.name} a <br />
            <span className="text-red-600">
              <Typewriter
                words={["Web Developer.", "Designer.", "Editor."]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={3000}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg">
           {data?.description}
          </p>
          <Link href={"/allproject"}>
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
         <div className="relative w-64 h-60 sm:w-80 sm:h-80 md:w-100 md:h-100 lg:w-[28rem] lg:h-[28rem] rounded-full flex items-center justify-center bg-white shadow-4xl border-4 border-red">
  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent transition-all duration-500 ease-in-out hover:border-red-950 hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]">
    <Image
      src="https://i.ibb.co/d42jgJ5z/Whats-App-Image-2025-09-01-at-8-42-23-AM.jpg"
      alt="Sheikh Ifty - Web Developer"
      fill
      className="object-cover"
      unoptimized
      sizes="(max-width: 768px) 100vw, 28rem"
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

