"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt, FaAward, FaTrophy, FaUsers, FaTicketAlt } from 'react-icons/fa';


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

        const targetDate = new Date(targetDateProp).getTime();
        // console.log(targetDate) returns NaN with 2025-4-30T10:00:00Z

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

  const timelineEvents = [
    { title: "Nominations Open", subtitle: "(Open Now)", status: "active" },
    { title: "Public Voting Begins", subtitle: "June 2025", status: "upcoming" },
    { title: "Judging Process", subtitle: "July-Aug 2025", status: "upcoming" },
    { title: "Award Gala Ceremony", subtitle: "September 2025", status: "upcoming" }
  ];

  return (
    <section className="relative bg-black py-6 sm:py-8 lg:py-12 overflow-hidden">
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
        className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Mobile-Optimized Timeline */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <FaClock className="text-[#ea580c] text-base sm:text-lg" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
              {(() => {
                const totalDays = Math.floor((new Date(targetDateProp).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const weeks = Math.floor(totalDays / 7);
                const remainingDays = totalDays % 7;
                const targetDate = new Date(targetDateProp);
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                  "July", "August", "September", "October", "November", "December"];

                // Fix grammar for singular/plural
                const weeksText = weeks === 1 ? "week" : "weeks";
                const daysText = remainingDays === 1 ? "day" : "days";

                return `${weeks} ${weeksText} ${remainingDays} ${daysText} ${targetDate.getDate()} ${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
              })()}
            </h2>
          </div>

          {/* Responsive Timeline */}
          <div className="relative">
            {/* Mobile Timeline - Vertical Stack */}
            <div className="block sm:hidden space-y-3 mb-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    event.status === 'active' ? 'bg-[#ea580c] shadow-lg shadow-[#ea580c]/50' : 'bg-white/30'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{event.title}</div>
                    <div className="text-xs text-white/60">{event.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline - Horizontal */}
            <div className="hidden sm:flex justify-center items-start gap-4 lg:gap-8 text-sm text-white/70 mb-6 relative">
              {/* Connecting Line */}
              <div className="absolute top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ea580c]/20 to-transparent"></div>

              {timelineEvents.map((event, index) => (
                <div key={index} className="text-center relative z-10 flex-1 max-w-32">
                  <div className={`w-2 h-2 rounded-full mx-auto mb-2 relative ${
                    event.status === 'active' ? 'bg-[#ea580c] shadow-lg shadow-[#ea580c]/50' : 'bg-white/30'
                  }`}></div>
                  <div className="font-medium text-white text-xs lg:text-sm">{event.title}</div>
                  <div className="text-xs text-white/60">{event.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Countdown */}
        <div className="text-center">
          {!isExpired ? (
            <>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-[#ea580c]/20 p-4 sm:p-6 mb-6">
                <h3 className="text-white text-base sm:text-lg font-semibold mb-4 leading-tight">
                  The Live Award Ceremony Begins In:
                </h3>

                {/* Mobile-First Countdown Grid */}
                <div className="grid grid-cols-2 sm:flex sm:justify-center sm:items-center gap-3 sm:gap-4 lg:gap-6">
                  {[
                    { value: days, label: 'Days' },
                    { value: hours, label: 'Hours' },
                    { value: minutes, label: 'Minutes' },
                    { value: seconds, label: 'Seconds' }
                  ].map((item, index) => (
                    <div key={index} className="text-center bg-black/20 rounded-lg p-2 sm:bg-transparent sm:p-0">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#ea580c] mb-1">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-white/60 text-xs sm:text-sm font-medium">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/tickets">
                <motion.button
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#FFB92E] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base min-h-[44px] w-full sm:w-auto max-w-xs sm:max-w-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Get your ticket for NESA Africa 2025"
                >
                  <FaTicketAlt className="text-sm flex-shrink-0" />
                  <span className="whitespace-nowrap">Get Your Gala Ticket</span>
                </motion.button>
              </Link>
            </>
          ) : (
            <div className="bg-gradient-to-r from-[#ea580c] to-[#FFB92E] text-white text-lg sm:text-xl lg:text-2xl font-bold py-4 sm:py-6 px-4 sm:px-8 rounded-xl shadow-lg">
              The NESA Africa 2025 Awards Have Begun!
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};


export default CountdownTimer;