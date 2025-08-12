"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Users, Globe, Trophy } from "lucide-react";
import Button from "@/components/Common/Button";

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonAction: () => void;
  bgGradient: string;
  bgImage: string;
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "Award Categories",
      description: "Discover the diverse categories celebrating excellence across African education systems.",
      icon: <Award size={48} className="text-deepGold" />,
      buttonText: "View Categories",
      buttonAction: () => console.log("Navigate to categories"),
      bgGradient: "from-blue-900/30 to-purple-900/30",
      bgImage: "/images/award-dinner.png"
    },
    {
      id: 2,
      title: "Join the Movement",
      description: "Become part of Africa's largest education recognition platform and make your voice heard.",
      icon: <Users size={48} className="text-deepGold" />,
      buttonText: "Get Involved",
      buttonAction: () => console.log("Navigate to get involved"),
      bgGradient: "from-green-900/30 to-teal-900/30",
      bgImage: "/images/getinvolved1.png"
    },
    {
      id: 3,
      title: "Global Impact",
      description: "Connecting African education leaders with global opportunities and recognition.",
      icon: <Globe size={48} className="text-deepGold" />,
      buttonText: "Learn More",
      buttonAction: () => console.log("Navigate to impact"),
      bgGradient: "from-orange-900/30 to-red-900/30",
      bgImage: "/images/globe_nesa.png"
    },
    {
      id: 4,
      title: "Gala Event 2025",
      description: "Join us for the most prestigious education awards ceremony in Africa.",
      icon: <Trophy size={48} className="text-deepGold" />,
      buttonText: "Get Tickets",
      buttonAction: () => console.log("Navigate to tickets"),
      bgGradient: "from-purple-900/30 to-pink-900/30",
      bgImage: "/images/bg/award-dinner.jpg"
    },
    {
      id: 5,
      title: "Nomination Platform",
      description: "Nominate your education champions and help shape the future of African education.",
      icon: <Users size={48} className="text-deepGold" />,
      buttonText: "Nominate Now",
      buttonAction: () => console.log("Navigate to nomination"),
      bgGradient: "from-blue-900/30 to-purple-900/30",
      bgImage: "/images/bg/award-dinner.jpg"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[450px] bg-gradient-to-br from-[#1a140b] to-[#2a1f15] rounded-2xl overflow-hidden border border-deepGold/20 shadow-2xl group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${slides[currentSlide].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Background overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient} bg-black/60`} />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mb-6"
            >
              {slides[currentSlide].icon}
            </motion.div>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4 font-raleway"
            >
              {slides[currentSlide].title}
            </motion.h3>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button
                text={slides[currentSlide].buttonText}
                onClick={slides[currentSlide].buttonAction}
                className="bg-deepGold text-black hover:bg-white hover:text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-deepGold scale-110' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 bg-deepGold rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
