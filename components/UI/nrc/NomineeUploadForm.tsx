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
  Save,
  AlertCircle
} from 'lucide-react';
import Button from '@/components/Common/Button';
import nrcService from '@/lib/services/nrcService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

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
  superAwardCategory: z.string().min(1, 'Super award category is required'),
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
  profileImage: z.any().refine(val => !!val, {
    message: 'Profile image is required',
  }),
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NomineeUploadData>({
    resolver: zodResolver(nomineeUploadSchema),
  });

  // Super award categories
  const superAwardCategories = [
    'Africa Icon Blue Garnet Awards',
    'Gold Certificate Awards',
    'Platinum Certificate of Recognition'
  ];

  // Get award categories based on super category
  const getAwardCategories = (superCategory: string) => {
    switch(superCategory) {
      case 'Africa Icon Blue Garnet Awards':
        return [
          'Lifetime Achievement in Education',
          'Pioneer in Educational Innovation',
          'Legacy Builder in African Education',
          'Educational Leadership Legacy',
          'Transformational Education Impact'
        ];
      case 'Gold Certificate Awards':
        return [
          'NGO Educational Champion of the Decade',
          'Corporate Social Responsibility Champion of the Decade',
          'Faith-Based Educational Champion of the Decade',
          'Government Educational Champion of the Decade',
          'Public School Champion of the Decade',
          'Private School Champion of the Decade',
          'Global Partnership in Education Champion of the Decade',
          'Diaspora Educational Impact Champion of the Decade',
          'Political Leadership in Education Champion of the Decade',
          'TERTIARY Education Champion of the Decade',
          'Educational Research Champion of the Decade',
          'STEM EDUCATION CHAMPION OF THE DECADE',
          'CREATIVE ARTS IN EDUCATION CHAMPION OF THE DECADE',
          'MEDIA AND EDUCATION CHAMPION OF THE DECADE'
        ];
      case 'Platinum Certificate of Recognition':
        return [
          'Educational Institution Excellence',
          'Corporate Education Initiative',
          'NGO Education Program',
          'SPECIAL RECOGNITION AWARDS',
          'INNOVATIVE EDUCATIVE INFRASTRUCTURE AND TECHNOLOGY AWARD'
        ];
      default:
        return [];
    }
  };
  
  // Subcategories based on selected category
  const getSubcategories = (category: string) => {
    switch(category) {
      case 'NGO Educational Champion of the Decade':
        return [
          'Best NGO for Inclusive Education and Literacy',
          'Best NGO for Continuous Learning and Adult Education',
          'Best NGO for Environmental Education and Sustainability',
          'Best NGO for Educational Advocacy Services',
          'Best NGO for Innovation in Educational Policy Advocacy',
          'Best NGO for SDG Alignment and Global Education'
        ];
      case 'Corporate Social Responsibility Champion of the Decade':
        return [
          'Best Banking Sector CSR in Education',
          'Best Telecommunications Sector CSR in Education',
          'Best Oil and Gas Sector CSR in Education',
          'Best Manufacturing Sector CSR in Education',
          'Best Insurance Sector CSR in Education',
          'Best FMCG Sector CSR in Education'
        ];
      case 'Faith-Based Educational Champion of the Decade':
        return [
          'Christian Faith Organization Educational Champion',
          'Islamic Faith Organization Educational Champion',
          'Faith-Based Educational Institution Excellence',
          'Faith-Based Educational Outreach Program',
          'Faith-Based Educational Innovation',
          'Best Faith-Based Organization for Educational Support',
          'Best Faith-Based Organization for Community Education',
          'Best Faith-Based Organization for Educational Infrastructure',
          'Best Faith-Based Organization for Educational Innovation'
        ];
      case 'Government Educational Champion of the Decade':
        return [
          'Best Educational Friendly State in Nigeria',
          'Best State Ministry of Education',
          'Best Local Government Educational Initiative',
          'Best Government Educational Policy Implementation',
          'Best Government Educational Infrastructure Development',
          'Best Government Agency for Educational Policy',
          'Best Government Initiative for Educational Access',
          'Best Government Program for Educational Quality',
          'Best Government Support for Educational Innovation'
        ];
      case 'Public School Champion of the Decade':
        return [
          'Best Public Primary School',
          'Best Public Secondary School',
          'Best Public School Administrator',
          'Best Public School Teacher',
          'Best Public School Innovation'
        ];
      case 'Private School Champion of the Decade':
        return [
          'Best Private Primary School',
          'Best Private Secondary School',
          'Best Private School Administrator',
          'Best Private School Teacher',
          'Best Private School Innovation'
        ];
      case 'Global Partnership in Education Champion of the Decade':
        return [
          'Best International Educational Partnership',
          'Best Cross-Border Educational Initiative',
          'Best Global Educational Exchange Program',
          'Best International Educational Funding'
        ];
      case 'Diaspora Educational Impact Champion of the Decade':
        return [
          'Best Diaspora Educational Initiative',
          'Best Diaspora Educational Funding',
          'Best Diaspora Knowledge Transfer Program',
          'Best Diaspora Educational Advocacy'
        ];
      case 'Political Leadership in Education Champion of the Decade':
        return [
          'Best Political Leader for Educational Policy',
          'Best Political Leader for Educational Funding',
          'Best Political Leader for Educational Innovation',
          'Best Political Leader for Educational Advocacy'
        ];
      case 'TERTIARY Education Champion of the Decade':
        return [
          'Best University in Nigeria',
          'Best Polytechnic in Nigeria',
          'Best College of Education',
          'Best Private University',
          'Best Federal University',
          'Best State University',
          'Best University Library',
          'Best University for Academic Excellence',
          'Best Polytechnic for Technical Education',
          'Best College of Education for Teacher Training',
          'Best Private Tertiary Institution',
          'Best Public Tertiary Institution'
        ];
      case 'Educational Research Champion of the Decade':
        return [
          'Best Research Institution for Educational Studies',
          'Best Individual Researcher in Education',
          'Best Research Publication in Education',
          'Best Research Impact on Educational Policy'
        ];
      case 'STEM EDUCATION CHAMPION OF THE DECADE':
        return [
          'Best STEM Education Program',
          'Best STEM Education Institution',
          'Best STEM Education Innovation',
          'Best STEM Education Advocate',
          'Best STEM Education Outreach',
          'Best STEM Education Research'
        ];
      case 'CREATIVE ARTS IN EDUCATION CHAMPION OF THE DECADE':
        return [
          'Best Arts Education Program',
          'Best Arts Integration in Education',
          'Best Arts Education Institution',
          'Best Arts Education Advocate'
        ];
      case 'MEDIA AND EDUCATION CHAMPION OF THE DECADE':
        return [
          'Best Print Media in Education Coverage',
          'Best Broadcast Media in Education Coverage',
          'Best Online Media in Education Coverage',
          'Best Educational Content Creator',
          'Best Educational Documentary',
          'Best Media Coverage of Education',
          'Best Educational Broadcasting',
          'Best Educational Journalism'
        ];
      case 'Educational Institution Excellence':
        return [
          'Best Primary School',
          'Best Secondary School',
          'Best International School',
          'Best Special Education Institution',
          'Best Educational Support Institution'
        ];
      case 'Corporate Education Initiative':
        return [
          'Best Corporate Training Program',
          'Best Corporate Educational Partnership',
          'Best Corporate Educational Innovation',
          'Best Corporate Educational Scholarship'
        ];
      case 'NGO Education Program':
        return [
          'Best NGO Educational Program for Underserved Communities',
          'Best NGO Educational Program for Special Needs',
          'Best NGO Educational Program for Skills Development',
          'Best NGO Educational Program for Technology Access'
        ];
      case 'SPECIAL RECOGNITION AWARDS':
        return [
          'Lifetime Achievement in Education',
          'Educational Leadership Excellence',
          'Educational Innovation Pioneer',
          'Educational Inclusion Champion'
        ];
      case 'INNOVATIVE EDUCATIVE INFRASTRUCTURE AND TECHNOLOGY AWARD':
        return [
          'Best Educational Technology Solution',
          'Best Educational Infrastructure Project',
          'Best Educational Digital Platform',
          'Best Educational Resource Development'
        ];
      case 'Lifetime Achievement in Education':
        return [
          'Lifetime Achievement in Educational Leadership',
          'Lifetime Achievement in Educational Innovation',
          'Lifetime Achievement in Educational Research',
          'Lifetime Achievement in Educational Advocacy'
        ];
      case 'Pioneer in Educational Innovation':
        return [
          'Pioneer in Educational Technology',
          'Pioneer in Educational Methodology',
          'Pioneer in Educational Access',
          'Pioneer in Educational Inclusion'
        ];
      case 'Legacy Builder in African Education':
        return [
          'Legacy in Educational Institution Building',
          'Legacy in Educational Policy Development',
          'Legacy in Educational Research',
          'Legacy in Educational Philanthropy'
        ];
      case 'Educational Leadership Legacy':
        return [
          'Leadership Legacy in Educational Administration',
          'Leadership Legacy in Educational Policy',
          'Leadership Legacy in Educational Innovation',
          'Leadership Legacy in Educational Advocacy'
        ];
      case 'Transformational Education Impact':
        return [
          'Transformational Impact in Educational Access',
          'Transformational Impact in Educational Quality',
          'Transformational Impact in Educational Innovation',
          'Transformational Impact in Educational Equity'
        ];
      default:
        return ['Please select a category first'];
    }
  };

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

  // Track submission type (draft or review)
  const [submissionType, setSubmissionType] = useState<'DRAFT' | 'REVIEW'>('REVIEW');

  const submitForm = async (data: NomineeUploadData, status: 'DRAFT' | 'REVIEW') => {
    console.log('submitForm called with status:', status);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Nominee Upload Data:', data);
      console.log('Submission status:', status);
      
      // Check for required fields based on status
      if (status === 'REVIEW') {
        // For REVIEW, we need to ensure all required fields are present
        const requiredFields = [
          'fullName', 'country', 'region', 'awardCategory', 'subcategory',
          'achievementSummary', 'impactMetrics', 'sdgAlignment', 'profileImage',
          'agendaAlignment', 'esgAlignment'
        ];
        
        const missingFields = requiredFields.filter(field => {
          if (field === 'sdgAlignment') {
            return !data.sdgAlignment || (Array.isArray(data.sdgAlignment) && data.sdgAlignment.length === 0);
          }
          if (field === 'profileImage') {
            return !profileImage;
          }
          // Use type assertion to fix TypeScript error
          return !data[field as keyof typeof data];
        });
        
        if (missingFields.length > 0) {
          console.error('Missing required fields for REVIEW submission:', missingFields);
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }
      }
      
      if (!user?.id) {
        console.error('User not authenticated');
        throw new Error('User not authenticated. Please log in and try again.');
      }
      
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add all text fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        // Skip file fields, they'll be handled separately
        if (key !== 'profileImage' && key !== 'supportingDocuments') {
          if (key === 'sdgAlignment' && Array.isArray(value)) {
            formData.append(key, value.join(','));
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        }
      });
      
      // Add additional fields
      formData.append('volunteerId', user.id);
      formData.append('status', status);
      formData.append('dateCreated', new Date().toISOString());
      
      // Add profile image if exists
      if (profileImage) {
        console.log('Adding profile image to FormData:', profileImage.name);
        formData.append('profileImage', profileImage);
      } else {
        console.warn('No profile image found!');
        if (status === 'REVIEW') {
          throw new Error('Profile image is required for submission.');
        }
      }
      
      // Add supporting documents if any
      if (uploadedFiles.length > 0) {
        console.log(`Adding ${uploadedFiles.length} supporting documents`);
        uploadedFiles.forEach((file, index) => {
          console.log(`Adding document ${index}: ${file.name}`);
          // Change to use the same field name for all files
          formData.append('supportingDocuments', file);
        });
      }
      
      // Log FormData (for debugging)
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${(pair[1] as File).name}` : pair[1]));
      }
      
      console.log('Sending form data to server...');
      
      try {
        // Use the service method which is now properly configured for file uploads
        const result = await nrcService.createNominee(formData);
        console.log('Nominee creation response:', result);
        
        if (onSave) {
          onSave(data);
        }
        
        setShowSuccess(true);
      } catch (apiError: any) {
        console.error('API call failed:', apiError);
        // Check if we have a detailed error message from the server
        const errorMessage = apiError.message || 'Server error while creating nominee';
        console.error('Error details:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Nominee upload error:', error);
      setError(error.message || 'Failed to create nominee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data: NomineeUploadData) => {
    console.log('Form submitted with type:', submissionType);
    try {
      console.log('Starting form submission...');
      await submitForm(data, submissionType);
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
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
              variant="outlined"
              className="flex-1 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            />
            <Button
              text="Go to Dashboard"
              onClick={() => router.push('/get-involved/nrc-volunteer/dashboard')}
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
            Add a new nominee profile to the NESA-Africa 2025 awards database. Select from 16 major award categories and their specific subcategories.
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-700 font-medium">Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}
          
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
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.country.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.region.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.website.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.linkedinProfile.message?.toString()}</p>
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
              
              <div className="grid md:grid-cols-1 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Super Award Category *
                  </label>
                  <select
                    {...register('superAwardCategory')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    onChange={(e) => {
                      const value = e.target.value;
                      setValue('superAwardCategory', value);
                      // Reset category and subcategory when super category changes
                      setValue('awardCategory', '');
                      setValue('subcategory', '');
                    }}
                  >
                    <option value="">Select super award category</option>
                    {superAwardCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.superAwardCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.superAwardCategory.message?.toString()}</p>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Category *
                  </label>
                  <select
                    {...register('awardCategory')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    onChange={(e) => {
                      const value = e.target.value;
                      setValue('awardCategory', value);
                      // Reset subcategory when category changes
                      setValue('subcategory', '');
                    }}
                    disabled={!watch('superAwardCategory')}
                  >
                    <option value="">Select category</option>
                    {watch('superAwardCategory') && 
                      getAwardCategories(watch('superAwardCategory')).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))
                    }
                  </select>
                  {errors.awardCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.awardCategory.message?.toString()}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <select
                    {...register('subcategory')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    disabled={!watch('awardCategory')}
                  >
                    <option value="">Select subcategory</option>
                    {watch('awardCategory') && 
                      getSubcategories(watch('awardCategory')).map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))
                    }
                  </select>
                  {errors.subcategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.subcategory.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.achievementSummary.message?.toString()}</p>
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
                    <p className="text-red-500 text-sm mt-1">{errors.impactMetrics.message?.toString()}</p>
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
                <p className="text-red-500 text-sm mt-2">{errors.sdgAlignment.message?.toString()}</p>
              )}
            </div>

            {/* AU Agenda 2063 Alignment */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                AU Agenda 2063 Alignment *
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Describe how the nominee's work aligns with the African Union's Agenda 2063:
              </p>
              <textarea
                {...register('agendaAlignment')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Explain how the nominee's work contributes to Africa's Agenda 2063 goals (minimum 20 characters)"
              />
              {errors.agendaAlignment && (
                <p className="text-red-500 text-sm mt-1">{errors.agendaAlignment.message?.toString()}</p>
              )}
            </div>

            {/* ESG Alignment */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ESG Alignment *
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Describe how the nominee's work aligns with Environmental, Social, and Governance (ESG) principles:
              </p>
              <textarea
                {...register('esgAlignment')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Explain how the nominee's work addresses ESG principles (minimum 20 characters)"
              />
              {errors.esgAlignment && (
                <p className="text-red-500 text-sm mt-1">{errors.esgAlignment.message?.toString()}</p>
              )}
            </div>

            {/* Profile Image - IMPORTANT */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Nominee Profile Image <span className="text-red-500 ml-2 text-sm font-bold">(IMPORTANT)</span>
              </h2>
              
              <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 bg-orange-50">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Nominee Profile Image</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A high-quality profile image is <span className="font-bold text-red-500">required</span> for all nominees. 
                    Please upload a clear, professional photo.
                  </p>
                  
                  {profileImage ? (
                    <div className="mt-4">
                      <div className="relative w-40 h-40 mx-auto mb-2 rounded-lg overflow-hidden border border-gray-300">
                        <img 
                          src={URL.createObjectURL(profileImage)} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeProfileImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{profileImage.name}</p>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 transition-colors">
                        <span>Select Profile Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (Max. 5MB)</p>
                    </div>
                  )}
                  
                  {errors.profileImage && (
                    <p className="text-red-500 text-sm mt-3 font-medium">{errors.profileImage.message?.toString()}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Supporting Documents */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Supporting Documents
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Supporting Documents</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add any relevant documents that support this nomination (certificates, reports, etc.)
                  </p>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                      <ul className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm truncate max-w-xs">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <label className="inline-block px-4 py-2 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors">
                    <span>Select Files</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, XLS, XLSX (Max. 10MB per file)</p>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  console.log('Save as Draft clicked');
                  setSubmissionType('DRAFT');
                  // Use setTimeout to ensure state is updated before form submission
                  setTimeout(() => {
                    console.log('Submitting as DRAFT');
                    // Log form errors to help debug validation issues
                    console.log('Form errors:', errors);
                    // Use handleSubmit with a callback that logs and then calls submitForm
                    handleSubmit(
                      (data) => {
                        console.log('Form validation passed for DRAFT');
                        return submitForm(data, 'DRAFT');
                      },
                      (errors) => {
                        console.error('Form validation failed:', errors);
                        setError('Please fill in all required fields before saving.');
                      }
                    )();
                  }, 0);
                }}
                className="flex-1 px-4 py-2 border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save as Draft"}
              </button>
              <button
                type="button" // Changed from submit to button for consistent handling
                className="flex-1 px-4 py-2 bg-[#ea580c] hover:bg-[#dc2626] text-white rounded-lg font-medium transition-colors"
                disabled={loading}
                onClick={() => {
                  console.log('Submit for Review clicked');
                  setSubmissionType('REVIEW');
                  // Use setTimeout to ensure state is updated before form submission
                  setTimeout(() => {
                    console.log('Submitting as REVIEW');
                    // Log form errors to help debug validation issues
                    console.log('Form errors:', errors);
                    // Use handleSubmit with a callback that logs and then calls submitForm
                    handleSubmit(
                      (data) => {
                        console.log('Form validation passed for REVIEW');
                        return submitForm(data, 'REVIEW');
                      },
                      (errors) => {
                        console.error('Form validation failed:', errors);
                        setError('Please fill in all required fields before submitting.');
                      }
                    )();
                  }, 0);
                }}
              >
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NomineeUploadForm;
