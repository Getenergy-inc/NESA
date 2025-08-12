import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { createNomination } from '../../../lib/services/nominationService';
import { FiCheckCircle, FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  title: string;
  description: string;
  image: string;
}

interface NominationPageProps {
  category: Category;
  type: string;
}


interface FormData {
  category: string;
   categoryType: string;
  subCategory: string;
  name: string;
  linkedinProfile: string;
  email: string;
  achievements: string;
  document: File | null;
}

const NominationPage: React.FC<NominationPageProps> = ({ type, category }) => {
  
 const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
      category: "competitive",
      categoryType: type,
      subCategory: category?.title,
      name: "",
      linkedinProfile: "",
      email: "",
      achievements: "",
      document: null,
    });
    
      const [loading, setLoading] = useState(false);
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [showSuccess, setShowSuccess] = useState(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);


 const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, document: files[0] }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleNominate = async () => {
    setLoading(true);
    try {
      await createNomination({
        category: formData.category,
         categoryType: formData. categoryType,
        subCategory: formData.subCategory,
        name: formData.name,
        linkedinProfile: formData.linkedinProfile,
        email: formData.email,
        achievements: formData.achievements,
        document: formData.document,
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
      category: "competitive",
      categoryType: type,
      subCategory: category?.title,
      name: "",
      linkedinProfile: "",
      email: "",
      achievements: "",
      document: null,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-[#191307] text-white py-24 px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/nominatehero.jpeg')" }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-2xl mb-2 md:mt-16">Sub Category 1</h2>
          <h1 className="text-3xl font-bold text-[#FFC247] mb-4">{category.title}</h1>
          <p className="mb-8">{category.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-xl font-semibold mb-2">Submit Nominee Personal Information</h2>
        <div className="w-36 h-1 mb-6" style={{
          background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
        }}></div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                              </label>
                              <input
                                type="text"
                                id="category"
                                name="category"
                                onChange={handleInputChange}
                                value={formData.categoryType}
                                readOnly
                                className="bg-gray-50 p-3 rounded-lg w-full bg-gray-50 border border-gray-200 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/20 transition-all"
                              />
                            </div>
                            <div >
                              <label htmlFor=" categoryType" className="block text-sm font-medium text-gray-700 mb-2">
                                Sub Category
                              </label>
                              <input
                                type="text"
                                id=" categoryType"
                                name=" categoryType"
                                onChange={handleInputChange}
                                value={formData.subCategory}
                                readOnly
                                className="bg-gray-50 p-3 rounded-lg w-full bg-gray-50 border border-gray-200 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/20 transition-all"
                              />
                            </div>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Individual or Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/20 transition-all"
                />
              </div>

              {/* Linkedin Field */}
              <div>
                <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-2">
                  Linkedin Profile <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="linkedIn"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  required
                  onChange={handleInputChange}

                  className="w-full p-3 ro1unded-lg bg-gray-50 border border-gray-200 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/20 transition-all"

                />
              </div>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 ro1unded-lg bg-gray-50 border border-gray-200 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/20 transition-all"
                />
              </div>

                  {/* Achievements Field */}
                  <div>
                <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  rows={4}
                  value={formData.achievements}
                  onChange={handleInputChange}
                  placeholder="Write a personalstatement or provide specific achievements"
                  
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/20 transition-all resize-y"
                />
                </div>

              {/* Document Upload */}
              <div className="md:col-span-2">
                <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-2">
                                  Upload a document or image to support your nominee achievements
                </label>
                <label className="relative block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#FFC247] transition-colors">
                  <input
                    type="file"
                    id="document"
                    name="document"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full  h-full opacity-0 cursor-pointer"
                    accept=".jpg,.png,.pdf,.svg"
                  />
                  {formData.document ? (
                    <div className="flex flex-col items-center">
                      <FiUpload className="w-8 h-8 text-[#FFC247] mb-2" />
                      <p className="text-gray-700 font-medium">{formData.document.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                      <p className="text-gray-600">Upload supporting document</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF, and SVG files only</p>
                    </div>
                  )}
                </label>
              </div>
            <div className="pt-4 md:col-span-2">
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
                  "Submit Nomination"
                )}
              </motion.button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                By submitting this form, you confirm that all information provided is accurate.
              </p>
            </div>
              </div>
          </form>
                
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
                  <h2 className="text-2xl font-bold text-gray-900">Confirm Nomination</h2>
                  <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-gray-600">Please review your nomination details before submitting:</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{formData.name}</h3>
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
                    onClick={handleNominate}
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
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nomination Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for recognizing excellence. Your nomination has been received and will be reviewed shortly.
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
                <button
                  onClick={handleNominateAnother}
                  className="w-full py-3 px-4 rounded-lg border border-[#FFC247] text-[#FFC247] font-medium hover:bg-[#FFF9ED] transition-colors"
                >
                  Nominate Another
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

export default NominationPage;