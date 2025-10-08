"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const messages = [
  {
    title: "Engr. (Dr.) Babashola-Santos V. A. Aderibigbe, Chief Visionary Officer (CVO), SCEF",
    image: "/images/santos.png",
  },
  {
    title: "Message from the CVO",
    message: `"Welcome to NESA-Africa 2025—New Education Standard Award Africa, a pan-African celebration of educational transformation, social impact, and legacy."`,
    image: "/images/santos.png",
  },
  {
    title: "Your Invitation",
    message: `"I invite you to be more than spectators. Be nominators. Be endorsers and advisors."`,
    image: "/images/santos.png",
  },
  {
    title: "Your Invitation",
    message: `"As we approach the Week of Impact (13–18 December 2025, Lagos — WAT)—from EduAid Expo and policy micro-sessions to the grand gala, I welcome you to history in the making."`,
    image: "/images/santos.png",
  },
];

const PopupSlider = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-black/70 border border-[#f59e0b] w-full sm:w-[90%] md:w-[70%] lg:w-[55%] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center relative max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-300 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-6 text-left"
            >
              {/* Animated Image */}
              {messages[current].image && (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-shrink-0 flex justify-center md:justify-start"
                >
                  <Image
                    src={messages[current].image}
                    alt={messages[current].title}
                    width={160}
                    height={160}
                    className="object-cover border-2 border-[#f59e0b] shadow-md"
                  />
                </motion.div>
              )}

              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white border-b border-l border-[#f59e0b] p-4 leading-snug">
                  {messages[current].title}
                </h3>
                <p className="text-sm sm:text-base text-[#f59e0a] whitespace-pre-line leading-relaxed">
                  {messages[current].message}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {messages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  idx === current ? "bg-[#f59e0b]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupSlider;
