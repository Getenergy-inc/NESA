"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlay, FaTv, FaArrowRight } from "react-icons/fa";

const MediaSection = () => {
  // Use local video file for better performance and control
  const featuredVideoUrl = "/images/about.mp4";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-whiteGold via-white to-xlGold py-16 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-40 h-40 bg-primaryGold rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-deepGold rounded-full blur-2xl"></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Header */}
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-4"
                variants={itemVariants}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center">
                  <FaTv className="text-darkBrown text-lg" />
                </div>
                <span className="text-primaryGold text-sm font-semibold tracking-wider uppercase">
                  NESA Media Hub
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl lg:text-4xl xl:text-5xl font-bold text-darkBrown mb-6 leading-tight"
                variants={itemVariants}
              >
                Learn More About Us
              </motion.h2>
              
              <motion.p 
                className="text-darkBrown/80 text-lg lg:text-xl leading-relaxed mb-8"
                variants={itemVariants}
              >
                Watch the vision behind NESA Africa, past award highlights, and exclusive interviews 
                with African educators shaping the future of education across the continent.
              </motion.p>
            </div>

            {/* Features List */}
            <motion.div variants={itemVariants} className="space-y-4">
              {[
                "Exclusive interviews with education leaders",
                "Behind-the-scenes award ceremony footage",
                "Success stories from past award winners",
                "Educational impact documentaries"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primaryGold rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPlay className="text-darkBrown text-xs ml-0.5" />
                  </div>
                  <span className="text-darkBrown/70 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/nesatv" className="group">
                <div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                >
                  <FaTv className="text-lg" />
                  Watch on NESA TV
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              
              <Link href="/media" className="group">
                <div
                  className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-primaryGold text-darkBrown px-8 py-4 rounded-full font-semibold hover:bg-primaryGold/10 transition-all duration-300 hover:scale-102"
                >
                  Explore Media Gallery
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Video Content */}
          <motion.div 
            variants={videoVariants}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-darkBrown to-secondaryDark rounded-2xl p-6 shadow-2xl">
              {/* Video Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-darkBrown/50">
                <video
                  src={featuredVideoUrl}
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  preload="metadata"
                  muted
                  playsInline
                  aria-label="NESA Africa promotional video - Learn about our mission and impact"
                  onError={(e) => {
                    console.error("Video failed to load:", e);
                  }}
                >
                  <source src={featuredVideoUrl} type="video/mp4" />
                  <div className="w-full h-full flex items-center justify-center bg-darkBrown/80">
                    <div className="text-center text-white/60">
                      <FaPlay className="text-4xl mb-4 mx-auto" />
                      <p>Your browser does not support the video tag. Please update your browser to view this content.</p>
                    </div>
                  </div>
                </video>
              </div>
              
              {/* Video Info */}
              <div className="mt-4 text-white">
                <h3 className="font-semibold text-lg mb-2">
                  NESA Africa 2025 - Shaping Educational Excellence
                </h3>
                <p className="text-white/70 text-sm">
                  Discover how NESA Africa is transforming education across the continent through 
                  recognition, innovation, and collaboration.
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primaryGold to-deepGold rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-midGold to-lightGold rounded-full opacity-15 blur-2xl"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MediaSection;
