"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSlider from "@/lib/hooks/useSlider";

const categoryData = [
  {
    title: "Africa Lifetime Education Icon Special Recognition Award",
    description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
    subCategoryPath: "/nomination/sub-categories/africa-lifetime-education-icon"
  },
  {
    title: "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024",
    description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
    subCategoryPath: "/nomination/sub-categories/best-ngo-contribution"
  },
  {
    title: "Africa Diaspora association Educational Impact Projects Recognition Award in Africa",
    description: "Honoring the significant contributions made by diaspora organizations towards achieving \"Education for all\" across the African Continent.",
    subCategoryPath: "/nomination/sub-categories/africa-diaspora-impact"
  },
  {
    title: "The Overall Best CSR for Education in Nigeria Award 2024",
    description: "Honoring corporate social responsibility by banks, telecommunications, and other sectors, and showing their impactful CSR initiatives that have ...",
    subCategoryPath: "/nomination/sub-categories/best-csr-education"
  },
  {
    title: "CSR for Education special recognition award in Africa 2024",
    description: "Recognize the most outstanding educational technology companies that have made significant contributions to advancing education in Africa through...",
    subCategoryPath: "/sub-categories/csr-education-africa"
  },
  {
    title: "Best EduTech Organization in Nigeria and Africa 2024",
    description: "Acknowledges state governments that have demonstrated exemplary commitment and results in advancing education from 2013-2024.",
    subCategoryPath: "/nomination/sub-categories/best-edutech-organization"
  },
  {
    title: "Overall best educational friendly state in Nigeria 2024",
    description: "Awards the tertiary institution that stands out in academic excellence, community engagement, and student support with notable ICT infrastructure.",
    subCategoryPath: "/sub-categories/best-educational-state"
  },
  {
    title: "The best library in Nigerian tertiary institutions award 2024",
    description: "Recognizes libraries that have made exceptional contributions and excellence to educational research and innovation, thus shaping future educational strategies.",
    subCategoryPath: "/nomination/sub-categories/best-library"
  },
  {
    title: "The Overall Best Research and Development Contribution by Tertiary Institutions in Nigeria",
    description: "Recognizing media role in educational awareness and innovation. Awards media houses and organizations that effectively contribute to educational development.",
    subCategoryPath: "/nomination/sub-categories/best-research-development"
  },
  {
    title: "The Overall Best Media Organization in Nigeria with Outstanding Education Focus",
    description: "Honors exceptional media/news award programs for educational collaborations and contributes to Nigeria educational development.",
    subCategoryPath: "/nomination/sub-categories/best-media-organization"
  },
  {
    title: "International and Bilateral Contributors to Education in Nigeria Recognition award 2024",
    description: "Honoring international bodies for their impactful cooperative efforts that significantly impact the educational sector.",
    subCategoryPath: "/nomination/sub-categories/international-contributors"
  },
  {
    title: "Christian faith organization Educational Champion of the Decade Award",
    description: "Recognizing Christian faith-based organizations for their outstanding contributions to education advancement.",
    subCategoryPath: "/nomination/sub-categories/christian-education-champion"
  },
  {
    title: "Islamic faith organization Educational Champion of the Decade Award in Nigeria (2013-2024)",
    description: "Celebrating Islamic faith-based organizations for their crucial role in advancing and diversifying educational opportunities.",
    subCategoryPath: "/nomination/sub-categories/islamic-education-champion"
  },
  {
    title: "Recognition for the best educational support by a Political leaders in Nigeria 2024",
    description: "Award for both state and federal government officials who have championed STEM education and technological advancement in learning.",
    subCategoryPath: "/nomination/sub-categories/best-political-leader"
  },
  {
    title: "Creative arts Industry contribution to education in Nigeria 2024",
    description: "Recognizing efforts towards advancing education through creative arts and dedication to achieving quality education under SDG 4 objectives.",
    subCategoryPath: "/nomination/sub-categories/creative-arts-contribution"
  },
  {
    title: "Support for education in STEM in Nigeria 2024",
    description: "Celebrating initiatives by any organization for creative arts role in education and promoting hands-on learning experiences.",
    subCategoryPath: "/nomination/sub-categories/support-stem-education"
  }
];

const Category = () => {
  const { sliderRef: ref, moveLeft, moveRight } = useSlider();

  return (
    <section className="bg-white">
      <div className="space-y-5 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-2 mb-4 md:mb-0 text-center md:text-left">
            <h2 className="font-bold text-2xl md:text-3xl relative inline-block">
              Nomination Categories
              <span
                className="absolute left-0 w-1/2 h-1"
                style={{
                  bottom: '-5px',
                  borderBottom: '4px solid',
                  borderImageSource: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                  borderImageSlice: 1,
                }}
              ></span>
            </h2>
            <p className="text-gray-800 text-xl md:text-2xl">Celebrate the unsung heroes and NOMINATE today!!</p>
          </div>

          <Link href="/nomination" className="text-yellow-500 hover:underline">
            See all Categories &gt;
          </Link>
        </div>

        <div className="relative container mx-auto px-4">
          <div
            className="size-12 cursor-pointer rounded-full bg-gray-300 text-gray-600 grid place-content-center absolute -left-2 md:-left-6 top-1/2 transform -translate-y-1/2 z-10"
            onClick={moveLeft}
          >
            <ChevronLeft />
          </div>

          <div className={`flex items-stretch gap-4 md:gap-6 overflow-x-auto hide_scroll scroll-smooth`} ref={ref}>
            {categoryData.map((category, id) => (
              <div
                key={id}
                className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[412px] h-[460px] sm:h-[500px] md:h-[540px] bg-[#191307] text-white rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <div className="mb-4 relative w-full aspect-[364/198]">
                    <Image
                      src="/images/nesa-card2.png"
                      alt="NESA"
                      fill
                      objectFit="contain"
                      className="rounded"
                    />
                  </div>
                  <h3 className={`font-bold ${id === 0 ? 'text-xs sm:text-sm md:text-base' : 'text-sm sm:text-base md:text-lg lg:text-xl'} mb-2`}>{category.title}</h3>
                  <p className={`${id === 0 ? 'text-[10px] sm:text-xs' : 'text-xs md:text-sm'} flex-grow overflow-y-auto`}>{category.description}</p>
                  <Link href={category.subCategoryPath}>
                    <button
                      className="w-full py-2 md:py-3 mt-4 text-black font-normal hover:bg-yellow-600 transition duration-300 rounded-xl"
                      style={{
                        background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
                      }}
                    >
                      Nominate
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            className="size-12 cursor-pointer rounded-full bg-gray-300 text-gray-600 grid place-content-center absolute -right-2 md:-right-6 top-1/2 transform -translate-y-1/2 z-10"
            onClick={moveRight}
          >
            <ChevronRight />
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          {Array.from({ length: 4 }).map((_, id) => (
            <div 
              key={id} 
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-1 cursor-pointer ${id === 1 ? 'bg-yellow-500' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;