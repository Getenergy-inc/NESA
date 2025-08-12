'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { 
  UserCheck, 
  Users, 
  Award, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Upload,
  X,
  ArrowRight,
  Mail,
  User,
  MapPin,
  FileText,
  Lightbulb
} from "lucide-react";
import { FiCheckCircle, FiUpload, FiX } from "react-icons/fi";

// Application types for nominees
const NOMINEE_TYPES = [
  {
    id: 'individual',
    title: 'Individual Expert',
    description: 'Independent professional or academic',
    icon: UserCheck,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'organization',
    title: 'Organization Representative',
    description: 'Representative from educational organization',
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'institutional',
    title: 'Institutional Leader',
    description: 'Leader from educational institution',
    icon: Shield,
    color: 'from-purple-500 to-purple-600'
  }
];

// Expertise areas for nominees
const EXPERTISE_AREAS = [
  'Educational Leadership',
  'Innovation in Learning',
  'Policy & Governance',
  'Technology in Education',
  'Community Development',
  'Research & Academia',
  'CSR & Philanthropy',
  'Youth Development',
  'Special Needs Education',
  'Vocational Training',
  'Early Childhood Education',
  'Higher Education'
];

interface NominationFormData {
  // Nominee Information
  nominee_full_name: string;
  nominee_email: string;
  nominee_phone: string;
  nominee_current_role: string;
  nominee_organization: string;
  nominee_linkedin: string;
  nominee_country: string;
  nominee_type: string;
  nominee_expertise_areas: string[];
  
  // Nominator Information
  nominator_name: string;
  nominator_email: string;
  nominator_relationship: string;
  
  // Nomination Details
  reason_for_nomination: string;
  specific_achievements: string;
  why_good_judge: string;
  
  // Documents
  nominee_cv: File | null;
  recommendation_letter: File | null;
}

const EnhancedJudgeNominationForm: React.FC = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<NominationFormData>({
    nominee_full_name: '',
    nominee_email: '',
    nominee_phone: '',
    nominee_current_role: '',
    nominee_organization: '',
    nominee_linkedin: '',
    nominee_country: '',
    nominee_type: 'individual',
    nominee_expertise_areas: [],
    nominator_name: '',
    nominator_email: '',
    nominator_relationship: '',
    reason_for_nomination: '',
    specific_achievements: '',
    why_good_judge: '',
    nominee_cv: null,
    recommendation_letter: null
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState('');
  const [letterFileName, setLetterFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExpertiseChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      nominee_expertise_areas: checked 
        ? [...prev.nominee_expertise_areas, area]
        : prev.nominee_expertise_areas.filter(a => a !== area)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      if (fieldName === 'nominee_cv') {
        setCvFileName(file.name);
      } else if (fieldName === 'recommendation_letter') {
        setLetterFileName(file.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmNomination = async () => {
    setLoading(true);
    try {
      // Submit nomination to API
      const response = await fetch('/api/judge-nominations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          nominee_cv: formData.nominee_cv?.name,
          recommendation_letter: formData.recommendation_letter?.name
        })
      });

      const data = await response.json();

      if (data.success) {
        setShowConfirmation(false);
        setShowSuccess(true);
      } else {
        throw new Error(data.message || 'Nomination submission failed');
      }
    } catch (error: any) {
      console.error("Failed to submit nomination:", error.message);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Judge Nomination Form
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Provide detailed information about your nominee to help us evaluate their suitability as a NESA-Africa judge
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Nominee Type Selection */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nominee Type *
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NOMINEE_TYPES.map((type) => {
                const IconComponent = type.icon;
                const isSelected = formData.nominee_type === type.id;
                return (
                  <label
                    key={type.id}
                    className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="nominee_type"
                      value={type.id}
                      checked={isSelected}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {type.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-tight">
                        {type.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Nominee Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Nominee Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="nominee_full_name"
                  value={formData.nominee_full_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                  placeholder="Enter nominee's full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="nominee_email"
                  value={formData.nominee_email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                  placeholder="Enter nominee's email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Role *
                </label>
                <input
                  type="text"
                  name="nominee_current_role"
                  value={formData.nominee_current_role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                  placeholder="e.g., Director of Education"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="nominee_organization"
                  value={formData.nominee_organization}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                  placeholder="Organization or institution"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="nominee_country"
                  value={formData.nominee_country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                  placeholder="Country of residence"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="nominee_linkedin"
                  value={formData.nominee_linkedin}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nominee's Areas of Expertise
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select all areas where the nominee has significant expertise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {EXPERTISE_AREAS.map((area) => {
                const isSelected = formData.nominee_expertise_areas.includes(area);
                return (
                  <label
                    key={area}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleExpertiseChange(area, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{area}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-center">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Submitting Nomination...</span>
                </div>
              ) : (
                <span>Submit Judge Nomination</span>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] overflow-y-auto"
              style={{ margin: 0, padding: 0 }}
              onClick={() => setShowSuccess(false)}
            >
              <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 sm:p-8">
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close success modal"
                    >
                      <FiX size={20} />
                    </button>

                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Nomination Submitted Successfully!</h2>
                    <div className="text-gray-600 mb-8 space-y-2 text-sm sm:text-base">
                      <p>Your judge nomination has been successfully submitted and will be reviewed by our panel.</p>
                      <p>We'll contact both you and the nominee with updates on the application status.</p>
                      <p className="font-medium text-orange-600">Thank you for helping us build our judges panel!</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => router.push("/judgeapply")}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                      >
                        Back to Judges Arena
                      </button>
                      <button
                        onClick={() => setShowSuccess(false)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                      >
                        Nominate Another
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EnhancedJudgeNominationForm;
