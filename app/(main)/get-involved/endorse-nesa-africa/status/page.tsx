"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Award,
  ArrowRight,
  Loader2,
  Mail
} from 'lucide-react';
import Button from '@/components/Common/Button';

interface EndorsementStatus {
  id: string;
  organization_name: string;
  email: string;
  status: string;
  verified: boolean;
  created_at: string;
  endorsement_type: string;
  endorsement_tier?: string;
}

interface StatusResponse {
  success: boolean;
  message?: string;
  endorsement?: EndorsementStatus;
}

const EndorsementStatusPage = () => {
  const [email, setEmail] = useState('');
  const [statusResult, setStatusResult] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/endorse/submit?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      setStatusResult(data);
      
      if (!data.success) {
        setError(data.message || 'No endorsement found with this email address');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setError('An error occurred while checking your endorsement status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string, verified: boolean) => {
    if (!verified && status === 'pending_verification') {
      return {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        label: 'Email Verification Required',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        description: 'Please check your email and click the verification link to proceed with your endorsement.'
      };
    }
    
    switch (status) {
      case 'pending_review':
        return {
          icon: <Clock className="w-5 h-5 text-blue-500" />,
          label: 'Under Review',
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          description: 'Your endorsement is currently being reviewed by our team. This typically takes 24-72 hours.'
        };
      case 'approved':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          label: 'Approved',
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          description: 'Congratulations! Your endorsement has been approved and is now displayed on our Wall of Endorsers.'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          label: 'Not Approved',
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          description: 'Unfortunately, your endorsement was not approved. Please contact our team for more information.'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-gray-500" />,
          label: 'Processing',
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          description: 'Your endorsement is being processed.'
        };
    }
  };

  const renderStatusDetails = () => {
    if (!statusResult?.endorsement) return null;
    
    const { endorsement } = statusResult;
    const statusInfo = getStatusDisplay(endorsement.status, endorsement.verified);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className={`p-6 ${statusInfo.bg} ${statusInfo.border} border-b`}>
          <div className="flex items-center gap-3">
            {statusInfo.icon}
            <h2 className={`text-xl font-bold ${statusInfo.color}`}>
              {statusInfo.label}
            </h2>
          </div>
          <p className="mt-2 text-gray-600">
            {statusInfo.description}
          </p>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Endorsement Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-medium">{endorsement.organization_name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Endorsement ID</p>
              <p className="font-mono text-sm">{endorsement.id}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Submission Date</p>
              <p className="font-medium">
                {new Date(endorsement.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium capitalize">
                {endorsement.endorsement_type}
                {endorsement.endorsement_tier && ` (${endorsement.endorsement_tier})`}
              </p>
            </div>
          </div>
          
          {!endorsement.verified && endorsement.status === 'pending_verification' && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 flex items-center mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email Verification Required
              </h4>
              <p className="text-yellow-700 text-sm mb-4">
                We've sent a verification email to <strong>{endorsement.email}</strong>. 
                Please check your inbox and spam folder, then click the verification link to proceed.
              </p>
              <Button
                text="Resend Verification Email"
                variant="outline"
                size="small"
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-white"
                onClick={() => alert('Verification email resent! Please check your inbox.')}
              />
            </div>
          )}
          
          {endorsement.status === 'approved' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 flex items-center mb-2">
                <Award className="w-4 h-4 mr-2" />
                Your Endorsement is Live!
              </h4>
              <p className="text-green-700 text-sm mb-4">
                Your endorsement is now visible on our Wall of Endorsers. Thank you for supporting NESA-Africa 2025!
              </p>
              <Link href="/get-involved/endorse-nesa-africa/showcase">
                <Button
                  text="View Wall of Endorsers"
                  variant="outline"
                  size="small"
                  className="border-green-500 text-green-700 hover:bg-green-500 hover:text-white"
                  icon={<ArrowRight className="w-4 h-4" />}
                />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Check Your Endorsement Status
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter the email address you used for your NESA-Africa 2025 endorsement to check its current status.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={checkStatus} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              text={loading ? 'Checking...' : 'Check Status'}
              variant="filled"
              type="submit"
              className="bg-[#ea580c] hover:bg-[#dc2626] text-white py-3"
              icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              disabled={loading}
            />
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              <div className="flex items-start">
                <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">{error}</p>
                  <p className="text-sm mt-1">
                    If you believe this is an error, please contact us at{' '}
                    <a href="mailto:endorse@nesa.africa" className="text-red-700 underline">
                      endorse@nesa.africa
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {renderStatusDetails()}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4">
            Haven't submitted an endorsement yet?
          </p>
          <Link href="/get-involved/endorse-nesa-africa/upload">
            <Button
              text="Endorse NESA-Africa 2025"
              variant="outline"
              className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default EndorsementStatusPage;