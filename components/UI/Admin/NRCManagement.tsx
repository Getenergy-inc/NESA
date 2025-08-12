'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  FileText,
  Mail,
  X
} from 'lucide-react';
import Button from '@/components/Common/Button';
import {
  getAllNRCApplications,
  getAllNRCVolunteers,
  reviewNRCApplication,
  type NRCApplication,
  type NRCVolunteer
} from '@/lib/services/mockNRCService';

// Interfaces are now imported from the mock service

const NRCManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'volunteers' | 'applications' | 'progress'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<NRCApplication[]>([]);
  const [volunteers, setVolunteers] = useState<NRCVolunteer[]>([]);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [applicationsResponse, volunteersResponse] = await Promise.all([
        getAllNRCApplications(),
        getAllNRCVolunteers()
      ]);

      if (applicationsResponse.success) {
        setApplications(applicationsResponse.data || []);
      }

      if (volunteersResponse.success) {
        setVolunteers(volunteersResponse.data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showNotification('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleApplicationReview = async (applicationId: string, action: 'approve' | 'reject') => {
    setLoading(true);
    try {
      const response = await reviewNRCApplication(applicationId, action, undefined, 'Admin User');

      if (response.success) {
        showNotification('success', response.message);
        // Reload data to reflect changes
        await loadData();
      } else {
        showNotification('error', response.message);
      }
    } catch (error) {
      console.error('Error reviewing application:', error);
      showNotification('error', `Failed to ${action} application`);
    } finally {
      setLoading(false);
    }
  };

  // Calculate overview stats from real data
  const overviewStats = {
    totalVolunteers: volunteers.length,
    activeVolunteers: volunteers.filter(v => v.status === 'active').length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
    totalNomineesUploaded: volunteers.reduce((sum, v) => sum + v.nomineesUploaded, 0),
    targetNominees: volunteers.length * 200, // 200 per volunteer
    averageCompletionRate: volunteers.length > 0
      ? volunteers.reduce((sum, v) => sum + v.completionRate, 0) / volunteers.length
      : 0
  };

  // Filter data based on search and status
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || volunteer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || application.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Notification component
  const NotificationBanner = () => {
    if (!notification) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 hover:opacity-80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'text-[#ea580c]' }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </motion.div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          title="Total Volunteers"
          value={overviewStats.totalVolunteers}
          subtitle="Active NRC volunteers"
        />
        <StatCard
          icon={UserCheck}
          title="Active Volunteers"
          value={overviewStats.activeVolunteers}
          color="text-green-600"
        />
        <StatCard
          icon={Clock}
          title="Pending Applications"
          value={overviewStats.pendingApplications}
          color="text-yellow-600"
        />
        <StatCard
          icon={FileText}
          title="Nominees Uploaded"
          value={overviewStats.totalNomineesUploaded}
          subtitle={`of ${overviewStats.targetNominees} target`}
        />
        <StatCard
          icon={TrendingUp}
          title="Average Progress"
          value={`${overviewStats.averageCompletionRate}%`}
          color="text-blue-600"
        />
        <StatCard
          icon={Users}
          title="Completion Rate"
          value={`${Math.round((overviewStats.totalNomineesUploaded / overviewStats.targetNominees) * 100)}%`}
          color="text-purple-600"
        />
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] h-4 rounded-full transition-all duration-500"
            style={{ width: `${(overviewStats.totalNomineesUploaded / overviewStats.targetNominees) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-[#ea580c]">
              {overviewStats.totalNomineesUploaded}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">
              {overviewStats.targetNominees - overviewStats.totalNomineesUploaded}
            </div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">
              {overviewStats.activeVolunteers}
            </div>
            <div className="text-sm text-gray-600">Active Volunteers</div>
          </div>
          <div>
            <div className="text-xl font-bold text-yellow-600">
              {Math.round(overviewStats.totalNomineesUploaded / overviewStats.activeVolunteers)}
            </div>
            <div className="text-sm text-gray-600">Avg per Volunteer</div>
          </div>
        </div>
      </div>
    </div>
  );

  const VolunteersTab = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search volunteers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button
              text="Export Data"
              variant="outline"
              className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white flex items-center gap-2"
            />
          </div>
        </div>
      </div>

      {/* Volunteers List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">NRC Volunteers</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea580c] mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading volunteers...</p>
            </div>
          ) : filteredVolunteers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No volunteers found matching your criteria.
            </div>
          ) : (
            filteredVolunteers.map((volunteer) => (
            <div key={volunteer.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{volunteer.fullName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(volunteer.status)}`}>
                      {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{volunteer.email}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{volunteer.country}</span>
                    <span>Approved: {new Date(volunteer.approvalDate).toLocaleDateString()}</span>
                    <span>Last Active: {volunteer.lastActive === 'Never' ? 'Never' : new Date(volunteer.lastActive).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#ea580c]">
                      {volunteer.nomineesUploaded}
                    </div>
                    <div className="text-xs text-gray-600">Nominees</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {volunteer.completionRate}%
                    </div>
                    <div className="text-xs text-gray-600">Progress</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      text="View"
                      variant="outline"
                      className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-3 py-1 text-sm"
                    />
                    <Button
                      text="Contact"
                      variant="filled"
                      className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-3 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const ApplicationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Applications</h3>
        
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea580c] mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.filter(app => app.status === 'pending').length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No pending applications found.
            </div>
          ) : (
            filteredApplications.filter(app => app.status === 'pending').map((application) => (
            <div key={application.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{application.fullName}</h4>
                  <p className="text-sm text-gray-600 mb-2">{application.email} • {application.country}</p>
                  <p className="text-sm text-gray-700 mb-2">{application.motivation.substring(0, 100)}...</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {application.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Applied: {new Date(application.applicationDate).toLocaleDateString()}</p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    text="View Full"
                    variant="outline"
                    className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-3 py-1 text-sm flex items-center gap-1"
                  />
                  <Button
                    text="Approve"
                    onClick={() => handleApplicationReview(application.id, 'approve')}
                    disabled={loading}
                    variant="filled"
                    className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-3 py-1 text-sm flex items-center gap-1"
                  />
                  <Button
                    text="Reject"
                    onClick={() => handleApplicationReview(application.id, 'reject')}
                    disabled={loading}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 px-3 py-1 text-sm flex items-center gap-1"
                  />
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationBanner />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NRC Management</h1>
              <p className="text-gray-600">Manage NRC volunteers, applications, and research progress</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                text="Export Report"
                variant="outline"
                className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white flex items-center gap-2"
              />
              <Button
                text="Send Notification"
                variant="filled"
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center gap-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'volunteers', label: 'Volunteers', icon: Users },
              { id: 'applications', label: 'Applications', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#ea580c] text-[#ea580c]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'volunteers' && <VolunteersTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
      </div>
    </div>
  );
};

export default NRCManagement;
