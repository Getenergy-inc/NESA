// JudgeAdditionalInfo.tsx
"use client";

import React, { useState } from 'react';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Mail, Phone } from 'lucide-react';
import { MdLocationPin } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const JudgeAdditionalInfo: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Side - Background Image */}
      <div className="w-full md:w-1/3 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0">
          <Image
            src="/images/Hero section.png"
            alt="Background"
            fill
            quality={100}
            className="object-cover"
          />
        </div>
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
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
              <MdLocationPin className="mr-2" />
             19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere, Lagos
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" />
              +234-907-962-1110
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" />
              +234-810-976-5897
            </p>
            <p className="flex items-center">
              <Mail className="mr-2" />
              nesa.africa@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-2/3 p-6 md:p-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-8">
            <FiArrowLeftCircle className="text-3xl mr-2" />
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">As a Judge</h1>
          <p className="text-gray-600 mb-8">
            Give more Information about yourself
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educational Background
              </label>
              <input
                type="text"
                placeholder="Enter your educational background"
                className="w-full p-3 rounded-lg bg-[#FFF9ED]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                placeholder="Enter your Professional experience"
                className="w-full p-3 rounded-lg bg-[#FFF9ED]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#FFF9ED]">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600">Upload supporting document</p>
                  <p className="text-xs text-gray-400 mt-1">Upload your resume, passport and other supporting documents</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivation Statement
              </label>
              <textarea
                placeholder="Write what made you motivated to become a judge.."
                className="w-full p-3 rounded-lg bg-[#FFF9ED] h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#FFC247] text-black font-bold py-3 px-4 rounded-lg w-full hover:bg-[#E48900] transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JudgeAdditionalInfo;