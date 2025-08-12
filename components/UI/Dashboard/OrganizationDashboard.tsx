"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import {
  Building2,
  Users,
  Award,
  DollarSign,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Target,
  BarChart3,
  Calendar,
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

const OrganizationDashboard: React.FC = () => {
  const { user } = useAuthContext();

  // Mock data - replace with real API calls
  const dashboardData = {
    verificationStatus: "verified", // "pending", "verified", "rejected"
    teamMembers: 12,
    nominationsSubmitted: 8,
    sponsorshipBudget: 50000,
    activePrograms: 3,
    recentNominations: [
      { id: 1, nominee: "Sarah Johnson", category: "Outstanding Teacher", status: "pending" },
      { id: 2, nominee: "Michael Chen", category: "Innovation Award", status: "approved" },
      { id: 3, nominee: "Dr. Amara Okafor", category: "Leadership Excellence", status: "under_review" }
    ],
    sponsorshipOpportunities: [
      { id: 1, title: "Education Innovation Fund", amount: "$25,000", deadline: "Jan 15, 2025" },
      { id: 2, title: "Rural School Development", amount: "$15,000", deadline: "Feb 1, 2025" }
    ],
    analytics: {
      nominationSuccess: 85,
      communityImpact: 1250,
      programReach: 5000
    }
  };

  const quickActions: QuickAction[] = [
    {
      title: "Bulk Nominations",
      description: "Submit multiple nominations efficiently",
      icon: Award,
      color: "blue" as const,
      href: "/nominations/bulk"
    },
    {
      title: "Team Management",
      description: "Manage organization members and roles",
      icon: Users,
      color: "green" as const,
      href: "/team"
    },
    {
      title: "Sponsorship Hub",
      description: "Explore CSR and sponsorship opportunities",
      icon: DollarSign,
      color: "yellow" as const,
      href: "/sponsorship"
    },
    {
      title: "Analytics & Reports",
      description: "View impact metrics and generate reports",
      icon: BarChart3,
      color: "purple" as const,
      href: "/analytics"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return CheckCircle;
      case "pending": 
      case "under_review": return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title={`${user?.organizationName || user?.name || 'Organization'} Dashboard`}
        subtitle="Manage your organization's NESA-Africa activities"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Status Banner */}
        {dashboardData.verificationStatus !== "verified" && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Organization Verification {dashboardData.verificationStatus === "pending" ? "Pending" : "Required"}
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Complete your organization verification to unlock all features.
                </p>
              </div>
              <button className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                Complete Verification
              </button>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Team Members"
            value={dashboardData.teamMembers}
            icon={Users}
            color="blue"
            description="Active members"
          />
          <DashboardCard
            title="Nominations"
            value={dashboardData.nominationsSubmitted}
            icon={Award}
            color="green"
            description="This year"
          />
          <DashboardCard
            title="Sponsorship Budget"
            value={`$${dashboardData.sponsorshipBudget.toLocaleString()}`}
            icon={DollarSign}
            color="yellow"
            description="Available for CSR"
          />
          <DashboardCard
            title="Active Programs"
            value={dashboardData.activePrograms}
            icon={Target}
            color="purple"
            description="Running initiatives"
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
          {/* Recent Nominations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Nominations</h3>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.recentNominations.map((nomination) => {
                  const StatusIcon = getStatusIcon(nomination.status);
                  return (
                    <div key={nomination.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{nomination.nominee}</p>
                          <p className="text-xs text-gray-500">{nomination.category}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nomination.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{nomination.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Analytics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Analytics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nomination Success Rate</span>
                  <span className="text-sm font-semibold text-green-600">{dashboardData.analytics.nominationSuccess}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Community Impact</span>
                  <span className="text-sm font-semibold text-blue-600">{dashboardData.analytics.communityImpact.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Program Reach</span>
                  <span className="text-sm font-semibold text-purple-600">{dashboardData.analytics.programReach.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                View Detailed Analytics
              </button>
            </div>

            {/* Sponsorship Opportunities */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Sponsorship Opportunities</h3>
              </div>
              <div className="space-y-3">
                {dashboardData.sponsorshipOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-gray-900">{opportunity.title}</p>
                    <p className="text-sm text-yellow-700">{opportunity.amount}</p>
                    <p className="text-xs text-gray-500">Deadline: {opportunity.deadline}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium">
                Explore All Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
