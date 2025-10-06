"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosSearch, IoIosArrowBack } from "react-icons/io";
import {
  categories,
  Category,
  Region,
  SubCategory,
  Nominee,
} from "@/lib/data/awardData";
import { useRouter } from "next/navigation";
import router from "next/router";

const AwardCategory: React.FC<{
  category: Category;
  onSelectCategory: (category: Category) => void;
  isFirst?: boolean;
}> = ({ category, onSelectCategory, isFirst = false }) => {
  const truncateDescription = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const truncatedDescription = truncateDescription(
    category.description,
    isFirst ? 300 : 100
  );

  return (
    <div
      className={`bg-[#191307] text-white rounded-3xl flex flex-col lg:${
        isFirst ? "flex-row" : "flex-col"
      } justify-between`}
      style={{
        width: "100%",
        height: "auto",
        minHeight: isFirst ? "448px" : "540px",
      }}
    >
      <div
        className={`${
          isFirst ? "lg:w-1/2" : "w-full"
        } p-6 flex justify-center items-center`}
      >
        <div
          className="relative w-full"
          style={{
            paddingBottom: "66.67%", // 3:2 aspect ratio
          }}
        >
          <Image
            src="/images/nesa-card2.png"
            alt="NESA Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div
        className={`${
          isFirst ? "lg:w-1/2" : "w-full"
        } p-6 flex flex-col justify-between`}
      >
        <div>
          <h3 className="text-xl font-bold mb-2">{category.title}</h3>
          <p className="text-sm mb-4">{truncatedDescription}</p>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onSelectCategory(category)}
            className="w-full py-2 px-4 rounded-lg font-medium"
            style={{
              background:
                "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
              color: "black",
            }}
          >
            {category.regions ? "See Regions" : "See Sub-Categories"}
          </button>
        </div>
      </div>
    </div>
  );
};

const RegionComponent: React.FC<{
  region: Region;
  onSelectRegion: (region: Region) => void;
  categoryTitle: string;
}> = ({ region, onSelectRegion, categoryTitle }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional: makes the scroll smooth
    });
  };

  return (
    <div
      className="bg-[#191307] text-white rounded-3xl flex flex-col justify-between"
      style={{ width: "100%", minHeight: "540px" }}
    >
      <div className="w-full p-6 flex justify-center items-center">
        <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
          <Image
            src="/images/nesa-card2.png"
            alt="NESA Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="w-full p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-2">{region.name}</h3>
          <p className="text-sm mb-4">Region in Africa</p>
        </div>
        <div className="mt-auto space-y-3">
          <button
            onClick={() => {
              onSelectRegion(region);
              scrollToTop();
            }}
            className="w-full py-2 px-4 rounded-lg font-medium"
            style={{
              background:
                "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
              color: "black",
            }}
          >
            See Sub-Categories
          </button>
        </div>
      </div>
    </div>
  );
};

