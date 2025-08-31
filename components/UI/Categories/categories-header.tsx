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
    backgroundImage: string;
  }[];
  type?: "competitive" | "non-competitive"; // add type prop
}

const CategoryHeader: React.FC<CategoryCardProps> = ({
  categoryData,
  type = "competitive",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const totalSlides = categoryData.length + 1; // 1 for the overview slide

  // Dynamic overview content
  const overviewSlide =
    type === "non-competitive" ? (
      <div className="col-span-2 mt-8 rounded-xl shadow-lg p-6 md:p-10 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl md:text-3xl">🟦</span>
          <h2 className="text-xl md:text-4xl font-bold text-primaryGold">
            NESA-Africa 2025 – Platinum Certificate of Recognition
          </h2>
        </div>

        <p className="mb-4 text-base md:text-2xl mt-7">
          Honoring Africa’s Unsung Heroes in Education with a Global Voice
        </p>
        <p className="mb-4 text-base md:text-2xl">
          The Platinum Certificate of Recognition is a semi-competitive honorary
          award introduced by NESA-Africa 2025 to uplift silent
          changemakers—everyday individuals and lesser-known contributors whose
          dedication to educational transformation spans across schools,
          communities, civil society, and institutions.
        </p>
        <p className="mb-4 text-base md:text-2xl">
          Unlike the high-profile Blue Garnet categories, the Platinum
          Certificate allows global public nominations, but final awardees are
          selected through a careful judge-led validation process emphasizing
          social impact, SDG alignment, sustainability, and inclusivity.
        </p>
      </div>
    ) : (
      <div className="col-span-2 mt-8 rounded-xl shadow-lg p-10 md:p-20 text-white">
        <div className="flex items-center gap-3 mb-7">
          {/* <span className="text-2xl md:text-3xl">🟦</span> */}
          <h2 className="text-xl md:text-4xl font-bold text-primaryGold">
            NESA-Africa 2025 – Competitive Awards Framework
          </h2>
        </div>
        <p className="mb-4 text-base md:text-2xl mt-7">
          NESA-Africa 2025 is honoring excellence in education through 8
          Competitive Blue Garnet Awards, each representing a major category.
          Within each, multiple sub-categories (101 in total) will be recognized
          with Gold Certificates, with top performers competing for the
          prestigious Blue Garnet Award in their main category.
        </p>
        <p className="mb-4 text-base md:text-2xl">
          Each nominee first competes at the sub-category level for a Gold
          Certificate, and winners of each sub-category are elevated to contend
          for the Blue Garnet Award in their main category. The award evaluation
          process aligns with SDG 4, Africa Agenda 2063, and ESG principles to
          ensure that excellence is judged by both impact and sustainability.
        </p>
        <p className="mb-4 text-base md:text-2xl">
          Nominees are celebrated across a wide spectrum, from grassroots
          education projects to tech-based learning platforms and creative
          initiatives—ensuring that innovation, equity, and scale are recognized
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
    }),
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
      <div
        className={`relative h-[80vh] md:text-2xl max-w-screen bg-[#191307CC] text-white ${styles.homeHeader}`}
      >
        {Slides.map((slide, index) => {
          const bgImage =
            index === 0
              ? "/images/about1.png"
              : categoryData[index - 1].backgroundImage;

          return (
            <section
              key={index}
              className={`relative h-[80vh] w-full overflow-hidden transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0 hidden"
              } z-0`}
            >
              <Image
                src={bgImage}
                alt={`Slide ${index}`}
                fill
                className="object-cover -z-10 h-[80vh]"
                priority={index === 0}
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-[#191307]/70 pointer-events-none z-0" />

              <div className="relative z-10  h-[80vh] flex items-center justify-center">
                {slide}
              </div>
            </section>
          );
        })}

        {/* Scroll Feature */}
        <div className="absolute bottom-4 right-0 left-0 pb-8 md:pb-4 pt-6 flex items-center justify-between md:px-10 px-5">
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
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black border-[1px] border-white text-white shadow-lg hover:bg-gray-800 transition"
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
              <span className="material-icons">{">"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CategoryHeader;
