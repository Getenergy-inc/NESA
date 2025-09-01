"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large" | "extra-large";
  showText?: boolean;
  text?: string;
  className?: string;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  showText = true,
  text = "Loading...",
  className = "",
  overlay = false
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      container: "w-16 h-16",
      logo: 64,
      text: "text-sm",
      gap: "gap-2"
    },
    medium: {
      container: "w-24 h-24",
      logo: 96,
      text: "text-base",
      gap: "gap-3"
    },
    large: {
      container: "w-32 h-32",
      logo: 128,
      text: "text-lg",
      gap: "gap-4"
    },
    "extra-large": {
      container: "w-48 h-48",
      logo: 192,
      text: "text-xl",
      gap: "gap-6"
    }
  };

  const config = sizeConfig[size];

  // Animation variants
  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear" as const,
        repeat: Infinity,
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        ease: "easeInOut" as const,
        repeat: Infinity,
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut" as const,
        repeat: Infinity,
      }
    }
  };

  const LoadingContent = () => (
    <div className={`flex flex-col items-center justify-center ${config.gap} ${className}`}>
      {/* Spinning Logo Container */}
      <div className="relative">
        {/* Outer glow ring */}
        <motion.div
          className={`absolute inset-0 ${config.container} rounded-full bg-gradient-to-r from-deepGold/20 to-yellow-500/20 blur-sm`}
          variants={pulseVariants}
          animate="animate"
        />
        
        {/* Main spinning logo */}
        <motion.div
          className={`relative ${config.container} flex items-center justify-center`}
          variants={spinVariants}
          animate="animate"
        >
          <Image
            src="/images/nesa-mg.png"
            alt="NESA Loading"
            width={config.logo}
            height={config.logo}
            className="object-contain drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* Inner rotating ring */}
        <motion.div
          className={`absolute inset-2 border-2 border-deepGold/30 border-t-deepGold rounded-full`}
          variants={spinVariants}
          animate="animate"
        />
      </div>

      {/* Loading Text */}
      {showText && (
        <motion.div
          className={`${config.text} font-medium text-deepGold font-raleway tracking-wide`}
          variants={textVariants}
          animate="animate"
        >
          {text}
        </motion.div>
      )}

      {/* Animated dots */}
      {showText && (
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-deepGold rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  // If overlay is true, render with backdrop
  if (overlay) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-deepGold/20 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingContent />
        </motion.div>
      </motion.div>
    );
  }

  // Regular inline spinner
  return <LoadingContent />;
};

export default LoadingSpinner;
