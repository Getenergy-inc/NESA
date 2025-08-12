"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Gender, Language, Country, Region } from '@/lib/types/signup';
import { personalInfoStepSchema, passwordStepSchema, termsStepSchema, checkPasswordStrength } from '@/lib/validation/signupSchemas';
import { useSignup } from '@/lib/context/SignupContext';
import { getCountriesData } from '@/lib/services/mockSignupService';
import Button from '@/components/Common/Button';
import FormInput from '../FormComponents/FormInput';
import FormSelect from '../FormComponents/FormSelect';
import FormPhoneInput from '../FormComponents/FormPhoneInput';
import { ERROR_MESSAGES, createFormError, ValidationError } from '@/lib/types/errors';
import ErrorDisplay, { FieldError, FormErrorSummary } from '@/components/Common/ErrorDisplay';


interface PersonalInfoFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
  country: string;
  state: string;
  preferredLanguage: Language;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' }
];

const languageOptions = [
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'French' },
  { value: 'AR', label: 'Arabic' },
  { value: 'PT', label: 'Portuguese' }
];

const PersonalInfoStep: React.FC = () => {
  const { formData, updateFormData, nextStep, previousStep, isLoading, error: contextError } = useSignup();
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; feedback: string[] }>({ score: 0, feedback: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<any>({
    resolver: zodResolver(
      z.object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email address"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        gender: z.string().min(1, "Gender is required"),
        dateOfBirth: z.string().min(1, "Date of birth is required"),
        country: z.string().min(1, "Country is required"),
        state: z.string().min(1, "State is required"),
        preferredLanguage: z.string().optional(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
        privacyAccepted: z.boolean().refine(val => val === true, "You must accept the privacy policy")
      })
    ),
    defaultValues: {
      fullName: (formData as any)?.fullName || '',
      email: (formData as any)?.email || '',
      phoneNumber: (formData as any)?.phoneNumber || '',
      gender: (formData as any)?.gender || undefined,
      dateOfBirth: (formData as any)?.dateOfBirth || '',
      country: formData.country || '',
      state: formData.state || '',
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

  const onSubmit = async (data: any) => {
    try {
      setSubmitError('');
      setValidationErrors([]);

      // Custom validation
      const errors: ValidationError[] = [];

      // Password confirmation validation
      if (data.password !== data.confirmPassword) {
        errors.push({
          field: 'confirmPassword',
          message: ERROR_MESSAGES.PASSWORDS_DONT_MATCH
        });
      }

      // Password strength validation
      if (passwordStrength.score < 2) {
        errors.push({
          field: 'password',
          message: ERROR_MESSAGES.PASSWORD_WEAK
        });
      }

      // Email format validation (additional check)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push({
          field: 'email',
          message: ERROR_MESSAGES.INVALID_EMAIL
        });
      }

      // Phone number validation (basic check)
      if (data.phoneNumber && data.phoneNumber.length < 10) {
        errors.push({
          field: 'phoneNumber',
          message: ERROR_MESSAGES.INVALID_PHONE
        });
      }

      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }

      updateFormData(data);
      nextStep();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : ERROR_MESSAGES.FORM_SUBMISSION_FAILED);
    }
  };

  const countryOptions = countries.map(country => ({
    value: country.code,
    label: country.name
  }));

  const regionOptions = regions.map(region => ({
    value: region.code,
    label: region.name
  }));

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
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h1>
        <p className="text-gray-600">
          Please provide your personal details to create your account.
        </p>
      </div>

      {/* Error Messages */}
      {(contextError || submitError) && (
        <div className="mb-6">
          <ErrorDisplay
            error={contextError || submitError}
            onDismiss={() => setSubmitError('')}
          />
        </div>
      )}

      {/* Validation Error Summary */}
      {validationErrors.length > 0 && (
        <div className="mb-6">
          <FormErrorSummary errors={validationErrors} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <FormInput
            {...register('fullName')}
            label="Full Name"
            placeholder="Enter your full name"
            required
            error={getErrorMessage(errors.fullName)}
            autoComplete="name"
          />

          <FormInput
            {...register('email')}
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            required
            error={getErrorMessage(errors.email)}
            autoComplete="email"
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <FormPhoneInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                required
                error={getErrorMessage(errors.phoneNumber)}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                country="ng"
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              {...register('gender')}
              label="Gender"
              placeholder="Select your gender"
              required
              error={getErrorMessage(errors.gender)}
              options={genderOptions}
            />

            <FormInput
              {...register('dateOfBirth')}
              type="date"
              label="Date of Birth"
              required
              error={getErrorMessage(errors.dateOfBirth)}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Location Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              {...register('country')}
              label="Country"
              placeholder="Select your country"
              required
              error={getErrorMessage(errors.country)}
              options={countryOptions}
            />

            <FormSelect
              {...register('state')}
              label="State/Region"
              placeholder="Select your state/region"
              required
              error={getErrorMessage(errors.state)}
              options={regionOptions}
              disabled={!watchedCountry}
            />
          </div>

          <FormSelect
            {...register('preferredLanguage')}
            label="Preferred Language"
            placeholder="Select your preferred language"
            required
            error={getErrorMessage(errors.preferredLanguage)}
            options={languageOptions}
          />
        </div>

        {/* Password Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
          
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
                  passwordStrength.score <= 3 ? 'text-blue-600' : 'text-[#ea580c]'
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
              {passwordStrength.feedback.length > 0 && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Requirements:</p>
                  <ul className="text-xs text-gray-600 space-y-1 max-w-full">
                    {passwordStrength.feedback.map((feedback, index) => (
                      <li key={index} className="flex items-start break-words">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        <span className="flex-1 leading-relaxed">{feedback}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Terms & Privacy</h3>
          
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

export default PersonalInfoStep;
