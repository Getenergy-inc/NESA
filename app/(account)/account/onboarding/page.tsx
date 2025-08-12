"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiArrowLeft, FiX } from "react-icons/fi";
import { FaVoteYea, FaListAlt, FaHandsHelping } from "react-icons/fa";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { Phone, Mail } from "lucide-react";

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/ProfileSetting"); // Redirect to member dashboard after onboarding
    }
  };

  const handleSkip = () => {
    router.push("/ProfileSetting"); // Skip directly to dashboard
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Left Side - Sidebar with Images and Contact Info */}
      <div className="w-full md:w-2/5 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Hero section.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
          <div>
            <Image
              src="/images/NESA logo_UPDATED 1.png"
              alt="NEW EDUCATION STANDARD AWARDS AFRICA"
              width={150}
              height={75}
              className="mb-4"
            />
          </div>
          <div className="flex justify-center items-center flex-grow">
            <Image
              src="/images/NESA Logo 2.png"
              alt="NESA Badge"
              width={250}
              height={250}
              className="max-w-full h-auto"
            />
          </div>
          <div className="text-sm">
            <p className="mb-2 flex items-center">
              <MdLocationPin className="mr-2" />19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere, Lagos
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" /> +234-907-962-1110
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" /> +234-810-976-5897
            </p>
            <p className="flex items-center">
              <Mail className="mr-2" /> nesa.africa@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Onboarding Content */}
      <div className="w-full md:w-3/5 p-6 md:p-12 bg-white">
        <div className="max-w-2xl mx-auto h-full flex flex-col">
          {/* Skip Button (Top Right) */}
          <div className="flex justify-end mb-8">
            <button
              onClick={handleSkip}
              className="text-[#FFC247] hover:text-[#E48900] flex items-center"
            >
              Skip <FiX className="ml-1" />
            </button>
          </div>

          {/* Onboarding Content */}
          <div className="flex-grow flex flex-col justify-center">
            {currentStep === 1 && (
              <div className="text-center">
                <div className="mb-8 mx-auto w-24 h-24 flex items-center justify-center bg-[#FFC247] rounded-full">
                  <FaVoteYea className="text-white text-4xl" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-[#333]">
                  Nominate and Vote for Excellence
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Discover outstanding candidates across various categories and
                  cast your votes to recognize excellence in education.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center">
                <div className="mb-8 mx-auto w-24 h-24 flex items-center justify-center bg-[#FFC247] rounded-full">
                  <FaListAlt className="text-white text-4xl" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-[#333]">
                  Explore Diverse Categories
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  From innovative educators to outstanding institutions, find
                  categories that matter to you and participate in shaping the
                  future.
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center">
                <div className="mb-8 mx-auto w-24 h-24 flex items-center justify-center bg-[#FFC247] rounded-full">
                  <FaHandsHelping className="text-white text-4xl" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-[#333]">
                  Your Voice Makes a Difference
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Every vote counts! Help recognize and reward the best in
                  education by participating in our transparent voting process.
                </p>
              </div>
            )}

            {/* Progress Indicators */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    currentStep === step ? "bg-[#FFC247]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg ${
                currentStep === 1
                  ? "invisible"
                  : "text-[#FFC247] hover:text-[#E48900]"
              }`}
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>

            <button
              onClick={handleNext}
              className="bg-[#FFC247] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E48900] transition-colors duration-300 flex items-center"
            >
              {currentStep === 3 ? "Get Started" : "Next"}{" "}
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;