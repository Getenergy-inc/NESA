"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiCheckCircle, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/lib/context/AuthContext';
import { createNonCompetitiveNomination } from '@/lib/services/nonCompetitiveService';

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics: string;
  profileImage: File | null;
  supportingDocuments: File | null;
}

const NonCompetitiveNominationForm = () => {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuthContext();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    organizationName: '',
    email: '',
    phone: '',
    country: '',
    category: '',
    subcategory: '',
    achievementSummary: '',
    impactMetrics: '',
    profileImage: null,
    supportingDocuments: null
  });
  
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, profileImage: files[0] }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, supportingDocuments: files[0] }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleNominate = async () => {
    setLoading(true);
    try {
      await createNonCompetitiveNomination({
        fullName: formData.fullName,
        organizationName: formData.organizationName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        category: formData.category,
        subcategory: formData.subcategory,
        achievementSummary: formData.achievementSummary,
        impactMetrics: formData.impactMetrics,
        profileImage: formData.profileImage,
        supportingDocuments: formData.supportingDocuments,
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
      fullName: '',
      organizationName: '',
      email: '',
      phone: '',
      country: '',
      category: '',
      subcategory: '',
      achievementSummary: '',
      impactMetrics: '',
      profileImage: null,
      supportingDocuments: null
    });
    setImagePreview(null);
  };

  const categories = [
    { value: "educational-state", label: "Educational-Friendly State" },
    { value: "tertiary-library", label: "Tertiary Library" },
    { value: "research-institute", label: "Research Institute" },
    { value: "faith-based", label: "Faith-Based Organization" },
    { value: "political-leader", label: "Political Leader" },
    { value: "international-contributor", label: "International Contributor" },
    { value: "diaspora-association", label: "Diaspora Association" },
    { value: "bilateral-partner", label: "Bilateral Partner" }
  ];

  const subcategories = {
    "educational-state": [
      { value: "north-central", label: "North Central" },
      { value: "north-east", label: "North East" },
      { value: "north-west", label: "North West" },
      { value: "south-east", label: "South East" },
      { value: "south-south", label: "South South" },
      { value: "south-west", label: "South West" }
    ],
    "tertiary-library": [
      { value: "university", label: "University Library" },
      { value: "polytechnic", label: "Polytechnic Library" },
      { value: "college", label: "College Library" }
    ],
    "research-institute": [
      { value: "government", label: "Government Research Institute" },
      { value: "private", label: "Private Research Institute" },
      { value: "academic", label: "Academic Research Institute" }
    ],
    "faith-based": [
      { value: "christian", label: "Christian Education Champion" },
      { value: "islamic", label: "Islamic Education Champion" },
      { value: "other-faith", label: "Other Faith-Based Organization" }
    ],
    "political-leader": [
      { value: "governor", label: "Governor" },
      { value: "minister", label: "Minister" },
      { value: "legislator", label: "Legislator" }
    ],
    "international-contributor": [
      { value: "organization", label: "International Organization" },
      { value: "individual", label: "International Individual" }
    ],
    "diaspora-association": [
      { value: "africa-diaspora", label: "Africa Diaspora Association" },
      { value: "nigeria-diaspora", label: "Nigeria Diaspora Association" }
    ],
    "bilateral-partner": [
      { value: "government", label: "Government Partner" },
      { value: "ngo", label: "NGO Partner" },
      { value: "corporate", label: "Corporate Partner" }
    ]
  };

  const [selectedSubcategories, setSelectedSubcategories] = useState<Array<{value: string, label: string}>>([]);

  useEffect(() => {
    if (formData.category && subcategories[formData.category as keyof typeof subcategories]) {
      setSelectedSubcategories(subcategories[formData.category as keyof typeof subcategories]);
    } else {
      setSelectedSubcategories([]);
    }
  }, [formData.category]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#FFF5E0]">
      <h1 className="text-3xl font-bold mb-1 text-[#191307]">Submit Non-Competitive Nomination</h1>
      <div className="h-1 w-32 bg-[#FFC247] mb-8"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-800 font-medium mb-2">
              Full Name / Institution Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter the nominee's name or institution name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="organizationName" className="block text-gray-800 font-medium mb-2">
              Organization Name (if applicable)
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              placeholder="Enter the organization name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.organizationName}
              onChange={handleChange}
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
              placeholder="Enter contact email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter contact phone number"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="country" className="block text-gray-800 font-medium mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter country"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-gray-800 font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="subcategory" className="block text-gray-800 font-medium mb-2">
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
              value={formData.subcategory}
              onChange={handleChange}
              required
              disabled={!formData.category}
            >
              <option value="">Select a subcategory</option>
              {selectedSubcategories.map((subcategory) => (
                <option key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="profileImage" className="block text-gray-800 font-medium mb-2">
              Profile Image
            </label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png"
                  className="hidden absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md mb-2" 
                    />
                    <p className="text-gray-700 font-medium">
                      {formData.profileImage?.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Click to change image</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop an image here or <span className="text-[#FFC247]">Click here</span> to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG files only</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="achievementSummary" className="block text-gray-800 font-medium mb-2">
            Achievement Summary
          </label>
          <textarea
            id="achievementSummary"
            name="achievementSummary"
            placeholder="Describe the achievements and contributions to education"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
            value={formData.achievementSummary}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="impactMetrics" className="block text-gray-800 font-medium mb-2">
            Impact Metrics
          </label>
          <textarea
            id="impactMetrics"
            name="impactMetrics"
            placeholder="Provide measurable impact metrics and evidence of educational contributions"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFC247]"
            value={formData.impactMetrics}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="supportingDocuments" className="block text-gray-800 font-medium mb-2">
            Supporting Documents
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
            <label className="cursor-pointer">
              <input
                type="file"
                id="supportingDocuments"
                name="supportingDocuments"
                onChange={handleDocumentChange}
                accept=".pdf,.doc,.docx"
                className="hidden absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {formData.supportingDocuments ? (
                <div className="flex flex-col items-center">
                  <FiUpload className="w-8 h-8 text-[#FFC247] mb-2" />
                  <p className="text-gray-700 font-medium">{formData.supportingDocuments.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop documents here or <span className="text-[#FFC247]">Click here</span> to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX files only</p>
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
            className="w-full text-[#191307] py-3 px-6 rounded-xl font-medium disabled:opacity-70 relative overflow-hidden"
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
            
            <div className="h-1 w-48 bg-[#FFC247] mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Name:</span>
                <span className="text-gray-900">{formData.fullName}</span>
              </div>
              
              {formData.organizationName && (
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">Organization:</span>
                  <span className="text-gray-900">{formData.organizationName}</span>
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Email:</span>
                <span className="text-gray-900">{formData.email}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Phone:</span>
                <span className="text-gray-900">{formData.phone}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Country:</span>
                <span className="text-gray-900">{formData.country}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Category:</span>
                <span className="text-gray-900">
                  {categories.find(c => c.value === formData.category)?.label || formData.category}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Subcategory:</span>
                <span className="text-gray-900">
                  {selectedSubcategories.find(s => s.value === formData.subcategory)?.label || formData.subcategory}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Profile Image:</span>
                {formData.profileImage ? (
                  <div className="flex items-center">
                    <img 
                      src={imagePreview || ''} 
                      alt="Preview" 
                      className="w-16 h-16 object-cover rounded-md mr-2" 
                    />
                    <span className="text-gray-900">{formData.profileImage.name}</span>
                  </div>
                ) : (
                  <span className="text-gray-500">No image uploaded</span>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Supporting Documents:</span>
                {formData.supportingDocuments ? (
                  <div className="flex items-center">
                    <span className="bg-[#FFC247]/20 text-[#E48900] px-2 py-1 rounded flex items-center">
                      <span className="mr-1">📄</span> {formData.supportingDocuments.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">No document uploaded</span>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleNominate}
                disabled={loading}
                className="w-full py-3 px-6 rounded-md text-[#191307] font-semibold transition duration-300"
                style={{
                  background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                }}
              >
                {loading ? "Submitting..." : "Submit Nomination"}
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleNominateAnother}
                className="flex-1 py-3 px-6 rounded-md border border-[#FFC247] text-[#E48900] font-semibold transition duration-300 hover:bg-[#FFC247]/10"
              >
                Submit Another
              </button>
              <button
                onClick={() => router.push('/nomination/non-competitive')}
                className="flex-1 py-3 px-6 rounded-md text-[#191307] font-semibold transition duration-300"
                style={{
                  background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
                }}
              >
                Return to Categories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonCompetitiveNominationForm;