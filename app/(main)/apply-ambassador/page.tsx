"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { MdLocationPin } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FiCheckCircle, FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ambapplication } from '@/lib/services/ambapplicationservice';

interface FormData {
  full_name: string;
  age_range: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  socials: string;
}

const AmbassadorFormIndividual: React.FC = () => {
 const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
      full_name: "",
      age_range: "",
      email: "",
      phone_number: "",
      address: "",
      country: "",
      socials: "",
    });

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    
const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone_number: value }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleApply = async () => {
    setLoading(true);
    try {
      await ambapplication({
      full_name: formData.full_name,
      age_range: formData.age_range,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      country: formData.country,
      socials: formData.socials
      });

      setShowConfirmation(false);
      setShowSuccess(true);
    } catch (error: any) {
      console.error("Failed to create Application:", error.message);
      setErrorMessage(error.response?.data?.error || error.message || "An unexpected error occurred.");
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyAnother = () => {
    setShowSuccess(false);
    setFormData({
      full_name: "",
      age_range: "",
      email: "",
      phone_number: "",
      address: "",
      country: "",
      socials: "",
    });
  };


    const handleBack = () => {
      router.back();
    };



  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full pt-20">
          <div className="w-full md:w-1/3 relative overflow-hidden md:block hidden ">
            <Image
              src="/images/Hero section.png"
              alt="Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="h-[50px]"
              
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
        <div className="w-full md:w-2/3 p-6 md:p-12 md:pt-24 bg-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-8">
            <FiArrowLeftCircle className="text-3xl mr-2" />
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-3xl font-medium mb-2">Apply to become an ambassador</h1>
          <p className="text-gray-600 mb-8">Fill the form to apply to be an Ambassador</p>
          <h1 className="text-1xl font-medium mb-2">Personal information</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor='full_name' className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                id="full_name"
                name="full_name"
                onChange={handleInputChange}
                value={formData.full_name}
                placeholder="Enter your full name" 
                className="w-full p-3 rounded-lg bg-[#FCFBFA]" 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="age_range" className="block text-sm font-medium text-gray-700 mb-2">
                Select your age range
              </label>
              <select
                id="age_range"
                name="age_range"
                onChange={handleInputChange}
                value={formData.age_range}
                className="w-full p-3 pr-6 rounded-lg bg-[#FCFBFA]"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose your age range
                </option>
                <option value="18-25">18-25</option>
                <option value="25-30">25-30</option>
                <option value="30-40">30-40</option>
                <option value="40+">40 and above</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email"                   
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email" name='email' 
                  placeholder="Enter your Email" className="w-full p-3 rounded-lg bg-[#FCFBFA]" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <PhoneInput
                country={'ng'}
                onChange={handlePhoneChange}
                value={formData.phone_number}
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
                  background: '#FCFBFA',
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
                  className="w-full p-3 rounded-lg bg-[#FCFBFA] pr-10" 
                />
                <MdLocationPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor='country' className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
              <input type="text" id="country" name='country' placeholder="Enter your country " className="w-full p-3 rounded-lg bg-[#FCFBFA]" />
            </div>

            <div className="mb-6">
              <label htmlFor='socials' className="block text-sm font-medium text-gray-700 mb-2">Social Media Handle</label>
              <input type="text" id="socials" name='socials' placeholder="Enter your social media handles" className="w-full p-3 rounded-lg bg-[#FCFBFA]" />
            </div>
            <div className="pt-4 md:col-span-2">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              className="text-black font-bold py-3 px-4 rounded-lg w-full"
              style={{
                background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
              }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </motion.button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                By submitting this form, you confirm that all information provided is accurate.
              </p>
            </div>
          </form>
        </div>
      </div>
           {/* Confirmation Modal */}
            <AnimatePresence>
              {showConfirmation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white rounded-xl shadow-xl w-full max-w-md"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Confirm Application Details</h2>
                        <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-gray-600">
                          <FiX size={24} />
                        </button>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <p className="text-gray-600">Please review your Application details before submitting:</p>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-medium text-gray-900 mb-2">{formData.full_name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{formData.email}</p>
                        </div>
                      </div>
      
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setShowConfirmation(false)}
                          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleApply}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg text-white font-medium disabled:opacity-70"
                          style={{
                            background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                          }}
                        >
                          {loading ? "Submitting..." : "Confirm Submission"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
      
            {/* Success Modal */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="bg-white rounded-xl shadow-xl w-full max-w-md text-center p-8"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                      Thank you for recognizing excellence. Your Application has been received and will be reviewed shortly.
                    </p>
      
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => router.push("/ProfileSetting")}
                        className="w-full py-3 px-4 rounded-lg text-white font-medium"
                        style={{
                          background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                        }}
                      >
                        Return to Dashboard
                      </button>

                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
      
            {/* Error Modal */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-red-600">Submission Error</h2>
                      <button onClick={() => setErrorMessage(null)} className="text-gray-400 hover:text-gray-600">
                        <FiX size={24} />
                      </button>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{errorMessage}</p>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => setErrorMessage(null)}
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{
                          background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
    </div>
  );
};

export default AmbassadorFormIndividual;

function createNomination(arg0: { category: any;  categoryType: any; subCategory: any; name: any; linkedinProfile: any; email: string; achievements: any; document: any; }) {
  throw new Error('Function not implemented.');
}
