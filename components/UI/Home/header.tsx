"use client";
import { motion } from "framer-motion";
import { opacityTrans } from "@/lib/utils/transitions";
import Image from "next/image";
import { useState, useEffect } from "react";
import HeroCenter from "./hero-center";
import SlideImage2 from "./SlideImage2";
import SlideImage3 from "./SlideImage3";
import SlideImage4 from "./SlideImage4";  
import SlideImage5 from "./SlideImage5";
import SlideImage6 from "./SlideImage6";
import styles from "@/components/Common/Slide/style.module.scss";

const HomeHeader = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeDot, setActiveDot] = useState(0);
    
    const Slides = [
      <HeroCenter key={0} />,
      // <SlideImage2 key={1} src="/images/landing-page-carousel/slide2.png" alt="Slide 2" />,
      // <SlideImage3 key={2} src="/images/landing-page-carousel/slide3.png" alt="Slide 3" />,
      // <SlideImage4 key={3} src="/images/landing-page-carousel/slide4.png" alt="Slide 4" />,
      // <SlideImage5 key={4} src="/images/landing-page-carousel/slide5.png" alt="Slide 5" />,
      // <SlideImage6 key={5} src="/images/landing-page-carousel/slide6.png" alt="Slide 6" />
    ];
    const totalSlides = Slides.length; // Total number of slides
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
      }, 43000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

  return (
     <header>               
     <div className={` max-w-screen relative bg-[#191307CC] ${styles.homeHeader}`}>

            {Slides.map((slide, index) => {
              return (
                index === 0 ? (
                  // <section className={`absolute z-0 bg-[#191307CC] bg-opacity-20 top-0 left-0 w-full h-full text-white  ${
                  //        currentSlide === index ? "opacity-100" : "opacity-0 hidden"
                  //      }`}>
                  <section key={index} className="bg-[#0D0D0D] bg-opacity-20 text-white px-4 py-2 relative">
                    {slide}
                  </section>
                ) : (
                  <div
                    key={index}
                    className={` bg-[#17120a] absolute top-0 left-0  h-full w-full transition-opacity duration-500  ${
                      currentSlide === index ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    {slide}
                  </div>
                )
              );
            })}

         
         {/* Scroll Feature */}
         {/* <div className="absolute bottom-4 md:bottom:10 inset-x-0 flex items-center justify-between md:px-12 px-5 "> */}

            {/* Dots */}
            {/* <div className="flex items-center md:space-x-2 space-x-1">
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
            </div> */}

            {/* Navigation Arrows */}
            {/* <div className="flex items-center gap-1 md:gap:3 ml-auto">
              <button
                onClick={() => {
                  prevSlide();
                  setActiveDot((prev) => (prev - 1 + totalSlides) % totalSlides);
                }}
                className="w-10 h-10 md:w-15 md:h-15 flex items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition"
                  >
                <span className="material-icons">&lt;</span>
                </button>
                <button
                    onClick={() => {
                      nextSlide();
                      setActiveDot((prev) => (prev + 1) % totalSlides);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200 transition"
                      >
                    <span className="material-icons">{'>'}</span>
              </button>
            </div> */}
        {/* </div> */}
        </div>
        </header>      
  );
};

export default HomeHeader;
