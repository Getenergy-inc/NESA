"use client";
import { ChevronRight, Users, Award, Shield, Star, Linkedin, MapPin, Globe, ExternalLink } from "lucide-react";
import Button from "@/components/Common/Button";
import useSlider from "@/lib/hooks/useSlider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { getjudgesapplicants } from "@/lib/services/getjugdesApplicants";
import { useRouter } from "next/navigation";
import { getApprovedJudges } from "@/lib/services/getApprovedJudges";
import { motion, useScroll, useTransform, AnimatePresence, useDragControls } from "framer-motion";
import Image from "next/image";
import styles from "./judges-enhanced.module.css";
import { useHasMounted } from "@/hooks/useHasMounted";

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

const staticJudges: { 
  name: string; 
  role: string; 
  image: string;
  country?: string;
  linkedin?: string;
  specialty?: string;
}[] = [
  {
    name: "Benneth Osarieme Ogbeiwi",
    role: "Head at Adrenaline Entertainment\nFormer Host at MTN Project Fame",
    image: "/images/judg1.png",
    country: "Nigeria",
    specialty: "Entertainment & Media"
  },
  {
    name: "Dr Juliet Ihiabe",
    role: "Executive Director of Family Bond Helping Foundation",
    image: "/images/judg2.png",
    country: "Nigeria",
    specialty: "Philanthropy & Social Impact"
  },
  {
    name: "Paul-Kayode Joash",
    role: "Chief Rainmaker at MyDoubleDouble International",
    image: "/images/judg3.png",
    country: "Nigeria",
    specialty: "Business Development"
  },
  {
    name: "Oluwadaisi Patricia Aderibigbe Santos",
    role: "Educationalist",
    image: "/images/judg4.png",
    country: "Nigeria",
    specialty: "Education"
  },
  {
    name: "Damilola O.",
    role: "QHSSE Manager",
    image: "/images/judg5.png",
    country: "Nigeria",
    specialty: "Quality & Safety"
  }
];

const BACKEND_URL = 'https://res.cloudinary.com/djovn7g8q/';

