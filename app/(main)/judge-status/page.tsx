'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Mail, 
  FileText, 
  User,
  Calendar,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

// Status types and their configurations
const STATUS_CONFIG = {
  submitted: {
    icon: FileText,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    title: 'Application Submitted',
    description: 'Your application has been received and is in the queue for review.'
  },
  verified: {
    icon: Mail,
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
    title: 'Email Verified',
    description: 'Your email has been verified and application is being processed.'
  },
  under_review: {
    icon: Clock,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600',
    title: 'Under Review',
    description: 'SOBCD + BOT Panel is reviewing your application.'
  },
  approved: {
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
    title: 'Application Approved',
    description: 'Congratulations! Your application has been approved.'
  },
  rejected: {
    icon: AlertTriangle,
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-600',
    title: 'Application Not Approved',
    description: 'Your application was not approved at this time.'
  },
  account_created: {
    icon: User,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    iconColor: 'text-purple-600',
    title: 'Judge Account Created',
    description: 'Your judge account has been created. You can now access the judges dashboard.'
  },
  active: {
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
    title: 'Active Judge',
    description: 'You are now an active NESA-Africa 2025 certified judge.'
  }
};

interface ApplicationStatus {
  email: string;
  full_name: string;
  current_status: keyof typeof STATUS_CONFIG;
  application_type: string;
  submitted_date: string;
  last_updated: string;
  notes?: string;
  next_steps?: string;
}

const JudgeStatusTracker: React.FC = () => {
  const [email, setEmail] = useState('');
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(`/api/judge-apply/status?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.success) {
        setApplicationStatus(data.application);
      } else {
        setError(data.message || 'Application not found');
        setApplicationStatus(null);
      }
    } catch (err) {
      setError('Failed to fetch application status. Please try again.');
      setApplicationStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (email) {
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const statusConfig = applicationStatus ? STATUS_CONFIG[applicationStatus.current_status] : null;
  const StatusIcon = statusConfig?.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link 
            href="/judgeapply"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors mb-4"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Judges Arena
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Judge Application Status</h1>
            <p className="text-gray-600 mt-2">
              Track the progress of your NESA-Africa 2025 judge application
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Check Your Application Status
          </h2>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email used for your application"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
              />
            </div>
            
            <div className="flex gap-2 sm:items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </button>
              
              {applicationStatus && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Message */}
        {searched && !applicationStatus && !error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center"
          >
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Application Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find an application with that email address.
            </p>
            <Link
              href="/judge-application-form"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Submit New Application
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        )}

        {/* Application Status Display */}
        <AnimatePresence>
          {applicationStatus && statusConfig && StatusIcon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-l-4 p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className={`${statusConfig.bgColor} p-3 rounded-full mr-4`}>
                        <StatusIcon className={`w-6 h-6 ${statusConfig.iconColor}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${statusConfig.textColor}`}>
                          {statusConfig.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {statusConfig.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Application Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Applicant:</span>
                          <span className="font-medium">{applicationStatus.full_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{applicationStatus.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">
                            {applicationStatus.application_type?.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Submitted:</span>
                          <span className="font-medium">
                            {new Date(applicationStatus.submitted_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-medium">
                            {new Date(applicationStatus.last_updated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {applicationStatus.notes && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                      <p className="text-gray-700 text-sm">{applicationStatus.notes}</p>
                    </div>
                  )}
                  
                  {applicationStatus.next_steps && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                      <p className="text-blue-800 text-sm">{applicationStatus.next_steps}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {applicationStatus.current_status === 'approved' && (
                  <Link
                    href="/judge-signup"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    Create Judge Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
                
                {applicationStatus.current_status === 'active' && (
                  <Link
                    href="/judge"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    Access Judges Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
                
                <Link
                  href="/judgeapply"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  Back to Judges Arena
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JudgeStatusTracker;
