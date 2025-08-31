"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Clock,
  Mail,
  ExternalLink
} from 'lucide-react';
import Button from '@/components/Common/Button';

interface VerificationResult {
  success: boolean;
  message: string;
  endorsement?: {
    id: string;
    organization_name: string;
    email: string;
    verified: boolean;
    status: string;
  };
}

const EmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to track if verification has been attempted
  const verificationAttempted = React.useRef(false);
  
  useEffect(() => {
    // Only verify if we haven't attempted verification yet
    if (email && token && !verificationAttempted.current) {
      verificationAttempted.current = true;
      verifyEmail();
    } else if (!email || !token) {
      setLoading(false);
      setError('Missing verification parameters. Please check your email link.');
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      // This will run when the component unmounts
    };
  }, []); // Empty dependency array to ensure it only runs once

  const verifyEmail = async () => {
    try {
      const response = await fetch(`/api/endorse/verify-email?email=${encodeURIComponent(email!)}&token=${encodeURIComponent(token!)}`);
      const data = await response.json();
      
      setVerificationResult(data);
    } catch (error) {
      console.error('Error verifying email:', error);
      setError('An error occurred while verifying your email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#ea580c] animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Email</h1>
          <p className="text-gray-600">Please wait while we verify your email address...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/get-involved/endorse-nesa-africa">
            <Button
              text="Back to Endorsements"
              variant="filled"
              className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
            />
          </Link>
        </div>
      </div>
    );
  }

  if (!verificationResult?.success) {
    // Check if the error message indicates the token was already used
    const isAlreadyVerifiedError = verificationResult?.message?.toLowerCase().includes('invalid') || 
                                  verificationResult?.message?.toLowerCase().includes('expired');
    
    const errorTitle = isAlreadyVerifiedError ? "Already Verified or Invalid Link" : "Verification Failed";
    const errorMessage = isAlreadyVerifiedError 
      ? "This verification link has already been used or is invalid. If you've already verified your email, you can check your endorsement status."
      : (verificationResult?.message || 'Invalid verification link. Please check your email and try again.');
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{errorTitle}</h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved/endorse-nesa-africa">
              <Button
                text="Back to Endorsements"
                variant="filled"
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
              />
            </Link>
            
            {isAlreadyVerifiedError && (
              <Link href="/get-involved/endorse-nesa-africa/status">
                <Button
                  text="Check Status"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Email Verified Successfully!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for verifying your email address. Your endorsement for NESA-Africa 2025 is now under review.
          </p>

          {verificationResult.endorsement && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Endorsement Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{verificationResult.endorsement.organization_name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-600">Under Review</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{verificationResult.endorsement.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Endorsement ID</p>
                  <p className="font-medium font-mono text-sm">{verificationResult.endorsement.id}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              What Happens Next?
            </h2>
            
            <ul className="text-left text-yellow-700 space-y-2">
              <li className="flex items-start">
                <span className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 text-xs font-bold mr-2 mt-0.5">1</span>
                <span>Our team will review your endorsement within 24-72 hours</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 text-xs font-bold mr-2 mt-0.5">2</span>
                <span>You'll receive an email notification when your endorsement is approved</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 text-xs font-bold mr-2 mt-0.5">3</span>
                <span>Once approved, your endorsement will appear on our Wall of Endorsers</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved/endorse-nesa-africa/showcase">
              <Button
                text="View All Endorsers"
                variant="filled"
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
                icon={<ExternalLink className="w-4 h-4" />}
              />
            </Link>
            
            <Link href="/">
              <Button
                text="Back to Home"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              />
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Questions about your endorsement? Contact us at{' '}
              <a href="mailto:endorse@nesa.africa" className="text-[#ea580c] hover:underline">
                endorse@nesa.africa
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;