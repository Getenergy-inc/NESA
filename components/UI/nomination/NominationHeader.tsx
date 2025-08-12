"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Image from "next/image";
import Link from "next/link";
import { Wallet, Award, Users, Globe } from "lucide-react";

const NominationHeader = () => {
  return (
    <header className="relative inset-0 min-h-screen w-screen text-white py-10">
      {/* Background Image */}
      <Image
        src="/images/nominatehero.jpeg"
        alt="NESA Africa 2025 Nomination Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#191307CC] z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          variants={parentV}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-8 md:gap-16 pt-12 md:pt-18"
        >
          {/* Main Header Content */}
          <motion.div variants={toTopV} className="text-center">
            <div className="flex flex-col items-center space-y-6">
              {/* Badge */}
              <motion.div
                variants={opacityV}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30"
              >
                <Globe className="w-5 h-5 text-[#FFC247] mr-2" />
                <span className="text-[#FFC247] font-medium text-sm">🌍 NESA-AFRICA 2025</span>
              </motion.div>
              
              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text leading-tight text-center">
                Nomination & Voting
                <br />
                <span className="text-3xl md:text-5xl lg:text-6xl">Portal</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
                Welcome to the official Nomination & Voting Portal for the NESA-Africa 2025 Awards — 
                where education impact meets recognition. Powered by AfriGold Coin (AGC) and the GFA Wallet.
              </p>

              {/* Key Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                <motion.div variants={opacityV} className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Award className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h3 className="text-[#FFC247] font-semibold text-lg mb-2">Recognize Excellence</h3>
                    <p className="text-gray-400 text-sm">
                      Celebrate educators, institutions, and changemakers across Africa and diaspora
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={opacityV} className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Wallet className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h3 className="text-[#FFC247] font-semibold text-lg mb-2">AGC-Powered Voting</h3>
                    <p className="text-gray-400 text-sm">
                      Every vote powers scholarships through AfriGold Coin technology
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={opacityV} className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Users className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h3 className="text-[#FFC247] font-semibold text-lg mb-2">Community Impact</h3>
                    <p className="text-gray-400 text-sm">
                      Join thousands creating lasting change in African education
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-6 border border-[#FFC247]/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <Wallet className="w-8 h-8 text-[#FFC247] mr-3" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  ⚠️ Important Notice
                </h3>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                All nominations, voting, and donations are powered by AfriGold Coin (AGC). 
                Please Top Up Your GFA Wallet before participating.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/wallet">
                  <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Top Up AGC Wallet
                  </button>
                </Link>
                <Link href="/about/agc">
                  <button className="border border-[#FFC247] text-[#FFC247] font-semibold px-8 py-3 rounded-full hover:bg-[#FFC247]/10 transition-all duration-300">
                    Learn About AGC
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={toTopV} className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: "3", label: "Award Categories", icon: "🏆" },
                { number: "101", label: "Subcategories", icon: "📋" },
                { number: "54+", label: "Countries Covered", icon: "🌍" },
                { number: "1000+", label: "Expected Nominees", icon: "👥" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/60 to-[#33270E]/40 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 text-center hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={opacityV} className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Link href="#award-categories">
                <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-lg px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <Award className="w-5 h-5 mr-2" />
                  Explore Award Categories
                </button>
              </Link>
              <Link href="#quick-actions">
                <button className="border-2 border-[#FFC247] text-[#FFC247] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#FFC247]/10 transition-all duration-300 flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Start Your Journey
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default NominationHeader;