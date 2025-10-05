"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import NominationPage from "@/components/UI/nomination/nominate";
import { useRouter } from "next/navigation";
interface Category {
  title: string;
  description: string;
  image: string;
}

const CSRAwardCategoryPage = () => {
  const router = useRouter();
  const subcategories: Category[] = [
    {
      title:
        "The Overall Best Corporate Social Responsibility (CSR) for Education in Nigeria Award",
      description:
        "This Award celebrates the significant contributions of corporate entities across various sectors to the education sector in Nigeria through corporate social responsibility initiatives. This Award highlights the crucial impact and strategic importance of CSR in education.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "Banking And Finance CSR in Education Award",
      description:
        "Honors telecommunication companies for digital literacy programs, technology donations and connectivity solutions in schools",
      image: "/images/nesa-card2.png",
    },
    {
      title: "Telecommunications CSR in Education Award",
      description:
        "Honors telecom companies for their support in digital learning programs and connectivity for education.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "Best Technology and ICT CSR in Education",
      description:
        "Recognizing technology and ICT companies making substantial educational impacts.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "Manufacturing And Industrial CSR in Education",
      description:
        "Recognizing outstanding contributions in the manufacturing and industrial sector to education.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "Agriculture And Agribusiness CSR in Education",
      description:
        "Honoring agriculture and agribusiness companies making significant educational contributions.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "Social Media Influencer CSR For Education",
      description:
        "Recognizing social media influencers making substantial educational impacts.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "African International Sports Stars CSR For Education",
      description:
        "Honoring African international sports stars making significant educational contributions.",
      image: "/images/nesa-card2.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subcategories.length);
  }, [subcategories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + subcategories.length) % subcategories.length
    );
  }, [subcategories.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleNominate = (category: Category) => {
    router.push(
      `/nominateform?type=${encodeURIComponent(
        "Best Corporate Social Responsibility (CSR) in Education (Nigeria)"
      )}` +
        `&title=${encodeURIComponent(category.title)}` +
        `&description=${encodeURIComponent(category.description)}` +
        `&image=${encodeURIComponent(category.image)}`
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF5E0]">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-12 sm:py-24 px-4 sm:px-8 mt-16">
        <div className="absolute inset-0 bg-[url('/images/Herosection.png')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl mb-2 md:mt-16 text-center">
            Category 3
          </h2>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#FFC247] mb-2 sm:mb-4 text-center">
            {subcategories[currentIndex].title}
          </h1>
          <p className="text-sm sm:text-base mb-4 sm:mb-8 text-center">
            {subcategories[currentIndex].description}
          </p>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {subcategories.map((_, index) => (
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
              background:
                "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
            }}
          >
            <IoMdArrowBack size={32} color="#191307" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded transition"
            style={{
              background:
                "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
            }}
          >
            <IoMdArrowForward size={32} color="#191307" />
          </button>
        </div>
      </div>
      {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          The CSR Award Sub-Categories
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FFC247]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.slice(1).map((category, index) => (
            <div
              key={index}
              className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col"
            >
              <div className="relative h-60 flex items-center justify-center p-6">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-white text-xl font-bold mb-2">
                    {category.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    {category.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <button
                    onClick={() =>
                      router.push(
                        `/nominees?category=${encodeURIComponent(
                          "Best Africa Regional Companies CSR for Education Special Recognition Award in Africa 2024"
                        )}&subcategory=${encodeURIComponent(category.title)}`
                      )
                    }
                    className="w-full bg-transparent text-[#FFC247] py-2.5 rounded-lg hover:bg-[#33270E] transition-all duration-300 border-2 border-[#FFC247] font-medium tracking-wide flex items-center justify-center group"
                  >
                    <span className="mr-2 text-lg">👁️</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      See Existing Nominees
                    </span>
                  </button>
                  <button
                    onClick={() => handleNominate(category)}
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
          ))}
        </div>
      </div>

      {/* Purpose and Benefits Section */}
      <div className="bg-white w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="mb-4">
              To recognize and celebrate corporate entities that have made
              significant contributions to the education sector through their
              Corporate Social Responsibility (CSR) initiatives. This award aims
              to highlight the impact of CSR activities on education, encourage
              a strategic approach to CSR in education, and inspire other
              companies to contribute to educational development in Nigeria.
            </p>
          </div>

          <div>
            <h2 className="text-3xl mb-6 relative inline-block">
              Benefits
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Awardees:</strong> Winners receive widespread
                  recognition for their CSR efforts in education, enhancing
                  their corporate image and reputation, and gain access to a
                  network of like-minded corporate entities committed to
                  educational development. They also benefit from increased
                  visibility and positive publicity associated with the NESA
                  Africa Award 2024 winners.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Nigeria and Africa:</strong> The award helps raise
                  awareness about CSR's role in Quality Education by encouraging
                  corporate entities to invest in education. It promotes best
                  practices in CSR and sustainable education development,
                  sharing learning opportunities for all. It also encourages
                  more companies to engage in CSR activities, leading to
                  improved educational outcomes across Nigeria and Africa,
                  contributing to social and economic development, and inspires
                  other organizations to contribute to educational development,
                  creating a ripple effect across various sectors.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>SDG Goals:</strong> This award aligns with SDG Goal 4
                  (Quality Education) by encouraging corporate entities to
                  invest in educational initiatives that ensure inclusive and
                  equitable quality education and promote lifelong learning
                  opportunities for all.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRAwardCategoryPage;
