"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BiEdit } from "react-icons/bi";
import { IoEyeSharp, IoEyeOffSharp, IoLogOut } from "react-icons/io5";
import { useAuthContext } from '@/lib/context/AuthContext';

// Main Page Component
const Page = () => {
  const { user, getUserId, logout, updateUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    referral: '',
    region: '',
    KYC: false,
    GFA_wallet_id: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = getUserId();
        if (!userId) throw new Error('User ID not found');
        // user is already fetched in useAuthContext
        setFormData({
          name: user?.fullName || '',
          email: user?.email || '',
          role: user?.role || '',
          referral: user?.referral || '',
          region: user?.region || '',
          KYC: user?.KYC || false,
          GFA_wallet_id: user?.GFA_wallet_id || ''
        });
        setLoading(false);
      } catch (error: any) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [getUserId, user]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateUser(formData);
      setEditing(false);
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (errorMsg) return <div>Error: {errorMsg}</div>;

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
          <InfoSection
            title="Personal Information"
            data={personalInfo(formData)}
            editing={editing}
            handleChange={handleChange}
          />
          <InfoSection
            title="Billing Information"
            data={billingInfo(formData)}
            editing={editing}
            handleChange={handleChange}
          />
          <InfoSection
            title="Settings"
            data={settings(formData)}
            editing={editing}
            handleChange={handleChange}
            noEdit={true}
          />

          {/* Edit/Save Button */}
          <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
            {editing ? (
              <button
                onClick={handleSave}
                className="px-3 sm:px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:opacity-80 active:transform active:scale-95"
                style={{ fontSize: '18px', marginBottom: '24px' }}
              >
                <span style={{ fontSize: '18px', color: '#CDA292' }}>Save</span>
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="px-3 sm:px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:opacity-80 active:transform active:scale-95"
                style={{ fontSize: '18px', marginBottom: '24px' }}
              >
                <BiEdit size={24} style={{ color: '#CDA292' }} />
                <span style={{ fontSize: '18px', color: '#CDA292' }}>Edit</span>
              </button>
            )}
          </div>

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
  editing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  noEdit?: boolean;
}

// InfoSection Component
const InfoSection: React.FC<InfoSectionProps> = ({ title, data, editing, handleChange, noEdit = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-8 w-full max-w-5xl">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-medium ${title === "Settings" ? 'text-black' : 'text-gray-800'}`}>{title}</h2>
      </div>

      {/* Section Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-gray-600 font-medium text-sm sm:text-base">{key}</span>
            {editing && !noEdit ? (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="text-black font-normal text-sm sm:text-base border border-gray-300 rounded-md p-1"
              />
            ) : (
              <span className="text-black font-normal text-sm sm:text-base">{value}</span>
            )}
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

// Data formatters (safely access user fields)
const personalInfo = (user: any) => ({
  "First name": user?.fullName?.split(' ')[0] || "",
  "Last name": user?.fullName?.split(' ')[1] || "",
  "Email address": user?.email || "",
  "Occupation": user?.role || "",
  "Phone number": "+234 8194739570", // Placeholder
  "Address": "10B Adeola Odeku Street, Apartment 3C, Victoria Island, Lagos State"
});

const billingInfo = (user: any) => ({
  "Card Holder": user?.name || "",
  "Payment method": "Africoin / Card",
  "Card Number": "4129 1051 0935 6730",
  "Billing Address": "10B Adeola Odeku Street, Apartment 3C, Victoria Island, Lagos State"
});

const settings = (user: any) => ({
  "Email address": user?.email || "",
  "Phone number": "+234 8194739570",
  "Occupation": user?.role || "",
  "Address": "10B Adeola Odeku Street, Apartment 3C, Victoria Island, Lagos State"
});

export default Page;