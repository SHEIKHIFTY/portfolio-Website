"use client";

import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <footer className="bg-neutral-900 text-gray-300 py-12 px-6 lg:px-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -100 }} // start from left
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // animate to position
        transition={{ duration: 0.8, ease: "easeOut" }} // smooth animation
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
            {/* Left Section */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/my-logo.jpg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="font-semibold text-xl tracking-wide">DOOM</span>
              </Link>
              <h2 className="text-2xl font-bold text-white mb-2 mt-6">
                Get <span className="text-red-500">Ready</span> To Create
              </h2>
              <p className="text-white text-2xl font-light mb-6">Great</p>

              {/* Newsletter */}
              <div className="flex items-center border-b border-gray-500 max-w-xs mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent py-2 px-2 text-gray-200 focus:outline-none"
                />
                <button className="text-gray-400 hover:text-red-600 transition-colors">✉</button>
              </div>
            </div>

            {/* Middle Section: Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Me", link: "/about" },
                  { name: "Service", link: "/services/web-design" },
                  { name: "Contact Me", link: "/allcontacts" },
                  { name: "Projects", link: "/allproject" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="relative inline-block hover:text-red-600 transition-colors
                        after:content-[''] after:absolute after:left-0 after:-bottom-1
                        after:w-0 after:h-[2px] after:bg-red-600 after:transition-all
                        after:duration-300 hover:after:w-full"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section: Contact Info + Social Icons */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <MdEmail className="text-red-600" />
                  <a
                    href="mailto:sheikhiftekhar003@gmail.com"
                    className="relative inline-block hover:text-red-600 transition-colors
                      after:content-[''] after:absolute after:left-0 after:-bottom-1
                      after:w-0 after:h-[2px] after:bg-red-600 after:transition-all
                      after:duration-300 hover:after:w-full"
                  >
                    sheikhiftekhar003@gmail.com
                  </a>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <MdLocationOn className="text-red-600" />
                  <a
                    href="https://www.google.com/maps/place/SKY+Tower/@23.860784,90.4202417,19z/data=!4m10!1m2!2m1!1sgawair+Mazibari+sky+tower!3m6!1s0x3755c5ed8cbd3bbf:0xba284e5a3488b47b!8m2!3d23.8607917!4d90.4202475!15sChlnYXdhaXIgTWF6aWJhcmkgc2t5IHRvd2VykgEMaG9tZV9idWlsZGVyqgFREAEqDSIJc2t5IHRvd2VyKAAyHxABIhsPKMvWTLPtOsb757JO8nKYch4fIGurhXxpFl4yHRACIhlnYXdhaXIgbWF6aWJhcmkgc2t5IHRvd2Vy4AEA!16s%2Fg%2F11l1p3l_wf?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-red-600 transition-colors
                      after:content-[''] after:absolute after:left-0 after:-bottom-1
                      after:w-0 after:h-[2px] after:bg-red-600 after:transition-all
                      after:duration-300 hover:after:w-full"
                  >
                    Gawair, Mazibari, Dhakshinkhan, Dhaka-1230
                  </a>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <MdPhone className="text-red-600" />
                  <a
                    href="tel:01924388916"
                    className="relative inline-block hover:text-red-600 transition-colors
                      after:content-[''] after:absolute after:left-0 after:-bottom-1
                      after:w-0 after:h-[2px] after:bg-red-600 after:transition-all
                      after:duration-300 hover:after:w-full"
                  >
                    01924388916
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex justify-center md:justify-start gap-4 mt-6">
                <a
                  href="https://www.instagram.com/_sheikh_ifty?igsh=MXA5NWlzZmx1amUzeQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaInstagram className="text-white" />
                </a>

                <a
                  href="https://linkedin.com/in/YOUR_PROFILE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaLinkedinIn className="text-white" />
                </a>

                <a
                  href="https://twitter.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaTwitter className="text-white" />
                </a>

                <a
                  href="https://www.facebook.com/share/1BM71NnvVF/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaFacebookF className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© Inversweb 2025 | All Rights Reserved</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Terms & Condition", "Privacy Policy", "Contact Us"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative inline-block hover:text-red-600 transition-colors 
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-[2px] after:bg-red-600 after:transition-all 
                    after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
