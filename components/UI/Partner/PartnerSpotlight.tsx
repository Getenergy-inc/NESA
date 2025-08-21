"use client"
import React from 'react'
import { motion } from 'framer-motion'


const PartnerSpotlight = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-20 text-center px-4"
    >
      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex flex-col items-center justify-center text-white rounded-[5px] overflow-hidden"
        style={{
          backgroundImage: "url('/images/getinvolved/get1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-[10px]" />
  {/* Content */}
        <div className="relative z-10 text-center px-2 sm:px-6 md:px-12 lg:px-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#ea580c] bg-clip-text text-transparent leading-tight">
            Shine With Us: Become a NESA Partner or Sponsor
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#f3f4f6] max-w-3xl mx-auto">
            Join our mission to transform education across Africa. Partner or sponsor with NESA and let’s create lasting impact together!
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PartnerSpotlight


