"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation';
import NominationPage from '@/components/UI/nomination/nominate';

interface Category {
  title: string;
  description: string;
  image: string;
}
const NGOAwardCategoryPage = () => {
  
  const router = useRouter();
  
  const subcategories: Category[] = [
    {
      title: "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024",
      description: "This award aims to celebrate and recognize educational excellence across Africa. The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024 Award is dedicated to highlighting the outstanding efforts of non-governmental organizations (NGOs) that have made significant contributions to improving education in Nigeria. This award will honor NGOs that have demonstrated exceptional commitment, innovation, and impact in their educational initiatives.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Educational Infrastructure Initiative By An NGO",
      description: "This award honors NGOs that have made substantial effort in improving or building educational infrastructure. It includes initiatives like constructing schools, libraries, and other educational facilities.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Exceptional Donation Of Educational Materials By An NGO",
      description: "Recognizing NGOs that have significantly contributed educational material to schools and educational institutions like books, computers, and other learning resources.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Outstanding Donation Of Education Aid By NGO",
      description: "Celebrates NGOs that provide substantial educational aid, which can include scholarships, funding for educational programs, support for teachers, and other forms of financial assistance.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Youth Empowerment Through Educational Services by an NGO in Nigeria",
      description: "Recognizes NGOs that have implemented innovative programs to empower youth through education and skill development.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Women and Girls' Empowerment in Education by an NGO in Nigeria",
      description: "Honors NGOs that have made significant contributions to empowering women and girls through educational initiatives.",
      image: "/images/nesa-card2.png"
    },

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subcategories.length);
  }, [subcategories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + subcategories.length) % subcategories.length);
  }, [subcategories.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  
  const handleNominate = (category: Category) => {
  router.push(
    `/nominateform?type=${encodeURIComponent("Best NGO Contribution to Achieving")}` +
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
          <h2 className="text-2xl mb-2 md:mt-16 text-center">Category 1</h2>
          <h1 className="text-4xl font-bold text-[#FFC247] mb-4 text-center">{subcategories[currentIndex].title}</h1>
          <p className="mb-8 text-center">
            {subcategories[currentIndex].description}
          </p>
        </div>
        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {subcategories.map((_, index) => (
            <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#FFC247]' : 'bg-white'}`}></div>
          ))}
        </div>
        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button onClick={prevSlide} className="p-2 rounded transition" style={{ background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)' }}>
            <IoMdArrowBack size={32} color="#191307" />
          </button>
          <button onClick={nextSlide} className="p-2 rounded transition" style={{ background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)' }}>
            <IoMdArrowForward size={32} color="#191307" />
          </button>
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
              To acknowledge the contributions of EduTech organizations that have leveraged technology to enhance
              educational experiences and outcomes in Nigeria and across Africa. This award aims to promote further
              innovation and investment in educational technology, highlighting the importance of EduTech in achieving
              educational excellence.
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
                  <strong>Awardees:</strong> It would provide enhanced visibility and credibility in the NGO and education sectors, opportunities for
                  networking and collaboration with other educational leaders and stakeholders, potential for increased funding
                  and support for their initiatives, and national recognition and prestige.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Nigeria and Africa:</strong> It improves quality of education and student outcomes in Nigeria, and encourages the best
                  practices and innovations in the NGO sector and increases progress towards achieving the SDGs related to
                  education.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          The NGO Award Sub-Categories
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FFC247]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.slice(1).map((category, index) => (
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
                  <h3 className="text-white text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                </div>
                <button
                  onClick={() => handleNominate(category)}
                  className="w-full bg-[#FFC247] text-black py-2 rounded font-bold hover:bg-[#FFD277] transition mt-auto"
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

export default NGOAwardCategoryPage;