"use client";
import { ChevronRight, Users, Award, Shield, Star } from "lucide-react";
import Button from "@/components/Common/Button";
import useSlider from "@/lib/hooks/useSlider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getjudgesapplicants } from "@/lib/services/getjugdesApplicants";
import { useRouter } from "next/navigation";
import { getApprovedJudges } from "@/lib/services/getApprovedJudges";
import { motion } from "framer-motion";
import Image from "next/image";


type Judge = {
    id: string;
    full_name: string;
    current_role: string;
    linkedin_profile: string;
    email: string;
    country: string;
    reason: string;
    document: string;
    updatedAt: string;
    createdAt: string;
};


const staticJudges: { name: string; role: string; image: string }[] = [
  {
    name: "Benneth Osarieme Ogbeiwi (Uncle Ben)",
    role: "Head at Adrenaline Entertainment\nFormer Host at MTN Project Fame",
    image: "/images/judg1.png"
  },
  {
    name: "Dr Juliet Ihiabe",
    role: "Executive Director of Family Bond Helping Foundation",
    image: "/images/judg2.png"
  },
  {
    name: "Paul-Kayode Joash",
    role: "Chief Rainmaker at MyDoubleDouble International",
    image: "/images/judg3.png"
  },
  {
    name: "Oluwadaisi Patricia Aderibigbe Santos",
    role: "Educationalist",
    image: "/images/judg4.png"
  },
  {
    name: "Damilola O.",
    role: "QHSSE Manager",
    image: "/images/judg5.png"
  }
];

const BACKEND_URL = ' https://res.cloudinary.com/djovn7g8q/';

// const imageUrl = `${BACKEND_URL}/${judge.upload_profile_image}`;

const Judges = () => {
  const router = useRouter();
  const { sliderRef: ref, moveLeft, moveRight } = useSlider();
  const [remoteJudges, setRemoteJudges] = useState<Judge[]>([]);
  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const data = await getApprovedJudges();
        setRemoteJudges(data);
        console.log(data)
      } catch (err) {
        console.error("Failed to fetch judges:", err);
      }
    };

    fetchJudges();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/headhero.png"
          alt="NESA Africa background"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center">
              <Users className="text-darkBrown text-lg" />
            </div>
            <span className="text-primaryGold text-sm font-semibold tracking-wider uppercase">
              Our Esteemed Panel
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Meet Our Distinguished Judges
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8">
              At the New Education Standard Award Africa (NESA-Africa) 2025, our esteemed panel of judges brings together education leaders, innovators, philanthropists, policymakers, and experts across Africa and the diaspora. They are responsible for ensuring fairness, transparency, and credibility in evaluating nominees across 17 major categories and 141 specialized sub-categories.
            </p>

            <motion.button
              onClick={() => router.push("/about-judges")}
              className="inline-flex items-center gap-2 text-primaryGold hover:text-deepGold font-semibold transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View all judges"
            >
              <span>See All Judges</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <Users className="w-6 h-6" />, number: "50+", label: "Expert Judges" },
            { icon: <Award className="w-6 h-6" />, number: "17", label: "Categories" },
            { icon: <Shield className="w-6 h-6" />, number: "141", label: "Sub-Categories" },
            { icon: <Star className="w-6 h-6" />, number: "100%", label: "Transparency" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-primaryGold/10 text-center"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-darkBrown">{stat.icon}</div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-darkBrown mb-1">{stat.number}</div>
              <div className="text-darkBrown/60 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Judges Carousel Section */}
        <motion.div variants={itemVariants} className="relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-32 h-32 bg-primaryGold rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-deepGold rounded-full blur-2xl"></div>
          </div>

          {/* Enhanced Section Header */}
          <div className="text-center mb-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryGold/60 to-transparent mb-8"></div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Featured Expert Judges
            </h3>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Meet the distinguished professionals who ensure fairness and excellence in our evaluation process
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryGold/60 to-transparent mt-8"></div>
          </div>

          {/* Carousel Container */}
          <div className="relative z-10">
              <div
                className="flex items-center gap-6 overflow-x-auto hide_scroll scroll-smooth pb-4"
                ref={ref}
              >
                {/* Static judges */}
                {staticJudges.map((judge, id) => (
                  <motion.div
                    key={`static-${id}`}
                    className="flex-shrink-0 w-80 lg:w-96 group cursor-pointer"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border border-primaryGold/20 group-hover:border-primaryGold/40 transition-all duration-300">
                      <Image
                        src={judge.image}
                        alt={judge.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-primaryGold/30 shadow-lg">
                          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                            {judge.name}
                          </h3>
                          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                            {judge.role}
                          </p>

                          {/* Badge */}
                          <div className="mt-3 inline-flex items-center gap-2 bg-primaryGold/20 text-primaryGold px-3 py-1 rounded-full text-xs font-medium">
                            <Star className="w-3 h-3" />
                            Expert Judge
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Remote judges */}
                {remoteJudges.map((judge, id) => {
                  const imageSrc = "/images/nesa-mg.png";

                  return (
                    <motion.div
                      key={`remote-${id}`}
                      className="flex-shrink-0 w-80 lg:w-96 group cursor-pointer"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border border-primaryGold/20 group-hover:border-primaryGold/40 transition-all duration-300">
                        <Image
                          src={imageSrc}
                          alt={judge.full_name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-primaryGold/30 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                              {judge.full_name}
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                              {judge.reason}
                            </p>

                            {/* Badge */}
                            <div className="mt-3 inline-flex items-center gap-2 bg-primaryGold/20 text-primaryGold px-3 py-1 rounded-full text-xs font-medium">
                              <Star className="w-3 h-3" />
                              Expert Judge
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <motion.button
                  onClick={moveLeft}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous judges"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  onClick={moveRight}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next judges"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Judges;