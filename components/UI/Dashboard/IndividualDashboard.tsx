"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import {
  Vote,
  GraduationCap,
  Calendar,
  Users,
  Wallet,
  User,
  MapPin,
  TrendingUp,
  Award,
  Bell,
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

const IndividualDashboard: React.FC = () => {
  const { user } = useAuthContext();

  // Mock data - replace with real API calls
  const dashboardData = {
    agcBalance: 15,
    votesUsed: 3,
    nominationsSubmitted: 1,
    chapterName: "NESA Online Chapter – Nigeria (Lagos)",
    chapterMembers: 247,
    recentActivities: [
      { id: 1, action: "Voted for Outstanding Teacher Award", date: "2 hours ago" },
      { id: 2, action: "Nominated John Doe for Innovation Award", date: "1 day ago" },
      { id: 3, action: "Joined webinar: Future of Education", date: "3 days ago" }
    ],
    upcomingEvents: [
      { id: 1, title: "Education Innovation Summit", date: "Dec 15, 2024" },
      { id: 2, title: "Local Chapter Meetup", date: "Dec 20, 2024" }
    ]
  };

  const quickActions: QuickAction[] = [
    {
      title: "Vote & Nominate",
      description: "Participate in voting and submit nominations",
      icon: Vote,
      color: "blue" as const,
      href: "/vote"
    },
    {
      title: "Apply for Scholarship",
      description: "Browse and apply for educational scholarships",
      icon: GraduationCap,
      color: "green" as const,
      href: "/scholarships"
    },
    {
      title: "Join Events",
      description: "Attend webinars and community events",
      icon: Calendar,
      color: "purple" as const,
      href: "/events"
    },
    {
      title: "Chapter Activities",
      description: "Connect with your local chapter",
      icon: Users,
      color: "orange" as const,
      href: "/chapter"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title={`Welcome back, ${user?.fullName || user?.name || 'User'}!`}
        subtitle="Your NESA-Africa Individual Dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="AGC Balance"
            value={dashboardData.agcBalance}
            suffix=" AGC"
            icon={Wallet}
            color="orange"
            description="Available for voting"
          />
          <DashboardCard
            title="Votes Used"
            value={dashboardData.votesUsed}
            icon={Vote}
            color="blue"
            description="This month"
          />
          <DashboardCard
            title="Nominations"
            value={dashboardData.nominationsSubmitted}
            icon={Award}
            color="green"
            description="Submitted"
          />
          <DashboardCard
            title="Chapter Members"
            value={dashboardData.chapterMembers}
            icon={Users}
            color="purple"
            description="In your chapter"
          />
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
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
                View all activities →
              </button>
            </div>
          </div>

          {/* Chapter Info & Upcoming Events */}
          <div className="space-y-6">
            {/* Chapter Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Your Chapter</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">{dashboardData.chapterName}</p>
                <p className="text-sm text-gray-600">{dashboardData.chapterMembers} members</p>
                <button className="w-full mt-3 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                  Join Chapter Group
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              </div>
              <div className="space-y-3">
                {dashboardData.upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                View All Events
              </button>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
                <p className="text-sm text-gray-600">Add more information to unlock additional features</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">75%</p>
                  <p className="text-xs text-gray-500">Complete</p>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                  Complete Profile
                </button>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;