const SubCategoryComponent: React.FC<{
  subCategory: SubCategory;
  onSelectSubCategory: (subCategory: SubCategory) => void;
}> = ({ subCategory, onSelectSubCategory }) => {
  const handleNominate = () => {
    router.push(
      `/nominateform?type=${encodeURIComponent(
        "Best Corporate Social Responsibility (CSR) in Education (Nigeria)"
      )}` +
        `&title=${encodeURIComponent(subCategory.title)}` +
        `&description=${encodeURIComponent(subCategory.description)}` +
        `&image=${encodeURIComponent("/images/nesa-card2.png")}`
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional: makes the scroll smooth
    });
  };

  return (
    <div
      className="bg-[#191307] text-white rounded-3xl flex flex-col justify-between"
      style={{ width: "100%", minHeight: "540px" }}
    >
      <div className="w-full p-6 flex justify-center items-center">
        <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
          <Image
            src="/images/nesa-card2.png"
            alt="NESA Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="w-full p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-2">{subCategory.title}</h3>
          <p className="text-sm mb-4">{subCategory.description}</p>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={() => {
              onSelectSubCategory(subCategory);
              scrollToTop();
            }}
            className="w-full bg-transparent text-[#FFC247] py-2.5 rounded-lg hover:bg-[#33270E] transition-all duration-300 border-2 border-[#FFC247] font-medium tracking-wide flex items-center justify-center group"
          >
            <span className="mr-2 text-lg">👁️</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              See Existing Nominees
            </span>
          </button>

          {/* New Nominate button */}
          <button
            onClick={handleNominate}
            className="w-full py-2.5 rounded-lg font-medium text-[#191307] hover:shadow-[0_0_15px_rgba(255,194,71,0.5)] transition-all duration-300 bg-gradient-to-r from-[#FFC247] to-[#E48900] flex items-center justify-center group"
          >
            <span className="mr-2 text-lg">🏆</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              Nominate
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const NomineeComponent: React.FC<{
  nominee: Nominee;
  categoryTitle: string;
  subCategoryTitle: string;
  isJudgeView?: boolean;
}> = ({ nominee, categoryTitle, subCategoryTitle, isJudgeView = false }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (isJudgeView) {
      // For judges: Navigate to review page
      router.push(`/judge/sub-category/nominees/NomineeId`);
    } else {
      // For regular users: Navigate to nomination form
      const query = new URLSearchParams({
        type: categoryTitle,
        title: subCategoryTitle,
        description: nominee.achievement,
        image: nominee.image,
      }).toString();

      router.push(`/nominateform?${query}`);
    }
  };

  return (
    <div
      className="bg-[#191307] text-white rounded-3xl p-6 flex flex-col justify-between"
      style={{ width: "100%", minHeight: "540px" }}
    >
      <div>
        <div className="relative w-full mb-4 flex justify-center items-center">
          <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
            <Image
              src={nominee.image}
              alt={nominee.name}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{nominee.name}</h3>
        {(nominee.state || nominee.country) && (
          <p className="text-sm mb-2 text-gray-400">
            {nominee.state && nominee.country
              ? `${nominee.state}, ${nominee.country}`
              : nominee.state || nominee.country}
          </p>
        )}
        <p className="text-sm mb-4">{nominee.achievement}</p>
      </div>
      <button
        onClick={handleButtonClick}
        className="w-full py-2.5 px-4 rounded-lg font-medium mt-auto bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] hover:shadow-[0_0_15px_rgba(255,194,71,0.5)] transition-all duration-300 flex items-center justify-center group"
      >
        <span className="mr-2 text-lg">{isJudgeView ? "⭐" : "🏆"}</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          {isJudgeView ? "Review" : "Re-Nominate"}
        </span>
      </button>
    </div>
  );
};

interface JudgePageProps {
  initialCategory?: string | null;
  initialSubCategory?: string | null;
  isJudgeView?: boolean;
}

