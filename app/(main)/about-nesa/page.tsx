"use client"; // Ensure this is the first line

import "../../../public/styles/fade.css";
import Image from "next/image";
import NesaAfricaHeader from "@/components/UI/NesaAfrica/header";
import TypeOfAwards from "@/components/UI/About/type-of-awards";
import useSlider from "@/lib/hooks/useSlider";
import TestimoniesShowcase from "@/components/UI/Testimonies/showcase";
import Button from "@/components/Common/Button";
import { useEffect } from "react";
import AwardStructure from "@/components/UI/Home/award-structure/awardstructure";
import NESARoadmap from "@/components/UI/Home/roadmap/timeline";
import AboutNesa2025 from "@/components/UI/About/AboutNesa2025";

const Page = () => {
  const { sliderRef: ref, moveLeft, moveRight } = useSlider();

  // Example of client-side code wrapped in useEffect
  useEffect(() => {
    // This code will only run on the client side
    if (typeof window !== 'undefined') {
      // Your client-side specific code here
    }
  }, []);

  return (
    <>
      <NesaAfricaHeader />
        <AboutNesa2025 />
      <main className="space-y-12 sm:space-y-16 md:space-y-20">
        <section className="bg-[#fff5e0] space-y-12 sm:space-y-16 md:space-y-20 py-12 sm:py-16 md:py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <Image
                  src="/images/new award.png"
                  alt="award"
                  className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[521px]"
                  height={585}
                  width={521}
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium leading-tight sm:leading-tight md:leading-tight lg:leading-[3rem] mb-4 bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  Two Prestigious awards awaits in every category
                </h2>
                <p className="font-light text-base sm:text-lg md:text-xl lg:text-[1.125rem] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[1.75rem]">
                  Through the selection process, our judges meticulously examine
                  nominees, choosing a winner from each subcategory to be honored
                  with the esteemed &apos;Platinum Award.&apos; These winners
                  progress to the final stage within their respective categories,
                  where the ultimate victor in each group claims success and is
                  honored with the prestigious &apos;Blue Garnet Award,&apos;
                  marking the pinnacle of excellence.
                </p>
              </div>
            </div>
          </div>

          <TypeOfAwards />
        </section>

        <section className="space-y-12 sm:space-y-16 md:space-y-20 pb-12 sm:pb-16 md:pb-20">

          <div>
          <AwardStructure />
          </div>
          <div>
          <NESARoadmap />
          </div>
                    <div className="container px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="space-y-4 md:px-12 lg:px-24 xl:px-32 text-center">
              <h3 className="text-2xl sm:text-3xl font-semibold">
                NESA Africa in every African Country
              </h3>
              <p className="text-sm sm:text-base md:text-lg">
                NESA Africa is committed to reaching every corner of the African
                continent. Each country has a dedicated portal to manage local
                educational projects, ensuring tailored solutions and direct
                impact in every community.
              </p>
            </div>

            <div className="flex justify-center">
              <Image
                className="w-full max-w-[800px] lg:max-w-full"
                src="/images/testimonies/map_.png"
                alt="world map"
                width={1000}
                height={1000}
              />
            </div>

            <div className="flex justify-center">
              <Button text="Request to Host NESA Africa" variant="filled" />
            </div>
          </div>
          <div>
            <TestimoniesShowcase />
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
