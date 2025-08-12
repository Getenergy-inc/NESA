"use client";

import React, { useState } from 'react';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { MdLocationPin } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const NomineeFormIndividual: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
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
          <h1 className="text-3xl font-bold mb-2">As a Nominee</h1>
          <p className="text-gray-600 mb-8">Fill in your personal information</p>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Individual</label>
              <input 
                type="text" 
                value="Individual" 
                readOnly 
                className="w-full p-3 rounded-lg bg-[#FFEECD]" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
              <input type="text" placeholder="Enter your full name" className="w-full p-3 rounded-lg bg-[#FFF9ED]" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="Enter your Email" className="w-full p-3 rounded-lg bg-[#FFF9ED]" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <PhoneInput
                country={'ng'}
                value={phoneNumber}
                onChange={handlePhoneChange}
                enableAreaCodes={true}
                enableTerritories={true}
                enableLongNumbers={true}
                countryCodeEditable={false}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                containerClass="mb-6"
                inputStyle={{
                  width: '100%',
                  height: '48px',
                  padding: '12px 12px 12px 48px',
                  borderRadius: '6px',
                  background: '#FFF9ED',
                  border: 'none',
                }}
                buttonStyle={{
                  height: '48px',
                  borderRadius: '6px 0 0 6px',
                  background: '#FFF9ED',
                  border: 'none',
                }}
                dropdownStyle={{
                  background: '#FFF9ED',
                }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter your address" 
                  className="w-full p-3 rounded-lg bg-[#FFF9ED] pr-10" 
                />
                <MdLocationPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="w-full p-3 rounded-lg bg-[#FFF9ED] pr-10" 
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
                  className="w-full p-3 rounded-lg bg-[#FFF9ED] pr-10" 
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
            <button
              type="submit"
              className="text-black font-bold py-3 px-4 rounded-lg w-full"
              style={{
                background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NomineeFormIndividual;