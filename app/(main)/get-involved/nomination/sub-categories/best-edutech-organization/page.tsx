"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import NominationPage from '@/components/UI/nomination/nominate';
import { useRouter } from "next/navigation";

interface Category {
  title: string;
  description: string;
  image: string;
}

const EduTechAwardCategoryPage = () => {
const router = useRouter()

  const mainCategory: Category = {
    title: "The Overall Best EduTech Organization in Nigeria and Africa 2024",
    description:
      "This award aims to celebrate and recognize educational excellence across the African continent. The Best EduTech Organization in Nigeria and Africa 2024 award acknowledges the significant contributions of EduTech organizations that have leveraged technology to enhance educational experiences and outcomes. This award highlights the innovative approaches and technological solutions that EduTech organizations have implemented to address educational challenges and improve the quality of education in Nigeria and across Africa.",
    image: "/images/nesa-card2.png"
  };

  const subcategories: Category[] = [
    {
      title: "Innovation In Educational Technology Award",
      description:
        "Recognizes organizations that have developed innovative technological solutions to enhance learning and education delivery",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Excellence In E-Learning Solutions Award",
      description:
        "Awards organizations that have created outstanding e-learning platforms or solutions that significantly improve access to education.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Use Of Artificial Intelligence In Education",
      description:
        "Honors organizations that leverage artificial intelligence to personalize learning experiences, improve educational processes, or enhance...",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Outstanding Contribution To Digital Literacy Award",
      description:
        "Recognizes organizations that have made significant contributions to improving digital literacy among students, teachers, and communities.",
      image: "/images/nesa-card2.png"
    },
    {
      title: "Best Mobile Learning Solution Award",
      description:
        "Awards organizations that have created outstanding e-learning platforms or solutions that significantly improve access to education.",
      image: "/images/nesa-card2.png"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (subcategories.length + 1));
  }, [subcategories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + subcategories.length + 1) % (subcategories.length + 1)
    );
  }, [subcategories.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);


  const handleNominate = (category: Category) => {
  router.push(
    `/nominateform?type=${encodeURIComponent("Best EduTech Organization (Africa)")}` +
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
          <h2 className="text-xl mb-2 md:mt-8 text-center">Category 5</h2>
          <h1 className="text-2xl md:text-3xl font-bold text-[#FFC247] mb-3 text-center leading-tight">
            {currentIndex === 0
              ? mainCategory.title
              : subcategories[currentIndex - 1].title}
          </h1>
          <p className="mb-6 text-center text-sm md:text-base leading-relaxed">
            {currentIndex === 0
              ? mainCategory.description
              : subcategories[currentIndex - 1].description}
          </p>
        </div>
        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {[mainCategory, ...subcategories].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-[#FFC247]" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded transition"
            style={{
              background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
            }}
          >
            <IoMdArrowBack size={32} color="#191307" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded transition"
            style={{
              background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
            }}
          >
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
              To acknowledge the contributions of EduTech organizations that have leveraged technology to enhance
              educational experiences and outcomes in Nigeria and across Africa. This award aims to promote further
              innovation and investment in educational technology, highlighting the importance of EduTech in achieving
              educational excellence.
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
                  <strong>Awardees:</strong> winners receive widespread recognition for their contributions to educational technology, it provides
                  opportunity to network with other award winners, educational leaders, and policymakers, and it increases visibility
                  through media coverage and promotional activities associated with the NESA-Africa/Nigeria 2025 Awards.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247] flex-shrink-0"></span>
                <div className="text-sm md:text-base">
                  <strong>Nigeria and Africa:</strong> It encourages more eduTech innovations, leading to improved educational infrastructure and
                  resources, and it empowers communities through better education, leading to social and economic development,
                  and it inspires other organizations to contribute to educational technology, creating a ripple effect across various
                  sectors.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 relative inline-block">
          The Edutech Award Sub-Categories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((category, index) => (
            <div
              key={index}
              className="bg-[#191307] rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col"
            >
              <div className="flex justify-center items-center h-40 p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={category.image}
                    alt="NESA AFRICA"
                    layout="intrinsic"
                    width={290}
                    height={200}
                    className="mx-auto"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-lg font-bold mb-2 leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm mb-3 leading-relaxed">
                    {category.description}
                  </p>
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

export default EduTechAwardCategoryPage;