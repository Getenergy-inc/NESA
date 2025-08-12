import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Info,
  X
} from 'lucide-react';
import { BaseNomineeForm, nomineeValidationMessages } from '@/lib/types/nrc';

const baseNomineeSchema = z.object({
  fullName: z.string().min(3, nomineeValidationMessages.minLength(3)),
  emailAddress: z.string().email(nomineeValidationMessages.email),
  phoneNumber: z.string().min(10, nomineeValidationMessages.phone),
  country: z.string().min(2, nomineeValidationMessages.required),
  stateRegion: z.string().min(2, nomineeValidationMessages.required),
  gender: z.enum(['M', 'F', 'Other']).optional(),
  category: z.enum(['blue-garnet', 'gold-certificate', 'platinum-certificate']),
  subcategory: z.string().min(2, nomineeValidationMessages.required),
  summaryOfImpact: z.string()
    .min(200, nomineeValidationMessages.minLength(200))
    .max(500, nomineeValidationMessages.maxLength(500)),
  justification: z.string()
    .min(100, nomineeValidationMessages.minLength(100))
    .max(300, nomineeValidationMessages.maxLength(300)),
  photo: z.any().optional(),
  supportingDocs: z.array(z.any()).optional(),
  nominationSource: z.enum(['Internal', 'External', 'Self', 'Staff']),
  nominatedBy: z.string().min(3, nomineeValidationMessages.minLength(3)),
  nominatorEmail: z.string().email(nomineeValidationMessages.email),
  nominatorPhone: z.string().min(10, nomineeValidationMessages.phone),
});

interface BaseNomineeFormProps {
  onSubmit: (data: BaseNomineeForm) => void;
  defaultValues?: Partial<BaseNomineeForm>;
  className?: string;
}

export const BaseNomineeFormComponent: React.FC<BaseNomineeFormProps> = ({
  onSubmit,
  defaultValues,
  className = ''
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<BaseNomineeForm>({
    resolver: zodResolver(baseNomineeSchema),
    defaultValues
  });

  const handleFileUpload = (files: FileList | null, field: 'photo' | 'supportingDocs') => {
    if (!files?.length) return;
    
    // File validation logic here
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (file.size > maxSize) {
      alert(nomineeValidationMessages.fileSize);
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert(nomineeValidationMessages.fileType);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      {/* Personal Information Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('fullName')}
                type="text"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('emailAddress')}
                type="email"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
            {errors.emailAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.emailAddress.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('phoneNumber')}
                type="tel"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              {...register('gender')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Location</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('country')}
                type="text"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Enter country"
              />
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Region *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('stateRegion')}
                type="text"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Enter state/region"
              />
            </div>
            {errors.stateRegion && (
              <p className="mt-1 text-sm text-red-600">{errors.stateRegion.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Award Category Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Award Category</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="blue-garnet">Africa Icon Blue Garnet Awards</option>
              <option value="gold-certificate">Gold Certificate Awards</option>
              <option value="platinum-certificate">Platinum Certificate Awards</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory *
            </label>
            <select
              {...register('subcategory')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            >
              <option value="">Select subcategory</option>
              {/* Subcategories will be populated based on selected category */}
            </select>
            {errors.subcategory && (
              <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Impact & Justification Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Impact & Justification</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary of Impact * (200-500 words)
            </label>
            <textarea
              {...register('summaryOfImpact')}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="Describe the nominee's impact and achievements..."
            />
            {errors.summaryOfImpact && (
              <p className="mt-1 text-sm text-red-600">{errors.summaryOfImpact.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Justification for Nomination * (100-300 words)
            </label>
            <textarea
              {...register('justification')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="Explain why this nominee deserves recognition..."
            />
            {errors.justification && (
              <p className="mt-1 text-sm text-red-600">{errors.justification.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Supporting Documents Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Supporting Documents</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo/Logo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="photo-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#ea580c] hover:text-[#ea580c]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#ea580c]"
                  >
                    <span>Upload a file</span>
                    <input
                      id="photo-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files, 'photo')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Documents
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="docs-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#ea580c] hover:text-[#ea580c]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#ea580c]"
                  >
                    <span>Upload files</span>
                    <input
                      id="docs-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files, 'supportingDocs')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC up to 10MB each
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nominator Information Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Nominator Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomination Source *
            </label>
            <select
              {...register('nominationSource')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            >
              <option value="">Select source</option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Self">Self</option>
              <option value="Staff">Staff</option>
            </select>
            {errors.nominationSource && (
              <p className="mt-1 text-sm text-red-600">{errors.nominationSource.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nominated By *
            </label>
            <input
              {...register('nominatedBy')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="Enter nominator's name"
            />
            {errors.nominatedBy && (
              <p className="mt-1 text-sm text-red-600">{errors.nominatedBy.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nominator's Email *
            </label>
            <input
              {...register('nominatorEmail')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="Enter nominator's email"
            />
            {errors.nominatorEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.nominatorEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nominator's Phone *
            </label>
            <input
              {...register('nominatorPhone')}
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="Enter nominator's phone"
            />
            {errors.nominatorPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.nominatorPhone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            px-8 py-3 rounded-lg text-white font-semibold
            ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#ea580c] to-[#dc2626] hover:from-[#dc2626] hover:to-[#ea580c]'
            }
            transition-all duration-300 transform hover:scale-105
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
        </button>
      </div>
    </form>
  );
};
