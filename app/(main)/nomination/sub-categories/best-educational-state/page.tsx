"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import NominationPage from '@/components/UI/nomination/nominate';
import { useRouter } from 'next/navigation';
interface Category {
  title: string;
  description: string;
  image: string;
}

const EducationalFriendlyStatePage = () => {
const router = useRouter();

  const categories: Category[] = [
    {
      title: "Overall Best Educational friendly state in Nigeria 2024",
      description: "This award aims to celebrate and recognize educational excellence across the African continent. The Best EduTech Organization in Nigeria and Africa 2024 award acknowledges the significant contributions of EduTech organizations that have leveraged technology to enhance educational experiences and outcomes. This award highlights the innovative approaches and technological solutions that EduTech organizations have implemented to address educational challenges and improve the quality of education in Nigeria and across Africa.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Education Initiative in North Central Zone Award",
      description: "This award assesses how effectively states allocate and utilize their educational budget to enhance infrastructure, resources, educator...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Education Initiative in North East Zone Award",
      description: "Recognizes states that have made significant contributions to integrating STEM education and technology into their educational systems.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Education Initiative in North West Zone Award",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Education Initiative in South East Zone Award",
      description: "This award assesses how effectively states allocate and utilize their educational budget to enhance infrastructure, resources, educator...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Education Initiative in South South Zone Award",
      description: "Recognizes states that have made significant contributions to integrating STEM education and technology into their educational systems.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Education Initiative in South West Zone Award",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  const handleNominate = (category: Category) => {
  router.push(
    `/nominateform?type=${encodeURIComponent("Best Educational-Friendly State (Nigeria's Six Zones)")}` +
    `&title=${encodeURIComponent(category.title)}` +
    `&description=${encodeURIComponent(category.description)}` +
    `&image=${encodeURIComponent(category.image)}`
  );
};


  return (
    <div className="min-h-screen bg-[#FFF5E0]">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-24 px-8">
        <div className="absolute inset-0 bg-[url('/images/Herosection.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-2xl mb-2 md:mt-16 text-center">Category 6</h2>
          <h1 className="text-3xl font-bold text-[#FFC247] mb-4 text-center">{categories[currentIndex].title}</h1>
          <p className="mb-8 text-center">
            {categories[currentIndex].description}
          </p>
        </div>
       
        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {categories.map((_, index) => (
            <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#FFC247]' : 'bg-white'}`}></div>
          ))}
        </div>
        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button onClick={prevSlide} className="p-2 rounded transition bg-[#FFC247]">
            <IoMdArrowBack size={24} color="#191307" />
          </button>
          <button onClick={nextSlide} className="p-2 rounded transition bg-[#FFC247]">
            <IoMdArrowForward size={24} color="#191307" />
          </button>
        </div>
      </div>
         {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          The Educational Friendly State Award Sub-Categories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(1).map((category, index) => (
            <div key={index} className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col">
              <div className="relative h-60 flex items-center justify-center p-6">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-white text-xl font-bold mb-2">{category.title}</h4>
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <button
                    onClick={() => router.push(`/nominees?category=${encodeURIComponent("Overall best educational friendly state in Nigeria 2024")}&subcategory=${encodeURIComponent(category.title)}`)}
                    className="w-full bg-transparent text-[#FFC247] py-2.5 rounded-lg hover:bg-[#33270E] transition-all duration-300 border-2 border-[#FFC247] font-medium tracking-wide flex items-center justify-center group"
                  >
                    <span className="mr-2 text-lg">👁️</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">See Existing Nominees</span>
                  </button>
                  <button
                    onClick={() => handleNominate(category)}
                    className="w-full py-2.5 rounded-lg font-medium text-[#191307] hover:shadow-[0_0_15px_rgba(255,194,71,0.5)] transition-all duration-300 bg-gradient-to-r from-[#FFC247] to-[#E48900] flex items-center justify-center group"
                  >
                    <span className="mr-2 text-lg">🏆</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Nominate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose and Benefits Section */}
      <div className="bg-white w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="mb-4">
              To recognize and celebrate the exemplary efforts of state governments in advancing educational policies and
              initiatives. This award honors states that significantly impact the educational sector through innovative
              practices, improved access, and quality of education, aligning with national education goals and the
              Sustainable Development Goals (SDGs).
            </p>
          </div>

          <div>
            <h2 className="text-3xl mb-6 relative inline-block">
              Benefits
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Awardees:</strong> It allows state governments and their Ministries of Education receive national recognition for their
                  educational initiatives, it increases opportunities for funding and partnerships to support further educational
                  development, and policymakers, and provides positive publicity and enhanced reputation for the winning states.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Nigeria and Africa:</strong> It encourages states to prioritize education, leading to improved educational infrastructure
                  and resources, it empowers communities through better education, contributing to social and economic
                  development, and it inspires other organizations to contribute to educational technology, creating a ripple effect
                  across various sectors.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default EducationalFriendlyStatePage;
