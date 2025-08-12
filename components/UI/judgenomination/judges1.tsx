"use client";
import { ChevronRight } from "lucide-react";
import Button from "@/components/Common/Button";
import useSlider from "@/lib/hooks/useSlider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
// import { getjudges } from "@/lib/services/getjugdesApplicants";
import { useRouter } from "next/navigation";


type Judge = {
  id: string;
  full_name: string;
  experience?: string;
  email?: string;
  upload_document?: string;
  phone_number?: string;
  state_and_region?: string;
  motivation_statement?: string;
  education_background?: string;
  upload_profile_image?: string;
};


const staticJudges: { name: string; role: string; image: string }[] = [
  {
    name: "Benneth Osarieme Ogbeiwi",
    role: "Entrepreneur",
    image: "/images/judg1.png"
  },
  {
    name: "Dr Juliet Ihiabe",
    role: "Entrepreneur",
    image: "/images/judg2.png"
  },
  {
    name: "Paul-Kayode Joash",
    role: "Entrepreneur",
    image: "/images/judg3.png"
  },
  {
    name: "Oluwadaisi Patricia Aderibigbe Santos",
    role: "Educationalist",
    image: "/images/judg4.png"
  },
  {
    name: "Damilola O.",
    role: "QHSSE Manager",
    image: "/images/judg5.png"
  }
];


const GradientLine = () => (
    <div className="h-[3px] bg-gradient-to-r from-[#FFC247] to-[#E48900] mt-2 w-36" />
  );
  
const Judges = () => {
  const router = useRouter();
  const { sliderRef: ref, moveLeft, moveRight } = useSlider();

  return (
    <div>
      <div className="pt-10 relative flex items-center" style={{ backgroundColor: "#FFF5E0" }}>


        <div className="w-[100%]  text-white space-y-16">
          <div className="mx-[50px] md:mx-[120px] ">
        <h3 className="_under_border text-black text-2xl font-medium mb-5 ">Meet the Judges</h3>
        <div >
        <p className="font-poppins font-light text-[#4B463E]">Get to know the NESA Africa/Nigeria Judges, their background, and achievements
        </p>
                </div>
          </div>
          <div             style={{
              backgroundImage: "url('/images/bg/judgebg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
            }}>
            <div
            className=" flex items-center sm:justify-center md:justify-between overflow-x-auto hide_scroll scroll-smooth w-screen md:px-12 px-4 lg:space-x-4 space-x-4 pb-10 pt-6"
            ref={ref}

            >
 {/* Static judges */}
      {staticJudges.map((judge, id) => (
        <div
          key={`static-${id}`}
          className="flex-shrink-0 bg-white lg:w-[35%] w-[60%] h-[450px] md:w-[34%] rounded-xl overflow-hidden relative bg-cover bg-center"
          style={{ backgroundImage: `url(${judge.image})` }}
        >
          <div className="absolute bottom-0 w-full bg-black/60 text-white p-2 flex flex-col gap-2 ">
            <h3 className="text-lg font-medium leading-tight w-[200px] ml-2">{judge.name}</h3>
            <p className="text-sm whitespace-pre-line font-light mb-2 ml-2">{judge.role}</p>
          </div>
        </div>
      ))}

      



            </div>

          <div className="px-6 pl-14 flex items-center justify-between pb-6">
        <div className="flex items-center space-x-2">
          {Array.from({ length: 5 }).map((_, id) => (
            <div
          key={id}
          className={`w-3 h-3 rounded-full bg-white cursor-pointer ${id === 0 ? "bg-primaryGold" : "bg-primaryGold"}`}
            ></div>
          ))}
        </div>
        <div className="flex  items-center space-x-2 text-white">
          <button className="size-12  rounded-full bg-black bg-opacity-80 grid place-content-center" onClick={moveLeft}>
            <ArrowLeft />
          </button>
          <button className="size-12 rounded-full bg-white text-black grid place-content-center" onClick={moveRight}>
            <ArrowRight />
          </button>
        </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Judges;