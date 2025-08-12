"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import NominationPage from '@/components/UI/nomination/nominate';

interface Category {
  title: string;
  description: string;
  image: string;
}

const CreativeArtsRecognitionPage = () => {
  const subcategories: Category[] = [
    {
      title: "Best Creative Arts Industry Contribution to Education in Nigeria 2024 for Achieving Education for All",
      description: "The Creative Arts Industry Contribution to Education in Nigeria 2024 award is a prestigious recognition designed to honor and celebrate significant contributions made by individuals and organizations in the creative arts sector to education in Nigeria. This award recognizes the unique power of the arts in promoting education, cultural understanding, and societal development.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Nollywood Production And Artiste For Educational Content Award",
      description: "This category celebrates Nollywood productions and artistes that have created significant educational content...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Music Industry Contribution To Education Award",
      description: "This award honors musicians and organizations in the music industry that have made significant contributions to education, either through educational...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Literature And Art Works For Education Award",
      description: "Recognizes writers, literary organizations, and visual artists whose work has significantly contributed to education, particularly in promoting reading, historical understanding, and...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Visual Arts and Educational Impact Award",
      description: "Celebrates artists and organizations using visual arts to enrich educational content and experiences.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Performing Arts and Education Enrichment Award",
      description: "Honors contributions from the theater, dance, and music sectors in enhancing educational programs.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Film and Media for Educational Advancement Award",
      description: "Recognizes writers, literary organizations, and visual artists whose work has significantly contributed to education, particularly in promoting reading, historical understanding, and...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Creative Advocacy and Educational Campaigns Award",
      description: "Celebrates creative campaigns that advocate for educational reforms and awareness.",
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
    setSelectedCategory(category);
  };

  if (selectedCategory) {
    return <NominationPage type='Creative Arts Industry Contribution to Education (Nigeria)' category={selectedCategory} />;
  }

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

      {/* Purpose and Benefits Section */}
      <div className="bg-white w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FFC247]"></span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Recognize and honor individuals and organizations in the creative arts sector who have made significant contributions to education in Nigeria.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Highlight the importance of the creative arts in enhancing educational content, promoting cultural understanding, and fostering societal development.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Encourage the integration of creative arts in education to improve student engagement and learning outcomes.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Promote best practices and innovative approaches in using creative arts to support education.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Foster a deeper appreciation of the role of the arts in enriching the educational experience and cultural heritage of Nigeria.
                </div>
              </li>
            </ul>
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
                  Awardees: Gain national and international recognition, increased opportunities for collaboration, and validation for their contributions to education. Winners will be inducted as Fellows of the Santos Creations Educational Foundation (SCEF).
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  SCEF Fellows Role: Inducted Fellows will have the opportunity to mentor upcoming educators, contribute to strategic planning for educational initiatives, and participate in high-level discussions and policy advocacy efforts aimed at advancing education in Africa.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#FFC247]"></span>
                <div>
                  Africa: Showcases the richness of African culture and the innovative use of education, fostering a deeper appreciation and understanding of the role of education in societal development.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Categories Section */}
      <div className="bg-[#FFF5E0] w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 relative inline-block text-black">
            Best Creative Arts Industry Contribution to
            <br />Education in Nigeria 2024
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
                  <button
                    onClick={() => handleNominate(category)}
                    className="w-full bg-[#FFC247] text-black py-2 rounded-full font-bold hover:bg-[#FFD277] transition mt-auto"
                  >
                    Nominate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeArtsRecognitionPage;