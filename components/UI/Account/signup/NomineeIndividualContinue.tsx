"use client";

import React, { useState } from 'react';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Phone, Mail } from 'lucide-react';
import { MdLocationPin } from "react-icons/md";
import { PiFileArrowUpThin } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SuccessPopup from '@/components/UI/Account/signup/sucesspop';

const NomineeFormIndividualContinue: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here, including the selectedFile if needed
    setShowSuccessPopup(true);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div className="w-full md:w-1/3 relative overflow-hidden md:block hidden">
        <Image
          src="/images/Hero section.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <Image
          src="/images/NESA logo_UPDATED 1.png"
          alt="NEW EDUCATION STANDARD AWARDS AFRICA"
          width={150}
          height={75}
          className="absolute top-8 left-8"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/images/NESA Logo 2.png"
            alt="NESA Badge"
            width={250}
            height={250}
            className="max-w-full h-auto"
          />
        </div>
        <div className="absolute bottom-8 left-8 text-white text-sm">
          <p className="mb-2 flex items-center"><MdLocationPin className="mr-2" />19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere, Lagos</p>
          <p className="mb-2 flex items-center"><Phone className="mr-2" /> +234-907-962-1110</p>
          <p className="mb-2 flex items-center"><Phone className="mr-2" /> +234-810-976-5897</p>
          <p className="flex items-center"><Mail className="mr-2" /> nesa.africa@gmail.com</p>
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 md:p-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-8">
            <FiArrowLeftCircle className="text-2xl mr-2" />
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">As a Nominee</h1>
          <p className="text-gray-600 mb-8">Add more information about your nomination</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nominated Category</label>
              <div className="w-full p-3 rounded-lg bg-[#FFEECD] min-h-[60px] flex items-center">
                Recognition for the best educational support by a Political leaders in Nigeria 2024
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself</label>
              <textarea 
                placeholder="Write a short bio of yourself" 
                className="w-full p-3 rounded-lg bg-[#FFF9ED] h-32 outline-none" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload images or video on your achievements and works</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept=".jpg,.png,.pdf,.svg" 
                  className="hidden" 
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="fileInput" 
                  className="w-full p-3 border border-dashed border-gray-300 rounded-lg bg-[#FFF9ED] pr-10 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-gray-400">
                    {selectedFile ? selectedFile.name : "Upload supporting document or video"}
                  </span>
                  <PiFileArrowUpThin className="text-gray-400" size={24} />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF and SVG files only</p>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              <textarea 
                placeholder="Write more about your achievements" 
                className="w-full p-3 rounded-lg bg-[#FFF9ED] h-32 outline-none" 
              />
            </div>
            <button
              type="submit"
              className="text-white font-bold py-3 px-4 rounded-lg w-full"
              style={{
                background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {showSuccessPopup && (
        <SuccessPopup onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default NomineeFormIndividualContinue;