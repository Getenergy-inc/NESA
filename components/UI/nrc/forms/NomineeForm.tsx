'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Common/Button';

const nomineeSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  awardSuperCategory: z.enum(['Blue Garnet Awards', 'Gold Certificate', 'Platinum Certificate']),
  subcategory: z.string().min(1, 'Subcategory is required'),
  
  // Achievements and Impact
  achievementsDescription: z.string().min(50, 'Description of achievements is required'),
  socialImpact: z.string().min(50, 'Social impact description is required'),
  sustainabilityEvidence: z.string().min(50, 'Sustainability evidence is required'),
  
  // Contact Information
  country: z.string().min(2, 'Country is required'),
  email: z.string().email('Valid email is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  whatsappContact: z.string().optional(),
  optional: z.string().optional(),
  
  // Web Presence
  websiteLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  
  // Documents
  documents: z.any().optional(),
});

type NomineeData = z.infer<typeof nomineeSchema>;

const NomineeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NomineeData>({
    resolver: zodResolver(nomineeSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: NomineeData) => {
    setIsSubmitting(true);
    try {
      console.log('Form data:', data);
      // TODO: Implement actual submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Nominee submitted successfully!');
    } catch (error) {
      console.error('Error submitting nominee:', error);
      alert('Error submitting nominee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Nominee Entry</h1>
          <div className="text-sm text-gray-600">Signed in as Volunteer</div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow">
          {/* Nominee Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nominee Full Name</label>
            <input
              type="text"
              {...register('fullName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Award Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Award Super Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Award Super Category</label>
              <select
                {...register('awardSuperCategory')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Super Category</option>
                <option value="Blue Garnet Awards">Blue Garnet Awards</option>
                <option value="Gold Certificate">Gold Certificate</option>
                <option value="Platinum Certificate">Platinum Certificate</option>
              </select>
              {errors.awardSuperCategory && (
                <p className="mt-1 text-sm text-red-600">{errors.awardSuperCategory.message}</p>
              )}
            </div>

            {/* Category */}
            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                {...register('subcategory')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Subcategory</option>
                <option value="Reading Advocacy">Reading Advocacy</option>
                {/* Add more subcategories based on category */}
              </select>
              {errors.subcategory && (
                <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>
              )}
            </div>
          </div>

          {/* Description of Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description of Achievements</label>
            <textarea
              {...register('achievementsDescription')}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe the nominee's achievements and impact..."
            />
            {errors.achievementsDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.achievementsDescription.message}</p>
            )}
          </div>

          {/* Impact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Social Impact</label>
              <textarea
                {...register('socialImpact')}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Impact on community literacy..."
              />
              {errors.socialImpact && (
                <p className="mt-1 text-sm text-red-600">{errors.socialImpact.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sustainability Evidence</label>
              <textarea
                {...register('sustainabilityEvidence')}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Sustainability of reading facilities..."
              />
              {errors.sustainabilityEvidence && (
                <p className="mt-1 text-sm text-red-600">{errors.sustainabilityEvidence.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country/Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Country/Region</label>
              <select
                {...register('country')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Country</option>
                <option value="Kenya">Kenya</option>
                {/* Add more countries */}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                {...register('phoneNumber')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="+254 XXX XXXXXX"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* WhatsApp Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Contact (optional)</label>
              <input
                type="tel"
                {...register('whatsappContact')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="+254 XXX XXXXXX"
              />
            </div>

            {/* Optional Field */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Optional</label>
              <input
                type="text"
                {...register('optional')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div> */}
          </div>

          {/* Website/Social Media Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Website / Social Media Link</label>
            <input
              type="url"
              {...register('websiteLink')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="https://www.example.com"
            />
            {errors.websiteLink && (
              <p className="mt-1 text-sm text-red-600">{errors.websiteLink.message}</p>
            )}
          </div>

          {/* Upload Documents/Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Documents/Links</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      {...register('documents')}
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                {selectedFile && (
                  <p className="text-sm text-gray-600">{selectedFile.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              text="SAVE AS DRAFT"
              onClick={() => {}}
              className="px-8 py-2"
            />
            <Button
              type="submit"
              variant="filled"
              text="SUBMIT NOMINEE"
              loading={isSubmitting}
              className="px-8 py-2 bg-[#B78632] hover:bg-[#9E722B]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NomineeForm;