const JudgePage: React.FC<JudgePageProps> = ({
  initialCategory = null,
  initialSubCategory = null,
  isJudgeView = false,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  // Find and set initial category and subcategory if provided
  useEffect(() => {
    if (initialCategory) {
      const category = categories.find(
        (c) =>
          c.title.toLowerCase() === initialCategory.toLowerCase() ||
          c.title.toLowerCase().includes(initialCategory.toLowerCase())
      );

      if (category) {
        setSelectedCategory(category);

        if (initialSubCategory && category.subCategories) {
          const subCategory = category.subCategories.find(
            (sc) =>
              sc.title.toLowerCase() === initialSubCategory.toLowerCase() ||
              sc.title.toLowerCase().includes(initialSubCategory.toLowerCase())
          );

          if (subCategory) {
            setSelectedSubCategory(subCategory);
          }
        }
      }
    }
  }, [initialCategory, initialSubCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedRegion(null);
    setSelectedSubCategory(null);
  };

  const handleSelectRegion = (region: Region) => {
    setSelectedRegion(region);
    setSelectedSubCategory(null);
  };

  const handleSelectSubCategory = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else if (selectedRegion) {
      setSelectedRegion(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="">
          {!selectedCategory && !selectedRegion && !selectedSubCategory && (
            <div className="relative mb-8 ">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full max-w-[400px] h-[40px] pl-10 pr-4 py-2 rounded-lg"
                  style={{
                    background: "#FFF5E0",
                    padding: "12px 20px 12px 40px",
                  }}
                />
                <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}
          {(selectedCategory || selectedRegion || selectedSubCategory) && (
            <div className="">
              {/* <button
                onClick={handleBack}
                className="flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                }}
              >
                <IoIosArrowBack size={24} color="white" />
              </button> */}
            </div>
          )}
          <div
            className={` ${
              !selectedCategory && !selectedRegion && !selectedSubCategory
                ? "text-center"
                : "text-left"
            }`}
          >
            {!selectedCategory && !selectedRegion && !selectedSubCategory && (
              <h2 className="text-3xl font-medium mb-1">
                The Blue Garnet Award Categories
              </h2>
            )}
            {selectedCategory && !selectedRegion && !selectedSubCategory && (
              <div className="relative bg-[#191307] text-white py-32 px-8">
                <div className="absolute inset-0 bg-[url('/images/Herosection.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-[#FFC247] mb-4 text-center">
                    {selectedCategory.title}
                  </h1>
                  <p className="mb-8 text-center">
                    {selectedCategory.description}
                  </p>
                </div>
              </div>
            )}
            {selectedRegion && !selectedSubCategory && (
              <div className="relative flex px-10 items-center justify-center pt-20">
                {/* Back Button - Left Aligned */}
                <button
                  onClick={handleBack}
                  className="absolute left-10 flex items-center justify-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                  }}
                >
                  <IoIosArrowBack size={24} color="white" />
                </button>

                {/* Title - Centered */}
                <h3 className="text-2xl md:text-3xl font-bold bg-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                  {selectedRegion.name}
                </h3>
              </div>
            )}
            {selectedSubCategory && (
              <div className="relative flex px-10 items-center justify-center pt-20">
                {/* Back Button - Left Aligned */}
                <button
                  onClick={handleBack}
                  className="absolute left-10 flex items-center justify-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                  }}
                >
                  <IoIosArrowBack size={24} color="white" />
                </button>

                {/* Title - Centered */}
                <h3 className="text-2xl md:text-3xl font-bold bg-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                  Nominee Profile
                </h3>
              </div>
            )}
            <div
              className={`mb-8 ${
                !selectedCategory && !selectedRegion && !selectedSubCategory
                  ? "mx-auto"
                  : ""
              }`}
              // style={{
              //   height: "4px",
              //   width: "150px",
              //   borderRadius: "8px",
              //   margin:
              //     !selectedCategory && !selectedRegion && !selectedSubCategory
              //       ? "1rem auto 2rem"
              //       : "1rem 0 2rem",
              //   background:
              //     "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
              // }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-start px-10 pb-10 gap-6">
          {!selectedCategory && !selectedRegion && !selectedSubCategory && (
            <>
              <div className="w-full lg:col-span-3">
                {filteredCategories.length > 0 && (
                  <AwardCategory
                    key={0}
                    category={filteredCategories[0]}
                    onSelectCategory={handleSelectCategory}
                    isFirst={true}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filteredCategories.slice(1).map((category, index) => (
                  <AwardCategory
                    key={index + 1}
                    category={category}
                    onSelectCategory={handleSelectCategory}
                  />
                ))}
              </div>
            </>
          )}
          {selectedCategory && !selectedRegion && !selectedSubCategory && (
            <div className="w-full">
              <div className="text-center py-10">
                <h3 className="text-2xl md:text-3xl font-bold bg-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                  Available Regions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {selectedCategory.regions
                  ? selectedCategory.regions.map((region, index) => (
                      <RegionComponent
                        key={index}
                        region={region}
                        onSelectRegion={handleSelectRegion}
                        categoryTitle={selectedCategory.title} // <-- pass category title
                      />
                    ))
                  : selectedCategory.subCategories
                  ? selectedCategory.subCategories.map((subCategory, index) => (
                      <SubCategoryComponent
                        key={index}
                        subCategory={subCategory}
                        onSelectSubCategory={handleSelectSubCategory}
                      />
                    ))
                  : null}
              </div>
            </div>
          )}
          {selectedRegion && !selectedSubCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {selectedRegion.subCategories.map((subCategory, index) => (
                <SubCategoryComponent
                  key={index}
                  subCategory={subCategory}
                  onSelectSubCategory={handleSelectSubCategory}
                />
              ))}
            </div>
          )}
          {selectedSubCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {selectedSubCategory.nominees.map((nominee, index) => (
                <NomineeComponent
                  key={index}
                  nominee={nominee}
                  categoryTitle={selectedCategory?.title || ""}
                  subCategoryTitle={selectedSubCategory.title}
                  isJudgeView={isJudgeView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JudgePage;
