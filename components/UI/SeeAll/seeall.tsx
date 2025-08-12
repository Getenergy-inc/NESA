import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { IoIosSearch, IoIosArrowBack } from "react-icons/io";
import { categories, Category, Region, SubCategory, Nominee } from '@/lib/data/awardData';
import { useRouter } from 'next/navigation';


const AwardCategory: React.FC<{
  category: Category;
  onSelectCategory: (category: Category) => void;
  isFirst?: boolean;
}> = ({ category, onSelectCategory, isFirst = false }) => {
  const truncateDescription = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const truncatedDescription = truncateDescription(category.description, isFirst ? 300 : 100);

  return (
    <div
      className={`bg-[#191307] text-white rounded-3xl flex flex-col lg:${
        isFirst ? 'flex-row' : 'flex-col'
      } justify-between`}
      style={{
        width: '100%',
        height: 'auto',
        minHeight: isFirst ? '448px' : '540px',
      }}
    >
      <div className={`${isFirst ? 'lg:w-1/2' : 'w-full'} p-6 flex justify-center items-center`}>
        <div className="relative w-full" style={{
          paddingBottom: '66.67%', // 3:2 aspect ratio
        }}>
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
          isFirst ? 'lg:w-1/2' : 'w-full'
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
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
              color: 'black',
            }}
          >
            {category.regions ? 'See Regions' : 'See Sub-Categories'}
          </button>
        </div>
      </div>
    </div>
  );
};

const RegionComponent: React.FC<{
  region: Region;
  onSelectRegion: (region: Region) => void;
}> = ({ region, onSelectRegion }) => {
  return (
    <div className="bg-[#191307] text-white rounded-3xl flex flex-col justify-between" style={{ width: '100%', minHeight: '540px' }}>
      <div className="w-full p-6 flex justify-center items-center">
        <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
          <Image src="/images/nesa-card2.png" alt="NESA Logo" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="w-full p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-2">{region.name}</h3>
          <p className="text-sm mb-4">Region in Africa</p>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onSelectRegion(region)}
            className="w-full py-2 px-4 rounded-lg font-medium"
            style={{
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
              color: 'black',
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
  return (
    <div className="bg-[#191307] text-white rounded-3xl flex flex-col justify-between" style={{ width: '100%', minHeight: '540px' }}>
      <div className="w-full p-6 flex justify-center items-center">
        <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
          <Image src="/images/nesa-card2.png" alt="NESA Logo" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="w-full p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-2">{subCategory.title}</h3>
          <p className="text-sm mb-4">{subCategory.description}</p>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onSelectSubCategory(subCategory)}
            className="w-full py-2 px-4 rounded-lg font-medium"
            style={{
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
              color: 'black',
            }}
          >
            See Nominees
          </button>
        </div>
      </div>
    </div>
  );
};

const NomineeComponent: React.FC<{ 
  nominee: Nominee, 
  categoryTitle: string, 
  subCategoryTitle: string,
  isJudgeView?: boolean
}> = ({ nominee, categoryTitle, subCategoryTitle, isJudgeView = false }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (isJudgeView) {
      // For judges: Navigate to review page
      router.push(`/judge/sub-category/nominees/nomineeId`);
    } else {
      // For regular users: Navigate to nomination form
      router.push(
        `/nominateform?type=${encodeURIComponent(categoryTitle)}` +
        `&title=${encodeURIComponent(subCategoryTitle)}` +
        `&description=${encodeURIComponent(nominee.achievement)}` +
        `&image=${encodeURIComponent(nominee.image)}`
      );
    }
  };

  return (
    <div 
      className="bg-[#191307] text-white rounded-3xl p-6 flex flex-col justify-between" 
      style={{ width: '100%', minHeight: '540px' }}
    >
      <div>
        <div className="relative w-full mb-4 flex justify-center items-center">
          <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
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
        <span className="mr-2 text-lg">{isJudgeView ? '⭐' : '🏆'}</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          {isJudgeView ? 'Review' : 'Re-Nominate'}
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
  isJudgeView = false
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  
  // Find and set initial category and subcategory if provided
  useEffect(() => {
    if (initialCategory) {
      const category = categories.find(c => 
        c.title.toLowerCase() === initialCategory.toLowerCase() ||
        c.title.toLowerCase().includes(initialCategory.toLowerCase())
      );
      
      if (category) {
        setSelectedCategory(category);
        
        if (initialSubCategory && category.subCategories) {
          const subCategory = category.subCategories.find(sc => 
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
    <div className="bg-white py-10 sm:py-20 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16">
          {!selectedCategory && !selectedRegion && !selectedSubCategory && (
            <div className="relative mb-8 mt-12 sm:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full max-w-[400px] h-[40px] pl-10 pr-4 py-2 rounded-lg"
                  style={{
                    background: '#FFF5E0',
                    padding: '12px 20px 12px 40px',
                  }}
                />
                <IoIosSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          )}
          {(selectedCategory || selectedRegion || selectedSubCategory) && (
            <div className="mb-8 mt-12 sm:mt-0">
              <button
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
              </button>
            </div>
          )}
          <div className={`mt-8 ${!selectedCategory && !selectedRegion && !selectedSubCategory ? 'text-center' : 'text-left'}`}>
            {!selectedCategory && !selectedRegion && !selectedSubCategory && (
              <h2 className="text-3xl font-medium mb-1">
                The Blue Garnet Award Categories
              </h2>
            )}
            {selectedCategory && !selectedRegion && !selectedSubCategory && (
              <h2 className="text-3xl font-medium mb-1">
                {selectedCategory.title}
              </h2>
            )}
            {selectedRegion && !selectedSubCategory && (
              <h2 className="text-3xl font-medium mb-1">
                {selectedRegion.name}
              </h2>
            )}
            {selectedSubCategory && (
              <h2 className="text-3xl font-medium mb-1">
                The Nominee Profiles
              </h2>
            )}
            <div
              className={`mb-8 ${!selectedCategory && !selectedRegion && !selectedSubCategory ? 'mx-auto' : ''}`}
              style={{
                height: '4px',
                width: '150px',
                borderRadius: '8px',
                margin: !selectedCategory && !selectedRegion && !selectedSubCategory ? '1rem auto 2rem' : '1rem 0 2rem',
                background:
                  'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
              }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-start gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {selectedCategory.regions ? (
                selectedCategory.regions.map((region, index) => (
                  <RegionComponent
                    key={index}
                    region={region}
                    onSelectRegion={handleSelectRegion}
                  />
                ))
              ) : selectedCategory.subCategories ? (
                selectedCategory.subCategories.map((subCategory, index) => (
                  <SubCategoryComponent
                    key={index}
                    subCategory={subCategory}
                    onSelectSubCategory={handleSelectSubCategory}
                  />
                ))
              ) : null}
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