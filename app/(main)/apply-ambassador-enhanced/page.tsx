"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeftCircle, FiCheckCircle, FiX, FiUpload, FiUser, FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import { User, Mail, Phone, MapPin, Globe, Award, Target, Users, Calendar, Upload, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuthContext } from '@/lib/context/AuthContext';

interface AmbassadorApplication {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    currentLocation: string;
    profilePhoto?: File;
  };
  professionalInfo: {
    currentOccupation: string;
    organization: string;
    yearsOfExperience: string;
    educationLevel: string;
    fieldOfExpertise: string[];
    linkedinProfile: string;
    resume?: File;
  };
  ambassadorInfo: {
    motivationStatement: string;
    relevantExperience: string;
    availabilityHours: string;
    preferredActivities: string[];
    languagesSpoken: string[];
    previousVolunteerWork: string;
    references: {
      name: string;
      email: string;
      relationship: string;
    }[];
  };
  socialMedia: {
    twitter: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    website: string;
  };
  commitment: {
    duration: string;
    weeklyHours: string;
    startDate: string;
    specificGoals: string;
  };
}

const ApplyAmbassadorEnhanced: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [applicationData, setApplicationData] = useState<AmbassadorApplication>({
    personalInfo: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      currentLocation: '',
    },
    professionalInfo: {
      currentOccupation: '',
      organization: '',
      yearsOfExperience: '',
      educationLevel: '',
      fieldOfExpertise: [],
      linkedinProfile: '',
    },
    ambassadorInfo: {
      motivationStatement: '',
      relevantExperience: '',
      availabilityHours: '',
      preferredActivities: [],
      languagesSpoken: [],
      previousVolunteerWork: '',
      references: [
        { name: '', email: '', relationship: '' },
        { name: '', email: '', relationship: '' }
      ],
    },
    socialMedia: {
      twitter: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      website: '',
    },
    commitment: {
      duration: '',
      weeklyHours: '',
      startDate: '',
      specificGoals: '',
    }
  });

  const steps = [
    { number: 1, title: 'Personal Information', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Professional Background', icon: <Award className="w-5 h-5" /> },
    { number: 3, title: 'Ambassador Details', icon: <Target className="w-5 h-5" /> },
    { number: 4, title: 'Social Media & References', icon: <Globe className="w-5 h-5" /> },
    { number: 5, title: 'Commitment & Goals', icon: <Calendar className="w-5 h-5" /> },
  ];

  const expertiseOptions = [
    'Education Technology', 'Curriculum Development', 'Teacher Training', 'Student Mentorship',
    'Educational Leadership', 'Research & Development', 'Community Outreach', 'Fundraising',
    'Digital Marketing', 'Event Management', 'Public Speaking', 'Grant Writing'
  ];

  const activityOptions = [
    'Organizing Events', 'Mentoring Students', 'Teacher Training', 'Fundraising',
    'Social Media Management', 'Content Creation', 'Community Outreach', 'Research',
    'Public Speaking', 'Partnership Development', 'Volunteer Coordination', 'Grant Writing'
  ];

  const languageOptions = [
    'English', 'French', 'Arabic', 'Swahili', 'Portuguese', 'Spanish',
    'Hausa', 'Yoruba', 'Igbo', 'Amharic', 'Wolof', 'Zulu', 'Afrikaans'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!applicationData.personalInfo.fullName) newErrors.fullName = 'Full name is required';
        if (!applicationData.personalInfo.email) newErrors.email = 'Email is required';
        if (!applicationData.personalInfo.phone) newErrors.phone = 'Phone number is required';
        if (!applicationData.personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!applicationData.personalInfo.nationality) newErrors.nationality = 'Nationality is required';
        if (!applicationData.personalInfo.currentLocation) newErrors.currentLocation = 'Current location is required';
        break;
      case 2:
        if (!applicationData.professionalInfo.currentOccupation) newErrors.currentOccupation = 'Current occupation is required';
        if (!applicationData.professionalInfo.educationLevel) newErrors.educationLevel = 'Education level is required';
        if (applicationData.professionalInfo.fieldOfExpertise.length === 0) newErrors.fieldOfExpertise = 'Select at least one area of expertise';
        break;
      case 3:
        if (!applicationData.ambassadorInfo.motivationStatement) newErrors.motivationStatement = 'Motivation statement is required';
        if (!applicationData.ambassadorInfo.availabilityHours) newErrors.availabilityHours = 'Availability is required';
        if (applicationData.ambassadorInfo.preferredActivities.length === 0) newErrors.preferredActivities = 'Select at least one preferred activity';
        if (applicationData.ambassadorInfo.languagesSpoken.length === 0) newErrors.languagesSpoken = 'Select at least one language';
        break;
      case 4:
        // References validation
        const validReferences = applicationData.ambassadorInfo.references.filter(ref => ref.name && ref.email);
        if (validReferences.length < 1) newErrors.references = 'At least one reference is required';
        break;
      case 5:
        if (!applicationData.commitment.duration) newErrors.duration = 'Commitment duration is required';
        if (!applicationData.commitment.weeklyHours) newErrors.weeklyHours = 'Weekly hours commitment is required';
        if (!applicationData.commitment.startDate) newErrors.startDate = 'Preferred start date is required';
        if (!applicationData.commitment.specificGoals) newErrors.specificGoals = 'Specific goals are required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowConfirmation(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowConfirmation(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Application submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    if (field === 'profilePhoto') {
      setApplicationData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, profilePhoto: file }
      }));
    } else if (field === 'resume') {
      setApplicationData(prev => ({
        ...prev,
        professionalInfo: { ...prev.professionalInfo, resume: file }
      }));
    }
  };

  const toggleArrayField = (section: keyof AmbassadorApplication, field: string, value: string) => {
    setApplicationData(prev => {
      const currentArray = (prev[section] as any)[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to apply as an ambassador</p>
          <button 
            onClick={() => router.push('/account/login')}
            className="bg-primaryGold hover:bg-deepGold text-white px-6 py-3 rounded-lg font-medium"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-4">
            <FiArrowLeftCircle className="text-2xl mr-2" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Become a NESA Ambassador</h1>
            <p className="text-gray-600">Join our mission to transform education across Africa</p>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primaryGold border-primaryGold text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primaryGold' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <p className={`text-xs font-medium ${
                  currentStep >= step.number ? 'text-primaryGold' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={applicationData.personalInfo.fullName}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={applicationData.personalInfo.email}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <PhoneInput
                      country={'ng'}
                      value={applicationData.personalInfo.phone}
                      onChange={(value) => setApplicationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: value }
                      }))}
                      inputStyle={{
                        width: '100%',
                        height: '48px',
                        padding: '12px 12px 12px 48px',
                        borderRadius: '8px',
                        border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      }}
                      buttonStyle={{
                        height: '48px',
                        borderRadius: '8px 0 0 8px',
                        background: '#FFF9ED',
                        border: 'none',
                      }}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={applicationData.personalInfo.dateOfBirth}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={applicationData.personalInfo.gender}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, gender: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                    <input
                      type="text"
                      value={applicationData.personalInfo.nationality}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, nationality: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.nationality ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Nigerian, Kenyan, Ghanaian"
                    />
                    {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Location *</label>
                  <input
                    type="text"
                    value={applicationData.personalInfo.currentLocation}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, currentLocation: e.target.value }
                    }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                      errors.currentLocation ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="City, Country"
                  />
                  {errors.currentLocation && <p className="text-red-500 text-sm mt-1">{errors.currentLocation}</p>}
                </div>

                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primaryGold transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('profilePhoto', file);
                      }}
                      className="hidden"
                      id="profile-photo"
                    />
                    <label htmlFor="profile-photo" className="cursor-pointer">
                      <span className="mt-2 inline-block bg-primaryGold text-white px-4 py-2 rounded-lg hover:bg-deepGold transition-colors">
                        Choose File
                      </span>
                    </label>
                  </div>
                  {applicationData.personalInfo.profilePhoto && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {applicationData.personalInfo.profilePhoto.name} uploaded
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Professional Background</h2>
                  <p className="text-gray-600">Share your professional experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupation *</label>
                    <input
                      type="text"
                      value={applicationData.professionalInfo.currentOccupation}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        professionalInfo: { ...prev.professionalInfo, currentOccupation: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.currentOccupation ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Teacher, Engineer, Student"
                    />
                    {errors.currentOccupation && <p className="text-red-500 text-sm mt-1">{errors.currentOccupation}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Institution</label>
                    <input
                      type="text"
                      value={applicationData.professionalInfo.organization}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        professionalInfo: { ...prev.professionalInfo, organization: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                      placeholder="Where do you work/study?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <select
                      value={applicationData.professionalInfo.yearsOfExperience}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        professionalInfo: { ...prev.professionalInfo, yearsOfExperience: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Level *</label>
                    <select
                      value={applicationData.professionalInfo.educationLevel}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        professionalInfo: { ...prev.professionalInfo, educationLevel: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.educationLevel ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select education level</option>
                      <option value="high-school">High School</option>
                      <option value="diploma">Diploma/Certificate</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD/Doctorate</option>
                    </select>
                    {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={applicationData.professionalInfo.linkedinProfile}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      professionalInfo: { ...prev.professionalInfo, linkedinProfile: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Field of Expertise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise * (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {expertiseOptions.map((expertise) => (
                      <label key={expertise} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={applicationData.professionalInfo.fieldOfExpertise.includes(expertise)}
                          onChange={() => toggleArrayField('professionalInfo', 'fieldOfExpertise', expertise)}
                          className="rounded border-gray-300 text-primaryGold focus:ring-primaryGold"
                        />
                        <span className="ml-2 text-sm text-gray-700">{expertise}</span>
                      </label>
                    ))}
                  </div>
                  {errors.fieldOfExpertise && <p className="text-red-500 text-sm mt-1">{errors.fieldOfExpertise}</p>}
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primaryGold transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload your resume or CV</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('resume', file);
                      }}
                      className="hidden"
                      id="resume"
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      <span className="mt-2 inline-block bg-primaryGold text-white px-4 py-2 rounded-lg hover:bg-deepGold transition-colors">
                        Choose File
                      </span>
                    </label>
                  </div>
                  {applicationData.professionalInfo.resume && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {applicationData.professionalInfo.resume.name} uploaded
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Ambassador Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Ambassador Details</h2>
                  <p className="text-gray-600">Tell us about your motivation and availability</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to become a NESA Ambassador? *</label>
                  <textarea
                    value={applicationData.ambassadorInfo.motivationStatement}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      ambassadorInfo: { ...prev.ambassadorInfo, motivationStatement: e.target.value }
                    }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                      errors.motivationStatement ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={4}
                    placeholder="Share your passion for education and why you want to join NESA..."
                  />
                  {errors.motivationStatement && <p className="text-red-500 text-sm mt-1">{errors.motivationStatement}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Experience</label>
                  <textarea
                    value={applicationData.ambassadorInfo.relevantExperience}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      ambassadorInfo: { ...prev.ambassadorInfo, relevantExperience: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                    rows={3}
                    placeholder="Describe any relevant experience in education, volunteering, or community work..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                  <select
                    value={applicationData.ambassadorInfo.availabilityHours}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      ambassadorInfo: { ...prev.ambassadorInfo, availabilityHours: e.target.value }
                    }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                      errors.availabilityHours ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your availability</option>
                    <option value="1-5">1-5 hours per week</option>
                    <option value="6-10">6-10 hours per week</option>
                    <option value="11-20">11-20 hours per week</option>
                    <option value="20+">20+ hours per week</option>
                  </select>
                  {errors.availabilityHours && <p className="text-red-500 text-sm mt-1">{errors.availabilityHours}</p>}
                </div>

                {/* Preferred Activities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Activities * (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activityOptions.map((activity) => (
                      <label key={activity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={applicationData.ambassadorInfo.preferredActivities.includes(activity)}
                          onChange={() => toggleArrayField('ambassadorInfo', 'preferredActivities', activity)}
                          className="rounded border-gray-300 text-primaryGold focus:ring-primaryGold"
                        />
                        <span className="ml-2 text-sm text-gray-700">{activity}</span>
                      </label>
                    ))}
                  </div>
                  {errors.preferredActivities && <p className="text-red-500 text-sm mt-1">{errors.preferredActivities}</p>}
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken * (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {languageOptions.map((language) => (
                      <label key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={applicationData.ambassadorInfo.languagesSpoken.includes(language)}
                          onChange={() => toggleArrayField('ambassadorInfo', 'languagesSpoken', language)}
                          className="rounded border-gray-300 text-primaryGold focus:ring-primaryGold"
                        />
                        <span className="ml-2 text-sm text-gray-700">{language}</span>
                      </label>
                    ))}
                  </div>
                  {errors.languagesSpoken && <p className="text-red-500 text-sm mt-1">{errors.languagesSpoken}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Previous Volunteer Work</label>
                  <textarea
                    value={applicationData.ambassadorInfo.previousVolunteerWork}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      ambassadorInfo: { ...prev.ambassadorInfo, previousVolunteerWork: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                    rows={3}
                    placeholder="Describe any previous volunteer experience..."
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Social Media & References */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Social Media & References</h2>
                  <p className="text-gray-600">Help us connect with you and verify your background</p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media Profiles (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                      <input
                        type="url"
                        value={applicationData.socialMedia.twitter}
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={applicationData.socialMedia.linkedin}
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                      <input
                        type="url"
                        value={applicationData.socialMedia.instagram}
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                        placeholder="https://instagram.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website</label>
                      <input
                        type="url"
                        value={applicationData.socialMedia.website}
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, website: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                {/* References */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">References * (At least 1 required)</h3>
                  {applicationData.ambassadorInfo.references.map((reference, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-800 mb-3">Reference {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={reference.name}
                            onChange={(e) => {
                              const newReferences = [...applicationData.ambassadorInfo.references];
                              newReferences[index].name = e.target.value;
                              setApplicationData(prev => ({
                                ...prev,
                                ambassadorInfo: { ...prev.ambassadorInfo, references: newReferences }
                              }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                            placeholder="Reference name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={reference.email}
                            onChange={(e) => {
                              const newReferences = [...applicationData.ambassadorInfo.references];
                              newReferences[index].email = e.target.value;
                              setApplicationData(prev => ({
                                ...prev,
                                ambassadorInfo: { ...prev.ambassadorInfo, references: newReferences }
                              }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                            placeholder="reference@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                          <input
                            type="text"
                            value={reference.relationship}
                            onChange={(e) => {
                              const newReferences = [...applicationData.ambassadorInfo.references];
                              newReferences[index].relationship = e.target.value;
                              setApplicationData(prev => ({
                                ...prev,
                                ambassadorInfo: { ...prev.ambassadorInfo, references: newReferences }
                              }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                            placeholder="e.g., Supervisor, Colleague"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {errors.references && <p className="text-red-500 text-sm mt-1">{errors.references}</p>}
                </div>
              </motion.div>
            )}

            {/* Step 5: Commitment & Goals */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Commitment & Goals</h2>
                  <p className="text-gray-600">Help us understand your commitment and aspirations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commitment Duration *</label>
                    <select
                      value={applicationData.commitment.duration}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        commitment: { ...prev.commitment, duration: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.duration ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select duration</option>
                      <option value="6-months">6 months</option>
                      <option value="1-year">1 year</option>
                      <option value="2-years">2 years</option>
                      <option value="long-term">Long-term (2+ years)</option>
                    </select>
                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Hours Commitment *</label>
                    <select
                      value={applicationData.commitment.weeklyHours}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        commitment: { ...prev.commitment, weeklyHours: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                        errors.weeklyHours ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select weekly hours</option>
                      <option value="2-5">2-5 hours</option>
                      <option value="6-10">6-10 hours</option>
                      <option value="11-15">11-15 hours</option>
                      <option value="16-20">16-20 hours</option>
                      <option value="20+">20+ hours</option>
                    </select>
                    {errors.weeklyHours && <p className="text-red-500 text-sm mt-1">{errors.weeklyHours}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date *</label>
                  <input
                    type="date"
                    value={applicationData.commitment.startDate}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      commitment: { ...prev.commitment, startDate: e.target.value }
                    }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specific Goals as NESA Ambassador *</label>
                  <textarea
                    value={applicationData.commitment.specificGoals}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      commitment: { ...prev.commitment, specificGoals: e.target.value }
                    }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent ${
                      errors.specificGoals ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={4}
                    placeholder="What specific goals do you hope to achieve as a NESA Ambassador? How do you plan to contribute to our mission?"
                  />
                  {errors.specificGoals && <p className="text-red-500 text-sm mt-1">{errors.specificGoals}</p>}
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Ambassador Agreement</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>By submitting this application, I agree to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Represent NESA Africa with integrity and professionalism</li>
                      <li>Commit to the agreed-upon time and activities</li>
                      <li>Participate in required training and orientation sessions</li>
                      <li>Follow NESA's code of conduct and guidelines</li>
                      <li>Provide regular updates on ambassador activities</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-primaryGold hover:bg-deepGold text-white rounded-lg font-medium transition-colors"
              >
                {currentStep === steps.length ? 'Review Application' : 'Next'}
              </button>
            </div>
          </div>
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>
                  <button 
                    onClick={() => setShowConfirmation(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                    <p className="text-gray-600">{applicationData.personalInfo.fullName}</p>
                    <p className="text-gray-600">{applicationData.personalInfo.email}</p>
                    <p className="text-gray-600">{applicationData.personalInfo.currentLocation}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Professional Background</h3>
                    <p className="text-gray-600">{applicationData.professionalInfo.currentOccupation}</p>
                    <p className="text-gray-600">Education: {applicationData.professionalInfo.educationLevel}</p>
                    <p className="text-gray-600">Expertise: {applicationData.professionalInfo.fieldOfExpertise.join(', ')}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Commitment</h3>
                    <p className="text-gray-600">Duration: {applicationData.commitment.duration}</p>
                    <p className="text-gray-600">Weekly Hours: {applicationData.commitment.weeklyHours}</p>
                    <p className="text-gray-600">Start Date: {applicationData.commitment.startDate}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                  >
                    Edit Application
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
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
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for applying to become a NESA Ambassador. We'll review your application and get back to you within 5-7 business days.
                </p>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    router.push('/');
                  }}
                  className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplyAmbassadorEnhanced;