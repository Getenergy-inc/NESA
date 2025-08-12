"use client";
import { IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';
import React, { useState } from "react";
import { categories, Category, SubCategory, Judges } from "@/lib/data/JudgeData";
import { useRouter } from "next/navigation";
import JudgeCard from '@/components/UI/judgenomination/JudgeCategory';


const JudgePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const router = useRouter();

  const handleReview = (name: string) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  router.push(`/judge/review/Judge/${slug}`);
  };

  return (
    <div className="bg-white py-10 sm:py-20 lg:pt-32 px-10 max-w-7xl mx-auto">
      {/* Back Button */}
              <div>
          {(selectedCategory || selectedSubCategory) && (
            <button
            className="flex items-center justify-center"
              onClick={() => {
                if (selectedSubCategory) {
                  setSelectedSubCategory(null);
                } else {
                  setSelectedCategory(null);
                }
              }}
              style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                }}
            >
             <IoIosArrowBack size={24} color="white" />
            </button>
          )}
        </div>

              {/* title */}
      <div className="mb-12 mt-5 flex items-center justify-center">

          {!selectedCategory && !selectedSubCategory && (
            <h2 className="text-3xl flex justify-center font-medium w-full">See All Judges</h2>
          )}
          {selectedCategory && !selectedSubCategory && (
            <h2 className="text-3xl flex justify-center font-medium">{selectedCategory.title}</h2>
          )}
          {selectedSubCategory && (
            <h2 className="text-3xl flex justify-center font-medium">The Judges Profile</h2>
          )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!selectedCategory && !selectedSubCategory &&
          categories.map((category, index) => (
            <div
              key={index}
              className="bg-[#191307] text-white p-6 rounded-2xl flex flex-col justify-between min-h-[300px]"
            >
              <div className='flex justify-center'>
                <h3 className="text-xl font-medium mb-2">{category.title}</h3>
              </div>
              <div className="w-full py-10 flex justify-center">
                <Image
                  src="/images/nesa-mg.png"
                  alt="Competitive"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setSelectedCategory(category)}
                className="mt-auto py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black"
              >
                View Sub-categories
              </button>
            </div>
          ))}

        {selectedCategory && !selectedSubCategory &&
          selectedCategory.subCategories?.map((subCategory, index) => (
            <div
              key={index}
              className="bg-[#191307] text-white p-6 rounded-2xl flex flex-col justify-between min-h-[300px]"
            >
              <div className='flex justify-center'>
                <h3 className="text-xl font-semibold mb-2">{subCategory.title}</h3>
              </div>
              <div className="w-full py-10 flex justify-center">
                <Image
                  src="/images/nesa-mg.png"
                  alt="Competitive"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setSelectedSubCategory(subCategory)}
                className="mt-auto py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black"
              >
                View Judges
              </button>
            </div>
          ))}

        {selectedSubCategory &&
          selectedSubCategory.judges.map((judge, index) => (
            <JudgeCard key={index} judge={judge} />
          ))}
      </div>
    </div>
  );
};

export default JudgePage;
