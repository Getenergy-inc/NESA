"use client";

import React, { useState } from 'react';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Eye, EyeOff, Mail, Phone, X } from 'lucide-react';
import { MdLocationPin } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const NominationAccountForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleViewWallet = () => {
    console.log("View wallet");
  };

  const handleStartNominating = () => {
    console.log("Start nominating");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div className="w-full md:w-1/3 relative overflow-hidden hidden md:block bg-[#1E1E1E]">
        <Image
          src="/images/Hero section.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
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
            <p className="mb-2 flex items-center"><MdLocationPin className="mr-2" />19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere, Lagos</p>
            <p className="mb-2 flex items-center"><Phone className="mr-2" /> +234-907-962-1110</p>
            <p className="mb-2 flex items-center"><Phone className="mr-2" /> +234-810-976-5897</p>
            <p className="flex items-center"><Mail className="mr-2" /> nesa.africa@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 md:p-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-8">
            <FiArrowLeftCircle className="text-3xl mr-2" />
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">Create nomination account</h1>
          <p className="text-gray-600 mb-8">Inspire change and impact education through your effort.</p>
          <form onSubmit={handleCreateAccount}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
              <input type="text" placeholder="Enter your full name" className="w-full p-3 rounded-lg border-gray-300 bg-[#FFF9ED]" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="Enter your Email" className="w-full p-3 rounded-lg  border-gray-300 bg-[#FFF9ED]" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="w-full p-3 rounded-lg  border-gray-300 pr-10 bg-[#FFF9ED]" 
                />
                <button 
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm your password" 
                  className="w-full p-3 rounded-lg border-gray-300 pr-10 bg-[#FFF9ED]" 
                />
                <button 
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-black  py-3 px-4 rounded-lg w-full md:w-3/5"
                style={{
                  background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
                }}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-center mb-4">Account Creation Successful!</h2>
              <p className="text-center text-gray-600 mb-8 max-w-md">
                Your Nomination account has been successfully created and you have been given 3 Afrigold-coin to vote when voting starts
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handleViewWallet}
                className="px-6 py-3 border border-[#FFC247] text-[#FFC247] rounded-lg hover:bg-[#FFF9ED] flex-1"
              >
                View wallet balance
              </button>
              <button
                onClick={handleStartNominating}
                className="px-6 py-3 text-black rounded-lg flex-1"
                style={{
                  background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
                }}
              >
                Start nominating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationAccountForm;
