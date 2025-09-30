"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Share2, Copy } from 'lucide-react';
import Link from 'next/link';

interface EndorsementData {
  id: string;
  organization_name: string;
  email: string;
  status: 'pending_review' | 'pending_approval' | 'approved' | 'rejected';
  created_at: string;
  endorsement_type: string;
  endorsement_tier?: string;
}

const EndorsementSuccessPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const email = searchParams.get('email');
  const [endorsementData, setEndorsementData] = useState<EndorsementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id || email) {
      fetchEndorsementData();
    }
  }, [id, email]);

  const fetchEndorsementData = async () => {
    try {
      // Prioritize fetching by ID if available, otherwise fall back to email.
      const fetchIdentifier = id ? `id=${id}` : `email=${encodeURIComponent(email!)}`;
      const response = await fetch(`/api/endorse/submit?${fetchIdentifier}`);

      if (!id && !email) {
        throw new Error("No identifier (ID or email) found in URL.");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch endorsement data.');
      }
      setEndorsementData(data.endorsement);
    } catch (error) {
      console.error('Error fetching endorsement data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const endorsementUrl = `${window.location.origin}/get-involved/endorse-nesa-africa/showcase`;
    navigator.clipboard.writeText(endorsementUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Submission Received!</h1>
          <p className="mt-2 text-lg text-gray-600">Thank you for endorsing NESA-Africa 2025. Your support is vital.</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What Happens Next?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0"><span className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white font-bold text-sm">1</span></div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email Verification</h3>
                <p className="text-gray-600">We've sent a verification link to your email. Please click it to confirm your submission. This link is valid for 24 hours.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0"><span className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white font-bold text-sm">2</span></div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Review Process</h3>
                <p className="text-gray-600">Once verified, our team will review your endorsement. We'll notify you upon approval.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0"><span className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white font-bold text-sm">3</span></div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Public Showcase</h3>
                <p className="text-gray-600">Approved endorsements will be featured in our official showcase. Thank you for being a part of this movement!</p>
              </div>
            </li>
          </ul>
        </div>

        {loading ? (
          <div className="mt-8 text-center text-gray-500">Loading submission details...</div>
        ) : endorsementData ? (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Submission Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-50 p-6 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <p className="text-gray-900 font-semibold">{endorsementData.organization_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{endorsementData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 capitalize">
                  Pending Review
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endorsement Type</label>
                <p className="text-gray-900 capitalize">
                  {endorsementData.endorsement_type === 'paid' 
                    ? `Paid Endorsement (${endorsementData.endorsement_tier || 'N/A'})` 
                    : 'Free Endorsement'
                  }
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Share Your Support!</h3>
          <p className="mt-1 text-gray-600">Encourage others to join the movement.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/get-involved/endorse-nesa-africa`}
                className="w-full sm:w-80 bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700"
              />
              <button onClick={handleCopyLink} className="absolute inset-y-0 right-0 flex items-center pr-3">
                {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            <Link href={`https://twitter.com/intent/tweet?text=I've%20just%20endorsed%20NESA-Africa%202025!%20Join%20me%20in%20supporting%20this%20continental%20movement%20for%20educational%20excellence.%20%23NESA2025%20%23EduExcellence&url=${typeof window !== 'undefined' ? window.location.origin : ''}/get-involved/endorse-nesa-africa`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600">
              <Share2 className="h-5 w-5" /> Share on X
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default EndorsementSuccessPage;