"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import HeroCenter from "../Home/hero-center";
import SlideImage2 from "../Home/SlideImage2";
import SlideImage3 from "../Home/SlideImage3";
import SlideImage4 from "../Home/SlideImage4";  
import SlideImage5 from "../Home/SlideImage5";
import SlideImage6 from "../Home/SlideImage6";
import styles from "@/components/Common/Slide/style.module.scss";
import CategoryHeroCenter from "@/components/UI/Categories/categories-hero-center";


export interface CategoryCardProps {
  categoryData: {
    title: string;
    description: string;
    subCategoryPath: string;
  }[];
  type?: 'competitive' | 'non-competitive'; // add type prop
}

const CategoryHeader: React.FC<CategoryCardProps> = ({ categoryData, type = 'competitive' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const totalSlides = categoryData.length + 1; // 1 for the overview slide

  // Dynamic overview content
  const overviewSlide = type === 'non-competitive' ? (
    <div className="col-span-2 mt-8 rounded-xl shadow-lg p-6 md:p-10 text-white">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl md:text-3xl">🟦</span>
        <h2 className="text-xl md:text-2xl font-bold">
          NESA-Africa 2025 – Platinum Certificate of Recognition
        </h2>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">🌍</span>
        <span className="font-semibold text-primaryGold">Overview</span>
      </div>
      <p className="mb-4 text-base md:text-lg">
        Honoring Africa’s Unsung Heroes in Education with a Global Voice
      </p>
      <p className="mb-4 text-base md:text-lg">
        The Platinum Certificate of Recognition is a semi-competitive honorary award introduced by NESA-Africa 2025 to uplift silent changemakers—everyday individuals and lesser-known contributors whose dedication to educational transformation spans across schools, communities, civil society, and institutions.
      </p>
      <p className="mb-4 text-base md:text-lg">
        Unlike the high-profile Blue Garnet categories, the Platinum Certificate allows global public nominations, but final awardees are selected through a careful judge-led validation process emphasizing social impact, SDG alignment, sustainability, and inclusivity.
      </p>
    </div>
  ) : (
    <div className="col-span-2 mt-8 rounded-xl shadow-lg p-6 md:p-10 text-white">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl md:text-3xl">🟦</span>
        <h2 className="text-xl md:text-2xl font-bold">
          NESA-Africa 2025 – Competitive Awards Framework
        </h2>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">🌍</span>
        <span className="font-semibold text-primaryGold">Overview</span>
      </div>
      <p className="mb-4 text-base md:text-lg">
        NESA-Africa 2025 is honoring excellence in education through 8 Competitive Blue Garnet Awards, each representing a major category. Within each, multiple sub-categories (101 in total) will be recognized with Gold Certificates, with top performers competing for the prestigious Blue Garnet Award in their main category.
      </p>
      <p className="mb-4 text-base md:text-lg">
        Each nominee first competes at the sub-category level for a Gold Certificate, and winners of each sub-category are elevated to contend for the Blue Garnet Award in their main category. The award evaluation process aligns with SDG 4, Africa Agenda 2063, and ESG principles to ensure that excellence is judged by both impact and sustainability.
      </p>
      <p className="mb-4 text-base md:text-lg">
        Nominees are celebrated across a wide spectrum, from grassroots education projects to tech-based learning platforms and creative initiatives—ensuring that innovation, equity, and scale are recognized
continent-wide.
      </p>
    </div>
  );

    // Slides: overview first, then category slides
    const Slides = [
      overviewSlide,
      ...categoryData.map((item, index) => {
        return (
          <CategoryHeroCenter
            key={index + 1}
            index={index + 1}
            title={item.title}
            description={item.description}
            subCategoryPath={item.subCategoryPath}
          />
        );
      })
    ];


    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };
    
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Auto-scroll feature
    useEffect(() => {
      const interval = setInterval(() => {
      nextSlide();
      setActiveDot((prev) => (prev + 1) % totalSlides);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

  return (
    <header>
      <div className={`min-h-screen max-w-screen bg-[#191307CC] text-white ${styles.homeHeader}`}>
        
          {Slides.map((slide, index) => {
            return (
              <section key={index} className={` h-[80] w-full bg-opacity-80  md:pt-16  transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0 hidden"}`}>
                
                  {slide}
             
              </section>  
            );
          })
        }
                        {/* Scroll Feature */}
        <div className="absolute bottom-4 right-0 left-0 pb-8 md:pb-4 pt-6 flex items-center justify-between md:px-4 px-2">
          {/* Dots */}
          <div className="flex items-center md:space-x-2 space-x-1">
            {Array.from({ length: totalSlides }).map((_, id) => (
              <div
                key={id}
                onClick={() => {
            setCurrentSlide(id);
            setActiveDot(id);
                }}
                className={`w-3 h-3 rounded-full cursor-pointer ${
            currentSlide === id ? "bg-primaryGold" : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1 ">
            <button
              onClick={() => {
                prevSlide();
                setActiveDot((prev) => (prev - 1 + totalSlides) % totalSlides);
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition"
            >
              <span className="material-icons">&lt;</span>
            </button>
            <button
              onClick={() => {
                nextSlide();
                setActiveDot((prev) => (prev + 1) % totalSlides);
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200 transition"
            >
              <span className="material-icons">{'>'}</span>
            </button>
          </div>
              </div>

               </div>
    </header>
  );
};

export default CategoryHeader;
