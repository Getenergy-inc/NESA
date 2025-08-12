import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

interface Member {
  name: string;
  position: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const [activeExecSlide, setActiveExecSlide] = useState<number>(0);
  const [activeVolSlide, setActiveVolSlide] = useState<number>(0);

  const executives: Member[] = [
    { name: "Engr. Dr Babashola Santos", position: "President", image: "/images/santos.png" },
    { name: "Hon. Farida Prevail", position: "Head Of Events", image: "/images/hon.png" },
    { name: "Council Name", position: "Programs Manager", image: "/images/Mr.png" },
    { name: "Exec Name 4", position: "Position 4", image: "/images/Mr.png" },
    { name: "Exec Name 5", position: "Position 5", image: "/images/santos.png" },
    { name: "Exec Name 6", position: "Position 6", image: "/images/hon.png" },
    { name: "Exec Name 7", position: "Position 7", image: "/images/santos.png" },
    { name: "Exec Name 8", position: "Position 8", image: "/images/hon.png" },
    { name: "Exec Name 9", position: "Position 9", image: "/images/santos.png" },
  ];

  const volunteers: Member[] = [
    { name: "Engr. Dr Babashola Santos", position: "Founder/President", image: "/images/santos.png" },
    { name: "Hon. Farida Prevail", position: "Head Of Events", image: "/images/hon.png" },
    { name: "Council Name", position: "Programs Manager", image: "/images/Mr.png" },
    { name: "Vol Name 4", position: "Position 4", image: "/images/santos.png" },
    { name: "Vol Name 5", position: "Position 5", image: "/images/Mr.png" },
    { name: "Vol Name 6", position: "Position 6", image: "/images/santos.png" },
    { name: "Vol Name 7", position: "Position 7", image: "/images/hon.png" },
    { name: "Vol Name 8", position: "Position 8", image: "/images/santos.png" },
    { name: "Vol Name 9", position: "Position 9", image: "/images/hon.png" },
  ];

  const slideLeft = (setActiveSlide: React.Dispatch<React.SetStateAction<number>>, totalSlides: number) => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1) % totalSlides);
  };

  const slideRight = (setActiveSlide: React.Dispatch<React.SetStateAction<number>>, totalSlides: number) => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const TeamCarousel: React.FC<{ title: string; data: Member[]; activeSlide: number; setActiveSlide: React.Dispatch<React.SetStateAction<number>> }> = ({ title, data, activeSlide, setActiveSlide }) => (
    <div className="space-y-4">
      <div className="space-y-1 container">
        <div className="mb-8 relative">
          <h2 className="font-medium text-2xl sm:text-3xl">{title}</h2>
          <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-1 w-24 sm:w-36 absolute -bottom-2 left-0"></span>
        </div>
      </div>
      <div className="relative mx-auto max-w-screen-xl px-4">
        <div className="flex items-center">
          <button
            className="size-8 sm:size-12 cursor-pointer rounded-full bg-black/50 z-10 duration-300 hover:bg-black text-white grid place-content-center mr-2 sm:mr-4"
            onClick={() => slideLeft(setActiveSlide, Math.ceil(data.length / 3))}
          >
            <ChevronLeft className="w-12 h-12 sm:w-6 sm:h-6" />
          </button>
          <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-8 justify-center flex-grow">
            {data.slice(activeSlide * 3, activeSlide * 3 + 3).map((member, id) => (
              <div
                key={id.toString()}
                className="w-full sm:w-1/3 p-2 sm:p-4 h-auto sm:h-96"
              >
                <div className="rounded-2xl bg-[#191307] text-white overflow-hidden h-full p-2 sm:p-4 flex flex-col">
                  <div className="relative w-full h-48 sm:h-64 flex-grow">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="contain" 
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="p-2 sm:p-4 flex justify-between items-center">
                    <div className="flex-grow">
                      <h3 className="font-bold text-sm sm:text-lg leading-tight">{member.name}</h3>
                      <p className="text-xs sm:text-sm">{member.position}</p>
                    </div>
                    <a href="#" className="text-[#febf44] text-xl sm:text-2xl flex-shrink-0">
                      <Linkedin />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="size-8 sm:size-12 cursor-pointer rounded-full bg-black/50 z-10 duration-300 hover:bg-black text-white grid place-content-center w-12 h-12 ml-2 sm:ml-4"
            onClick={() => slideRight(setActiveSlide, Math.ceil(data.length / 3))}
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(data.length / 3) }).map((_, index) => (
            <button
              key={index.toString()}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === activeSlide ? 'bg-[#febf44]' : 'bg-gray-300'
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto">
        <h1 
          className="text-center mb-2 sm:mb-12" 
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '40px',
            lineHeight: '38px',
            letterSpacing: '0%',
            textTransform: 'capitalize',
          }}
        >
          Meet the Passionate Individuals Leading NESA
        </h1>
        <TeamCarousel
          title="Executives"
          data={executives}
          activeSlide={activeExecSlide}
          setActiveSlide={setActiveExecSlide}
        />
        <TeamCarousel
          title="Volunteers"
          data={volunteers}
          activeSlide={activeVolSlide}
          setActiveSlide={setActiveVolSlide}
        />
      </div>
    </section>
  );
};

export default TeamSection;
