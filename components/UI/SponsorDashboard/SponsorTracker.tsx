'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiDownload, FiMail, FiPhone, FiCalendar, FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';

interface SponsorApplication {
  applicationId: string;
  status: 'pending' | 'approved' | 'rejected' | 'payment-pending';
  submittedAt: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  message?: string;
}

export default function SponsorTracker() {
  const [applicationId, setApplicationId] = useState('');
  const [application, setApplication] = useState<SponsorApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/sponsor-application?applicationId=${applicationId}`);
      const result = await response.json();

      if (result.success) {
        setApplication(result.data);
      } else {
        setError(result.error || 'Application not found');
        setApplication(null);
      }
    } catch (err) {
      setError('An error occurred while searching for your application');
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <FiCheck className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FiClock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Sponsorship Application</h2>
        
        {/* Search Form */}
        <div className="mb-8">
          <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700 mb-2">
            Application ID
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              id="applicationId"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="Enter your application ID (e.g., NESA-SPONSOR-12345678)"
              className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <FiSearch className="w-4 h-4 mr-2" />
              )}
              Search
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Application Details */}
        {application && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                <p className="text-gray-600">ID: {application.applicationId}</p>
              </div>
              <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(application.status)}`}>
                <div className="flex items-center">
                  {getStatusIcon(application.status)}
                  <span className="ml-2 capitalize">{application.status.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Application Status</h4>
                <p className="text-gray-600 text-sm">{application.message || 'Your application is being processed.'}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Submitted</h4>
                <p className="text-gray-600 text-sm">
                  {new Date(application.submittedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Payment Status</h4>
              <div className={`p-4 rounded-lg border ${
                application.paymentStatus === 'completed' 
                  ? 'bg-green-50 border-green-200' 
                  : application.paymentStatus === 'failed'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center">
                  {application.paymentStatus === 'completed' && <FiCheck className="w-5 h-5 text-green-500 mr-2" />}
                  {application.paymentStatus === 'failed' && <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />}
                  {application.paymentStatus === 'pending' && <FiClock className="w-5 h-5 text-yellow-500 mr-2" />}
                  <span className="font-medium capitalize">{application.paymentStatus.replace('-', ' ')}</span>
                </div>
                <p className="text-sm mt-1">
                  {application.paymentStatus === 'pending' && 'Payment instructions have been sent to your email.'}
                  {application.paymentStatus === 'completed' && 'Payment received successfully. Thank you for your sponsorship!'}
                  {application.paymentStatus === 'failed' && 'Payment failed. Please contact support for assistance.'}
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-6 mt-6">
              <h4 className="font-medium text-gray-900 mb-4">Next Steps</h4>
              <div className="space-y-3">
                {application.status === 'pending' && (
                  <>
                    <div className="flex items-start">
                      <FiMail className="w-4 h-4 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Check Your Email</p>
                        <p className="text-sm text-gray-600">Payment instructions have been sent to your registered email.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiCalendar className="w-4 h-4 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Complete Payment</p>
                        <p className="text-sm text-gray-600">Payment must be completed within 7 days of application.</p>
                      </div>
                    </div>
                  </>
                )}
                {application.status === 'approved' && (
                  <div className="flex items-start">
                    <FiDownload className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Download Certificate</p>
                      <p className="text-sm text-gray-600">Your sponsorship certificate is ready for download.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 mt-6 flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <FiDownload className="w-4 h-4 mr-2" />
                Download Application Copy
              </button>
              {application.status === 'approved' && (
                <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  <FiDownload className="w-4 h-4 mr-2" />
                  Download Certificate
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Contact Support */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">
            If you have questions about your sponsorship application, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:partnerships@nesa.africa" 
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <FiMail className="w-4 h-4 mr-2" />
              partnerships@nesa.africa
            </a>
            <a 
              href="tel:+234-907-962-1110" 
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <FiPhone className="w-4 h-4 mr-2" />
              +234-907-962-1110
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}