"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay to trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#111111] text-white shadow-lg border-b border-white/10 transition-all duration-[1200ms] ease-in-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="container flex items-center justify-between py-5 px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/my-logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold text-xl tracking-wide">DOOM</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-center space-x-8 font-medium">
          <Link
            href="/"
            className="hover:text-red-500 transition-colors duration-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-red-500 transition-colors duration-500"
          >
            About
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center hover:text-red-500 transition-colors duration-500">
              Services
              <svg
                className="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-[#111111] border border-white/10 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-10">
              <Link
                href="/services/web-design"
                className="block px-4 py-2 text-sm hover:bg-red-800 transition-colors"
              >
                Web Design
              </Link>
            </div>
          </div>

          <Link
            href="/allproject"
            className="hover:text-red-500 transition-colors duration-500"
          >
            Projects
          </Link>

          <Link
            href="/allcontacts"
            className="hover:text-red-500 transition-colors duration-500"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.instagram.com/_sheikh_ifty"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-500"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com/share/1BM71NnvVF/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-500"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.youtube.com/@sheikhifty.2384"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-500"
          >
            <FaYoutube />
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-2xl focus:outline-none hover:text-red-500 transition-colors duration-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>
      </div>

     {/* Mobile Drawer */}
<div
  className={`fixed top-0 right-0 h-full w-64 bg-[#111111] border-l border-white/10 shadow-lg transform transition-transform duration-[1000ms] ease-in-out z-50 lg:hidden ${
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Inner container with solid background */}
  <div className="h-full w-full bg-[#111111] p-6 flex flex-col justify-start relative">
    <button
      className="absolute top-4 right-4 text-2xl hover:text-red-500 transition-colors duration-500"
      onClick={() => setIsMenuOpen(false)}
    >
      ✕
    </button>

    <div className="flex flex-col mt-12 space-y-4 bg-[#111111] p-4 rounded-xl shadow-lg">
      <Link
        href="/"
        onClick={() => setIsMenuOpen(false)}
        className="text-white hover:text-red-500 transition-colors duration-500"
      >
        Home
      </Link>
      <Link
        href="/about"
        onClick={() => setIsMenuOpen(false)}
        className="text-white hover:text-red-500 transition-colors duration-500"
      >
        About
      </Link>
      <Link
        href="/services/web-design"
        onClick={() => setIsMenuOpen(false)}
        className="text-white hover:text-red-500 transition-colors duration-500"
      >
        Web Design
      </Link>
      <Link
        href="/allproject"
        onClick={() => setIsMenuOpen(false)}
        className="text-white hover:text-red-500 transition-colors duration-500"
      >
        Projects
      </Link>
      <Link
        href="/allcontacts"
        onClick={() => setIsMenuOpen(false)}
        className="text-white hover:text-red-500 transition-colors duration-500"
      >
        Contact
      </Link>

      {/* Social Icons */}
      <div className="flex items-center gap-4 mt-6">
        <a
          href="https://www.instagram.com/_sheikh_ifty"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-500 transition-colors duration-500"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-500 transition-colors duration-500"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.facebook.com/share/1BM71NnvVF/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-500 transition-colors duration-500"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.youtube.com/@sheikhifty.2384"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-500 transition-colors duration-500"
        >
          <FaYoutube />
        </a>
      </div>
    </div>
  </div>
</div>


    </nav>
  );
};

export default Navbar;


