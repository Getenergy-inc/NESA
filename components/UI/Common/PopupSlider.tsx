"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const messages = [
  {
    title:"Engr. (Dr.) Babashola-Santos V. A. Aderibigbe, Chief Visionary Officer (CVO), SCEF",
    image:"/images/santos.png"
  },

  {title: "Message from the CVO",
    message:`"Welcome to NESA-Africa 2025—New Education Standard Award Africa, a pan-African celebration of educational transformation, social impact, and legacy."`,
    image:"/images/santos.png"
  },

//   {
//     title: "Our Three Super Levels",
//     message: `• 🔷 Blue Garnet Competitive Awards .
// • 💠 Africa Icon Lifetime Education Awards (Blue Garnet Tier).
// • 🥈 Platinum Recognition Awards.`,
//     image: "/images/santos.png"
//   },

{
  title: "Your Invitation",
  message: `"I invite you to be more than spectators. Be nominators. Be endorsers and advisors."`,
  image: "/images/santos.png"
},

  {
    title: "Your Invitation",
    message: `"As we approach the Week of Impact (13–18 December 2025, Lagos — WAT)—from EduAid Expo and policy micro-sessions to the grand gala, I welcome you to history in the making".
`,
    image: "/images/santos.png"
  },


];

const PopupSlider = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [open]);

  // Safety check to prevent runtime errors
  if (typeof open === 'undefined' || !open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ paddingTop: "0", marginTop: "0" }}
      >
        <motion.div
          className="relative w-full sm:w-[90%] md:w-[70%] lg:w-[55%] xl:w-[50%] max-h-[85vh] overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primaryGold/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-deepGold/20 rounded-full blur-3xl"></div>
          
          {/* Main card with gradient background */}
          <div className="relative bg-gradient-to-br from-whiteGold via-white to-xlGold rounded-2xl shadow-2xl overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primaryGold via-deepGold to-primaryGold"></div>
            
            {/* Content container */}
            <div className="p-6 sm:p-8 md:p-10 text-center relative">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-darkBrown/10 hover:bg-darkBrown/20 text-darkBrown hover:text-primaryGold transition-all duration-300 hover:rotate-90 text-2xl font-light z-10"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>

              {/* Content */}
              <div className="transition-all duration-500 mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {messages[current].image && (
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          {/* Glow effect behind image */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primaryGold to-deepGold rounded-full blur-xl opacity-30"></div>
                          <Image
                            src={messages[current].image}
                            alt={messages[current].title}
                            width={130}
                            height={130}
                            className="relative mx-auto rounded-full object-cover border-4 border-white shadow-xl"
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primaryGold via-deepGold to-primaryGold bg-clip-text text-transparent leading-snug">
                      {messages[current].title}
                    </div>
                    {messages[current].message && (
                      <div className="text-sm sm:text-base md:text-lg text-darkBrown/90 whitespace-pre-line leading-relaxed max-w-2xl mx-auto font-medium">
                        {messages[current].message}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {messages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === current 
                        ? "w-8 h-3 bg-gradient-to-r from-primaryGold to-deepGold shadow-lg" 
                        : "w-3 h-3 bg-darkBrown/20 hover:bg-darkBrown/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative bottom accent */}
            <div className="h-2 bg-gradient-to-r from-transparent via-primaryGold/30 to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupSlider;
