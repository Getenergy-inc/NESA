"use client";

import Image from "next/image";
import { bottomLinks, contactInfos, footerData, socials } from "./data";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="py-6 md:py-8 relative text-white overflow-hidden">
      <Image
        src={"/images/bg/back_.jpeg"}
        alt="dark background"
        className="w-full h-full object-cover -z-[2] absolute top-0 left-0"
        width={1024}
        height={600}
      />
      {/* <div className="container mb-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
            <motion.p
            className="text-lg md:text-2xl font-medium leading-snug"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
            “Africa’s future is not waiting. It is being designed — by the ones building the policies, platforms, and partnerships that fuel learning at scale.”
            </motion.p>
          <p className="text-base md:text-lg font-medium text-[#ffd37a]">
        NESA-Africa 2025 — Celebrating Vision, Strategy &amp; System-Builders.
          </p>
        </div>
      </div> */}

      <div className="bg-[#15110999] absolute top-0 left-0 w-full -z-[1] h-full"></div>
      <div className="space-y-4 md:space-y-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {/* Logo and Contact Info */}
            <div className="space-y-2 md:space-y-3">
              <Image src={"/svgs/logo.svg"} alt="NESA-Africa logo" width={160} height={50} className="h-auto" />

              <div className="space-y-2">
                {contactInfos.map((info, id) => (
                  <div key={id} className="flex items-start gap-2">
                    <div className="text-white/70 mt-0.5 text-sm flex-shrink-0">
                      {info.icon}
                    </div>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            {footerData.map((data, id) => (
              <div key={id} className="space-y-2 md:space-y-3">
                <h5 className="font-semibold text-white text-sm md:text-base">{data.heading}</h5>
                <ul className="text-white/80 space-y-1.5">
                  {data.children.map((child, childId) => (
                    <li key={childId}>
                      <Link
                        href={child.path}
                        className="hover:text-[#ea580c] transition-colors duration-200 text-xs md:text-sm leading-relaxed block"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Subscription */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-[#ea580c] to-orange-600 rounded-lg p-3 md:p-4 space-y-2 md:space-y-3 max-w-sm lg:max-w-none mx-auto lg:mx-0">
                <h5 className="font-semibold text-white text-sm md:text-base">Subscribe to our Newsletter</h5>
                <p className="text-white/90 text-xs leading-relaxed">
                  Stay in the loop with the latest updates! Subscribe to our newsletter for exclusive insights, exciting announcements, and all things NESA 2024. Don't miss a beat
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Input your Email address"
                      className="w-full px-3 py-2 md:py-2.5 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white text-[#ea580c] font-semibold py-2 md:py-2.5 px-3 rounded-md hover:bg-white/90 transition-colors duration-200 text-xs md:text-sm flex items-center justify-center gap-1.5"
                  >
                    Subscribe
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 border-t border-white/20 pt-3 md:pt-4">
          <div className="flex items-center justify-between gap-3 md:gap-4 flex-col md:flex-row">
            {/* Copyright and Links */}
            <div className="flex items-center gap-3 md:gap-4 flex-col sm:flex-row text-center sm:text-left order-2 md:order-1">
              <p className="text-white/80 text-xs md:text-sm">Nesa©2024</p>
              <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center sm:justify-start">
                {bottomLinks.map((data, id) => (
                  <Link
                    key={id}
                    href={data.path}
                    className="text-xs md:text-sm text-white/80 hover:text-[#ea580c] transition-colors duration-200"
                  >
                    {data.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-2 md:gap-3 order-1 md:order-2">
              {socials.map((social, id) => (
                <Link
                  key={id}
                  href={social.path}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-[#ea580c] transition-all duration-200 flex items-center justify-center group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
