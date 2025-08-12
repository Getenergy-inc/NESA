import React, { useState } from 'react';
import Image from 'next/image';

const WhatWeDo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const initiatives = [
    {
      title: "Educational Programs and Initiatives",
      description: "We develop and deploy educational programs that range from basic literacy to advanced digital skills. Our initiatives are tailored to meet local needs and delivered through collaborations with local communities, government and international partners."
    },
    {
      title: "Technology Integration In Education",
      imagePath: "/images/bg/card0.png"
    },
    {
      title: "Research and Development",
      imagePath: "/images/bg/card1.png"
    },
    {
      title: "Community Outreach",
      description: "We engage with local communities to understand their unique educational needs and challenges, ensuring our programs have a lasting impact."
    },
    {
      title: "Teacher Training",
      imagePath: "/images/bg/card0.png"
    },
    {
      title: "Curriculum Development",
      imagePath: "/images/bg/card1.png"
    },
    {
      title: "Digital Literacy",
      description: "Our programs focus on equipping students with essential digital skills to prepare them for the modern workforce."
    },
    {
      title: "STEM Education",
      imagePath: "/images/bg/card0.png"
    }
  ];

  const totalSlides = Math.ceil(initiatives.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="bg-black text-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-4 md:mb-8 relative">
          <h2 className="font-medium text-2xl md:text-3xl">What We Do</h2>
          <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-1 w-24 md:w-36 absolute -bottom-2 left-0"></span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-medium mb-4 bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
          Learn About Our Work
        </h1>
        
        <p className="text-base md:text-lg font-weight-500px mb-6 md:mb-8">
          Addressing Educational Challenges In a country facing infrastructural deficits, outdated curricula,
          and educator motivation issues, NESA Africa strives to encourage government bodies, NGOs, UN
          agencies, CSR initiatives, and private entities to play pivotal roles in improving education.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {initiatives.slice(currentSlide * 3, (currentSlide * 3) + 3).map((initiative, index) => (
            <div key={index} className="rounded-lg overflow-hidden h-80 w-full">
              {initiative.description ? (
                <div className="bg-[#fadda9] text-darkGold p-4 md:p-6 h-full flex flex-col justify-between">
                  <h3 className="font-bold text-lg md:text-xl mb-2">{initiative.title}</h3>
                  <p className="text-sm md:text-base">{initiative.description}</p>
                </div>
              ) : (
                <div className="relative h-full">
                  {initiative.imagePath && typeof window !== "undefined" ? (
                    <Image src={initiative.imagePath} alt={initiative.title} layout="fill" objectFit="cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-400"></div> // Placeholder or fallback for undefined imagePath or SSR/SSG
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                    <h3 className="font-semibold text-lg md:text-xl">{initiative.title}</h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div key={index} className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentSlide ? 'bg-[#FFC247]' : 'bg-white'}`}></div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button onClick={prevSlide} className="p-2 md:p-3 rounded-xl bg-white text-black">
              ←
            </button>
            <button onClick={nextSlide} className="p-2 md:p-3 rounded-xl bg-[#FFC247] text-black">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
