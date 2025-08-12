"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { checkApplicationVerification } from '@/lib/services/judgeVerificationService';
import { useAuth } from '@/lib/hooks/useAuth';
import Image from 'next/image';

// Validation schema for judge signup
const judgeSignupSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type JudgeSignupFormData = z.infer<typeof judgeSignupSchema>;

const JudgeSignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(true);
  const [verificationError, setVerificationError] = useState<string>('');
  const [applicationData, setApplicationData] = useState<any>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<JudgeSignupFormData>({
    resolver: zodResolver(judgeSignupSchema)
  });

  useEffect(() => {
    if (!email) {
      setVerificationError('Invalid signup link. Email parameter is missing.');
      setVerificationLoading(false);
      return;
    }

    checkVerification();
  }, [email]);

  const checkVerification = async () => {
    try {
      const verification = await checkApplicationVerification(email!);
      
      if (!verification.exists) {
        setVerificationError('No judge application found for this email. Please submit an application first.');
        setVerificationLoading(false);
        return;
      }

      if (!verification.verified) {
        setVerificationError('Your application has not been verified yet. Please check your email for verification instructions.');
        setVerificationLoading(false);
        return;
      }

      // Pre-fill form with application data
      if (verification.application) {
        setApplicationData(verification.application);
        setValue('fullName', verification.application.full_name);
        setValue('email', verification.application.email);
      }

      setVerificationLoading(false);
    } catch (error: any) {
      setVerificationError('Failed to verify application status. Please try again.');
      setVerificationLoading(false);
    }
  };

  const onSubmit = async (data: JudgeSignupFormData) => {
    setLoading(true);
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: 'Judge',
        referral: 'judge-application',
        region: applicationData?.state || '',
        phoneNumber: applicationData?.phone || '',
        nomineeType: '',
        state: applicationData?.state || ''
      });

      // Update application status to account_created
      try {
        await fetch('/api/judge-apply/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            status: 'account_created',
            notes: 'Judge account successfully created.',
            next_steps: 'You can now access the judges dashboard and begin your judging activities.'
          })
        });
      } catch (statusError) {
        console.error('Failed to update application status:', statusError);
      }

      // Redirect to judge dashboard
      router.push('/judge');
    } catch (error: any) {
      console.error('Judge signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (verificationLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (verificationError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Verification Error</h2>
          <p className="text-gray-600 mb-6">{verificationError}</p>
          <button
            onClick={() => router.push('/judgeapply')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Apply as Judge
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-orange-800 to-yellow-900">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center">
              <Image
                src="/images/nesa-logo.png"
                alt="NESA Logo"
                width={150}
                height={60}
                className="brightness-0 invert"
              />
            </div>
            
            <div className="space-y-6">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Image
                  src="/images/nesa-emblem.png"
                  alt="NESA Emblem"
                  width={80}
                  height={80}
                  className="brightness-0 invert"
                />
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>54, Fajolu Street, Surulere, Lagos</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+234-907-962-1110</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+234-810-926-5897</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span>nesa.africa@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Judge Account</h1>
            <p className="text-gray-600">Inspire change and impact education through your effort.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Autofilled Name (eg. Jane Doe)"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-gray-50"
                {...register('fullName')}
                readOnly
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Autofilled email (eg. janedoe@gmail.com)"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-gray-50"
                {...register('email')}
                readOnly
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your desired password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your desired password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pr-10"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Continue'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default JudgeSignupPage;
