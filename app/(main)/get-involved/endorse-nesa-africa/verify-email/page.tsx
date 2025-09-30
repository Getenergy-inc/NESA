"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Common/Button';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'already_verified'>('loading');
  const [message, setMessage] = useState('');
  const [endorsementData, setEndorsementData] = useState<any>(null);

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    console.log('VerifyEmailPage - URL params:', { email, token });
    console.log('VerifyEmailPage - searchParams:', Object.fromEntries(searchParams.entries()));

    if (email && token) {
      verifyEmail();
    } else {
      setVerificationStatus('error');
      setMessage(`Invalid verification link. Missing ${!email ? 'email' : ''} ${!token ? 'token' : ''} parameters.`);
    }
  }, [email, token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch('/api/endorse/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verification_token: token }),
      });

      const data = await response.json();

      if (data.success) {
        setVerificationStatus('success');
        setMessage('Your email has been successfully verified!');
        setEndorsementData(data.endorsement);
      } else {
        if (data.message?.includes('already verified')) {
          setVerificationStatus('already_verified');
          setMessage('Your email was already verified. Thank you!');
        } else {
          setVerificationStatus('error');
          setMessage(data.message || 'Verification failed. Please try again or contact support.');
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setMessage('An error occurred during verification. Please try again later.');
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader2 className="mx-auto h-16 w-16 text-[#ea580c] animate-spin" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Verifying Your Email</h1>
            <p className="mt-2 text-gray-600">Please wait while we verify your endorsement...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Email Verified Successfully!</h1>
            <p className="mt-2 text-lg text-gray-600">{message}</p>

            {endorsementData && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Your Endorsement Details</h3>
                <div className="text-left space-y-1">
                  <p><span className="font-medium">Organization:</span> {endorsementData.organization_name}</p>
                  <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Verified & Pending Review</span></p>
                  <p><span className="font-medium">Next Step:</span> Our team will review your endorsement within 2-3 business days</p>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <Link href="/get-involved/endorse-nesa-africa/showcase">
                <Button
                  text="View All Endorsers"
                  variant="filled"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
                  icon={<ArrowRight className="w-5 h-5" />}
                />
              </Link>
              <div>
                <Link href="/get-involved/endorse-nesa-africa">
                  <Button
                    text="Back to Endorsement Page"
                    variant="outlined"
                    className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-8 py-3"
                  />
                </Link>
              </div>
            </div>
          </div>
        );

      case 'already_verified':
        return (
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-blue-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Already Verified</h1>
            <p className="mt-2 text-lg text-gray-600">{message}</p>

            <div className="mt-8 space-y-4">
              <Link href="/get-involved/endorse-nesa-africa/showcase">
                <Button
                  text="View All Endorsers"
                  variant="filled"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
                  icon={<ArrowRight className="w-5 h-5" />}
                />
              </Link>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Verification Failed</h1>
            <p className="mt-2 text-lg text-gray-600">{message}</p>

            <div className="mt-8 space-y-4">
              <Button
                text="Try Again"
                variant="filled"
                onClick={() => window.location.reload()}
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
              />
              <div>
                <Link href="/get-involved/endorse-nesa-africa">
                  <Button
                    text="Back to Endorsement Page"
                    variant="outlined"
                    className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-8 py-3"
                  />
                </Link>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Need help?</strong> Contact us at{' '}
                <a href="mailto:endorse@nesa.africa" className="text-[#ea580c] hover:underline">
                  endorse@nesa.africa
                </a>{' '}
                or call{' '}
                <a href="tel:+2349079621110" className="text-[#ea580c] hover:underline">
                  +234-907-962-1110
                </a>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;