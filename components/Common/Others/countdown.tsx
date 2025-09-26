"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt, FaTicketAlt, FaArrowRight } from 'react-icons/fa';

// Define the CountdownTimerProps interface
interface CountdownTimerProps {
  onTimeUpdate: (time: { days: number; hours: number; minutes: number }) => void;
  targetDateProp: string; 
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onTimeUpdate, targetDateProp }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix for hydration issues - only run animations on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const targetDate = new Date(targetDateProp).getTime();

    // Check if date is valid
    if (isNaN(targetDate)) {
      console.error('Invalid target date:', targetDateProp);
      setIsExpired(true);
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsExpired(true);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      onTimeUpdate({ days, hours, minutes });
    };

    // Initial update
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDateProp, onTimeUpdate]);

  // Format the target date for display
  const formatTargetDate = () => {
    try {
      const targetDate = new Date(targetDateProp);
      if (isNaN(targetDate.getTime())) return "Coming Soon";
      
      const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
      
      return `${targetDate.getDate()} ${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Coming Soon";
    }
  };

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for countdown items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const timelineEvents = [
    { title: "Nominations Open", subtitle: "(Open Now)", status: "active" },
    { title: "Public Voting Begins", subtitle: "June 2025", status: "upcoming" },
    { title: "Judging Process", subtitle: "July-Aug 2025", status: "upcoming" },
    { title: "Award Gala Ceremony", subtitle: "September 2025", status: "upcoming" }
  ];

  // Determine active timeline step
  const activeStep = timelineEvents.findIndex(event => event.status === "active");

  return (
    <section className="relative bg-black py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/headhero.png"
          alt="NESA Africa background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Use conditional rendering to prevent hydration mismatch */}
      {isMounted ? (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Event Date Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-4 sm:mb-6 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[#ea580c]/20">
              <FaCalendarAlt className="text-[#ea580c] text-base sm:text-lg" />
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                NESA Africa Awards Gala • {formatTargetDate()}
              </h2>
            </div>

            {/* Responsive Timeline */}
            <div className="relative max-w-3xl mx-auto">
              {/* Mobile Timeline - Horizontal Scrollable */}
              <div className="block sm:hidden mb-8 overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex space-x-3 min-w-max">
                  {timelineEvents.map((event, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col items-center text-center p-3 rounded-lg transition-all w-28 ${
                        event.status === 'active' ? 'bg-[#ea580c]/10 border border-[#ea580c]/30' : 'border border-white/10'
                      }`}
                    >
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                          event.status === 'active' ? 'bg-[#ea580c] shadow-lg shadow-[#ea580c]/50' : 
                          index < activeStep ? 'bg-green-500' : 'bg-white/30'
                        }`}
                      >
                        {index < activeStep ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className={`font-medium text-xs ${event.status === 'active' ? 'text-[#ea580c]' : 'text-white'}`}>
                        {event.title}
                      </div>
                      <div className="text-xs text-white/70 mt-1">{event.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Timeline - Horizontal */}
              <div className="hidden sm:block mb-10">
                <div className="flex justify-between items-start relative">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full"></div>
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute top-4 left-0 h-1 bg-gradient-to-r from-[#ea580c] to-[#FFB92E] rounded-full" 
                    style={{ width: `${(activeStep / (timelineEvents.length - 1)) * 100}%` }}
                  ></div>

                  {timelineEvents.map((event, index) => (
                    <div key={index} className="text-center relative z-10 px-2 w-1/4">
                      <div 
                        className={`w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center border-2 ${
                          event.status === 'active' ? 'border-[#ea580c] bg-[#ea580c]/20 shadow-lg shadow-[#ea580c]/30' : 
                          index < activeStep ? 'border-green-500 bg-green-500/20' : 'border-white/30 bg-black/50'
                        }`}
                      >
                        {index < activeStep ? (
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className={`font-medium text-sm lg:text-base ${event.status === 'active' ? 'text-[#ea580c]' : 'text-white'}`}>
                        {event.title}
                      </div>
                      <div className="text-xs text-white/70 mt-1">{event.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Countdown */}
          <div className="text-center">
            {!isExpired ? (
              <>
                <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl border border-[#ea580c]/20 p-4 sm:p-8 mb-8 max-w-4xl mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ea580c]/10 to-transparent"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#FFB92E]/10 blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#ea580c]/10 blur-3xl"></div>
                  <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-8 leading-tight relative z-10">
                    The Live Award Ceremony Begins In:
                  </h3>

                  {/* Improved Countdown Grid - Better for mobile */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
                    {[
                      { value: days, label: 'Days' },
                      { value: hours, label: 'Hours' },
                      { value: minutes, label: 'Minutes' },
                      { value: seconds, label: 'Seconds' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="text-center"
                        variants={itemVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="bg-gradient-to-b from-black/80 to-black/40 rounded-xl p-3 sm:p-4 border border-[#ea580c]/20 shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#ea580c]/5 to-transparent"></div>
                          <div className="text-3xl sm:text-3xl lg:text-5xl font-bold text-[#ea580c] mb-1 sm:mb-2 relative z-10">
                            {item.value.toString().padStart(2, '0')}
                          </div>
                          <div className="text-white text-xs sm:text-sm font-medium relative z-10">
                            {item.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 relative z-10">
                    <Link href="/tickets" className="inline-block w-full sm:w-auto">
                      <motion.button
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#ea580c] to-[#FFB92E] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-base w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Get your ticket for NESA Africa 2025"
                      >
                        <FaTicketAlt className="text-base flex-shrink-0" />
                        <span className="whitespace-nowrap">Get Your Gala Ticket</span>
                      </motion.button>
                    </Link>
                    <Link href="/schedule" className="inline-block w-full sm:w-auto">
                      <motion.button
                        className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-base border border-white/20 w-full hover:bg-white/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="View event schedule"
                      >
                        <FaCalendarAlt className="text-base flex-shrink-0" />
                        <span className="whitespace-nowrap">View Schedule</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-r from-[#ea580c] to-[#FFB92E] text-white text-base sm:text-lg font-bold py-4 sm:py-5 px-5 sm:px-8 rounded-xl shadow-lg max-w-md mx-auto flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>The NESA Africa 2025 Awards Have Begun!</span>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        // Static version for server-side rendering to prevent hydration mismatch
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Static content that matches the structure but without animations */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-4 sm:mb-6 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[#ea580c]/20">
              <FaCalendarAlt className="text-[#ea580c] text-base sm:text-lg" />
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                NESA Africa Awards Gala • {formatTargetDate()}
              </h2>
            </div>
            
            {/* Static timeline and countdown content */}
            <div className="relative max-w-3xl mx-auto">
              {/* Static timeline content */}
            </div>
          </div>
          
          {/* Static countdown content */}
          <div className="text-center">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl border border-[#ea580c]/20 p-6 sm:p-8 mb-8 max-w-4xl mx-auto">
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 leading-tight">
                The Live Award Ceremony Begins In:
              </h3>
              
              {/* Static countdown grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
                {[
                  { value: days, label: 'Days' },
                  { value: hours, label: 'Hours' },
                  { value: minutes, label: 'Minutes' },
                  { value: seconds, label: 'Seconds' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-b from-black/80 to-black/40 rounded-xl p-3 sm:p-4 border border-[#ea580c]/20 shadow-lg relative overflow-hidden">
                      <div className="text-3xl sm:text-3xl lg:text-5xl font-bold text-[#ea580c] mb-1 sm:mb-2 relative z-10">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-white text-xs sm:text-sm font-medium relative z-10">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CountdownTimer;