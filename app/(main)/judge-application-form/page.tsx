'use client';
import PhoneInput from "react-phone-input-2";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import "react-phone-input-2/lib/style.css";
import { submitJudgeApplication } from "@/lib/services/judgeVerificationService";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  UserCheck, 
  Users, 
  Award, 
  Shield, 
  Globe, 
  Target,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

// Enhanced validation schema with new fields
const formSchema = z.object({
  full_name: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Phone is required'),
  state: z.string().min(2, 'State/Region is required'),
  education: z.string().min(2, 'Educational background is required'),
  experience: z.string().min(5, 'Experience is required'),
  motivation: z.string().min(5, 'Motivation statement is required'),
  application_type: z.enum(['individual', 'organization', 'sponsor', 'institutional']),
  expertise_areas: z.array(z.string()).min(1, 'Select at least one expertise area'),
  category_preferences: z.array(z.string()).min(1, 'Select at least one category preference').max(3, 'Maximum 3 categories allowed'),
  region_interest: z.enum(['Africa', 'Diaspora']),
  conflict_declaration: z.boolean().refine(val => val === true, 'You must acknowledge the conflict of interest declaration'),
  profileImage: z.any(),
  documents: z.any(),
  endorsement_letter: z.any().optional(),
});

type JudgeFormData = z.infer<typeof formSchema>;

// Application types
const APPLICATION_TYPES = [
  {
    id: 'individual',
    title: 'Individual Expert',
    description: 'Independent professionals applying personally',
    icon: UserCheck,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'organization',
    title: 'Partner Organization',
    description: 'On behalf of partner organization',
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'sponsor',
    title: 'Sponsor-Backed Judge',
    description: 'Provided by official sponsors',
    icon: Award,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'institutional',
    title: 'Strategic Partner Institution',
    description: 'Via strategic partner institution',
    icon: Shield,
    color: 'from-orange-500 to-orange-600'
  }
];

// Expertise areas
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
  'Higher Education',
  'Teacher Training',
  'Curriculum Development',
  'Educational Assessment'
];

// Award categories
const AWARD_CATEGORIES = [
  'Africa Icon',
  'Competitive (Gold Certificate)',
  'Platinum (Non-Competitive)',
  'Iconic Blue Garnet Lifetime Awards'
];

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/judgeapply.png"
          alt="Judge Application Form"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 md:px-12 lg:px-16 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Link 
            href="/judgeapply"
            className="inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors mb-4"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Judges Arena
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
        >
          Judge Application Form
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light"
        >
          Complete your application to become a certified NESA-Africa 2025 judge
        </motion.p>
      </div>
    </div>
  );
};

const JudgeApplicationForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JudgeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application_type: 'individual',
      expertise_areas: [],
      category_preferences: [],
      region_interest: 'Africa',
      conflict_declaration: false,
    }
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImageName, setProfileImageName] = useState('');
  const [documentsName, setDocumentsName] = useState('');
  const [endorsementLetterName, setEndorsementLetterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<JudgeFormData | null>(null);

  // Watch form values for dynamic updates
  const watchedApplicationType = watch('application_type');
  const watchedExpertiseAreas = watch('expertise_areas');
  const watchedCategoryPreferences = watch('category_preferences');

  // On submit
  const onSubmit = async (data: JudgeFormData) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  // Handler for confirming the application in the modal
  const handleApply = async (data: JudgeFormData) => {
    if (!data) return;
    setLoading(true);
    try {
      // Submit enhanced application data
      const response = await submitJudgeApplication({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        education: data.education,
        experience: data.experience,
        motivation: data.motivation,
        application_type: data.application_type,
        expertise_areas: data.expertise_areas,
        category_preferences: data.category_preferences,
        region_interest: data.region_interest,
        conflict_declaration: data.conflict_declaration,
        profileImage: data.profileImage,
        documents: data.documents,
        endorsement_letter: data.endorsement_letter
      });

      if (response.success) {
        setShowConfirmation(false);
        setShowSuccess(true);
      } else {
        throw new Error(response.message || 'Application submission failed');
      }
    } catch (error: any) {
      console.error("Failed to create Application:", error.message);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle expertise area selection
  const handleExpertiseAreaChange = (area: string, checked: boolean) => {
    const currentAreas = watchedExpertiseAreas || [];
    if (checked) {
      setValue('expertise_areas', [...currentAreas, area]);
    } else {
      setValue('expertise_areas', currentAreas.filter(a => a !== area));
    }
  };

  // Handle category preference selection
  const handleCategoryPreferenceChange = (category: string, checked: boolean) => {
    const currentCategories = watchedCategoryPreferences || [];
    if (checked && currentCategories.length < 3) {
      setValue('category_preferences', [...currentCategories, category]);
    } else if (!checked) {
      setValue('category_preferences', currentCategories.filter(c => c !== category));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Application Form Section */}
      <div className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Judge Application Information
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded"></div>
            <p className="text-gray-600 mt-4">
              Please provide complete and accurate information. All fields marked with * are required.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Application Type Selection */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Type *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {APPLICATION_TYPES.map((type) => {
                  const IconComponent = type.icon;
                  const isSelected = watchedApplicationType === type.id;
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
                        value={type.id}
                        {...register('application_type')}
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
              {errors.application_type && (
                <p className="text-red-500 text-sm mt-2">{errors.application_type.message}</p>
              )}
            </div>

            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>

              {/* Row 1: Full Name and Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor='full_name' className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="full_name"
                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                    placeholder="Enter your full name"
                    {...register('full_name')}
                  />
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                    type="email"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Row 2: Phone and State/Region */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <PhoneInput
                      country={"ng"}
                      value={phoneNumber}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      onChange={(value) => {
                        setPhoneNumber(value);
                        setValue('phone', value, { shouldValidate: true });
                      }}
                      containerClass="w-full"
                      inputStyle={{
                        width: "100%",
                        height: "48px",
                        padding: "12px 12px 12px 50px",
                        borderRadius: "6px",
                        background: "#f9fafb",
                        border: "1px solid #d1d5db",
                        transition: "all 0.2s",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                      buttonStyle={{
                        height: "48px",
                        borderRadius: "6px 0 0 6px",
                        background: "#f9fafb",
                        border: "1px solid #d1d5db",
                        borderRight: "none",
                        transition: "all 0.2s",
                      }}
                      dropdownStyle={{
                        background: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    State/Region *
                  </label>
                  <input
                    placeholder="Enter your state/region"
                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                    {...register('state')}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Professional Background
              </h3>

              {/* Educational Background and Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Educational Background *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none bg-gray-50"
                    placeholder="Describe your educational qualifications, degrees, certifications..."
                    {...register('education')}
                  />
                  {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Professional Experience *
                  </label>
                  <textarea
                    id="experience"
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none bg-gray-50"
                    placeholder="Describe your relevant professional experience in education, leadership, or related fields..."
                    {...register("experience")}
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
                </div>
              </div>

              {/* Motivation Statement */}
              <div className="space-y-2">
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
                  Motivation Statement *
                </label>
                <textarea
                  rows={4}
                  id="motivation"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none bg-gray-50"
                  placeholder="Explain why you want to become a NESA-Africa judge and how you can contribute to the evaluation process..."
                  {...register('motivation')}
                />
                {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>}
              </div>
            </div>

            {/* Expertise Areas */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Areas of Expertise *
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select all areas where you have significant expertise and experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {EXPERTISE_AREAS.map((area) => {
                  const isSelected = watchedExpertiseAreas?.includes(area) || false;
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
                        onChange={(e) => handleExpertiseAreaChange(area, e.target.checked)}
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
              {errors.expertise_areas && (
                <p className="text-red-500 text-sm mt-2">{errors.expertise_areas.message}</p>
              )}
            </div>

            {/* Category Preferences */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category Preferences *
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select 1-3 award categories you would prefer to judge. Maximum of 3 categories allowed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AWARD_CATEGORIES.map((category) => {
                  const isSelected = watchedCategoryPreferences?.includes(category) || false;
                  const isDisabled = !isSelected && (watchedCategoryPreferences?.length || 0) >= 3;
                  return (
                    <label
                      key={category}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50'
                          : isDisabled
                          ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isDisabled}
                        onChange={(e) => handleCategoryPreferenceChange(category, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{category}</span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Selected: {watchedCategoryPreferences?.length || 0}/3
              </div>
              {errors.category_preferences && (
                <p className="text-red-500 text-sm mt-2">{errors.category_preferences.message}</p>
              )}
            </div>

            {/* Region Interest */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Region of Interest *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Africa', 'Diaspora'].map((region) => {
                  const isSelected = watch('region_interest') === region;
                  return (
                    <label
                      key={region}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={region}
                        {...register('region_interest')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        isSelected ? 'border-orange-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{region}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.region_interest && (
                <p className="text-red-500 text-sm mt-2">{errors.region_interest.message}</p>
              )}
            </div>

            {/* Document Uploads */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Document Uploads
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CV/Portfolio Upload */}
                <div className="space-y-2">
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
                    CV or Portfolio *
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 min-h-[120px] flex items-center justify-center bg-gray-50"
                    onClick={() => document.getElementById('documents')?.click()}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <FiUpload className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="text-orange-600 font-medium">Click to upload</span> your CV or portfolio
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                      {documentsName && (
                        <p className="mt-2 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                          {documentsName}
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="documents"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    {...register('documents')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setDocumentsName(file?.name || '');
                      setValue('documents', e.target.files);
                    }}
                  />
                </div>

                {/* Letter of Interest/Endorsement Upload */}
                <div className="space-y-2">
                  <label htmlFor="endorsement_letter" className="block text-sm font-medium text-gray-700">
                    Letter of Interest/Endorsement
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 min-h-[120px] flex items-center justify-center bg-gray-50"
                    onClick={() => document.getElementById('endorsement_letter')?.click()}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <FiUpload className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="text-orange-600 font-medium">Click to upload</span> endorsement letter
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, DOCX (Max 10MB) - Optional
                        </p>
                      </div>
                      {endorsementLetterName && (
                        <p className="mt-2 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                          {endorsementLetterName}
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="endorsement_letter"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    {...register('endorsement_letter')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setEndorsementLetterName(file?.name || '');
                      setValue('endorsement_letter', e.target.files);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Conflict of Interest Declaration */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Conflict of Interest Declaration *
                  </h3>
                  <div className="text-sm text-gray-700 mb-4 space-y-2">
                    <p>By checking this box, I acknowledge and agree to the following:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>I will maintain neutrality and fairness in all judging activities</li>
                      <li>I will abstain from voting in categories where I have personal or professional conflicts</li>
                      <li>I will maintain confidentiality of all judging materials and discussions</li>
                      <li>I will commit to the NESA-Africa ethics and integrity standards</li>
                      <li>I understand that judges operate under SCEF compliance bylaws</li>
                    </ul>
                  </div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('conflict_declaration')}
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      I acknowledge and agree to the conflict of interest declaration and ethics requirements
                    </span>
                  </label>
                  {errors.conflict_declaration && (
                    <p className="text-red-500 text-sm mt-2">{errors.conflict_declaration.message}</p>
                  )}
                </div>
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
                    <span>Submitting Application...</span>
                  </div>
                ) : (
                  <span>Submit Judge Application</span>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] overflow-y-auto"
            style={{ margin: 0, padding: 0 }}
          >
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto my-8 max-h-[calc(100vh-4rem)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Confirm Your Application</h2>
                        <div className="w-12 h-1 bg-orange-500 rounded mt-2"></div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowConfirmation(false)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        tabIndex={0}
                        aria-label="Close confirmation modal"
                      >
                        <FiX size={20} />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Full Name:</span>
                          <p className="text-gray-900 mt-1">{formData?.full_name}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Email:</span>
                          <p className="text-gray-900 mt-1">{formData?.email}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Application Type:</span>
                          <p className="text-gray-900 mt-1 capitalize">{formData?.application_type?.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Region Interest:</span>
                          <p className="text-gray-900 mt-1">{formData?.region_interest}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-700">Expertise Areas:</span>
                        <p className="text-gray-900 mt-1">{formData?.expertise_areas?.join(', ')}</p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-700">Category Preferences:</span>
                        <p className="text-gray-900 mt-1">{formData?.category_preferences?.join(', ')}</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => handleApply(formData!)}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? "Submitting..." : "Confirm & Submit Application"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
                  <div className="text-gray-600 mb-8 space-y-2 text-sm sm:text-base">
                    <p>Your Application to be a  judge  has been successfully submitted and is under review by the SOBCD + BOT Panel.</p>
                    <p>You will receive an email confirmation shortly, and we'll notify you of the decision within 7 days.</p>
                    <p className="font-medium text-orange-600">Application Timeline: June 10 - July 15, 2025</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => router.push("/judgeapply")}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Back to Judges Arena
                    </button>
                    <button
                      onClick={() => router.push("/")}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Homepage
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
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
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] overflow-y-auto"
            style={{ margin: 0, padding: 0 }}
            onClick={() => setErrorMessage(null)}
          >
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <FiX className="w-4 h-4 text-red-600" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-red-600">Submission Error</h2>
                    </div>
                    <button
                      onClick={() => setErrorMessage(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close error modal"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">{errorMessage}</p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                      onClick={() => setErrorMessage(null)}
                      className="w-full sm:w-auto px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JudgeApplicationForm;
