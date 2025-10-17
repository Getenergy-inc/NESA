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
  const [showPopup, setShowPopup] = useState(false);
   
  // Set mounted state after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show popup after a short delay on every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); // 2 second delay
    return () => clearTimeout(timer);
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

  // Auto-close popup after 30 seconds
  useEffect(() => {
    if (!showPopup) return;
    const timer = setTimeout(() => setShowPopup(false), 30000);
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

    <header className="relative w-full overflow-hidden pt-6 mt-0 bg-darkBrown" ref={heroRef} style={{ marginTop: '-1px', zIndex: 0 }}>
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
          {/* We create just 3 instances with carefully calculated delays to ensure continuous flow without overlap */}
          {[0, 13.33, 26.66].map((delay, index) => (
            <div 
              key={index}
              className={styles.marqueeContent} 
              aria-hidden={index !== 0 ? "true" : undefined}
              style={{ animationDelay: `${delay}s` }}
            >
              <span className={styles.announcementTag}>ANNOUNCEMENT</span>
              <p className={styles.announcementText}>
                Honoring Africa's Changemakers Building the Future of Education
                <span className={styles.mobileHidden}> — Nomination Starts from November, 2025</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-4 pb-12 md:pt-8 md:pb-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
          initial={isMounted ? "hidden" : false}
          animate={isMounted ? "visible" : false}
          variants={isMounted ? containerVariants : undefined}
        >
          {/* Left Column - Text Content */}
          <div className="space-y-5 md:space-y-8 text-center lg:text-left">
            {/* Headline with animated reveal - optimized for mobile */}
            <motion.h1 
              className="text-3xl md:text-5xl font-extrabold leading-[1.2] md:leading-tight tracking-tight"
              variants={itemVariants}
            >
              <span className={styles.gradientText}>
                Honoring Africa's Changemakers
              </span>
              <span className="block text-white mt-2 md:mt-2">
                Building the Future of Education
              </span>
            </motion.h1>
            
            {/* Accent Line */}
            <motion.div 
              className={`${styles.accentLine} mx-auto lg:mx-0`}
              variants={itemVariants}
            ></motion.div>
            
            {/* Description - Desktop only */}
            <motion.p
              className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left hidden md:block"
              variants={itemVariants}
            >
              After <span className="text-primaryGold font-semibold">15 years</span> of vision and unwavering commitment — <strong className="text-primaryGold">NESA-Africa 2025</strong> emerges as the continent's highest platform for honoring those rebuilding African education from the ground up.
            </motion.p>
            
            {/* CTA Buttons with smaller mobile layout */}
            <motion.div 
              className="flex flex-row gap-2 md:gap-3 justify-center lg:justify-start mt-5 md:mt-8"
              variants={itemVariants}
            >
              <motion.button 
                className={`${styles.primaryButton}`}
                onClick={() => setIsModalOpen(true)}
                aria-label="Read more about NESA Africa"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaPlay className="h-3 w-3 md:h-5 md:w-5" />
                <span className="hidden md:inline">Read More About NESA</span>
                <span className="md:hidden text-xs">Read More</span>
              </motion.button>
              
              <Link href="/get-involved/nomination" passHref>
                <motion.button 
                  className={`${styles.secondaryButton}`}
                  aria-label="Nominate someone for NESA Africa awards"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaTrophy className="h-3 w-3 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Nominate Now</span>
                  <span className="md:hidden text-xs">Nominate</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column - Enhanced Carousel - Responsive on all devices */}
          <motion.div
            className={`${styles.carouselContainer}`}
            variants={itemVariants}
          >
            <div className={styles.carouselWrapper}>
              {/* Using the existing HeroCarousel component */}
              <HeroCarousel />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Quick Action Buttons - Spread out with more spacing and edge-to-edge layout */}
        <motion.div 
          className="w-full bg-darkBrown/90 backdrop-blur-sm border-t border-b border-primaryGold/20 py-3 mt-5 relative z-40"
          variants={isMounted ? quickActionVariants : undefined}
          initial={isMounted ? "hidden" : false}
          animate={isMounted ? "visible" : false}
        >
          <div className="w-[95%] md:w-[90%] mx-auto px-0.5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {/* Refer a Friend */}
              <div>
                <Link href="/get-involved/refer" passHref className="block w-full h-full">
                  <motion.div
                    className={`${styles.mobileActionButton} ${styles.quickActionPrimary}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <FaUserFriends className="text-sm md:text-base" />
                    <span className="text-xs md:text-xs font-medium">Refer</span>
                  </motion.div>
                </Link>
              </div>
              
              {/* Nominate Now */}
              <div>
                <Link href="/get-involved/nomination" passHref className="block w-full h-full">
                  <motion.div
                    className={`${styles.mobileActionButton} ${styles.quickActionPrimary} ring-1 ring-primaryGold/10`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <FaTrophy className="text-sm md:text-base" />
                    <span className="text-xs md:text-xs font-medium">Nominate</span>
                  </motion.div>
                </Link>
              </div>
              
              {/* Get Gala Tickets */}
              <div>
                <Link href="/events/gala-tickets" passHref className="block w-full h-full">
                  <motion.div
                    className={`${styles.mobileActionButton} ${styles.quickActionSecondary}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <FaTicketAlt className="text-sm md:text-base" />
                    <span className="text-xs md:text-xs font-medium">Tickets</span>
                  </motion.div>
                </Link>
              </div>
              
              {/* Watch NESA TV */}
              <div>
                <Link href="/nesa-tv" passHref className="block w-full h-full">
                  <motion.div
                    className={`${styles.mobileActionButton} ${styles.quickActionSecondary}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <FaPlay className="text-sm md:text-base" />
                    <span className="text-xs md:text-xs font-medium">Watch</span>
                  </motion.div>
                </Link>
              </div>
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