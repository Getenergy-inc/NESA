'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedHeroBackgroundProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

const OptimizedHeroBackground: React.FC<OptimizedHeroBackgroundProps> = ({
  src,
  alt,
  className = '',
  priority = true,
  quality = 85
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload the image for better performance
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [src]);

  // Fallback background - neutral color while image loads
  const fallbackStyle = {
    background: '#f3f4f6' // Light gray fallback
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Fallback background */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={fallbackStyle}
      />
      
      {/* Optimized background image */}
      {!imageError && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      )}
      
      {/* Loading indicator */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedHeroBackground;
