'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useNRCStatus } from '@/lib/hooks/useNRCStatus';
import {
  User,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Users,
  FileText,
  Clock
} from 'lucide-react';

export default function NRCDashboard() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { loading, volunteer, canAccessDashboard } = useNRCStatus();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!canAccessDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            You need to be an approved NRC volunteer to access this dashboard.
          </p>
          <a
            href="/get-involved/nrc-volunteer/apply"
            className="inline-block bg-[#ea580c] hover:bg-[#dc2626] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Apply to Join NRC
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {volunteer?.fullName && volunteer.fullName !== 'Unknown'
                  ? volunteer.fullName
                  : user?.email?.split('@')[0] || 'Volunteer'}!
              </h1>
              <p className="text-gray-600 mt-2">
                NRC Volunteer Dashboard - {volunteer?.country}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Status</div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${volunteer?.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
                }`}>
                {volunteer?.status === 'active' ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Nominees Uploaded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {volunteer?.nomineesUploaded || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Target Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((volunteer?.completionRate || 0) * 100)}%
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Target Nominees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {volunteer?.targetNominees || 200}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Last Active</p>
                <p className="text-sm font-medium text-gray-900">
                  {volunteer?.lastActive
                    ? new Date(volunteer.lastActive).toLocaleDateString()
                    : 'Today'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/get-involved/nrc-volunteer/nominees/add')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ea580c] hover:bg-orange-50 transition-colors text-left"
              >
                <Users className="w-8 h-8 text-[#ea580c] mb-2" />
                <h3 className="font-semibold text-gray-900">Add New Nominee</h3>
                <p className="text-sm text-gray-600">Submit a new education leader nomination</p>
              </button>

              <button
                onClick={() => router.push('/get-involved/nrc-volunteer/nominees')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ea580c] hover:bg-orange-50 transition-colors text-left"
              >
                <FileText className="w-8 h-8 text-[#ea580c] mb-2" />
                <h3 className="font-semibold text-gray-900">View My Nominations</h3>
                <p className="text-sm text-gray-600">Review your submitted nominations</p>
              </button>

              <button
                onClick={() => router.push('/get-involved/nrc-volunteer/leaderboard')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ea580c] hover:bg-orange-50 transition-colors text-left"
              >
                <Award className="w-8 h-8 text-[#ea580c] mb-2" />
                <h3 className="font-semibold text-gray-900">View Leaderboard</h3>
                <p className="text-sm text-gray-600">See top performing volunteers</p>
              </button>

              <button
                onClick={() => router.push('/get-involved/nrc-volunteer/timeline')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ea580c] hover:bg-orange-50 transition-colors text-left"
              >
                <Calendar className="w-8 h-8 text-[#ea580c] mb-2" />
                <h3 className="font-semibold text-gray-900">Program Timeline</h3>
                <p className="text-sm text-gray-600">View important dates and deadlines</p>
              </button>
            </div>
          </motion.div>

          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Summary</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium text-gray-900">
                  {volunteer?.fullName && volunteer.fullName !== 'Unknown'
                    ? volunteer.fullName
                    : user?.email?.split('@')[0] || 'Not provided'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium text-gray-900">{volunteer?.email || user?.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Country</label>
                <p className="font-medium text-gray-900">{volunteer?.country}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Joined Date</label>
                <p className="font-medium text-gray-900">
                  {volunteer?.approvalDate
                    ? new Date(volunteer.approvalDate).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => router.push('/ProfileSetting')}
                className="w-full bg-[#ea580c] hover:bg-[#dc2626] text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}