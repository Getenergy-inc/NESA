"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import NominationPage from '@/components/UI/nomination/nominate';
import { useRouter } from 'next/navigation';
interface Category {
  title: string;
  description: string;
  image: string;
}

const AfricaDiasporaAwardPage = () => {
  const subcategories: Category[] = [
    {
      title: "The Best Diaspora-Led Educational Infrastructure.",
      description: "This Award recognizes and honors the significant contributions made by the Nigerian diaspora towards achieving 'Education for All' in Nigeria. This award, set for the 2023 cycle, aims to celebrate diaspora individuals, groups, or organizations that have made a substantial impact through skills transfer, corporate social responsibility (CSR) initiatives, advocacy, and other educational support back home in Nigeria.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "The Best Diaspora-Led Educational Infrastructure.",
      description: "This Award recognizes and honors the significant contributions made by the Nigerian diaspora towards achieving 'Education for All' in Nigeria. This award, set for the 2023 cycle, aims to celebrate diaspora individuals, groups, or organizations that have made a substantial impact through skills transfer, corporate social responsibility (CSR) initiatives, advocacy, and other educational support back home in Nigeria.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "The Best Diaspora-Led Educational Program Innovation",
      description: "Awards organizations that have created outstanding e-learning platforms or solutions that significantly improve access to education.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "The Best Diaspora-Led Teacher Training and Support Initiative.",
      description: "Honors organizations that leverage artificial intelligence to personalize learning experiences, improve educational processes, or enhance...",
      image: "/images/nesa-card2.png"
    },
  
  ];
  const router = useRouter();
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
    `/nominateform?type=${encodeURIComponent('Diaspora Contributions to Education in Africa')}` +
    `&title=${encodeURIComponent(category.title)}` +
    `&description=${encodeURIComponent(category.description)}` +
    `&image=${encodeURIComponent(category.image)}`
  );
};

  return (
    <div className="min-h-screen bg-[#FFF5E0]">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-16 px-8">
        <div className="absolute inset-0 bg-[url('/images/bg/back_.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-xl mb-2 md:mt-8 text-center">Category 2</h2>
          <h1 className="text-2xl md:text-3xl font-bold text-[#FFC247] mb-3 text-center leading-tight">{subcategories[currentIndex].title}</h1>
          <p className="mb-6 text-center text-sm md:text-base leading-relaxed">
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
      <div className="bg-[#FFF5E0] w-full">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              To honor the significant contributions of Africa diaspora associations that have positively impacted education in
              their home countries. It aims to recognize the dedication, innovation, and impact of these associations in
              promoting educational development across Africa.
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
                  <strong>Awardees:</strong> It would provide enhanced visibility and credibility in the NGO and education sectors, opportunities for
                  networking and collaboration with other educational leaders and stakeholders, potential for increased funding
                  and support for their initiatives, and national recognition and prestige.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247] flex-shrink-0"></span>
                <div className="text-sm md:text-base">
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
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 relative inline-block">
          The Africa Diaspora association Educational Impact Award Sub-Categories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.slice(1).map((category, index) => (
            <div key={index} className="bg-[#191307] rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col">
              <div className="relative h-40 flex items-center justify-center p-4">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-white text-lg font-bold mb-2 leading-tight">{category.title}</h4>
                  <p className="text-gray-300 text-xs md:text-sm mb-3 leading-relaxed">{category.description}</p>
                </div>
                <button
                  onClick={() => handleNominate(category)}
                  className="w-full bg-[#FFC247] text-black py-2.5 rounded-lg font-medium hover:bg-[#FFD277] transition mt-auto"
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

export default AfricaDiasporaAwardPage;
