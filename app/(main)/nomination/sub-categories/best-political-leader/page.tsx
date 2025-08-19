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

const PoliticalLeadersRecognitionPage = () => {
const router = useRouter();

  const subcategories: Category[] = [
    {
      title: "Political Leaders in Nigeria 2024 Recognition Award for the Best Educational Support Services",
      description: "The Political Leaders in Nigeria 2024 Recognition Award for the Best Educational Support Services aims to acknowledge and celebrate political leaders who have made outstanding contributions to the educational sector. This award recognizes those who have significantly impacted education through scholarship programs, infrastructure development, donations, and advocacy for educational reforms. The award seeks to highlight and honor the efforts of political leaders who have demonstrated exceptional commitment to ensuring educational excellence and accessibility across Nigeria.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Outstanding Scholarship Program For Both Vocational And Formal Education A ...",
      description: "This category recognizes political leaders who have initiated or significantly expanded scholarship programs...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Exemplary Infrastructure Development And Donations For Education By A Politician",
      description: "This category honors political leaders who have made substantial investments in educational infrastructure...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Advocacy And Policy Development For Education By A Politician",
      description: "This category honors political leaders who have made substantial investments in educational infrastructure...",
      image: "/images/nesa-card2.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subcategories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + subcategories.length) % subcategories.length);
  };

  

  const handleNominate = (category: Category) => {
  router.push(
    `/nominateform?type=${encodeURIComponent("Best Political Leaders Educational Support Services")}` +
    `&title=${encodeURIComponent(category.title)}` +
    `&description=${encodeURIComponent(category.description)}` +
    `&image=${encodeURIComponent(category.image)}`
  );
};

  return (
    <div className="min-h-screen bg-[#191307]">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-24 px-8">
        <div className="absolute inset-0 bg-[url('/images/Herosection.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-2xl mb-2 md:mt-16 text-center">Special Recognition</h2>
          <h1 className="text-3xl font-bold text-[#FFC247] mb-4 text-center">{subcategories[currentIndex].title}</h1>
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
          <button onClick={prevSlide} className="p-2 rounded transition bg-[#FFC247]">
            <IoMdArrowBack size={24} color="#191307" />
          </button>
          <button onClick={nextSlide} className="p-2 rounded transition bg-[#FFC247]">
            <IoMdArrowForward size={24} color="#191307" />
          </button>
        </div>
      </div>
        {/* Sub-Categories Section */}
      <div className="bg-[#FFF5E0] w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 relative inline-block text-black">
            The Political Leaders in Nigeria 2024 Recognition Award for
            <br />the Best Educational Support Services Sub-categories
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#FFC247]"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subcategories.slice(1).map((category, index) => (
              <div key={index} className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col">
                <div className="h-[220px] flex items-center justify-center p-6">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <button
                      onClick={() => router.push(`/nominees?category=${encodeURIComponent("Political Leaders in Nigeria 2024 Recognition Award for the Best Educational Support Services")}&subcategory=${encodeURIComponent(category.title)}`)}
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
      </div>

      {/* Purpose and Benefits Section */}
      <div className="bg-white w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FFC247]"></span>
            </h2>
            <p className="mb-4">
              The purpose of this award is to recognize and honor political leaders who have shown
              exceptional dedication to improving education in Nigeria. By acknowledging their
              efforts, the award aims to encourage continued support for educational initiatives,
              promote best practices, and inspire other leaders to contribute to the educational
              sector.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Benefits
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FFC247]"></span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Enhances Education Quality: Improves the overall standard of education through recognition and
                  replication of successful initiatives.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Supports National Goals: Aligns with the national education agenda and Sustainable Development Goals
                  (SDGs), contributing to broader socio-economic development.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Encourages Best Practices: Promotes innovative and effective educational practices.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default PoliticalLeadersRecognitionPage;