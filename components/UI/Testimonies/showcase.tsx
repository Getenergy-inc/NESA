"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const TestimoniesShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const baseTestimonies = [
    {
      text: "As the founder of an education-focused NGO, joining NESA Africa has been a game-changer. The network, resources, and collaborative spirit have amplified our impact. NESA Africa is not just an initiative; it's a force for positive change in Ghana and across Africa.",
      name: "Mr. Kwame Mensah",
      role: "NGO Founder, Ghana",
      image: "/images/about/judges/j1.png"
    },
    {
      text: "NESA Africa represents a new era for education in Nigeria. As an academic leader, being part of this initiative has opened doors to innovative partnerships and a shared vision for excellence. NESA Africa is paving the way for a brighter educational future for our country and the entire continent.",
      name: "Prof. Fatima Jallow",
      role: "Academic Leader, Nigeria",
      image: "/images/about/judges/j2.png"
    },
    {
      text: "The impact of NESA Africa on our school system has been profound. It's revolutionizing how we approach education, fostering innovation, and creating opportunities for our students that were once unimaginable.",
      name: "Dr. Amina Diop",
      role: "Education Minister, Senegal",
      image: "/images/about/judges/j3.png"
    },
    {
      text: "NESA Africa has brought a fresh perspective to our educational initiatives. The collaborative approach and focus on excellence have inspired our teachers and students alike. It's truly transforming education across the continent.",
      name: "Mr. Chidi Okonkwo",
      role: "School Principal, Nigeria",
      image: "/images/about/judges/j4.png"
    },
  ];

  // Create 8 testimonials by duplicating the base set
  const testimonies = [...baseTestimonies, ...baseTestimonies];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveSlide = (direction: string) => {
    setCurrentSlide((prev) => {
      if (direction === 'next') {
        return (prev + 1) % testimonies.length;
      } else {
        return prev === 0 ? testimonies.length - 1 : prev - 1;
      }
    });
  };

  return (
    <section className="bg-[#fff5e0] py-8 md:py-12 lg:py-20">
      <div className="container mx-auto px-4 space-y-6 md:space-y-8">
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">What People are Saying</h2>
          <p className="text-base md:text-lg font-semibold">
            Do not take our word for it, See what others are saying about NESA Africa
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          {testimonies.slice(currentSlide, currentSlide + (windowWidth >= 768 ? 2 : 1)).map((testimony, index) => (
            <div key={index} className="w-full md:w-[480px] h-auto md:h-[280px] rounded-2xl border-2 border-[#FFC247] p-4 md:p-6 flex flex-col justify-between">
              <p className="text-sm leading-tight mb-4">{testimony.text}</p>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, id) => (
                    <Star key={id} className="w-4 h-4 text-[#FFC247] fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimony.image}
                    alt={testimony.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-bold text-sm">{testimony.name}</p>
                    <p className="text-xs text-gray-600">{testimony.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {Array.from({ length: testimonies.length }).map((_, id) => (
              <div
                key={id}
                className={`w-2 md:w-3 h-2 md:h-3 rounded-full cursor-pointer ${id === currentSlide ? "bg-[#FFC247]" : "bg-gray-300"}`}
                onClick={() => setCurrentSlide(id)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => moveSlide('prev')} className="p-1 md:p-2 bg-gray-200 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => moveSlide('next')} className="p-1 md:p-2 bg-[#FFC247] rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimoniesShowcase;