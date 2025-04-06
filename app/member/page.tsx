// pages/member/index.tsx
import React from 'react';
import MemberLayout from '@/components/Layout/MemberLayout';
import DashboardCard from '@/components/Layout/Dashboard/DashboardCard';
import WalletSummary from '@/components/Layout/Dashboard/WalletSummary';
import ProfileCard from '@/components/Layout/Dashboard/ProfileCard';
import NominationStatus from '@/components/Layout/Dashboard/NominationStatus';
import ReferralInfo from '@/components/Layout/Dashboard/ReferralInfo';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your nominations, referrals, and wallet activities
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <DashboardCard 
              title="Welcome Back" 
              description="Here's what's happening with your account today." 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            />
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <WalletSummary />
              <ReferralInfo />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ProfileCard />
            <NominationStatus />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-500 text-center py-8">
              Activity feed will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}