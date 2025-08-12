"use client";
import React from "react";
import Image from "next/image";

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  message = "Loading NESA Africa..."
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1a140b] to-[#2a1f15]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/headhero.png')] bg-cover bg-center" />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">

        {/* Logo with Animation */}
        <div className="relative">
          {/* Outer Pulsing Ring */}
          <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-deepGold/30 animate-pulse" />

          {/* Middle Rotating Ring */}
          <div className="absolute inset-2 w-28 h-28 rounded-full border-2 border-deepGold/50 border-t-deepGold animate-spin" />

          {/* Central Logo */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <Image
              src="/images/nesa-mg.png"
              alt="NESA Africa"
              width={120}
              height={120}
              className="object-contain drop-shadow-2xl animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-deepGold font-raleway animate-pulse">
            {message}
          </h2>

          {/* Animated Progress Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-deepGold rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm md:text-base font-poppins animate-pulse">
            Honoring African Champions in Education
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-deepGold to-yellow-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
