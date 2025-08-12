"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WalletSummary from '@/components/Layout/Dashboard/WalletSummary';
import ReferralInfo from '@/components/Layout/Dashboard/ReferralInfo';
import VotingOverviewCard from '@/components/Layout/Dashboard/VotingOverviewCard';
import SkeletonLoader from '@/components/UI/SkeletonLoader';
import { useAuthContext } from '@/lib/context/AuthContext';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

const recentActivities = [
  {
    type: 'wallet',
    title: 'Wallet Top-up',
    description: 'You funded your wallet with ₦5,000',
    date: 'April 6, 2025 at 3:45 PM',
  },
  {
    type: 'referral',
    title: 'New Referral Bonus',
    description: 'You earned ₦1,000 from John Doe signup',
    date: 'April 5, 2025 at 11:20 AM',
  },
  {
    type: 'voting',
    title: 'New Nomination',
    description: 'You nominated Jane Smith for "Community Leader"',
    date: 'April 3, 2025 at 4:05 PM',
  },
  {
    type: 'wallet',
    title: 'Withdrawal Processed',
    description: '₦2,000 was withdrawn to your bank account',
    date: 'April 1, 2025 at 10:00 AM',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState({
    emailVerified: false,
    kycCompleted: false,
  });

  useEffect(() => {
    // Simulate API call to get verification status
    const fetchVerificationStatus = async () => {
      try {
        // In a real app, you would fetch this from your backend:
        // const response = await fetch(`/api/users/${user.id}/verification-status`);
        // const status = await response.json();
        
        // Mock response for demonstration
        const mockStatus = {
          emailVerified: user?.emailVerified || false,
          kycCompleted: user?.KYC || false,
        };
        
        setVerificationStatus(mockStatus);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch verification status:', error);
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchVerificationStatus, 2000);
    return () => clearTimeout(timer);
  }, [user]);

  const needsAttention = !verificationStatus.emailVerified || !verificationStatus.kycCompleted;

  const handleCompleteVerification = (type: 'email' | 'kyc') => {
    if (type === 'email') {
      router.push('/account/verify-email');
    } else {
      router.push('/account/complete-kyc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section with Notification */}
        <div className="mb-10">
          {loading ? (
            <>
              <SkeletonLoader className="h-8 w-1/2 mb-2" />
              <SkeletonLoader className="h-4 w-1/3" />
            </>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome {user?.fullName || 'User'},</h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Track your nominations, referrals, and wallet activities
                  </p>
                </div>
                {needsAttention && showNotification && (
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Dismiss notification"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Verification Notification */}
              {showNotification && needsAttention && (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiAlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Account verification needed
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {!verificationStatus.emailVerified && (
                            <li>
                              <button
                                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded"
                                onClick={() => handleCompleteVerification('email')}
                              >
                                Verify your email address
                              </button>
                            </li>
                          )}
                          {!verificationStatus.kycCompleted && (
                            <li>
                              <button
                                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded"
                                onClick={() => handleCompleteVerification('kyc')}
                              >
                                Complete KYC verification
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success notification when all verified */}
              {!needsAttention && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Account fully verified
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>You have full access to all platform features.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Voting Overview */}
        <div className="mb-12">
          {loading ? (
            <SkeletonLoader className="h-40 w-full rounded-lg" />
          ) : (
            <VotingOverviewCard />
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {loading ? (
            <>
              <SkeletonLoader className="h-32 w-full rounded-lg" />
              <SkeletonLoader className="h-32 w-full rounded-lg" />
            </>
          ) : (
            <>
              <WalletSummary />
              <ReferralInfo />
            </>
          )}
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {loading ? <SkeletonLoader className="h-6 w-1/4" /> : 'Recent Activity'}
          </h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="space-y-2">
                      <SkeletonLoader className="h-4 w-3/4" />
                      <SkeletonLoader className="h-4 w-1/2" />
                      <SkeletonLoader className="h-3 w-1/3" />
                    </div>
                  ))}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{activity.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}