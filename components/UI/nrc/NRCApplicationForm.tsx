'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle, 
  ArrowLeft,
  Upload,
  X
} from 'lucide-react';
import Button from '@/components/Common/Button';
import { submitNRCApplication } from '@/lib/services/mockNRCService';

// Form validation schema
const nrcApplicationSchema = z.object({
  category: z.enum(['volunteer', 'internal', 'observer', 'public']),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Please select your country of residence'),
  motivation: z.string().min(50, 'Please provide at least 50 characters explaining your interest'),
  experience: z.string().min(30, 'Please describe your relevant experience'),
  availability: z.string().min(10, 'Please confirm your availability'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  commitment: z.boolean().refine(val => val === true, 'You must commit to completing 200+ profiles'),
  terms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  cv: z.any().optional(),
  
  // Category specific fields
  department: z.string().optional(),
  role: z.string().optional(),
  yearsOfService: z.string().optional(),
  institution: z.string().optional(),
  researchInterests: z.array(z.string()).optional(),
  proposedDuration: z.string().optional(),
  nominationType: z.enum(['individual', 'organization']).optional(),
  nominationReason: z.string().optional(),
});

type NRCApplicationData = z.infer<typeof nrcApplicationSchema>;

const NRCApplicationForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'volunteer' | 'internal' | 'observer' | 'public'>('volunteer');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NRCApplicationData>({
    resolver: zodResolver(nrcApplicationSchema),
    defaultValues: {
      category: 'volunteer',
      fullName: '',
      email: '',
      phone: '',
      country: '',
      motivation: '',
      experience: '',
      availability: '',
      skills: [],
      commitment: false,
      terms: false
    }
  });

  const availableSkills = [
    'Research & Data Collection',
    'Academic Writing',
    'Digital Tools (Google Workspace)',
    'Social Media Research',
    'Data Verification',
    'Content Creation',
    'Project Management',
    'Language Skills (Multiple African Languages)',
    'Educational Background',
    'Non-profit Experience'
  ];

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(updatedSkills);
    setValue('skills', updatedSkills);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
      setValue('cv', file);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    setValue('cv', undefined);
  };

  const onSubmit = async (data: NRCApplicationData) => {
    setLoading(true);
    try {
      // Simulating a submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For testing, we'll just show success immediately
      console.log('Form data submitted:', {
        ...data,
        skills: selectedSkills,
        cv: cvFile || undefined
      });
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Application submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to the NESA NRC program. We'll review your application
            and contact you by July 15, 2025.
          </p>
          <div className="space-y-4">
            <Button
              text="Return to Home"
              onClick={() => router.push('/')}
              variant="filled"
              className="w-full bg-[#ea580c] hover:bg-[#dc2626] text-white"
            />
            <Button
              text="Go to Dashboard (Testing)"
              onClick={() => router.push('/get-involved/nrc-volunteer/dashboard')}
              variant="outline"
              className="w-full border-[#ea580c] text-[#ea580c] hover:bg-orange-50"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#ea580c] hover:text-[#ea580c]/80 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to NRC Program</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            NRC Application
          </h1>
          <p className="text-gray-600">
            Join the NESA Research Corps and help shape Africa's education future. Select your role to begin.
          </p>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Category *
              </label>
              <select
                {...register('category')}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              >
                <option value="">Select your category</option>
                <option value="internal">Internal Staff (SCEF/NESA Team Members)</option>
                <option value="volunteer">Regional Volunteer (Africa & Diaspora)</option>
                <option value="observer">International Observer / Research Fellow</option>
                <option value="public">General Public (Public Nomination Role)</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Country of Residence *
                </label>
                <input
                  {...register('country')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Enter your country"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Why are you interested in joining the NRC? *
              </label>
              <textarea
                {...register('motivation')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Tell us why you want to join the NESA NRC program (minimum 50 characters)"
              />
              {errors.motivation && (
                <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Experience *
              </label>
              <textarea
                {...register('experience')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Describe your relevant research, writing, or volunteer experience"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
              )}
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Confirmation *
              </label>
              <textarea
                {...register('availability')}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Confirm your availability for July 15 - August 20, 2025"
              />
              {errors.availability && (
                <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
              )}
            </div>

            {/* Skills Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Relevant Skills * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {availableSkills.map((skill) => (
                  <label
                    key={skill}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'border-[#ea580c] bg-orange-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      selectedSkills.includes(skill)
                        ? 'border-[#ea580c] bg-[#ea580c]'
                        : 'border-gray-300'
                    }`}>
                      {selectedSkills.includes(skill) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
              )}
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-2" />
                CV/Resume (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {cvFile ? (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-700">{cvFile.name}</span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload your CV or resume (PDF, DOC, DOCX)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Commitments */}
            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  {...register('commitment')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-[#ea580c] border-gray-300 rounded focus:ring-[#ea580c]"
                />
                <span className="text-sm text-gray-700">
                  I commit to completing at least 200 verified nominee profiles during the
                  engagement period (July 15 - August 20, 2025) *
                </span>
              </label>
              {errors.commitment && (
                <p className="text-red-500 text-sm">{errors.commitment.message}</p>
              )}

              <label className="flex items-start gap-3">
                <input
                  {...register('terms')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-[#ea580c] border-gray-300 rounded focus:ring-[#ea580c]"
                />
                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions of the NRC volunteer program *
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                text={loading ? "Submitting..." : "Submit Application"}
                type="submit"
                disabled={loading}
                variant="filled"
                className="w-full bg-[#ea580c] hover:bg-[#dc2626] text-white py-4 text-lg font-semibold"
              />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NRCApplicationForm;
