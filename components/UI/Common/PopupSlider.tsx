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
    message:`"Dear Changemakers of Africa and the World,

Welcome to NESA-Africa 2025—New Education Standard Award Africa, a pan-African celebration of educational transformation, social impact, and legacy. 
This year, we are proud to launch three distinct but united award pathways, all centered around one purpose: recognizing and amplifying excellence in education."`,
    image:"/images/santos.png"
  },

  {
    title: "Our Three Super Levels",
    message: `• 🔷 Blue Garnet Competitive Awards .
• 💠 Africa Icon Lifetime Education Awards (Blue Garnet Tier).
• 🥈 Platinum Recognition Awards.`,
    image: "/images/santos.png"
  },

{
  title: "Your Invitation",
  message: `"I invite you to be more than spectators. Be nominators. Be endorsers and advisors. Be technology, legal, media, and data partners. Be sponsors. Be diaspora champions. Be part of a continental legacy that accelerates Education for All."`,
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

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Content */}
          <div className="transition-all duration-500">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {messages[current].image && (
                  <div className="flex justify-center">
                    <Image
                      src={messages[current].image}
                      alt={messages[current].title}
                      width={120}
                      height={120}
                      className="mx-auto mb-4 rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-[#ea580c] leading-snug">
                  {messages[current].title}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-[#1a140b] whitespace-pre-line leading-relaxed">
                  {messages[current].message}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {messages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === current ? "bg-primaryGold" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupSlider;
