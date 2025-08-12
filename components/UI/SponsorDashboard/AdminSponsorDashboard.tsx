'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiTrendingUp, FiCalendar, FiMail, FiPhone, FiDownload, FiEye, FiEdit, FiCheck, FiX } from 'react-icons/fi';

// Mock data - in real app, this would come from API
const mockSponsorData = {
  overview: {
    totalSponsors: 24,
    totalRevenue: 1250000,
    pendingApplications: 8,
    approvedSponsors: 16,
    averageContribution: 52083,
    growthRate: 15.3
  },
  recentApplications: [
    {
      id: 'NESA-SPONSOR-12345678',
      company: 'Global Education Foundation',
      contact: 'John Smith',
      email: 'john@globaleducation.org',
      phone: '+1-555-0123',
      amount: 250000,
      tier: 'Africa Blue Garnet',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      notes: 'Interested in title sponsorship with custom branding requirements'
    },
    {
      id: 'NESA-SPONSOR-87654321',
      company: 'Tech for Africa',
      contact: 'Sarah Johnson',
      email: 'sarah@techforafrica.com',
      phone: '+234-901-234-5678',
      amount: 150000,
      tier: 'Gold Garnet',
      status: 'approved',
      submittedAt: '2024-01-14T14:20:00Z',
      notes: 'Focus on EduTech category sponsorship'
    },
    {
      id: 'NESA-SPONSOR-11223344',
      company: 'African Development Bank',
      contact: 'Michael Brown',
      email: 'michael@afdb.org',
      phone: '+225-20-26-39-00',
      amount: 180000,
      tier: 'Diamond Garnet',
      status: 'payment-pending',
      submittedAt: '2024-01-13T09:15:00Z',
      notes: 'Co-sponsorship of 3 major categories requested'
    }
  ],
  tierDistribution: [
    { tier: 'Africa Blue Garnet', count: 1, revenue: 250000 },
    { tier: 'Diamond Garnet', count: 2, revenue: 360000 },
    { tier: 'Gold Garnet', count: 4, revenue: 600000 },
    { tier: 'Silver Garnet', count: 3, revenue: 225000 },
    { tier: 'Category Sponsors', count: 8, revenue: 160000 },
    { tier: 'Media Sponsors', count: 6, revenue: 48000 }
  ]
};

export default function AdminSponsorDashboard() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'payment-pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusUpdate = (applicationId: string, newStatus: string) => {
    // In real app, this would call API to update status
    console.log(`Updating ${applicationId} to ${newStatus}`);
  };

  const filteredApplications = filterStatus === 'all' 
    ? mockSponsorData.recentApplications 
    : mockSponsorData.recentApplications.filter(app => app.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sponsor Management Dashboard</h1>
          <p className="text-gray-600">Manage sponsorship applications and track revenue</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sponsors</p>
                <p className="text-2xl font-bold text-gray-900">{mockSponsorData.overview.totalSponsors}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${mockSponsorData.overview.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-gray-900">{mockSponsorData.overview.pendingApplications}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiCalendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">{mockSponsorData.overview.growthRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FiDownload className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {['all', 'pending', 'approved', 'payment-pending'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y">
                {filteredApplications.map((application, index) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedApplication(application)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{application.company}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                            {application.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{application.contact} • {application.tier}</p>
                        <p className="text-sm text-gray-500">
                          ${application.amount.toLocaleString()} • {new Date(application.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(application.id, 'approved');
                          }}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(application.id, 'rejected');
                          }}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                          <FiEye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier Distribution */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Distribution</h3>
              <div className="space-y-4">
                {mockSponsorData.tierDistribution.map((tier, index) => (
                  <div key={tier.tier} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{tier.tier}</p>
                      <p className="text-sm text-gray-600">{tier.count} sponsors</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${tier.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiMail className="w-4 h-4 mr-3" />
                  Send Bulk Email
                </button>
                <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiDownload className="w-4 h-4 mr-3" />
                  Generate Report
                </button>
                <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiEdit className="w-4 h-4 mr-3" />
                  Update Packages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <p className="text-gray-900">{selectedApplication.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <p className="text-gray-900">{selectedApplication.contact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sponsorship Tier</label>
                    <p className="text-gray-900">{selectedApplication.tier}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <p className="text-gray-900">${selectedApplication.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <p className="text-gray-900">{selectedApplication.notes}</p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}