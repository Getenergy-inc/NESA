"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import {
  Users,
  Wallet,
  Award,
  TrendingUp,
  UserPlus,
  BookOpen,
  Target,
  Calendar,
  Star,
  Gift,
  MapPin,
  BarChart3,
  LucideIcon
} from 'lucide-react';
import DashboardHeader from './components/DashboardHeader';
import DashboardCard from './components/DashboardCard';
import QuickActionCard from './components/QuickActionCard';

// Define the type for quick actions to ensure type safety
interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  href: string;
}

const AmbassadorDashboard: React.FC = () => {
  const { user } = useAuthContext();

  // Mock data - replace with real API calls
  const dashboardData = {
    agcBalance: 125,
    referralsCount: 23,
    commissionsEarned: 850,
    chapterMembers: 156,
    certificationProgress: 75,
    monthlyTarget: 30,
    currentMonthReferrals: 18,
    recentReferrals: [
      { id: 1, name: "Alice Johnson", type: "Individual", date: "2 days ago", status: "verified", commission: 25 },
      { id: 2, name: "Tech Solutions Ltd", type: "Organization", date: "5 days ago", status: "pending", commission: 50 },
      { id: 3, name: "David Wilson", type: "Individual", date: "1 week ago", status: "verified", commission: 25 }
    ],
    upcomingTraining: [
      { id: 1, title: "Advanced Leadership Skills", date: "Dec 20, 2024", type: "webinar" },
      { id: 2, title: "Community Engagement Strategies", date: "Jan 5, 2025", type: "workshop" }
    ],
    chapterInfo: {
      name: "NESA Lagos Central Chapter",
      role: "Chapter Leader",
      events: 3
    }
  };

  const quickActions: QuickAction[] = [
    {
      title: "Referral Tracking",
      description: "Monitor your referrals and commissions",
      icon: UserPlus,
      color: "blue" as const,
      href: "/ambassador/referrals"
    },
    {
      title: "Chapter Management",
      description: "Manage your chapter activities and members",
      icon: Users,
      color: "green" as const,
      href: "/ambassador/chapter"
    },
    {
      title: "Training Center",
      description: "Access training materials and certifications",
      icon: BookOpen,
      color: "purple" as const,
      href: "/ambassador/training"
    },
    {
      title: "Performance Analytics",
      description: "View detailed performance metrics",
      icon: BarChart3,
      color: "orange" as const,
      href: "/ambassador/analytics"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "rejected": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title={`Welcome, Ambassador ${user?.fullName || user?.name || 'User'}!`}
        subtitle="Your NESA-Africa Ambassador Dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="AGC Balance"
            value={dashboardData.agcBalance}
            suffix=" AGC"
            icon={Wallet}
            color="orange"
            description="Total earned"
          />
          <DashboardCard
            title="Total Referrals"
            value={dashboardData.referralsCount}
            icon={UserPlus}
            color="blue"
            description="All time"
          />
          <DashboardCard
            title="Commissions"
            value={`$${dashboardData.commissionsEarned}`}
            icon={TrendingUp}
            color="green"
            description="This year"
          />
          <DashboardCard
            title="Chapter Members"
            value={dashboardData.chapterMembers}
            icon={Users}
            color="purple"
            description="Under your leadership"
          />
        </div>

        {/* Monthly Progress */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Monthly Target Progress</h3>
                <p className="text-sm text-gray-600">Referrals this month: {dashboardData.currentMonthReferrals} / {dashboardData.monthlyTarget}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((dashboardData.currentMonthReferrals / dashboardData.monthlyTarget) * 100)}%
                </p>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((dashboardData.currentMonthReferrals / dashboardData.monthlyTarget) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {dashboardData.monthlyTarget - dashboardData.currentMonthReferrals} more referrals to reach your monthly target
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Referrals */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Referrals</h3>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{referral.name}</p>
                        <p className="text-xs text-gray-500">{referral.type} • {referral.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-green-600">+${referral.commission}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chapter Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Your Chapter</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{dashboardData.chapterInfo.name}</p>
                  <p className="text-sm text-purple-600">{dashboardData.chapterInfo.role}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Upcoming Events</span>
                  <span className="font-semibold text-gray-900">{dashboardData.chapterInfo.events}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                Manage Chapter
              </button>
            </div>

            {/* Certification Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Certification</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-yellow-600">{dashboardData.certificationProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${dashboardData.certificationProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">Complete training modules to earn certification</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium">
                Continue Training
              </button>
            </div>

            {/* Upcoming Training */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Training</h3>
              </div>
              <div className="space-y-3">
                {dashboardData.upcomingTraining.map((training) => (
                  <div key={training.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-gray-900">{training.title}</p>
                    <p className="text-xs text-green-700 capitalize">{training.type}</p>
                    <p className="text-xs text-gray-500">{training.date}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                View Training Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorDashboard;
