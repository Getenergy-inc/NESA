"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation';
import NominationPage from '@/components/UI/nomination/nominate';

type Category = {
    title: string;
    description: string;
    image: string;
};

const CSRInEducationAwardPage = () => {
    const router = useRouter();
    const subcategories: Category[] = [
        {
            title: "Best Africa Regional Companies CSR for Education Special Recognition Award in Africa 2024",
            description: "This Award celebrates the significant contributions of corporate entities across various sectors to the education sector in Nigeria through corporate social responsibility initiatives. This Award highlights the crucial impact and strategic importance of CSR in education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Banking And Finance CSR in Education Award",
            description: "Recognizes financial institutions for their initiatives in supporting education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Telecommunications CSR in Education Award",
            description: "Honors telecom companies for their support in digital learning programs and connectivity for education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Oil And Gas CSR in Education Award",
            description: "Celebrates oil and gas companies' contributions to educational development in their host communities.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Food And Beverages CSR in Education Award",
            description: "Acknowledges food and beverage companies' support for nutrition and education programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Manufacturing CSR in Education Award",
            description: "Recognizes manufacturing companies for their initiatives in technical and vocational education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Aviation CSR in Education Award",
            description: "Honors aviation companies for their support of aerospace education and training programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Technology And ICT CSR in Education Award",
            description: "Recognizes tech companies for their initiatives in digital education, ICT training, and e-learning support.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Real Estate And Construction CSR in Education Award",
            description: "Honors companies in the real estate and construction sector for their educational infrastructure support.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Retail And E-Commerce CSR in Education Award",
            description: "Recognizes retail and e-commerce companies for their support of education through various initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Pharmaceuticals CSR in Education Award",
            description: "Honors pharmaceutical companies for their support of health education and related initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Insurance CSR in Education Award",
            description: "Recognizes insurance companies for their contributions to financial literacy and education programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Conglomerates And Diversified Companies CSR in Education Award",
            description: "Honors diversified companies for their wide-ranging support of educational initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Media And Entertainment CSR in Education Award",
            description: "Recognizes media and entertainment companies for their support of educational content and initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Agriculture And Agribusiness CSR in Education Award",
            description: "Honors companies in the agricultural sector for their support of agricultural education and training programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Health Care And Hospitals CSR in Education Award",
            description: "Recognizes healthcare providers for their contributions to medical education and health awareness programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Professional Services CSR in Education Award",
            description: "Honors professional services firms for their support of education and skill development programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Fintech CSR in Education Award",
            description: "Recognizes fintech companies for their innovative approaches to financial education and literacy programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Microfinance Banks CSR in Education Award",
            description: "Honors microfinance banks for their grassroots level support of education initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Emerging Telecommunications CSR in Education Award",
            description: "Recognizes emerging telecom companies for their innovative contributions to educational connectivity.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Technology And Software CSR in Education Award",
            description: "Honors technology and software companies for their contributions to digital literacy and coding education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Real Estate Development CSR in Education Award",
            description: "Recognizes real estate developers for their contributions to educational infrastructure and community development.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Commercial Retail CSR in Education Award",
            description: "Honors commercial retail companies for their support of education through various community initiatives.",
            image: "/images/nesa-card2.png"
        }
    ];

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
    `/nominateform?type=${encodeURIComponent("(CSR) in Education (Africa - Regional Competition")}` +
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
                    <h2 className="text-xl mb-2 md:mt-8 text-center">Category 3</h2>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#FFC247] mb-3 text-center leading-tight">{subcategories[currentIndex].title}</h1>
                    <p className="mb-6 text-center text-sm md:text-base leading-relaxed">
                        {subcategories[currentIndex].description}
                    </p>
                </div>
                {/* Carousel Indicator Dots and Navigation Arrows */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
                    <div className="flex space-x-2">
                        {subcategories.map((_, index) => (
                            <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#FFC247]' : 'bg-white'}`}></div>
                        ))}
                    </div>
                    <div className="flex space-x-4">
                        <button 
                            onClick={prevSlide} 
                            className="bg-[#FFC247] p-2 rounded transition"
                            aria-label="Previous slide"
                        >
                            <IoMdArrowBack size={24} color="#191307" />
                        </button>
                        <button 
                            onClick={nextSlide} 
                            className="bg-[#FFC247] p-2 rounded transition"
                            aria-label="Next slide"
                        >
                            <IoMdArrowForward size={24} color="#191307" />
                        </button>
                    </div>
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
                            To recognize and honor corporate entities across various sectors for their outstanding contributions to the education sector through CSR initiatives.
                        </p>
                    </div>
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 relative inline-block">
                            Benefits
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
                        </h2>
                        <ul className="list-disc pl-5">
                            <li>Enhanced corporate reputation and visibility.</li>
                            <li>Opportunities for networking with other industry leaders.</li>
                            <li>Recognition for the positive impact on education and community development.</li>
                            <li>Potential to attract talent and customers through demonstrated commitment to social responsibility.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sub-Categories Section */}
            <div className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold mb-8 relative inline-block">
                    The CSR Award Sub-Categories
                    <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FFC247]"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subcategories.map((category, index) => (
                        <div key={index} className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col">
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
                                    <h4 className="text-white text-xl font-bold mb-2">{category.title}</h4>
                                    <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                                </div>
                                <button
                                    onClick={() => handleNominate(category)}
                                    className="w-full bg-[#FFC247] text-black py-2 rounded font-bold hover:bg-[#FFD277] transition mt-auto"
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

export default CSRInEducationAwardPage;