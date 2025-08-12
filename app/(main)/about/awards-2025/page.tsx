"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Calendar, MapPin, Users, Award, Target, Globe, Heart, Lightbulb, Star, Trophy, BookOpen } from "lucide-react";

const AboutNESA2025 = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="relative inset-0 min-h-screen w-screen text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/bg/hero-image.jpeg"
          alt="NESA Africa 2025 Background"
          fill
          className="object-cover z-0"
          quality={100}
          priority
        />

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#191307]/90 via-[#191307]/80 to-[#33270E]/70 z-10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/10 rounded-full blur-xl z-10"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#E48900]/20 to-[#FFC247]/10 rounded-full blur-xl z-10"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            variants={parentV}
            initial="initial"
            animate="animate"
            className="w-full max-w-6xl mx-auto text-center py-20"
          >
            <motion.div variants={toTopV} className="space-y-8">
              {/* Icon and Badge */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full backdrop-blur-sm border border-[#FFC247]/30">
                  <Trophy className="w-12 h-12 text-[#FFC247]" />
                </div>
                <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-[#FFC247] to-transparent"></div>
                <div className="p-4 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full backdrop-blur-sm border border-[#FFC247]/30">
                  <BookOpen className="w-12 h-12 text-[#FFC247]" />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-[#FFC247] via-[#FFD37A] to-[#E48900] bg-clip-text text-transparent">
                  About NESA-Africa
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-[#E48900] to-[#FFC247] bg-clip-text text-transparent">
                  2025
                </span>
              </h1>

              {/* Subtitle */}
              <div className="max-w-5xl mx-auto space-y-6">
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 font-light">
                  Welcome to the <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent font-semibold">New Education Standard Awards – Africa 2025</span>, a groundbreaking initiative by the Santos Creations Educational Foundation (SCEF) – Nigeria Local Chapter to recognize, celebrate, and inspire educational excellence across Africa and the global African diaspora.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <button className="px-8 py-4 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold rounded-full hover:shadow-2xl hover:shadow-[#FFC247]/25 transition-all duration-300 transform hover:scale-105">
                  Nominate Now
                </button>
                <button className="px-8 py-4 border-2 border-[#FFC247] text-[#FFC247] font-semibold rounded-full hover:bg-[#FFC247] hover:text-[#191307] transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-[#FFC247] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#FFC247] rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={toTopV} className="space-y-8">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="p-6 bg-gradient-to-br from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl border border-[#FFC247]/20">
                  <Target className="w-16 h-16 text-[#E48900]" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>

              {/* Content */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed font-light">
                  To transform education in Africa by honoring individuals, institutions, and innovations that create real, lasting impact — and by inspiring the next generation to aim higher.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Celebrate Section */}
      <section className="py-20 bg-gradient-to-b from-[#191307] to-[#33270E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={toTopV} className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-2xl border border-[#FFC247]/30 backdrop-blur-sm">
                  <Globe className="w-16 h-16 text-[#FFC247]" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">
                  Who We Celebrate
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                We honor education champions from:
              </p>
            </motion.div>

            <motion.div variants={toTopV} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#FFC247]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">All 54 African Nations</h3>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#FFC247]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">Every African Region</h3>
                  <p className="text-sm text-white/70">West, East, Central, South, and North</p>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#FFC247]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The African Diaspora Worldwide</h3>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#FFC247]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">Global Friends of African Education</h3>
                  <p className="text-sm text-white/70">UN agencies, embassies, and development partners</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={toTopV} className="text-center">
              <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#FFC247]/20">
                <p className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto">
                  Our nominees include <span className="text-[#FFC247] font-semibold">teachers, NGOs, philanthropists, policy makers, media, artists, businesses, social innovators, and young changemakers</span> working to achieve Education for All (EFA).
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 bg-gradient-to-b from-white via-red-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={toTopV} className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl border border-red-200">
                  <Heart className="w-16 h-16 text-red-600" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  Why It Matters
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Across Africa, millions are still denied quality education because of:
              </p>
            </motion.div>

            <motion.div variants={toTopV} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { icon: "🏫", text: "Weak formal/informal education systems" },
                { icon: "📚", text: "Obsolete curricula that fail to meet current needs" },
                { icon: "👩‍🎓", text: "Neglect of girls' and women's education" },
                { icon: "♿", text: "Exclusion of special needs learners (blind, deaf, neurodiverse)" },
                { icon: "🏕️", text: "Marginalization of nomadic, riverine, and remote communities" },
                { icon: "💻", text: "Poor infrastructure and a widening digital divide" }
              ].map((challenge, index) => (
                <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {challenge.icon}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{challenge.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={toTopV} className="text-center">
              <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/20">
                <p className="text-xl text-gray-800 leading-relaxed max-w-4xl mx-auto">
                  <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent font-bold">NESA-Africa</span> believes recognition sparks reform, innovation, and progress.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Award Categories Section */}
      <section className="py-20 bg-gradient-to-b from-[#191307] to-[#33270E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={toTopV} className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-2xl border border-[#FFC247]/30 backdrop-blur-sm">
                  <Award className="w-16 h-16 text-[#FFC247]" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">
                  Award Tiers & Categories
                </span>
              </h2>
            </motion.div>

            {/* Africa Icon Blue Garnet Awards */}
            <motion.div variants={toTopV} className="mb-12">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Trophy className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-blue-300">Africa Icon Blue Garnet Awards</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">Non-Competitive</span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">Lifetime Impact</span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">Africa & Diaspora</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/80 mb-6 text-lg">
                  <span className="font-semibold text-blue-300">Purpose:</span> Honors individuals with 20+ years of outstanding contributions to education.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Africa Education Philanthropy Icon",
                    "Literary & New Curriculum Advocate", 
                    "Africa Technical Educator Icon"
                  ].map((subcategory, index) => (
                    <div key={index} className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
                      <p className="text-blue-200 font-medium">{subcategory}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Blue Garnet & Gold Certificate Awards */}
            <motion.div variants={toTopV} className="mb-12">
              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 backdrop-blur-sm p-8 rounded-2xl border border-yellow-400/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                      <Star className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-yellow-300">Blue Garnet & Gold Certificate Awards</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">Competitive</span>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">Public Nomination, Voting & Judges</span>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">Africa-wide, Regional, and Nigeria-specific</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {[
                      "Best Media Organization in Educational Advocacy (Nigeria)",
                      "Best Corporate Social Responsibility (CSR) in Education (Africa – Regional)",
                      "🆟️ Sub-Category: Social Media Influencer – Education Advocacy & CSR",
                      "Best NGO Contribution to Achieving Education for All (Africa – Regional)",
                      "Best NGO Contribution to Education (Nigeria)",
                      "Creative Arts Industry Contribution to Education (Nigeria)",
                      "Best EduTech Organization (Africa-wide)",
                      "Best Corporate Social Responsibility (CSR) in Education (Nigeria)",
                      "Best STEM Education Program or Project (Africa-wide)"
                    ].map((category, index) => (
                      <div key={index} className="bg-yellow-500/10 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                        <p className="text-yellow-200 font-medium">{category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Platinum Certificate of Recognition Awards */}
            <motion.div variants={toTopV} className="mb-12">
              <div className="bg-gradient-to-br from-gray-700/30 to-gray-600/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-400/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-500/20 rounded-xl">
                      <Award className="w-8 h-8 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-200">Platinum Certificate of Recognition Awards</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-sm rounded-full">Non-Competitive</span>
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-sm rounded-full">Institutional & Policy Impact</span>
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-sm rounded-full">Africa & Diaspora, Nigeria, Global</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {[
                      "Best Education-Friendly State (Nigeria)",
                      "Best Library in Nigerian Tertiary Institutions (Nigeria)",
                      "Best Research & Development Contribution by Research Institutes (Nigeria)",
                      "Christian Education Impact Award (Africa & Diaspora)",
                      "Islamic Education Impact Award (Africa & Diaspora)",
                      "Political Leaders' Educational Support Services (Nigeria)",
                      "Best International & Bilateral Contributors to Education (Global)",
                      "Diaspora Association Educational Impact (Africa & Diaspora)"
                    ].map((category, index) => (
                      <div key={index} className="bg-gray-500/10 backdrop-blur-sm p-4 rounded-xl border border-gray-400/20 hover:border-gray-400/40 transition-all duration-300">
                        <p className="text-gray-200 font-medium">{category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Dates Section */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={toTopV} className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl border border-blue-200">
                  <Calendar className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Key Dates
                </span>
              </h2>
            </motion.div>

            <motion.div variants={toTopV} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { date: "Voting Opens (Gold Category)", event: "October 10, 2025", icon: "🗳️" },
                { date: "Nomination Closes (Icon & Platinum)", event: "November 20, 2025", icon: "📝" },
                { date: "Africa Icon Award Selection", event: "Nov 21 – Dec 3, 2025", icon: "🏆" },
                { date: "NESA-TV Webinars", event: "October 13 – December 13, 2025", icon: "📺" },
                { date: "EduAid Africa Virtual Expo", event: "December 15, 2025", icon: "🌐" },
                { date: "Award Gala Night", event: "December 18, 2025 – Muson Centre, Lagos", icon: "🎉" },
                { date: "\"It's In Me\" Radio Podcast", event: "Launches September 2025", icon: "🎙️" }
              ].map((item, index) => (
                <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-600 text-lg mb-2">{item.date}</h3>
                      <p className="text-gray-700 font-medium">{item.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-gradient-to-b from-[#191307] to-[#33270E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={toTopV} className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-2xl border border-[#FFC247]/30 backdrop-blur-sm">
                  <Users className="w-16 h-16 text-[#FFC247]" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">
                  Get Involved
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                You can:
              </p>
            </motion.div>

            <motion.div variants={toTopV} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { icon: "✍️", title: "Nominate an impactful changemaker", desc: "Submit nominations for deserving candidates" },
                { icon: "🗳️", title: "Vote for outstanding nominees", desc: "Participate in the democratic selection process" },
                { icon: "💰", title: "Sponsor or donate", desc: "Support education initiatives across Africa" },
                { icon: "🎟️", title: "Attend the EduAid Expo and Gala Night", desc: "Join us for the celebration of excellence" },
                { icon: "🌟", title: "Become a NESA-Africa Judge or Ambassador", desc: "Lead the movement for educational transformation" },
                { icon: "🤝", title: "Join our Volunteer Teams", desc: "Contribute your skills to the cause" }
              ].map((item, index) => (
                <div key={index} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#FFC247]/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={toTopV} className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#FFC247]/20">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">
                  Join our Volunteer Teams:
                </span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  "Nominee Research Corps (NRC)",
                  "Fundraising & Digital Outreach",
                  "Gala Event Logistics",
                  "NESA-TV & Media Production",
                  "\"It's In Me\" Radio",
                  "Social Media Content Creation, Graphics, and Storytelling"
                ].map((role, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:border-[#FFC247]/40 transition-all duration-300">
                    <p className="text-white/90 font-medium text-center">{role}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[#FFC247] font-semibold text-lg">
                Volunteers welcome from every African country, region, and the global diaspora.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-20 bg-gradient-to-b from-white via-[#FFF5E0] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div variants={toTopV} className="space-y-8">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl border border-[#FFC247]/20">
                  <Globe className="w-16 h-16 text-[#E48900]" />
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-2xl sm:text-3xl text-gray-800 mb-8">
                  Visit <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent font-bold">www.nesa.africa</span>
                </p>
                
                <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] p-8 rounded-2xl text-white shadow-2xl">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Nominate. Vote. Celebrate. Transform Education.
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutNESA2025;