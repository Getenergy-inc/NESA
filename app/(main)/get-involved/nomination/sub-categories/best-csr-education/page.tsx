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


const CSRAwardCategoryPage = () => {
    const router = useRouter();
    const subcategories: Category[] = [
        {
            title: "The Overall Best Corporate Social Responsibility (CSR) in Education in Nigeria Award",
            description: "This Award celebrates the significant contributions of corporate entities across various sectors to the education sector in Nigeria through corporate social responsibility initiatives. This Award highlights the crucial impact and strategic importance of CSR in education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Banking And Finance CSR in Education Award",
            description: "Honors telecommunication companies for digital literacy programs, technology donations and connectivity solutions in schools",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Telecommunications CSR in Education Award",
            description: "Honors telecom companies for their support in digital learning programs and connectivity for education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Oil And Gas CSR in Education Award",
            description: "Acknowledges oil and gas  companies for their investments in STEM education, university  collaborations, and community ....",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Food And Beverages CSR in Education Award",
            description: "Celebrates food  and beverage companies in nutrition education, school feeding  programs, and educational resources.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Manufacturing CSR in Education Award",
            description: "Recognizes  manufacturing companies for vocational training, educational  sponsorships, and support in infrastructure.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Aviation CSR in Education Award",
            description: "Honors aviation companies  for educational outreach and aviation-focused educational  programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Technology (ICT & Software) in Education Award",
            description: "Acknowledges  tech companies for initiatives in digital education, ICT training,  and innovative educational resources.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Construction CSR in Education Award",
            description: "Recognizes contributions in educational infrastructure  development and community projects.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Commerce retail CSR in Education Award",
            description: "Honors retail  and e-commerce companies for educational support through  funding, resources, and community projects.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Pharmaceuticals CSR in Education Award",
            description: "Celebrates  pharmaceutical companies' efforts in health education and  support for medical education.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Insurance CSR in Education Award",
            description: ": Recognizes insurance  companies for contributions to financial literacy education and  educational initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Conglomerates And Diversified Companies CSR in Education Award",
            description: "Acknowledges the wide-ranging support of  conglomerates in various educational sectors.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Media And Entertainment CSR in Education Award",
            description: "Honors  media and entertainment companies for educational content  creation, scholarships, and outreach programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Agriculture And Agribusiness CSR in Education Award",
            description: "Celebrates agribusinesses for their role in agricultural education  and community training programs",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Health Care And Hospitals CSR in Education Award",
            description: "Recognizes healthcare providers for contributions to medical  education and community health initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Professional Services CSR in Education Award",
            description: "Acknowledges  professional service firms for support in business and financial  education, internships, and training programs.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Fintech CSR in Education Award",
            description: "Honors fintech companies for  innovative approaches to financial education and literacy.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Microfinance Banks CSR in Education Award",
            description: " Recognizes  microfinance banks for their educational support initiatives,  particularly in underprivileged communities.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Emerging Telecommunications CSR in Education Award",
            description: "Honors smaller and emerging telecom companies for their efforts  in educational CSR",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Real Estate Development CSR in Education Award",
            description: "Recognizes  real estate developers for their contributions to educational  infrastructure and community educational initiatives.",
            image: "/images/nesa-card2.png"
        },
        {
            title: "Hotels CSR in Education Award ",
            description: "Acknowledges sory 3ftware and technology companies for their  contributions to educational technology and digital literacy.",
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
    `/nominateform?type=${encodeURIComponent('Best Corporate Social Responsibility (CSR) in Education (Nigeria)')}` +
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
                            To recognize and celebrate corporate entities that have made significant contributions to the education
                            sector through their Corporate Social Responsibility (CSR) initiatives. This award aims to highlight the impact of CSR
                            activities on education, encourage a strategic approach to CSR in education, and inspire other companies to contribute to
                            educational development in Nigeria.
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
                                    <strong>Awardees:</strong> Winners receive widespread recognition for their CSR efforts in education, enhancing their corporate
                                    image and reputation, and gain access to a network of like-minded corporate entities committed to educational development.
                                    They also benefit from increased visibility and positive publicity associated with the NESA Africa Award 2024 winners.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247] flex-shrink-0"></span>
                                <div className="text-sm md:text-base">
                                    <strong>Nigeria and Africa:</strong> The award helps raise awareness about CSR's role in Quality Education by encouraging corporate entities to invest in
                                    education. It promotes best practices in CSR and sustainable education development, sharing learning
                                    opportunities for all. It also encourages more companies to engage in CSR activities, leading to improved educational
                                    outcomes across Nigeria and Africa, contributing to social and economic development, and inspires other organizations to contribute to
                                    educational development, creating a ripple effect across various sectors.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247] flex-shrink-0"></span>
                                <div className="text-sm md:text-base">
                                    <strong>SDG Goals:</strong> This award aligns with SDG Goal 4 (Quality Education) by encouraging corporate entities to invest in educational initiatives that ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sub-Categories Section */}
           <div className="max-w-6xl mx-auto py-8 px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 relative inline-block">
                    The CSR Award Sub-Categories
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

export default CSRAwardCategoryPage;