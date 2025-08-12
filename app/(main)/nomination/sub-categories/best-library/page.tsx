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

const BestLibraryAwardPage = () => {
const router = useRouter()

  const categories: Category[] = [
    {
      title: "The best library in Nigerian tertiary institutions award 2024",
      description: "This award is established to recognize and honor libraries in Nigerian tertiary institutions that demonstrate excellence in providing access to information, fostering a culture of reading and research, and supporting academic success. This award celebrates libraries that have implemented innovative services, resources, and programs to enhance the educational experience of students and staff.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best University Library in Nigeria (Public)",
      description: "This award assesses how effectively states allocate and utilize their educational budget to enhance infrastructure, resources, educator...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best University Library in Nigeria (Private)",
      description: "Recognizes states that have made significant contributions to integrating STEM education and technology into their educational systems.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Polytechnic Library in Nigeria (Public)",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best College of Education Library in Nigeria (Public)",
      description: "This award assesses how effectively states allocate and utilize their educational budget to enhance infrastructure, resources, educator...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best College of Nursing Library in Nigeria (Public)",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Polytechnic Library in Nigeria (Private)",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best College of Education Library in Nigeria (Private)",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best College of Nursing Library in Nigeria (Private)",
      description: "Focuses on states that have implemented innovative teaching methods, developed superior school facilities, offered exceptional sports...",
      image: "/images/nesa-card2.png"
    },
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
    `/nominateform?type=${encodeURIComponent("Best Library in Nigerian Tertiary Institutions")}` +
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
          <h2 className="text-2xl mb-2 md:mt-16 text-center">Category 7</h2>
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
          The best library in Nigerian tertiary institutions Award Sub-Categories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(1).map((category, index) => (
            <div key={index} className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col p-6">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={364}
                  height={198}
                  objectFit="contain"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <button
                    onClick={() => router.push(`/nominees?category=${encodeURIComponent("The best library in Nigerian tertiary institutions award 2024")}&subcategory=${encodeURIComponent(category.title)}`)}
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
              To recognize and honor libraries in Nigerian tertiary institutions that demonstrate excellence in providing access to
              information, fostering a culture of reading and research, and supporting academic success. This award celebrates
              libraries that have implemented innovative services, resources, and programs to enhance the educational
              experience of students and staff.
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
                  <strong>Awardees:</strong> Libraries receive national recognition for their excellence and contributions to education, increased
                  opportunities for funding and resources to support further development, sharing of best practices among libraries
                  to promote innovation and excellence. Positive publicity and enhanced reputation for the winning libraries,
                  opportunities for staff professional development and training.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Nigeria and Africa:</strong> Encourages libraries to prioritize innovation and excellence, leading to improved educational
                  resources and services, it empowers students and staff through better access to information and support
                  services, inspires other libraries to adopt successful initiatives and best practices, supports the achievement of the
                  Sustainable Development Goals (SDGs) by enhancing quality education and promoting lifelong learning
                  opportunities.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default BestLibraryAwardPage;
