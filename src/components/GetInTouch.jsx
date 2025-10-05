"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const GetInTouch = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Appointment booked successfully!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.message || "Something went wrong!");
      }
    } catch (err) {
      setErrorMsg("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <section className="bg-black py-20 px-6 lg:px-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-neutral-900 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-start lg:items-center border-transparent transition-all duration-700 ease-in-out hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:bg-neutral-900/80 hover:border-red-700">
          <div className="text-white w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h3 className="text-red-500 uppercase text-sm tracking-widest mb-2">Get In Touch</h3>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Elevate your brand with Me</h2>
            <p className="text-gray-400 leading-relaxed">
              Fill out the form and I will get back to you as soon as possible.
            </p>
            {successMsg && <p className="text-green-500 mt-2">{successMsg}</p>}
            {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
          </div>

          <div className="w-full lg:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-800 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {loading ? "Booking..." : "Appointment Now"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GetInTouch;
