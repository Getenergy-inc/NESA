"use client";
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiCheckCircle, FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { createNomination } from "@/lib/services/nominationService";
import { createJudgeNomination } from '@/lib/services/judgeNominationService';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


interface FormData {
  fullName: string;
  currentRole: string;
  email: string;
  linkedinProfile: string;
  country: string;
  reason: string;
  documents: File | null;
}

const JudgeNominationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    currentRole: '',
    email: '',
    linkedinProfile: '',
    country: '',
    reason: '',
    documents: null
  });
  
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, documents: files[0] }));
    }
  };

    
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
    
    console.log('Form submitted:', formData);
  };

    const handleNominate = async () => {
      setLoading(true);
      try {
        await createJudgeNomination({
          fullName: formData.fullName,
          currentRole: formData.currentRole,
          email: formData.email,
          linkedinProfile: formData.linkedinProfile,
          country: formData.country,
          reason: formData.reason,
          documents: formData.documents,
        });

        setShowConfirmation(false);
        setShowSuccess(true);
      } catch (error: any) {
        console.error("Failed to create nomination:", error.message);
        setErrorMessage(error.response?.data?.error || error.message || "An unexpected error occurred.");
        setShowConfirmation(false);
      } finally {
        setLoading(false);
      }
    };

    
    const handleNominateAnother = () => {
      setShowSuccess(false);
      setFormData({
        fullName: "",
        currentRole: "",
        email: "",
        linkedinProfile: "",
        country: "",
        reason: '',
        documents: null,
      });
    };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-1">Submit Judge Nominee Information</h1>
      <div className="h-1 w-32 bg-yellow-400 mb-8"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-800 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Name of Nominee"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="currentRole" className="block text-gray-800 font-medium mb-2">
              Current Role
            </label>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              placeholder="Enter the Nominee's title (eg. teacher, CEO, administrator)"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.currentRole}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter the Nominee's email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="linkedinProfile" className="block text-gray-800 font-medium mb-2">
              LinkedIn Profile
            </label>
            <input
              type="url"
              id="linkedinProfile"
              name="linkedinProfile"
              placeholder="Enter the Nominee's LinkedIn profile"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.linkedinProfile}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="country" className="block text-gray-800 font-medium mb-2">
              Country of Residence
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter the Nominee's country"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="reason" className="block text-gray-800 font-medium mb-2">
              Reason for Nomination
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Write a statement or provide reasons for this nomination"
              rows={6}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="fileUpload" className="block text-gray-800 font-medium mb-2">
            Upload documents or images to support your nominee's achievements
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
          
            <label  className=" cursor-pointer">
             
              <input
                type="file"
                id="fileUpload"
                name="document"
                onChange={handleFileChange}
                accept=".jpg,.png,.pdf,.svg"
                className="hidden absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
                                {formData.documents ? (
                                  <div className="flex flex-col items-center">
                                    <FiUpload className="w-8 h-8 text-[#FFC247] mb-2" />
                                    <p className="text-gray-700 font-medium">{formData.documents.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                                      <p className="text-gray-600 mb-2">Drag and drop the image here or <span className='text-yellow-500'> Click here</span> to upload</p>
                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF, and SVG files only</p>
                                  </div>
                                )}
            </label>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
        <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-white py-3 px-6 rounded-xl font-medium disabled:opacity-70 relative overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit For Nomination"
                )}
              </motion.button>
        </div>
      </form>
   {/* Confirmation Modal */}
   
   {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Confirm Your Nomination Details</h2>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="h-1 w-48 bg-yellow-400 mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Full Name</span>
                <span className="text-gray-900">{formData.fullName}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Email:</span>
                <span className="text-gray-900">{formData.email}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Country of Residence:</span>
                <span className="text-gray-900">{formData.country}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Current Role:</span>
                <span className="text-gray-900">{formData.currentRole}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">LinkedIn Profile:</span>
                <span className="text-gray-900">{formData.linkedinProfile}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Documents:</span>
                {formData.documents ? (
                  <div className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                      <span className="mr-1">📄</span> Image
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">No document uploaded</span>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Reason For Nomination:</span>
                <span className="text-gray-900">{formData.reason}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleNominate}
                disabled={loading}
                className="w-full py-3 px-6 rounded-md text-black font-semibold transition duration-300"
                style={{
                  background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                }}
              >
                {loading ? "Submitting..." : "Submit Judge Nomination"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nomination Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your nomination. We have received your submission and will review it shortly.
            </p>
            <button
              onClick={handleNominateAnother}
              className="w-full py-3 px-6 rounded-md text-black font-semibold transition duration-300"
              style={{
                background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
              }}
            >
              Nominate Another Judge
            </button>
          </div>
        </div>
      )}
      
      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <FiX className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Submission Failed</h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="w-full py-3 px-6 rounded-md text-black font-semibold transition duration-300"
              style={{
                background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgeNominationForm;