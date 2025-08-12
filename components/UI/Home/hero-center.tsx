"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Common/Slide/style.module.scss";
import { motion } from "framer-motion";
import { opacityTrans } from "@/lib/utils/transitions";
import HeroCarousel from "@/components/UI/Carousel/HeroCarousel";
import ReadMoreModal from "@/components/UI/Modal/ReadMoreModal";
import { FaUserFriends, FaTrophy, FaTicketAlt, FaPlay } from "react-icons/fa";

const HeroCenter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-0 min-h-full w-full pointer-events-none">
        <Image
          src={"/images/headhero.png"}
          alt="hero image"
          fill
          className="object-cover h-full w-full -z-[1]"
        />
      </div>

      {/* Mobile-Optimized Scrolling Announcement Banner */}
      <div className="w-full relative pt-4 sm:pt-6 md:pt-8 mb-4 sm:mb-6 md:mb-8 overflow-hidden">
        <motion.div
          {...opacityTrans}
          transition={{ delay: 1, duration: 1.5 }}
          className={`relative w-full ${styles["scroll-con"]}`}
        >
          <motion.div
            {...opacityTrans}
            className={`space-x-3 border-y-2 overflow-hidden border-[#ea580c] ${styles["head-scroll-con"]} bg-gradient-to-r from-[#ea580c]/10 via-[#FFB92E]/5 to-[#ea580c]/10 backdrop-blur-sm`}
          >
            {new Array(3).fill(null).map((_, id) => (
              <p key={id} className={`py-2 sm:py-3 md:py-4 ${styles["head-scroll-text"]}`}>
                <span className="text-xs sm:text-sm md:text-base uppercase tracking-wide text-white font-medium leading-tight">
                  <span className="font-bold text-[#FFB92E]">🎉 ANNOUNCEMENT –</span>
                  <span className="ml-2">Nomination Starts from May 1st, 2025, Get ready to nominate your Education Champion!</span>
                </span>
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Main hero content with new structure - moved up */}
      <div className="text-white relative md:px-10 px-2 pt-6 pb-4 sm:pt-8 sm:pb-4 md:pt-10 md:pb-6 lg:pt-12 lg:pb-6">
        <motion.div
          className="grid md:grid-cols-2 items-center gap-8 md:gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6 text-center md:text-left"
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-deepGold font-raleway leading-tight flex items-center justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              {/* <FaStar className="text-deepGold animate-pulse" /> */}
              <span>Honoring African Champions in Education</span>
              {/* <FaStar className="text-deepGold animate-pulse" /> */}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 leading-relaxed font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Celebrating unsung heroes, innovative changemakers, and bold institutions shaping Africa's education future.
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              From classrooms to boardrooms — if they move education forward, they deserve recognition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 25px 50px -12px rgba(243, 169, 40, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Read more about NESA Africa"
              >
                <FaPlay className="text-lg" />
                Read More About NESA
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Carousel */}
          <motion.div
            className="flex justify-center"
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <HeroCarousel />
          </motion.div>
        </motion.div>
      </div>

      {/* Third Navigation Bar */}
      <div className="relative md:px-10 px-2 pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
        >
          {/* Refer a friend */}
          <motion.div className="group">
            <motion.button
              onClick={() => console.log("Refer a friend")}
              className="w-full bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown px-6 py-4 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 25px 50px -12px rgba(243, 169, 40, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Refer a friend to NESA Africa"
            >
              <FaUserFriends size={20} />
              Refer a Friend
            </motion.button>
          </motion.div>

          {/* Nominate Now */}
          
          <motion.div className="group">
            <Link href="/get-involved/nomination">
              <motion.div
                className="w-full bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown px-6 py-4 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 ring-2 ring-primaryGold/20 hover:ring-primaryGold/40 cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(243, 169, 40, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Nominate someone for NESA Africa awards"
              >
                <FaTrophy size={20} />
                Nominate Now
              </motion.div>
            </Link>
          </motion.div>
          

          {/* Get Gala Tickets */}
          <motion.div className="group">
            <motion.button
              onClick={() => console.log("Get Gala Tickets")}
              className="w-full bg-white/10 backdrop-blur-sm border-2 border-primaryGold text-white px-6 py-4 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 hover:bg-primaryGold hover:text-darkBrown"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 25px 50px -12px rgba(243, 169, 40, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get tickets for NESA Africa gala"
            >
              <FaTicketAlt size={20} />
              Get Gala Tickets
            </motion.button>
          </motion.div>

          {/* Watch NESA TV */}
          <motion.div className="group">
            <motion.button
              onClick={() => console.log("Watch NESA TV")}
              className="w-full bg-white/10 backdrop-blur-sm border-2 border-primaryGold text-white px-6 py-4 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 hover:bg-primaryGold hover:text-darkBrown"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 25px 50px -12px rgba(243, 169, 40, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Watch NESA TV content"
            >
              <FaPlay size={20} />
              Watch NESA TV
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Read More Modal */}
      <ReadMoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default HeroCenter;
   