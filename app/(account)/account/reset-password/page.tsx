"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/Common/Button';
import FormInput from '@/components/UI/Account/signup/FormComponents/FormInput';
import apiClient from '@/lib/services/apiClient';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] as string[] });

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset.');
    }
  }, [token]);

  useEffect(() => {
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
    }
  }, [password]);

  const checkPasswordStrength = (pwd: string): { score: number; feedback: string[] } => {
    let score = 0;
    const feedback: string[] = [];

    if (pwd.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(pwd)) score += 1;
    else feedback.push('At least one lowercase letter');

    if (/[A-Z]/.test(pwd)) score += 1;
    else feedback.push('At least one uppercase letter');

    if (/\d/.test(pwd)) score += 1;
    else feedback.push('At least one number');

    return { score, feedback };
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-yellow-500';
    if (score <= 3) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 1) return 'Weak';
    if (score <= 2) return 'Fair';
    if (score <= 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Invalid reset token');
      return;
    }

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Please choose a stronger password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiClient.post('/api/v1/auth/reset-password', {
        token,
        newPassword: password
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Password Reset Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <Button
              text="Go to Login"
              variant="filled"
              size="medium"
              onClick={() => router.push('/account/login')}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
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
              <p className="text-sm text-gray-600">Reset Password</p>
            </div>
          </div>
          <Link
            href="/account/login"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/70 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Login</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-orange-600" />
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Reset Your Password
                </h1>
                <p className="text-gray-600">
                  Enter your new password below
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FormInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Password strength:</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength.score <= 1 ? 'text-red-600' :
                        passwordStrength.score <= 2 ? 'text-yellow-600' :
                        passwordStrength.score <= 3 ? 'text-orange-600' : 'text-green-600'
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
                      <ul className="text-xs text-gray-600 space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="relative">
                  <FormInput
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  text="Reset Password"
                  variant="filled"
                  size="medium"
                  disabled={loading || !token}
                  loading={loading}
                  className="w-full py-3"
                />
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link href="/account/login" className="text-orange-600 hover:text-orange-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
