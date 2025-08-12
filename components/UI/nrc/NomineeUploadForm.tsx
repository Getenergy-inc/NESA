'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  Award, 
  Target,
  Link as LinkIcon,
  Upload,
  X,
  CheckCircle,
  ArrowLeft,
  Save
} from 'lucide-react';
import Button from '@/components/Common/Button';

// Nominee upload form validation schema
const nomineeUploadSchema = z.object({
  // Basic Information
  fullName: z.string().min(2, 'Full name is required'),
  organizationName: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  region: z.string().min(2, 'Region/State is required'),
  
  // Contact Information
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedinProfile: z.string().url('Must be a valid LinkedIn URL').optional().or(z.literal('')),
  
  // Award Category
  awardCategory: z.string().min(1, 'Award category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  
  // Impact & Achievement
  achievementSummary: z.string().min(100, 'Achievement summary must be at least 100 characters'),
  impactMetrics: z.string().min(50, 'Impact metrics are required'),
  beneficiariesCount: z.string().optional(),
  yearsOfImpact: z.string().optional(),
  
  // Alignment
  sdgAlignment: z.array(z.string()).min(1, 'Select at least one SDG'),
  agendaAlignment: z.string().min(20, 'AU Agenda 2063 alignment is required'),
  esgAlignment: z.string().min(20, 'ESG alignment is required'),
  
  // Supporting Information
  verificationLinks: z.string().optional(),
  mediaLinks: z.string().optional(),
  additionalNotes: z.string().optional(),
  
  // Files
  supportingDocuments: z.any().optional(),
  profileImage: z.any().optional(),
});

type NomineeUploadData = z.infer<typeof nomineeUploadSchema>;

interface NomineeUploadFormProps {
  onBack?: () => void;
  onSave?: (data: NomineeUploadData) => void;
}

const NomineeUploadForm: React.FC<NomineeUploadFormProps> = ({ onBack, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NomineeUploadData>({
    resolver: zodResolver(nomineeUploadSchema),
  });

  const awardCategories = [
    'Educational Leadership',
    'Research & Innovation',
    'Community Impact',
    'Technology in Education',
    'Sustainable Development',
    'Youth Empowerment',
    'Teacher Excellence',
    'Educational Infrastructure'
  ];

  const sdgOptions = [
    'SDG 1: No Poverty',
    'SDG 2: Zero Hunger',
    'SDG 3: Good Health and Well-being',
    'SDG 4: Quality Education',
    'SDG 5: Gender Equality',
    'SDG 6: Clean Water and Sanitation',
    'SDG 8: Decent Work and Economic Growth',
    'SDG 10: Reduced Inequalities',
    'SDG 11: Sustainable Cities and Communities',
    'SDG 16: Peace, Justice and Strong Institutions',
    'SDG 17: Partnerships for the Goals'
  ];

  const handleSDGToggle = (sdg: string) => {
    const updatedSDGs = selectedSDGs.includes(sdg)
      ? selectedSDGs.filter(s => s !== sdg)
      : [...selectedSDGs, sdg];
    
    setSelectedSDGs(updatedSDGs);
    setValue('sdgAlignment', updatedSDGs);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    setValue('supportingDocuments', [...uploadedFiles, ...files]);
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setValue('profileImage', file);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    setValue('supportingDocuments', updatedFiles);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setValue('profileImage', undefined);
  };

  const onSubmit = async (data: NomineeUploadData) => {
    setLoading(true);
    try {
      console.log('Nominee Upload Data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSave) {
        onSave(data);
      }
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Nominee upload error:', error);
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nominee Uploaded!</h2>
          <p className="text-gray-600 mb-6">
            The nominee profile has been successfully uploaded and is now under review.
          </p>
          <div className="flex gap-3">
            <Button
              text="Upload Another"
              onClick={() => setShowSuccess(false)}
              variant="outline"
              className="flex-1 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            />
            <Button
              text="Back to Dashboard"
              onClick={onBack}
              variant="filled"
              className="flex-1 bg-[#ea580c] hover:bg-[#dc2626] text-white"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#ea580c] hover:text-[#ea580c]/80 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload New Nominee
          </h1>
          <p className="text-gray-600">
            Add a new nominee profile to the NESA-Africa 2025 research database.
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name / Organization Name *
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Enter nominee's full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization (if applicable)
                  </label>
                  <input
                    {...register('organizationName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    {...register('country')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Country of operation"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region/State *
                  </label>
                  <input
                    {...register('region')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Region or state"
                  />
                  {errors.region && (
                    <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    {...register('website')}
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="https://website.com"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    {...register('linkedinProfile')}
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="https://linkedin.com/in/profile"
                  />
                  {errors.linkedinProfile && (
                    <p className="text-red-500 text-sm mt-1">{errors.linkedinProfile.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Award Category */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Award Category
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Category *
                  </label>
                  <select
                    {...register('awardCategory')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {awardCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.awardCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.awardCategory.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <input
                    {...register('subcategory')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Specific subcategory"
                  />
                  {errors.subcategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Achievement & Impact */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Achievement & Impact
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achievement Summary *
                  </label>
                  <textarea
                    {...register('achievementSummary')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Describe the nominee's key achievements and contributions (minimum 100 characters)"
                  />
                  {errors.achievementSummary && (
                    <p className="text-red-500 text-sm mt-1">{errors.achievementSummary.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impact Metrics *
                  </label>
                  <textarea
                    {...register('impactMetrics')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    placeholder="Quantifiable impact metrics (e.g., number of students reached, schools built, etc.)"
                  />
                  {errors.impactMetrics && (
                    <p className="text-red-500 text-sm mt-1">{errors.impactMetrics.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Beneficiaries
                    </label>
                    <input
                      {...register('beneficiariesCount')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                      placeholder="e.g., 10,000 students"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Impact
                    </label>
                    <input
                      {...register('yearsOfImpact')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                      placeholder="e.g., 2015-2025"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SDG Alignment */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                SDG Alignment *
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select all Sustainable Development Goals that align with this nominee's work:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sdgOptions.map((sdg) => (
                  <label
                    key={sdg}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedSDGs.includes(sdg)
                        ? 'border-[#ea580c] bg-orange-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSDGs.includes(sdg)}
                      onChange={() => handleSDGToggle(sdg)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      selectedSDGs.includes(sdg)
                        ? 'border-[#ea580c] bg-[#ea580c]'
                        : 'border-gray-300'
                    }`}>
                      {selectedSDGs.includes(sdg) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{sdg}</span>
                  </label>
                ))}
              </div>
              {errors.sdgAlignment && (
                <p className="text-red-500 text-sm mt-2">{errors.sdgAlignment.message}</p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                text="Save as Draft"
                type="button"
                variant="outline"
                className="flex-1 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
              />
              <Button
                text={loading ? "Submitting..." : "Submit for Review"}
                type="submit"
                disabled={loading}
                variant="filled"
                className="flex-1 bg-[#ea580c] hover:bg-[#dc2626] text-white"
              />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NomineeUploadForm;
