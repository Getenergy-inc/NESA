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

const InternationalBilateralAwardPage = () => {
  const categories: Category[] = [
    {
      title: "International and Bilateral Contributors to Education in Nigeria Recognition award 2024",
      description: "The Overall Best International and Bilateral Contributors to Education in Nigeria Recognition Award 2024 celebrates the significant contributions of international organizations, bilateral partnerships, and foreign governments to the advancement of education in Nigeria. This award recognizes entities that have demonstrated exceptional commitment and impact through educational programs, funding, partnerships, and initiatives that align with the Sustainable Development Goals (SDGs) and the mission of the Santos Creations Educational Foundation (SCEF) to achieve education for all.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best International Embassy Contribution to Education in Nigeria (2020-2024)",
      description: "This category recognizes political leaders who have initiated or significantly expanded scholarship programs, providing financial support to students in need.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Bilateral Organization Education Support Initiative in Nigeria (2020-2024)",
      description: "This category honors political leaders who have made substantial investments in educational infrastructure, including technology and training programs to enhance teaching and learning capabilities.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best International NGO Education Support Service in Nigeria (2020-2024)",
      description: "This category recognizes political leaders who have fostered significant partnerships and collaborations that have led to improved educational outcomes, including the construction and renovation of schools.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Educational Grant-Giving Organization in Nigeria (2020-2024)",
      description: "This category recognizes political leaders who have fostered significant partnerships and collaborations that have led to improved educational outcomes, including the construction and renovation of schools.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best International Airline Education Support Initiative in Nigeria (2020-2024)",
      description: "This category recognizes political leaders who have fostered significant partnerships and collaborations that have led to improved educational outcomes, including the construction and renovation of schools.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Leadership Training Organization in Nigeria (2020-2024)",
      description: "This category recognizes political leaders who have fostered significant partnerships and collaborations that have led to improved educational outcomes, including the construction and renovation of schools.",
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

  const router = useRouter();

    const handleNominate = (category: Category) => {
  router.push(
    `/nominateform?type=${encodeURIComponent("Best STEM Education Champion Best International & Bilateral Contributors to EducatioN")}` +
    `&title=${encodeURIComponent(category.title)}` +
    `&description=${encodeURIComponent(category.description)}` +
    `&image=${encodeURIComponent(category.image)}`
  );
};

  return (
    <div className="min-h-screen bg-[#FFF5E0]">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-16 px-8">
        <div className="absolute inset-0 bg-[url('/images/Herosection.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-xl mb-2 md:mt-8 text-center">Category 10</h2>
          <h1 className="text-2xl md:text-3xl font-bold text-[#FFC247] mb-3 text-center leading-tight">{categories[currentIndex].title}</h1>
          <p className="mb-6 text-center text-sm md:text-base leading-relaxed">
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

      {/* Purpose and Benefits Section */}
      <div className="bg-[#FFF5E0] w-full">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="mb-4">
              To celebrate the significant contributions of international organizations, bilateral partnerships, and foreign
              governments to the advancement of education in Nigeria. This award recognizes entities that have demonstrated
              exceptional commitment and impact through educational programs, funding, and initiatives that align with the
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
                  <strong>Awardees:</strong> International and bilateral entities receive national recognition for their contributions to education in
                  Nigeria, Increased opportunities for funding and resources to support further educational initiatives and Sharing of
                  best practices among international and bilateral entities to promote innovation and excellence.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Nigeria and Africa:</strong> Encourages international and bilateral entities to prioritize educational support, leading to
                  improved access and quality of education, Empowers communities through better access to resources and
                  educational opportunities, Inspires other entities to adopt successful initiatives and best practices.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          International and Bilateral Contributors to Education Award Sub-categories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(1).map((category, index) => (
            <div key={index} className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col p-6 w-full h-full">
              <div className="flex items-center justify-center mb-4 h-52">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                </div>
                <button
                  onClick={() => handleNominate(category)}
                  className="w-full bg-[#FFC247] text-black py-2 rounded hover:bg-[#FFD277] transition mt-auto"
                >
                  Nominate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternationalBilateralAwardPage;