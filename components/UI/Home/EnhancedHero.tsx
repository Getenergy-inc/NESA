"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaUserFriends, FaTrophy, FaTicketAlt, FaPlay } from "react-icons/fa";
import ReadMoreModal from "@/components/UI/Modal/ReadMoreModal";
import HeroCarousel from "@/components/UI/Carousel/HeroCarousel";
import styles from "./EnhancedHero.module.css";
import { 
  createStaggerContainer, 
  createFadeInVariant, 
  createButtonVariants, 
  createBounceVariant 
} from "@/lib/utils/animation-utils";
import PopupSlider from "@/components/UI/Common/PopupSlider";


const EnhancedHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect for background image
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
   
  // Set mounted state after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Animation variants using utility functions
  const containerVariants = createStaggerContainer(0.15, 0.3);
  const itemVariants = createFadeInVariant("up", 20, 0.6);
  const buttonVariants = createButtonVariants(1.05, -5);
  const bounceVariants = createBounceVariant(10, 1.5);
  
  const quickActionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.8,
      },
    },
  };

   useEffect(() => {
      if (!showPopup) return;
      const timer = setTimeout(() => setShowPopup(false), 30000); // 30 seconds
      return () => clearTimeout(timer);
    }, [showPopup]);
  
  

  return (
    <>
    {typeof showPopup !== 'undefined' && (
      <PopupSlider open={showPopup} onClose={() => setShowPopup(false)} />
    )}
    
          <div className="absolute inset-0 min-h-full w-full pointer-events-none">
            <Image
              src={"/images/headhero.png"}
              alt="hero image"
              fill
              className="object-cover h-full w-full -z-[1]"
            />
          </div>

    <header className="relative w-full overflow-hidden pt-0 mt-0 bg-darkBrown" ref={heroRef} style={{ marginTop: '-1px', zIndex: 0 }}>
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        {isMounted ? (
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/back.jpg')",
              y: parallaxY,
              scale: 1.1,
            }}
          />
        ) : (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/back.jpg')",
              scale: 1.1,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-darkBrown/80 via-darkBrown/70 to-darkBrown/90"></div>
      </div>

      {/* Announcement Banner */}
      <div className="relative z-50 w-full overflow-hidden border-t border-b border-primaryGold/30 backdrop-blur-sm bg-gradient-to-r from-darkBrown/40 via-darkBrown/30 to-darkBrown/40">
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            <div className="flex items-center space-x-3 whitespace-nowrap">
              <span className={styles.announcementTag}>
                ANNOUNCEMENT
              </span>
              <p className={styles.announcementText}>
                Honoring Africa's Changemakers Building the Future of Education
                <span className={styles.mobileHidden}> — Nomination Starts from May 1st, 2025</span>
              </p>
            </div>
          </div>
          <div className={styles.marqueeContent} aria-hidden="true" style={{ animationDelay: "40s" }}>
            <div className="flex items-center space-x-3 whitespace-nowrap">
              <span className={styles.announcementTag}>
                ANNOUNCEMENT
              </span>
              <p className={styles.announcementText}>
                Honoring Africa's Changemakers Building the Future of Education
                <span className={styles.mobileHidden}> — Nomination Starts from May 1st, 2025</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:pt-8 md:pb-24">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          initial={isMounted ? "hidden" : false}
          animate={isMounted ? "visible" : false}
          variants={isMounted ? containerVariants : undefined}
        >
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Headline with animated reveal */}
            <motion.h1 
              className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight"
              variants={itemVariants}
            >
              <span className={styles.gradientText}>
                Honoring Africa's Changemakers
              </span>
              <span className="block text-white mt-2">
                Building the Future of Education
              </span>
            </motion.h1>
            
            {/* Accent Line */}
            <motion.div 
              className={styles.accentLine}
              variants={itemVariants}
            ></motion.div>
            
            {/* Description with improved readability */}
            <motion.p
              className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 md:block hidden"
              variants={itemVariants}
            >
              After <span className="text-primaryGold font-semibold">15 years</span> of vision and unwavering commitment — <strong className="text-primaryGold">NESA-Africa 2025</strong> emerges as the continent's highest platform for honoring those rebuilding African education from the ground up.
            </motion.p>
            
            {/* Quote with improved styling */}
            {/* <motion.blockquote 
              className={styles.quoteBlock}
              variants={itemVariants}
            >
              "The NESA Africa Awards 2025 recognizes visionaries across NGOs, corporations, policy, media, EdTech, philanthropy, and creative sectors who are architecting Africa's education systems."
            </motion.blockquote> */}
            
            {/* Important Note */}
            {/* <motion.div 
              className={styles.warningBlock}
              variants={itemVariants}
            >
              <span className="text-red-400">🛑</span> Not a teacher or student award — it celebrates <span className="text-primaryGold">builders of systems</span>, 
              <span className="text-primaryGold"> advocates of change</span>, and <span className="text-primaryGold"> funders of futures</span>.
            </motion.div> */}
            
            {/* CTA Buttons with improved layout */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
              variants={itemVariants}
            >
              <motion.button 
                className={`${styles.primaryButton} text-sm md:text-base`}
                onClick={() => setIsModalOpen(true)}
                aria-label="Read more about NESA Africa"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaPlay className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden md:inline">Read More About NESA</span>
                <span className="md:hidden">Read More</span>
              </motion.button>
              
              <Link href="/get-involved/nomination" passHref>
                <motion.button 
                  className={`${styles.secondaryButton} text-sm md:text-base`}
                  aria-label="Nominate someone for NESA Africa awards"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaTrophy className="h-4 w-4 md:h-5 md:w-5" />
                  Nominate Now
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column - Enhanced Carousel */}
          <motion.div
            className={styles.carouselContainer}
            variants={itemVariants}
          >
            <div className={styles.carouselWrapper}>
              {/* Using the existing HeroCarousel component */}
              <HeroCarousel />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Quick Action Buttons */}
        <motion.div 
          className="w-full bg-darkBrown/90 backdrop-blur-sm border-t border-b border-primaryGold/20 py-3 mt-8 relative z-40"
          variants={isMounted ? quickActionVariants : undefined}
          initial={isMounted ? "hidden" : false}
          animate={isMounted ? "visible" : false}
        >
          <div className={styles.quickActionGrid}>
            {/* Refer a Friend */}
            <div className="group flex-1 px-2">
              <Link href="/get-involved/refer" passHref>
                <motion.button
                  className={`${styles.quickActionButton} ${styles.quickActionPrimary}`}
                  aria-label="Refer a friend to NESA Africa"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserFriends className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Refer a Friend</span>
                  <span className="md:hidden">Refer</span>
                </motion.button>
              </Link>
            </div>
            
            {/* Nominate Now */}
            <div className="group flex-1 px-2">
              <Link href="/get-involved/nomination" passHref>
                <motion.button
                  className={`${styles.quickActionButton} ${styles.quickActionPrimary} ring-2 ring-primaryGold/20`}
                  aria-label="Nominate someone for NESA Africa awards"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrophy className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Nominate Now</span>
                  <span className="md:hidden">Nominate</span>
                </motion.button>
              </Link>
            </div>
            
            {/* Get Gala Tickets */}
            <div className="group flex-1 px-2">
              <Link href="/events/gala-tickets" passHref>
                <motion.button
                  className={`${styles.quickActionButton} ${styles.quickActionSecondary}`}
                  aria-label="Get tickets for NESA Africa gala"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTicketAlt className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Get Gala Tickets</span>
                  <span className="md:hidden">Tickets</span>
                </motion.button>
              </Link>
            </div>
            
            {/* Watch NESA TV */}
            <div className="group flex-1 px-2">
              <Link href="/media/nesa-tv" passHref>
                <motion.button
                  className={`${styles.quickActionButton} ${styles.quickActionSecondary}`}
                  aria-label="Watch NESA TV content"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Watch NESA TV</span>
                  <span className="md:hidden">Watch</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        {isMounted && (
          <motion.div 
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              variants={bounceVariants}
              initial="initial"
              animate="animate"
              className={styles.bounceAnimation}
            >
              <span className={styles.scrollText}>Explore More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.scrollIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Read More Modal */}
      <ReadMoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
    </>
  );
};

export default EnhancedHero;