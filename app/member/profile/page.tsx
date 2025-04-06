"use client";
import Image from 'next/image';
import { useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { IoEyeSharp, IoEyeOffSharp, IoLogOut } from "react-icons/io5";

// Main Page Component
const Page = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Image */}
      <div className="relative w-full h-[200px]">
        <Image
          src="/images/hero.jpeg" 
          alt="Header"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191307CC] to-[#191307AA]" />
      </div>

      {/* Main Content */}
      <div className="px-4 relative w-full flex justify-center flex-grow">
        {/* Profile Picture */}
        <div className="absolute -top-16 w-full max-w-5xl mx-auto px-4">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src="/images/Ellipse.png" 
              alt="Profile Picture"
              fill
              className="rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Information Sections */}
        <div className="pt-24 sm:pt-32 flex flex-col items-center space-y-4 sm:space-y-8 w-full max-w-5xl">
          <InfoSection title="Personal Information" data={personalInfo} />
          <InfoSection title="Billing Information" data={billingInfo} />
          <InfoSection title="Settings" data={settings} noEdit={true} />

          {/* Logout Button */}
          <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:opacity-80 active:transform active:scale-95"
              style={{ fontSize: '18px', marginBottom: '24px' }}
            >
              <IoLogOut size={24} style={{ color: '#CDA292' }} />
              <span style={{ fontSize: '18px', color: '#CDA292' }}>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoSectionProps {
  title: string;
  data: Record<string, string>;
  noEdit?: boolean;
}

// InfoSection Component
const InfoSection: React.FC<InfoSectionProps> = ({ title, data, noEdit = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    // Implement edit functionality here
    console.log(`Editing ${title}...`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-8 w-full max-w-5xl">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-medium ${title === "Settings" ? 'text-black' : 'text-gray-800'}`}>{title}</h2>
        {!noEdit && (
          <button 
            onClick={handleEdit}
            className="flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-all duration-300 hover:opacity-80 active:transform active:scale-95" 
            style={{ background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)' }}
          >
            <span className="mr-1 sm:mr-2">Edit</span>
            <BiEdit />
          </button>
        )}
      </div>

      {/* Section Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-gray-600 font-medium text-sm sm:text-base">{key}</span>
            <span className="text-black font-normal text-sm sm:text-base">{value}</span>
          </div>
        ))}
        {title === "Settings" && (
         <div className="flex flex-col col-span-1">
           <span className="text-gray-600 font-medium text-sm sm:text-base">Password</span>
           <span className="text-black font-normal flex items-center mt-1 sm:mt-2 text-sm sm:text-base">
             {showPassword ? "actualPassword" : "************"}
             <button 
               onClick={() => setShowPassword(!showPassword)} 
               className="ml-2 transition-all duration-300 hover:opacity-80 active:transform active:scale-95"
             >
               {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
             </button>
           </span>
         </div>
        )}
      </div>
    </div>
  );
};

// Data Objects
const personalInfo: Record<string, string> = {
  "First name": "Mujeeb",
  "Last name": "Azeez",
  "Email address": "mujeebazeez@gmail.com",
  "Occupation": "Doctor",
  "Phone number": "+234 8194739570",
  "Address": "10B Adeola Odeku Street, Apartment 3C, Victoria Island, Lagos State"
};

const billingInfo: Record<string, string> = {
  "Card Holder": "Mujeeb Azeez",
  "Payment method": "Africoin / Card",
  "Card Number": "4129 1051 0935 6730",
  "Billing Address": "10B Adeola Odeku Street, Apartment 3C, Victoria Island, Lagos State"
};

const settings: Record<string, string> = {
  "Email address": "mujeebazeez@gmail.com",
  "Phone number": "+234 8194739570",
  "Occupation": "Doctor",
  "Address": "10B Adeola Odeku Street, Apartment 3C, Victoria Island, Lagos State"
};

export default Page;