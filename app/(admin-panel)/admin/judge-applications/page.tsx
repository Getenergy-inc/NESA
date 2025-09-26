"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiMail, FiCheck, FiX, FiClock, FiUser, FiRefreshCw } from 'react-icons/fi';

interface JudgeApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  state: string;
  education: string;
  experience: string;
  motivation: string;
  status: 'submitted' | 'verified' | 'approved' | 'rejected';
  verified: boolean;
  created_at: string;
  updated_at: string;
}

const JudgeApplicationsAdmin: React.FC = () => {
  const [applications, setApplications] = useState<JudgeApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JudgeApplication | null>(null);
  const [filter, setFilter] = useState<'all' | 'submitted' | 'verified' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // In production, this would be a real API call
      // For now, we'll simulate with mock data
      const mockApplications: JudgeApplication[] = [
        {
          id: '1',
          full_name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@university.edu',
          phone: '+234 123 456 7890',
          state: 'Lagos',
          education: 'PhD in Educational Psychology, University of Lagos',
          experience: '15+ years in educational research and curriculum development',
          motivation: 'Passionate about advancing educational excellence across Africa',
          status: 'approved',
          verified: true,
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-15T11:45:00Z'
        },
        {
          id: '2',
          full_name: 'Prof. Michael Adebayo',
          email: 'michael.adebayo@gmail.com',
          phone: '+234 987 654 3210',
          state: 'Abuja',
          education: 'Masters in Education Administration, University of Abuja',
          experience: '12 years in educational leadership and policy development',
          motivation: 'Committed to improving educational standards and accessibility',
          status: 'verified',
          verified: true,
          created_at: '2024-01-16T14:20:00Z',
          updated_at: '2024-01-16T14:20:00Z'
        },
        {
          id: '3',
          full_name: 'Dr. Amina Hassan',
          email: 'amina.hassan@outlook.com',
          phone: '+234 555 123 4567',
          state: 'Kano',
          education: 'PhD in Curriculum Studies, Ahmadu Bello University',
          experience: '10 years in teacher training and educational assessment',
          motivation: 'Dedicated to promoting quality education in Northern Nigeria',
          status: 'submitted',
          verified: false,
          created_at: '2024-01-17T09:15:00Z',
          updated_at: '2024-01-17T09:15:00Z'
        }
      ];
      
      setApplications(mockApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <FiClock className="w-4 h-4" />;
      case 'verified': return <FiMail className="w-4 h-4" />;
      case 'approved': return <FiCheck className="w-4 h-4" />;
      case 'rejected': return <FiX className="w-4 h-4" />;
      default: return <FiUser className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const stats = {
    total: applications.length,
    submitted: applications.filter(app => app.status === 'submitted').length,
    verified: applications.filter(app => app.status === 'verified').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Judge Applications</h1>
              <p className="text-gray-600 mt-2">Manage and review judge applications for NESA Awards 2025</p>
            </div>
            <button
              onClick={fetchApplications}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">{stats.submitted}</div>
              <div className="text-sm text-gray-600">Submitted</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['all', 'submitted', 'verified', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <motion.tr
                    key={application.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.full_name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {application.education}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.email}</div>
                      <div className="text-sm text-gray-500">{application.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-orange-600 hover:text-orange-900 flex items-center gap-1"
                      >
                        <FiEye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">No applications match the current filter.</p>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] overflow-y-auto"
          style={{ margin: 0, padding: 0 }}
          onClick={() => setSelectedApplication(null)}
        >
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto max-h-[calc(100vh-4rem)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedApplication.full_name}</h2>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">State/Region</label>
                  <p className="text-gray-900">{selectedApplication.state}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Educational Background</label>
                  <p className="text-gray-900">{selectedApplication.education}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-gray-900">{selectedApplication.experience}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Motivation Statement</label>
                  <p className="text-gray-900">{selectedApplication.motivation}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Applied</label>
                    <p className="text-gray-900">{new Date(selectedApplication.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="text-gray-900">{new Date(selectedApplication.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="w-full sm:w-auto px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  {selectedApplication.status === 'submitted' && (
                    <button className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                      Approve Application
                    </button>
                  )}
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgeApplicationsAdmin;
