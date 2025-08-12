"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff, Upload } from 'lucide-react';
import { Language, Country, Region, FileUpload } from '@/lib/types/signup';
import { organizationInfoStepSchema, passwordStepSchema, termsStepSchema, checkPasswordStrength } from '@/lib/validation/signupSchemas';
import { useSignup } from '@/lib/context/SignupContext';
import { getCountriesData } from '@/lib/services/mockSignupService';
import Button from '@/components/Common/Button';
import FormInput from '../FormComponents/FormInput';
import FormSelect from '../FormComponents/FormSelect';
import FormPhoneInput from '../FormComponents/FormPhoneInput';
import FormFileUpload from '../FormComponents/FormFileUpload';

interface OrganizationInfoFormData {
  organizationName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  state: string;
  organizationType: string;
  preferredLanguage: Language;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

const languageOptions = [
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'French' },
  { value: 'AR', label: 'Arabic' },
  { value: 'PT', label: 'Portuguese' }
];

const getOrganizationTypeOptions = (accountType: string) => {
  switch (accountType) {
    case 'NGO':
      return [
        { value: 'Non-Profit Organization', label: 'Non-Profit Organization' },
        { value: 'Charity', label: 'Charity' },
        { value: 'Foundation', label: 'Foundation' },
        { value: 'Community Organization', label: 'Community Organization' }
      ];
    case 'Corporation':
      return [
        { value: 'Private Limited Company', label: 'Private Limited Company' },
        { value: 'Public Limited Company', label: 'Public Limited Company' },
        { value: 'Partnership', label: 'Partnership' },
        { value: 'Sole Proprietorship', label: 'Sole Proprietorship' }
      ];
    case 'Government':
      return [
        { value: 'Federal Agency', label: 'Federal Agency' },
        { value: 'State Agency', label: 'State Agency' },
        { value: 'Local Government', label: 'Local Government' },
        { value: 'Public Institution', label: 'Public Institution' }
      ];
    case 'School':
      return [
        { value: 'Primary School', label: 'Primary School' },
        { value: 'Secondary School', label: 'Secondary School' },
        { value: 'University', label: 'University' },
        { value: 'College', label: 'College' },
        { value: 'Vocational School', label: 'Vocational School' }
      ];
    case 'Diaspora Group':
      return [
        { value: 'Cultural Association', label: 'Cultural Association' },
        { value: 'Professional Network', label: 'Professional Network' },
        { value: 'Community Group', label: 'Community Group' },
        { value: 'Alumni Association', label: 'Alumni Association' }
      ];
    default:
      return [{ value: 'Other', label: 'Other' }];
  }
};

const OrganizationInfoStep: React.FC = () => {
  const { formData, updateFormData, nextStep, previousStep, isLoading } = useSignup();
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; feedback: string[] }>({ score: 0, feedback: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationDocuments, setVerificationDocuments] = useState<FileUpload[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<any>({
    resolver: zodResolver(
      z.object({
        organizationName: z.string().min(1, "Organization name is required"),
        registrationNumber: z.string().min(1, "Registration number is required"),
        contactPersonName: z.string().min(1, "Contact person name is required"),
        contactEmail: z.string().email("Invalid email address"),
        contactPhone: z.string().min(1, "Contact phone is required"),
        country: z.string().min(1, "Country is required"),
        state: z.string().min(1, "State is required"),
        organizationType: z.string().min(1, "Organization type is required"),
        preferredLanguage: z.string().optional(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
        privacyAccepted: z.boolean().refine(val => val === true, "You must accept the privacy policy")
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
      })
    ),
    defaultValues: {
      organizationName: (formData as any)?.organizationName || '',
      registrationNumber: (formData as any)?.registrationNumber || '',
      contactPersonName: (formData as any)?.contactPersonName || '',
      contactEmail: (formData as any)?.contactEmail || '',
      contactPhone: (formData as any)?.contactPhone || '',
      country: formData.country || '',
      state: formData.state || '',
      organizationType: (formData as any)?.organizationType || '',
      preferredLanguage: formData.preferredLanguage || 'EN',
      password: formData.password || '',
      confirmPassword: formData.confirmPassword || '',
      termsAccepted: formData.termsAccepted || false,
      privacyAccepted: formData.privacyAccepted || false
    },
    mode: 'onChange'
  });

  const watchedPassword = watch('password');
  const watchedCountry = watch('country');

  // Helper function to get error message
  const getErrorMessage = (error: any): string | undefined => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return undefined;
  };

  // Load countries data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await getCountriesData();
        if (response.success && response.data) {
          setCountries(response.data);
        }
      } catch (error) {
        console.error('Error loading countries:', error);
      }
    };
    loadCountries();
  }, []);

  // Update regions when country changes
  useEffect(() => {
    if (watchedCountry) {
      const selectedCountry = countries.find(c => c.code === watchedCountry);
      setRegions(selectedCountry?.regions || []);
      setValue('state', ''); // Reset state when country changes
    }
  }, [watchedCountry, countries, setValue]);

  // Update password strength
  useEffect(() => {
    if (watchedPassword) {
      setPasswordStrength(checkPasswordStrength(watchedPassword));
    }
  }, [watchedPassword]);

  const onSubmit = (data: OrganizationInfoFormData) => {
    updateFormData({
      ...data,
      verificationDocument: verificationDocuments[0]?.file
    });
    nextStep();
  };

  const countryOptions = countries.map(country => ({
    value: country.code,
    label: country.name
  }));

  const regionOptions = regions.map(region => ({
    value: region.code,
    label: region.name
  }));

  const organizationTypeOptions = getOrganizationTypeOptions(formData.accountType || '');

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-yellow-500';
    if (score <= 3) return 'bg-[#FFB92E]';
    return 'bg-[#ea580c]';
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 1) return 'Weak';
    if (score <= 2) return 'Fair';
    if (score <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Organization Information
        </h1>
        <p className="text-lg text-gray-600">
          Please provide your organization details to create your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Organization Details */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Details</h3>
          
          <FormInput
            {...register('organizationName')}
            label="Organization Name"
            placeholder="Enter your organization name"
            required
            error={getErrorMessage(errors.organizationName)}
            autoComplete="organization"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              {...register('registrationNumber')}
              label="Registration Number"
              placeholder="Enter registration number"
              required
              error={getErrorMessage(errors.registrationNumber)}
            />

            <FormSelect
              {...register('organizationType')}
              label="Organization Type"
              placeholder="Select organization type"
              required
              error={getErrorMessage(errors.organizationType)}
              options={organizationTypeOptions}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Person</h3>
          
          <FormInput
            {...register('contactPersonName')}
            label="Contact Person Name"
            placeholder="Enter contact person's full name"
            required
            error={getErrorMessage(errors.contactPersonName)}
            autoComplete="name"
          />

          <FormInput
            {...register('contactEmail')}
            type="email"
            label="Contact Email"
            placeholder="Enter contact email address"
            required
            error={getErrorMessage(errors.contactEmail)}
            autoComplete="email"
          />

          <Controller
            name="contactPhone"
            control={control}
            render={({ field }) => (
              <FormPhoneInput
                name="contactPhone"
                label="Contact Phone Number"
                placeholder="Enter contact phone number"
                required
                error={getErrorMessage(errors.contactPhone)}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                country="ng"
              />
            )}
          />
        </div>

        {/* Location Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              {...register('country')}
              label="Country"
              placeholder="Select country"
              required
              error={getErrorMessage(errors.country)}
              options={countryOptions}
            />

            <FormSelect
              {...register('state')}
              label="State/Region"
              placeholder="Select state/region"
              required
              error={getErrorMessage(errors.state)}
              options={regionOptions}
              disabled={!watchedCountry}
            />
          </div>

          <FormSelect
            {...register('preferredLanguage')}
            label="Preferred Language"
            placeholder="Select preferred language"
            required
            error={getErrorMessage(errors.preferredLanguage)}
            options={languageOptions}
          />
        </div>

        {/* Verification Documents */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Documents</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your organization's registration certificate or other verification documents.
          </p>
          
          <FormFileUpload
            label="Verification Document"
            name="verificationDocument"
            placeholder="Click to upload or drag and drop your verification document"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5 * 1024 * 1024} // 5MB
            allowedTypes={['application/pdf', 'image/jpeg', 'image/png']}
            value={verificationDocuments}
            onChange={setVerificationDocuments}
            showPreview={true}
          />
        </div>

        {/* Password Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
          
          <FormInput
            {...register('password')}
            type="password"
            label="Password"
            placeholder="Create a strong password"
            required
            error={getErrorMessage(errors.password)}
            autoComplete="new-password"
          />

          {/* Password Strength Indicator */}
          {watchedPassword && (
            <div className="mb-4 w-full overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 flex-shrink-0">Password strength:</span>
                <span className={`text-sm font-medium flex-shrink-0 ml-2 ${
                  passwordStrength.score <= 1 ? 'text-red-600' :
                  passwordStrength.score <= 2 ? 'text-yellow-600' :
                  passwordStrength.score <= 3 ? 'text-[#FFB92E]' : 'text-[#ea580c]'
                }`}>
                  {getPasswordStrengthText(passwordStrength.score)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                  style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <FormInput
            {...register('confirmPassword')}
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            error={getErrorMessage(errors.confirmPassword)}
            autoComplete="new-password"
          />
        </div>

        {/* Terms and Privacy */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Privacy</h3>
          
          <div className="space-y-4">
            <label className="flex items-start space-x-3">
              <input
                {...register('termsAccepted')}
                type="checkbox"
                className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-orange-600 hover:text-orange-700 underline">
                  Terms and Conditions
                </a>
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-600">{getErrorMessage(errors.termsAccepted)}</p>
            )}

            <label className="flex items-start space-x-3">
              <input
                {...register('privacyAccepted')}
                type="checkbox"
                className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/privacy" target="_blank" className="text-orange-600 hover:text-orange-700 underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.privacyAccepted && (
              <p className="text-sm text-red-600">{getErrorMessage(errors.privacyAccepted)}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6">
          <Button
            type="button"
            text="Back"
            variant="outline"
            size="medium"
            onClick={previousStep}
            disabled={isLoading}
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            className="px-6 py-3"
          />

          <Button
            type="submit"
            text="Create Account"
            variant="filled"
            size="medium"
            disabled={!isValid || isLoading}
            loading={isLoading}
            className="px-8 py-3 min-w-[200px]"
          />
        </div>
      </form>
    </div>
  );
};

export default OrganizationInfoStep;
