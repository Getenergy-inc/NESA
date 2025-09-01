"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  ArrowRight,
  Copy,
  Share2
} from 'lucide-react';
import Button from '@/components/Common/Button';

interface EndorsementData {
  id: string;
  organization_name: string;
  email: string;
  status: string;
  verification_token: string;
  created_at: string;
  endorsement_type: string;
  endorsement_tier?: string;
}

const EndorsementSuccessPage = () => {
  const searchParams = useSearchParams();
  const endorsementId = searchParams?.get('id') ?? null;
  const [endorsementData, setEndorsementData] = useState<EndorsementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (endorsementId) {
      fetchEndorsementData();
    }
  }, [endorsementId]);

  const fetchEndorsementData = async () => {
    try {
      // In a real implementation, you'd fetch by ID
      // For now, we'll create mock data
      const mockData: EndorsementData = {
        id: endorsementId || 'mock-id',
        organization_name: 'Sample Organization',
        email: 'contact@example.org',
        status: 'pending_review',
        verification_token: 'mock-token',
        created_at: new Date().toISOString(),
        endorsement_type: 'paid',
        endorsement_tier: 'silver'
      };
      
      setEndorsementData(mockData);
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

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/get-involved/endorse-nesa-africa')}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent('We proudly endorse NESA-Africa 2025 — Africa\'s leading education transformation movement.')}&url=${encodeURIComponent(window.location.origin + '/get-involved/endorse-nesa-africa')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/get-involved/endorse-nesa-africa')}`
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!endorsementData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Endorsement Not Found</h1>
          <p className="text-gray-600 mb-6">The endorsement you're looking for could not be found.</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thank You for Your Endorsement!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your endorsement has been successfully submitted and is now under review. 
            You'll receive a confirmation email shortly.
          </p>
        </motion.div>

        {/* Endorsement Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Endorsement Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endorsement ID
              </label>
              <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                {endorsementData.id}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Pending Review
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Submission Date
              </label>
              <p className="text-gray-900">
                {new Date(endorsementData.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endorsement Type
              </label>
              <p className="text-gray-900 capitalize">
                {endorsementData.endorsement_type === 'paid' 
                  ? `Paid Endorsement (${endorsementData.endorsement_tier})` 
                  : 'Free Endorsement'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#ea580c] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Verification</h3>
                <p className="text-gray-600">
                  Check your email for a verification link. Click it to verify your email address.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#ea580c] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Review Process</h3>
                <p className="text-gray-600">
                  Our team will review your endorsement within 24-72 hours. You'll receive an email update on the status.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#ea580c] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Approval & Certificate</h3>
                <p className="text-gray-600">
                  Once approved, you'll receive your digital certificate and endorsement badge for your website.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#ea580c] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Public Display</h3>
                <p className="text-gray-600">
                  Your endorsement will appear on our Wall of Endorsers and may be featured in NESA TV and newsletters.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Support</h2>
          <p className="text-gray-600 mb-6">
            Let your network know about your endorsement of NESA-Africa 2025.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            
            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Facebook</span>
            </a>

            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Twitter</span>
            </a>

            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/get-involved/endorse-nesa-africa/showcase">
            <Button
              text="View All Endorsers"
              variant="filled"
              size="large"
              className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4"
              icon={<ArrowRight className="w-5 h-5" />}
            />
          </Link>
          
          <Link href="/get-involved/sponsor">
            <Button
              text="Become a Sponsor"
              variant="outline"
              size="large"
              className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-8 py-4"
            />
          </Link>
          
          <Link href="/">
            <Button
              text="Back to Home"
              variant="outline"
              size="large"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4"
            />
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12 text-gray-600"
        >
          <p className="mb-2">
            Questions about your endorsement? Contact us:
          </p>
          <p>
            Email: <a href="mailto:endorse@nesa.africa" className="text-[#ea580c] hover:underline">endorse@nesa.africa</a> | 
            Phone: <a href="tel:+2349079621110" className="text-[#ea580c] hover:underline">+234-907-962-1110</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EndorsementSuccessPage;
