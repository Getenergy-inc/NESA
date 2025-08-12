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

const IslamicFaithEducationAwardPage = () => {
const router = useRouter();

  const categories: Category[] = [
    {
      title: "Islamic faith organization Educational Champion of the Decade Award in Nigeria 2024",
      description: "The Overall Best Islamic Faith Organization Educational Champion of the Decade Award in Nigeria (2014-2024) aims to recognize and honor Islamic faith-based organizations that have made significant contributions to the educational sector over the past decade. This award celebrates the organizations' efforts in promoting education, particularly among underserved and marginalized communities, and their commitment to achieving educational excellence and accessibility in alignment with the Sustainable Development Goals (SDGs) and the national education agenda of Nigeria.",
      image: "/images/bg/back_.jpeg"
    },
    {
      title: "Best Educational Infrastructure Development by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      description: "Honors Islamic organizations for pioneering educational initiatives and effective community development efforts",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Scholarship Program by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      description: "Commends Islamic organizations for enhancing educational facilities and providing essential resources.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Holistic Educational Support by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      description: "Recognizes Islamic organizations for providing educational aid and emphasizing Islamic ethical teachings.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Advocacy for Educational Reforms and Awareness Campaigns by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      description: "Salutes joint efforts by Christian and Islamic groups to promote interfaith dialogue and understanding through education, fostering a unified approach.",
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
    `/nominateform?type=${encodeURIComponent("Best Faith-Based Organization in Education")}` +
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
          <h2 className="text-xl mb-2 md:mt-8 text-center">Category 12</h2>
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
            <p className="text-sm md:text-base leading-relaxed">
              The purpose of this award is to Recognize and honor the significant contributions of Islamic organizations in the
              educational sector in Nigeria over the past decade, Highlight the diverse ways in which Islamic organizations have
              enhanced educational infrastructure, resources, and moral education and Encourage continued innovation and
              collaboration among Islamic organizations to further improve educational outcomes and community well-being.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block">
              Benefits
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247] flex-shrink-0"></span>
                <div className="text-sm md:text-base">
                  <strong>Awardees:</strong> Gain national recognition, increased opportunities for collaboration, and validation for their
                  contributions to education through Islamic initiatives.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247] flex-shrink-0"></span>
                <div className="text-sm md:text-base">
                  <strong>Nigeria:</strong> Showcases the vital role of Islamic organizations in education, fostering a deeper appreciation and
                  understanding of their contributions to societal development. This recognition also encourages other
                  organizations to engage in similar efforts, promoting a culture of giving and support for education.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 relative inline-block">
          Islamic faith organization Educational Champion Award Sub-Categories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(1).map((category, index) => (
            <div key={index} className="bg-[#191307] rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col p-5 w-full h-full">
              <div className="flex items-center justify-center mb-3 h-40">
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
                  <h3 className="text-white text-lg font-bold mb-2 leading-tight">{category.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm mb-3 leading-relaxed">{category.description}</p>
                </div>
                <button
                  onClick={() => handleNominate(category)}
                  className="w-full bg-[#FFC247] text-black py-2.5 rounded-lg hover:bg-[#FFD277] transition mt-auto font-medium"
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

export default IslamicFaithEducationAwardPage;