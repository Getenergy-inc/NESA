"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WalletSummary from '@/components/Layout/Dashboard/WalletSummary';
import ReferralInfo from '@/components/Layout/Dashboard/ReferralInfo';
import VotingOverviewCard from '@/components/Layout/Dashboard/VotingOverviewCard';
import SkeletonLoader from '@/components/UI/SkeletonLoader';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useWallet } from '@/lib/hooks/useWallet';
import { FiCheckCircle } from 'react-icons/fi';
import WalletWidget from '@/components/Wallet/WalletWidget';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { totalBalance, withdrawableBalance, transactions, loading: walletLoading } = useWallet();
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Convert wallet transactions to recent activities
        if (transactions && transactions.length > 0) {
          const activities = transactions.slice(0, 4).map((tx: any) => {
            let type = 'wallet';
            let title = 'Transaction';
            let description = tx.description || tx.reason;

            if (tx.type === 'CREDIT' || tx.type === 'PURCHASE_USER') {
              type = 'wallet';
              title = tx.reason === 'signup_bonus' ? 'Signup Bonus' : 'Wallet Credit';
            } else if (tx.type === 'DEBIT') {
              type = 'wallet';
              title = 'Wallet Debit';
            } else if (tx.type === 'TRANSFER') {
              type = 'wallet';
              title = 'Transfer';
            }

            return {
              type,
              title,
              description,
              date: new Date(tx.createdAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            };
          });
          setRecentActivities(activities);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user, transactions]);

  // Get user's first name from authenticated user data
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'User';
  const greeting = getGreeting();

  // Debug logging to see what user data we have
  useEffect(() => {
    if (user) {
      console.log('User data in dashboard:', {
        firstName: user.firstName,
        fullName: user.fullName,
        name: user.name,
        email: user.email,
        chapter: user.chapter,
        country: user.country,
        state: user.state,
        extractedFirstName: firstName
      });
    }
  }, [user, firstName]);

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
                  <h1 className="text-3xl font-bold text-gray-900">
                    {greeting}, {firstName}! 
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Track your nominations, referrals, and wallet activities
                  </p>
                </div>

              </div>

              {/* Local Chapter Info */}
              <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiCheckCircle className="h-5 w-5 text-purple-600" aria-hidden="true" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-purple-900">
                      Your Local Chapter
                    </h3>
                    <div className="mt-2 text-sm text-purple-800">
                      <p className="font-semibold">
                        {user?.chapter?.name || `NESA ${user?.country || 'Online'} Chapter`}
                      </p>
                      <p className="text-purple-700 mt-1">
                        📍 {user?.state && user?.country 
                          ? `${user.state}, ${user.country}` 
                          : user?.country || 'Online'}
                      </p>
                      {user?.chapter?.memberCount && (
                        <p className="text-purple-600 text-xs mt-1">
                          {user.chapter.memberCount} members
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Wallet Widget - New! */}
        <div className="mb-6">
          {loading || walletLoading ? (
            <SkeletonLoader className="h-48 w-full rounded-lg" />
          ) : (
            <WalletWidget compact={false} showActions={true} />
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
            ) : recentActivities.length > 0 ? (
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
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No recent activity yet</p>
                <p className="text-sm mt-2">Your activity will appear here once you start using the platform</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