const Judges = () => {
  const router = useRouter();
  const { sliderRef: ref, moveLeft, moveRight } = useSlider(300); // Smaller scroll amount for better mobile experience
  const [remoteJudges, setRemoteJudges] = useState<Judge[]>([]);
  const [activeJudge, setActiveJudge] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchIndicator, setTouchIndicator] = useState(false);
  const dragControls = useDragControls();
  const hasMounted = useHasMounted();
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // For parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Handle scroll events to update current slide
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    
    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.clientWidth * 0.8; // Approximate card width
    const newSlide = Math.round(scrollPosition / cardWidth);
    
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
      // Show touch indicator animation on slide change
      setTouchIndicator(true);
      setTimeout(() => setTouchIndicator(false), 1000);
    }
  }, [currentSlide]);

  // Handle touch start for mobile
  const handleTouchStart = () => {
    setTouchIndicator(true);
  };

  // Handle touch end for mobile
  const handleTouchEnd = () => {
    setTouchIndicator(false);
  };

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const data = await getApprovedJudges();
        setRemoteJudges(data);
      } catch (err) {
        console.error("Failed to fetch judges:", err);
      }
    };

    fetchJudges();
    
    // Add scroll event listener
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

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

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black py-16 lg:py-24 overflow-hidden"
    >
      {/* Hero Background Image with Parallax */}
      {hasMounted && (
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY, opacity }}
        >
          <Image
            src="/images/headhero.png"
            alt="NESA Africa background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primaryGold/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-deepGold/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full">
            <div className="w-8 h-8 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center">
              <Users className="text-darkBrown text-sm" />
            </div>
            <span className="text-primaryGold text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Our Esteemed Panel
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Meet Our Distinguished Judges
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 px-4 sm:px-6">
              At the New Education Standard Award Africa (NESA-Africa) 2025, our esteemed panel of judges brings together education leaders, innovators, philanthropists, policymakers, and experts across Africa and the diaspora.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 px-4">
              {[
                { icon: <Users className="w-5 h-5" />, number: "50+", label: "Expert Judges" },
                { icon: <Award className="w-5 h-5" />, number: "17", label: "Categories" },
                { icon: <Shield className="w-5 h-5" />, number: "141", label: "Sub-Categories" },
                { icon: <Star className="w-5 h-5" />, number: "100%", label: "Transparency" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statsVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-primaryGold/20 text-center"
                  whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-darkBrown">{stat.icon}</div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/70 text-xs md:text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => router.push("/about-judges")}
              className="inline-flex items-center gap-2 text-primaryGold hover:text-deepGold font-semibold transition-colors duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View all judges"
            >
              <span>See All Judges</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Judges Carousel Section */}
        <motion.div variants={itemVariants} className="relative">
          {/* Enhanced Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryGold/60 to-transparent mb-6"></div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
              Featured Expert Judges
            </h3>
            <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Meet the distinguished professionals who ensure fairness and excellence in our evaluation process
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryGold/60 to-transparent mt-6"></div>
          </div>

          {/* Carousel Container */}
          <div className="relative z-10 px-2">
            {/* Touch indicator for mobile */}
            {touchIndicator && (
              <div className={`${styles.touchIndicator} ${styles.touchIndicatorActive}`}></div>
            )}
            
            <motion.div
              className={`flex items-center gap-4 md:gap-6 overflow-x-auto ${styles.hide_scroll} scroll-smooth pb-4 px-2 -mx-2 ${styles.scrollContainer}`}
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) {
                  moveLeft();
                } else if (info.offset.x < -100) {
                  moveRight();
                }
              }}
            >
              {/* Static judges */}
              {staticJudges.map((judge, id) => (
                <motion.div
                  key={`static-${id}`}
                  className={`flex-shrink-0 w-72 sm:w-80 lg:w-96 group cursor-pointer ${styles.judgeCard}`}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveJudge(id)}
                >
                  <div className="relative h-[28rem] rounded-2xl overflow-hidden shadow-2xl border border-primaryGold/20 group-hover:border-primaryGold/40 transition-all duration-300">
                    <Image
                      src={judge.image}
                      alt={judge.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 ${styles.cardOverlay}`}></div>

                    {/* Top Badge */}
                    <div className={`absolute top-4 right-4 text-darkBrown px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${styles.goldBadge}`}>
                      {judge.specialty || "Expert Judge"}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-primaryGold/30 shadow-lg transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                          {judge.name}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line line-clamp-3 mb-3">
                          {judge.role}
                        </p>

                        {/* Additional Info */}
                        <div className="flex flex-wrap gap-3 mt-2">
                          {judge.country && (
                            <div className="inline-flex items-center gap-1 text-white/70 text-xs">
                              <MapPin className="w-3 h-3 text-primaryGold" />
                              {judge.country}
                            </div>
                          )}
                          {judge.linkedin && (
                            <div className="inline-flex items-center gap-1 text-white/70 text-xs">
                              <Linkedin className="w-3 h-3 text-primaryGold" />
                              LinkedIn
                            </div>
                          )}
                        </div>

                        {/* View Profile Button */}
                        <div className="mt-3 w-full">
                          <button className="w-full text-center text-xs font-medium text-primaryGold hover:text-deepGold bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 rounded-lg transition-colors duration-300">
                            View Full Profile
                          </button>
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
                    className={`flex-shrink-0 w-72 sm:w-80 lg:w-96 group cursor-pointer ${styles.judgeCard}`}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActiveJudge(staticJudges.length + id)}
                  >
                    <div className="relative h-[28rem] rounded-2xl overflow-hidden shadow-2xl border border-primaryGold/20 group-hover:border-primaryGold/40 transition-all duration-300">
                      <Image
                        src={imageSrc}
                        alt={judge.full_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 ${styles.cardOverlay}`}></div>

                      {/* Top Badge */}
                      <div className={`absolute top-4 right-4 text-darkBrown px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${styles.goldBadge}`}>
                        {judge.current_role ? judge.current_role.split(' ')[0] : "Expert Judge"}
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <div className={`bg-white/15 backdrop-blur-md rounded-xl p-4 border border-primaryGold/30 shadow-lg transform transition-transform duration-300 group-hover:translate-y-[-8px] ${styles.cardContent} ${styles.goldGlow}`}>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                            {judge.full_name}
                          </h3>
                          <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-3">
                            {judge.reason || judge.current_role}
                          </p>

                          {/* Additional Info */}
                          <div className="flex flex-wrap gap-3 mt-2">
                            {judge.country && (
                              <div className="inline-flex items-center gap-1 text-white/70 text-xs">
                                <MapPin className="w-3 h-3 text-primaryGold" />
                                {judge.country}
                              </div>
                            )}
                            {judge.linkedin_profile && (
                              <div className="inline-flex items-center gap-1 text-white/70 text-xs">
                                <Linkedin className="w-3 h-3 text-primaryGold" />
                                LinkedIn
                              </div>
                            )}
                          </div>

                          {/* View Profile Button */}
                          <div className="mt-3 w-full">
                            <button className="w-full text-center text-xs font-medium text-primaryGold hover:text-deepGold bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 rounded-lg transition-colors duration-300">
                              View Full Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            {/* Navigation Controls - This was inside the div, but should be outside */}
            <div className="flex justify-center items-center gap-4 mt-6 md:mt-8">
              <motion.button
                onClick={moveLeft}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous judges"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.button>
              <div className="flex space-x-3">
                {[...Array(Math.min(5, staticJudges.length + remoteJudges.length))].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`${styles.navDot} ${i === currentSlide ? styles.active : ''}`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      if (carouselRef.current) {
                        const cardWidth = carouselRef.current.clientWidth * 0.8;
                        carouselRef.current.scrollTo({
                          left: i * cardWidth,
                          behavior: 'smooth'
                        });
                        setCurrentSlide(i);
                      }
                    }}
                  />
                ))}
              </div>
              <motion.button
                onClick={moveRight}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next judges"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.button>
            </div>
            
            {/* Mobile swipe hint */}
            <div className="mt-4 text-center text-white/50 text-xs md:hidden">
              <p>Swipe left or right to see more judges</p>
            </div>
          </div> {/* End of Carousel Container */}

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="mt-12 md:mt-16 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-primaryGold/20 to-deepGold/20 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-primaryGold/30">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Interested in Becoming a Judge?</h4>
              <p className="text-white/70 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                Join our distinguished panel of judges and help recognize excellence in education across Africa.
              </p>
              <Button
                onClick={() => router.push("/judge-nomination")}
                className="bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown hover:from-deepGold hover:to-primaryGold"
              >
                Apply to Become a Judge
              </Button>
            </div>
          </motion.div>
        </motion.div> {/* End of Judges Carousel Section */}
        
        {/* Judge Detail Modal */}
        <AnimatePresence>
        {activeJudge !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveJudge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`${styles.modalContent} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setActiveJudge(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              <div className={`text-center mb-6 pb-4 ${styles.modalHeader}`}>
                <h3 className="text-2xl font-bold text-white">Judge Profile</h3>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <motion.div
                    className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-primaryGold/30 shadow-lg"
                    initial={{ opacity: 0.8, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={activeJudge < staticJudges.length
                        ? staticJudges[activeJudge].image
                        : "/images/nesa-mg.png"}
                      alt="Judge"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </motion.div>
                </div>
                
                <div className="md:w-2/3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-2">
                      {activeJudge < staticJudges.length
                        ? staticJudges[activeJudge].name
                        : remoteJudges[activeJudge - staticJudges.length].full_name}
                    </h4>
                    
                    <p className="text-primaryGold font-medium mb-4">
                      {activeJudge < staticJudges.length
                        ? staticJudges[activeJudge].role.split('\n')[0]
                        : remoteJudges[activeJudge - staticJudges.length].current_role || "Expert Judge"}
                    </p>
                    
                    <div className="space-y-4 text-white/80">
                      <p className="leading-relaxed">
                        {activeJudge < staticJudges.length
                          ? staticJudges[activeJudge].role
                          : remoteJudges[activeJudge - staticJudges.length].reason || "Distinguished professional in the field of education."}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        {(activeJudge < staticJudges.length && staticJudges[activeJudge].country) && (
                          <motion.div
                            className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                          >
                            <MapPin className="w-4 h-4 text-primaryGold" />
                            {staticJudges[activeJudge].country}
                          </motion.div>
                        )}
                        
                        {(activeJudge >= staticJudges.length && remoteJudges[activeJudge - staticJudges.length].country) && (
                          <motion.div
                            className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                          >
                            <MapPin className="w-4 h-4 text-primaryGold" />
                            {remoteJudges[activeJudge - staticJudges.length].country}
                          </motion.div>
                        )}
                        
                        {(activeJudge < staticJudges.length && staticJudges[activeJudge].specialty) && (
                          <motion.div
                            className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                          >
                            <Star className="w-4 h-4 text-primaryGold" />
                            {staticJudges[activeJudge].specialty}
                          </motion.div>
                        )}
                        
                        {(activeJudge < staticJudges.length && staticJudges[activeJudge].linkedin) && (
                          <motion.a
                            href={staticJudges[activeJudge].linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                          >
                            <Linkedin className="w-4 h-4 text-primaryGold" />
                            LinkedIn Profile
                            <ExternalLink className="w-3 h-3 text-white/50" />
                          </motion.a>
                        )}
                        
                        {(activeJudge >= staticJudges.length && remoteJudges[activeJudge - staticJudges.length].linkedin_profile) && (
                          <motion.a
                            href={remoteJudges[activeJudge - staticJudges.length].linkedin_profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                          >
                            <Linkedin className="w-4 h-4 text-primaryGold" />
                            LinkedIn Profile
                            <ExternalLink className="w-3 h-3 text-white/50" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Call to action */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={() => {
                        setActiveJudge(null);
                        router.push("/judge-nomination");
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown hover:from-deepGold hover:to-primaryGold"
                    >
                      Apply to Become a Judge
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div> 
    </section>
  );
};

export default Judges;
