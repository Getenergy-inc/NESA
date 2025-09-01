"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiX, FiMail, FiArrowRight } from 'react-icons/fi';
import { verifyJudgeEmail, generateJudgeSignupLink } from '@/lib/services/judgeVerificationService';
import Image from 'next/image';

const JudgeEmailVerification: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [signupUrl, setSignupUrl] = useState<string>('');
  const [applicantName, setApplicantName] = useState<string>('');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!email || !token) {
      setVerificationStatus('error');
      setErrorMessage('Invalid verification link. Please check your email for the correct link.');
      return;
    }

    verifyEmail();
  }, [email, token]);

  const verifyEmail = async () => {
    try {
      const response = await verifyJudgeEmail({
        email: email!,
        verification_token: token!
      });

      if (response.success) {
        setVerificationStatus('success');
        setApplicantName(response.application?.full_name || '');
        
        // Generate signup link
        const signupData = await generateJudgeSignupLink(email!);
        setSignupUrl(signupData.signup_url);
      } else {
        setVerificationStatus('error');
        setErrorMessage(response.message || 'Verification failed');
      }
    } catch (error: any) {
      if (error.message.includes('expired')) {
        setVerificationStatus('expired');
      } else {
        setVerificationStatus('error');
        setErrorMessage(error.message || 'Verification failed');
      }
    }
  };

  const handleProceedToSignup = () => {
    if (signupUrl) {
      router.push(signupUrl);
    } else {
      router.push(`/account/signup/judgesignup?email=${encodeURIComponent(email!)}`);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Your Email</h2>
          <p className="text-gray-600">Please wait while we verify your judge application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg w-full"
      >
        {verificationStatus === 'success' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <FiCheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Congratulations, You have been approved to be a judge for the NESA Awards 2025 🎉
            </h1>
            
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-3">Dear {applicantName || 'Judge Applicant'},</p>
              
              <p className="text-sm text-gray-700 mb-3">
                Congratulations! We are pleased to inform you that your application to become a judge for the prestigious New Education Standard Awards 2025 has been approved. Your expertise and dedication to advancing educational excellence make you an invaluable addition to our panel of judges.
              </p>
              
              <p className="text-sm text-gray-700 mb-3">
                As a judge, you will play a key role in recognizing and celebrating outstanding contributions to education across Africa, in order to promote inclusive and equitable quality education for all.
              </p>
              
              <p className="text-sm text-gray-700 mb-3">
                To confirm your participation and receive further details about your role, please click the link below:
              </p>
              
              <p className="text-sm font-medium text-orange-600 mb-3">
                [Confirm Your Role as a Judge]
              </p>
              
              <p className="text-sm text-gray-700 mb-3">
                We are excited to collaborate with you and look forward to your insights in shaping this landmark event.
              </p>
              
              <p className="text-sm text-gray-700">
                Should you have any questions, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleProceedToSignup}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Confirm Your Role as a Judge
                <FiArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleBackToHome}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                Back to Homepage
              </button>
            </div>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                <FiX className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            
            <button
              onClick={handleBackToHome}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Back to Homepage
            </button>
          </>
        )}

        {verificationStatus === 'expired' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
                <FiMail className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Expired</h1>
            <p className="text-gray-600 mb-6">
              This verification link has expired. Please contact support to request a new verification link.
            </p>
            
            <button
              onClick={handleBackToHome}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Back to Homepage
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default JudgeEmailVerification;
