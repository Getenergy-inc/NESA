"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthContext } from '@/lib/context/AuthContext';
import Button from '@/components/Common/Button';
import FormInput from '@/components/UI/Account/signup/FormComponents/FormInput';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuthContext();
  
  const callbackUrl = searchParams?.get('callbackUrl') || searchParams?.get('redirect') || '/member';
  const isVerified = searchParams?.get('verified') === 'true';
  const isFirstLogin = searchParams?.get('firstLogin') === 'true';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(isVerified);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn({ email, password });
      
      // Use a slight delay to ensure the auth state is properly set
      setTimeout(() => {
        // Redirect first-time logins to welcome page
        if (isFirstLogin) {
          router.push('/member/welcome');
        } else {
          router.push(callbackUrl);
        }
      }, 500);
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle different error types
      const errorMessage = err.response?.data?.message || err.message;
      
      if (errorMessage?.includes('rate limit') || errorMessage?.includes('Too many')) {
        setError('Too many login attempts. Please wait 15 minutes and try again.');
      } else if (errorMessage?.includes('not found') || errorMessage?.includes('Invalid')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (errorMessage?.includes('not verified')) {
        setError('Please verify your email address before logging in.');
      } else {
        setError(errorMessage || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/NESA Logo 2.png"
              alt="NESA-Africa"
              width={50}
              height={50}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">NESA-Africa</h1>
              <p className="text-sm text-gray-600">Welcome Back</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/70 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
            <span className="text-sm font-medium sm:hidden">Home</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <LogIn className="w-8 h-8 text-orange-600" />
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Sign In
                </h1>
                <p className="text-gray-600">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Success Message */}
              {showVerifiedMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">
                      Account verified successfully!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      You can now log in with your credentials.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowVerifiedMessage(false)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <div className="relative">
                  <FormInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/account/forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  text="Sign In"
                  variant="filled"
                  size="medium"
                  disabled={loading}
                  loading={loading}
                  className="w-full py-3"
                />
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/signup/comprehensive" className="text-orange-600 hover:text-orange-700 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact us at{' '}
              <a href="mailto:support@nesa.africa" className="text-orange-600 hover:text-orange-700 font-medium">
                support@nesa.africa
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
