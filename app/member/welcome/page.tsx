"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useWallet } from '@/lib/hooks/useWallet';
import { CheckCircle, Wallet, Users, Globe, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/Common/Button';
import SkeletonLoader from '@/components/UI/SkeletonLoader';

export default function WelcomePage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { totalBalance, loading: walletLoading } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleGoToDashboard = () => {
    router.push('/member');
  };

  // Get user's full name
  const fullName = user?.fullName || user?.firstName || 'User';
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'User';
  
  // Get chapter info
  const chapterName = user?.chapter?.name || `NESA ${user?.country || 'Online'} Chapter`;
  const chapterLocation = user?.state && user?.country 
    ? `${user.state}, ${user.country}` 
    : user?.country || 'Online';

  // Get preferences
  const language = user?.preferredLanguage || 'EN';
  const languageMap: Record<string, string> = {
    'EN': 'English',
    'FR': 'French',
    'AR': 'Arabic',
    'PT': 'Portuguese'
  };

  if (loading || walletLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <SkeletonLoader className="h-12 w-3/4 mx-auto mb-4" />
            <SkeletonLoader className="h-6 w-1/2 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader className="h-40 w-full rounded-lg" />
              <SkeletonLoader className="h-40 w-full rounded-lg" />
              <SkeletonLoader className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to NESA-Africa, {firstName}! 🎉
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              You're now part of Africa's premier education excellence community
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden mb-8">
            <div className="p-8">
              {/* About NESA */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>About NESA-Africa</span>
                </div>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  The New Education Standard Award (NESA) celebrates and recognizes excellence in African education. 
                  We connect educators, innovators, and change-makers across the continent to drive educational transformation 
                  and create lasting impact in communities.
                </p>
              </div>

              {/* User Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Your Profile</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Name:</span> {fullName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Language:</span> {languageMap[language]}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Account:</span> {user?.accountType || 'Individual'}
                    </p>
                  </div>
                </div>

                {/* Chapter Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Your Chapter</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 font-medium text-center">
                      {chapterName}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{chapterLocation}</span>
                    </div>
                    <p className="text-gray-600 text-center text-xs mt-3">
                      Connect with members in your region and participate in local events
                    </p>
                  </div>
                </div>

                {/* Wallet Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Welcome Bonus</h3>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      {totalBalance || 0} AGC
                    </p>
                    <p className="text-sm text-gray-600">
                      Your signup bonus has been credited to your wallet
                    </p>
                    <div className="mt-3 bg-green-200/50 rounded-lg p-2">
                      <p className="text-xs text-green-800">
                        🎁 Use AGC for voting, nominations, and platform activities
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  What You Can Do Next
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Vote & Nominate</p>
                      <p className="text-gray-600">Support outstanding educators and institutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Join Your Chapter</p>
                      <p className="text-gray-600">Connect with local members and events</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Explore Opportunities</p>
                      <p className="text-gray-600">Apply for scholarships, judging, and volunteering</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Manage Your Wallet</p>
                      <p className="text-gray-600">Track your AGC balance and transactions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button
                  text="Go to Dashboard"
                  variant="filled"
                  size="large"
                  onClick={handleGoToDashboard}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                />
                <p className="text-sm text-gray-500 mt-4">
                  You can access your dashboard anytime to manage your account
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <p>Need help? Contact us at <a href="mailto:support@nesa.africa" className="text-orange-600 hover:text-orange-700 font-medium">support@nesa.africa</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
