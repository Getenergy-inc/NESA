'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import NomineeForm from './forms/NomineeForm';
import {
  Users,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  FileText,
  Calendar,
  Award,
  ArrowLeft,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  MapPin,
  Star,
  ArrowUpDown,
  Grid3X3,
  List,
  Download,
  Trash2,
  Send,
  ChevronDown,
  Eye,
  Edit
} from 'lucide-react';
import Button from '@/components/Common/Button';
import { useNRCStatus } from '@/lib/hooks/useNRCStatus';
import { getVolunteerNominees, type NomineeProfile } from '@/lib/services/mockNRCService';
import NomineeUploadForm from './NomineeUploadForm';

interface Nominee {
  id: string;
  name: string;
  category: string;
  country: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  dateCreated: string;
  completionScore: number;
}

const NRCDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'nominees' | 'upload'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedNominees, setSelectedNominees] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [nominees, setNominees] = useState<NomineeProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNomineeForm, setShowNomineeForm] = useState(false);

  const { volunteer, loading: statusLoading } = useNRCStatus();

  // Load nominees data
  useEffect(() => {
    if (volunteer?.id) {
      loadNominees();
    }
  }, [volunteer?.id]);

  const loadNominees = async () => {
    if (!volunteer?.id) return;

    setLoading(true);
    try {
      const response = await getVolunteerNominees(volunteer.id);
      if (response.success) {
        setNominees(response.data || []);
      }
    } catch (error) {
      console.error('Error loading nominees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate enhanced dashboard stats from real data
  const dashboardStats = useMemo(() => {
    const total = nominees.length;
    const target = volunteer?.targetNominees || 200;
    const approved = nominees.filter(n => n.status === 'approved').length;
    const pending = nominees.filter(n => n.status === 'submitted').length;
    const drafts = nominees.filter(n => n.status === 'draft').length;
    const rejected = nominees.filter(n => n.status === 'rejected').length;

    // Calculate completion rate based on actual progress
    const completionRate = target > 0 ? Math.round((total / target) * 100) : 0;

    // Calculate weekly progress (mock data for demonstration)
    const weeklyProgress = [
      { week: 'Week 1', nominees: Math.floor(total * 0.1) },
      { week: 'Week 2', nominees: Math.floor(total * 0.25) },
      { week: 'Week 3', nominees: Math.floor(total * 0.45) },
      { week: 'Week 4', nominees: Math.floor(total * 0.70) },
      { week: 'Week 5', nominees: total }
    ];

    // Category distribution
    const categoryStats = nominees.reduce((acc, nominee) => {
      const category = nominee.awardCategory || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Country distribution
    const countryStats = nominees.reduce((acc, nominee) => {
      const country = nominee.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalNominees: total,
      targetNominees: target,
      approvedNominees: approved,
      pendingReview: pending,
      draftNominees: drafts,
      rejectedNominees: rejected,
      daysRemaining: Math.max(0, Math.ceil((new Date('2025-08-20').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))),
      completionRate,
      weeklyProgress,
      categoryStats,
      countryStats,
      averageCompletionScore: nominees.length > 0 ? Math.round(nominees.reduce((sum, n) => sum + n.completionScore, 0) / nominees.length) : 0,
      productivity: total > 0 ? Math.round(total / Math.max(1, Math.ceil((new Date().getTime() - new Date(volunteer?.approvalDate || new Date()).getTime()) / (1000 * 60 * 60 * 24 * 7)))) : 0
    };
  }, [nominees, volunteer]);

  // Get recent nominees (last 5)
  const recentNominees = nominees
    .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
    .slice(0, 5);

  // Enhanced filtering and sorting logic
  const filteredAndSortedNominees = useMemo(() => {
    let filtered = nominees.filter(nominee => {
      const matchesSearch = nominee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           nominee.awardCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           nominee.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (nominee.organizationName && nominee.organizationName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = filterStatus === 'all' || nominee.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || nominee.awardCategory === filterCategory;
      const matchesCountry = filterCountry === 'all' || nominee.country === filterCountry;

      return matchesSearch && matchesStatus && matchesCategory && matchesCountry;
    });

    // Sort nominees
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'date':
          comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'score':
          comparison = a.completionScore - b.completionScore;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [nominees, searchQuery, filterStatus, filterCategory, filterCountry, sortBy, sortOrder]);

  // Get unique values for filter dropdowns
  const uniqueCategories = useMemo(() =>
    [...new Set(nominees.map(n => n.awardCategory))].sort(), [nominees]);

  const uniqueCountries = useMemo(() =>
    [...new Set(nominees.map(n => n.country))].sort(), [nominees]);

  // Bulk operations
  const handleSelectAll = () => {
    if (selectedNominees.length === filteredAndSortedNominees.length) {
      setSelectedNominees([]);
    } else {
      setSelectedNominees(filteredAndSortedNominees.map(n => n.id));
    }
  };

  const handleSelectNominee = (nomineeId: string) => {
    setSelectedNominees(prev =>
      prev.includes(nomineeId)
        ? prev.filter(id => id !== nomineeId)
        : [...prev, nomineeId]
    );
  };

  const handleBulkAction = (action: 'delete' | 'export' | 'submit') => {
    // Implementation would depend on backend API
    console.log(`Bulk ${action} for nominees:`, selectedNominees);
    // Reset selection after action
    setSelectedNominees([]);
  };

  // Handle nominee form actions
  const handleStartNewNomination = () => {
    setShowNomineeForm(true);
  };

  const handleBackFromNomineeForm = () => {
    setShowNomineeForm(false);
  };

  const handleSaveNominee = (nomineeData: any) => {
    console.log('Saving nominee:', nomineeData);
    // Here you would typically save to the backend
    // For now, we'll just close the form and refresh the nominees list
    setShowNomineeForm(false);
    // Optionally refresh the nominees list
    loadNominees();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'text-[#ea580c]', trend }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
    trend?: { value: number; isPositive: boolean };
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} />
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </motion.div>
  );

  // Progress Chart Component
  const ProgressChart = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-[#ea580c]" />
        Weekly Progress
      </h3>
      <div className="space-y-3">
        {dashboardStats.weeklyProgress.map((week, index) => (
          <div key={week.week} className="flex items-center">
            <div className="w-16 text-sm text-gray-600">{week.week}</div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(week.nominees / dashboardStats.targetNominees) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] h-2 rounded-full"
                />
              </div>
            </div>
            <div className="w-12 text-sm text-gray-900 font-medium text-right">
              {week.nominees}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Category Distribution Chart
  const CategoryChart = () => {
    const categories = Object.entries(dashboardStats.categoryStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const maxCount = Math.max(...categories.map(([,count]) => count), 1);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-[#ea580c]" />
          Top Categories
        </h3>
        <div className="space-y-3">
          {categories.length > 0 ? categories.map(([category, count], index) => (
            <div key={category} className="flex items-center">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 truncate">{category}</span>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-4">
              No category data available yet
            </div>
          )}
        </div>
      </div>
    );
  };

  // Country Distribution Chart
  const CountryChart = () => {
    const countries = Object.entries(dashboardStats.countryStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const maxCount = Math.max(...countries.map(([,count]) => count), 1);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#ea580c]" />
          Top Countries
        </h3>
        <div className="space-y-3">
          {countries.length > 0 ? countries.map(([country, count], index) => (
            <div key={country} className="flex items-center">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 truncate">{country}</span>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-4">
              No country data available yet
            </div>
          )}
        </div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Nominees"
          value={dashboardStats.totalNominees}
          subtitle={`of ${dashboardStats.targetNominees} target`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          icon={CheckCircle}
          title="Approved"
          value={dashboardStats.approvedNominees}
          color="text-green-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          icon={Clock}
          title="Pending Review"
          value={dashboardStats.pendingReview}
          color="text-blue-600"
        />
        <StatCard
          icon={Calendar}
          title="Days Remaining"
          value={dashboardStats.daysRemaining}
          color="text-red-600"
        />
      </div>

      {/* Additional Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="Draft Nominees"
          value={dashboardStats.draftNominees}
          color="text-yellow-600"
        />
        <StatCard
          icon={Star}
          title="Avg. Quality Score"
          value={`${dashboardStats.averageCompletionScore}%`}
          color="text-purple-600"
        />
        <StatCard
          icon={Zap}
          title="Weekly Productivity"
          value={`${dashboardStats.productivity}/week`}
          color="text-indigo-600"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          icon={Target}
          title="Completion Rate"
          value={`${dashboardStats.completionRate}%`}
          color="text-[#ea580c]"
        />
      </div>

      {/* Enhanced Progress Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-[#ea580c]" />
            Research Progress Overview
          </h3>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {dashboardStats.completionRate}% Complete
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dashboardStats.completionRate}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#dc2626] h-4 rounded-full shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-[#ea580c]">
              {dashboardStats.totalNominees}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {dashboardStats.targetNominees - dashboardStats.totalNominees}
            </div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {dashboardStats.completionRate}%
            </div>
            <div className="text-sm text-gray-600">Target Progress</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {dashboardStats.averageCompletionScore}%
            </div>
            <div className="text-sm text-gray-600">Avg. Quality</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <CategoryChart />
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountryChart />

        {/* Performance Insights */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#ea580c]" />
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Quality Score</span>
              </div>
              <span className="text-sm font-bold text-green-600">
                {dashboardStats.averageCompletionScore}% Average
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Weekly Output</span>
              </div>
              <span className="text-sm font-bold text-blue-600">
                {dashboardStats.productivity} nominees/week
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-[#ea580c] mr-2" />
                <span className="text-sm font-medium text-gray-700">Target Progress</span>
              </div>
              <span className="text-sm font-bold text-[#ea580c]">
                {dashboardStats.completionRate}% Complete
              </span>
            </div>

            {dashboardStats.daysRemaining > 0 && (
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Time Remaining</span>
                </div>
                <span className="text-sm font-bold text-red-600">
                  {dashboardStats.daysRemaining} days
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#ea580c]" />
            Recent Nominees
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Last 5 entries
          </span>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea580c] mx-auto"></div>
              <p className="mt-3 text-sm text-gray-600">Loading recent nominees...</p>
            </div>
          ) : recentNominees.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No nominees uploaded yet</p>
              <Button
                text="Add Your First Nominee"
                onClick={handleStartNewNomination}
                variant="filled"
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
              />
            </div>
          ) : (
            recentNominees.map((nominee, index) => (
              <motion.div
                key={nominee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{nominee.fullName}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="mr-2">{nominee.awardCategory}</span>
                    <Globe className="w-4 h-4 mr-1" />
                    <span>{nominee.country}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(nominee.dateCreated).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {nominee.completionScore}%
                    </div>
                    <div className="text-xs text-gray-500">Quality</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(nominee.status)}`}>
                    {nominee.status.charAt(0).toUpperCase() + nominee.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {recentNominees.length > 0 && (
          <div className="mt-6 flex gap-3">
            <Button
              text="View All Nominees"
              onClick={() => setActiveTab('nominees')}
              variant="outline"
              className="flex-1 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            />
            <Button
              text="Add New Nominee"
              onClick={handleStartNewNomination}
              variant="filled"
              className="flex-1 bg-[#ea580c] hover:bg-[#dc2626] text-white"
            />
          </div>
        )}
      </div>
    </div>
  );

  const NomineesTab = () => (
    <div className="space-y-6">
      {/* Enhanced Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, category, country, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            />
          </div>
          <Button
            text="Add New Nominee"
            onClick={handleStartNewNomination}
            variant="filled"
            className="bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center gap-2"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 flex-1">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent appearance-none bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent appearance-none bg-white text-sm"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent appearance-none bg-white text-sm"
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent appearance-none bg-white text-sm"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="score-desc">Highest Score</option>
                <option value="score-asc">Lowest Score</option>
                <option value="status-asc">Status A-Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#ea580c] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#ea580c] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredAndSortedNominees.length} of {nominees.length} nominees
          </span>
          {selectedNominees.length > 0 && (
            <span className="text-[#ea580c] font-medium">
              {selectedNominees.length} selected
            </span>
          )}
        </div>
      </div>

      {/* Bulk Operations Bar */}
      {selectedNominees.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#ea580c] text-white rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {selectedNominees.length} nominee{selectedNominees.length > 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleBulkAction('export')}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => handleBulkAction('submit')}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit All
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="flex items-center gap-2 px-3 py-1 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={() => setSelectedNominees([])}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </motion.div>
      )}

      {/* Enhanced Nominees List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Your Nominees</h3>
            {filteredAndSortedNominees.length > 0 && (
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedNominees.length === filteredAndSortedNominees.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]"
                  />
                  Select All
                </label>
              </div>
            )}
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6' : 'divide-y divide-gray-200'}>
          {loading ? (
            <div className="p-8 text-center col-span-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea580c] mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading nominees...</p>
            </div>
          ) : filteredAndSortedNominees.length === 0 ? (
            <div className="p-8 text-center text-gray-500 col-span-full">
              {nominees.length === 0
                ? "No nominees found. Start by uploading your first nominee profile!"
                : "No nominees match your current filters. Try adjusting your search criteria."
              }
            </div>
          ) : (
            filteredAndSortedNominees.map((nominee, index) => (
              viewMode === 'grid' ? (
                // Grid View
                <motion.div
                  key={nominee.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <input
                      type="checkbox"
                      checked={selectedNominees.includes(nominee.id)}
                      onChange={() => handleSelectNominee(nominee.id)}
                      className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]"
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nominee.status)}`}>
                      {nominee.status.charAt(0).toUpperCase() + nominee.status.slice(1)}
                    </span>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{nominee.fullName}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{nominee.awardCategory}</p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Globe className="w-3 h-3" />
                    <span>{nominee.country}</span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Quality Score</span>
                      <span>{nominee.completionScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#ea580c] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${nominee.completionScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white rounded transition-colors">
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-[#ea580c] text-white hover:bg-[#dc2626] rounded transition-colors">
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </motion.div>
              ) : (
                // List View
                <motion.div
                  key={nominee.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedNominees.includes(nominee.id)}
                      onChange={() => handleSelectNominee(nominee.id)}
                      className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{nominee.fullName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nominee.status)}`}>
                          {nominee.status.charAt(0).toUpperCase() + nominee.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{nominee.awardCategory}</p>
                      {nominee.organizationName && (
                        <p className="text-sm text-gray-500 mb-2">{nominee.organizationName}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {nominee.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(nominee.dateCreated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {nominee.completionScore}% Complete
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-[#ea580c] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${nominee.completionScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          text="Edit"
                          variant="outline"
                          className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-3 py-1 text-sm"
                        />
                        <Button
                          text="View"
                          variant="filled"
                          className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-3 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))
          )}
        </div>
      </div>
    </div>
  );

  const UploadTab = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center py-12">
        <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Add New Nominee</h3>
        <p className="text-gray-600 mb-6">
          Upload a new nominee profile to contribute to the NESA-Africa 2025 research database.
        </p>
        <Button
          text="Start New Nomination"
          onClick={handleStartNewNomination}
          variant="filled"
          className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
        />
      </div>
    </div>
  );

  // Show nominee form if requested
  if (showNomineeForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <button
            onClick={handleBackFromNomineeForm}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <NomineeForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NRC Volunteer Dashboard</h1>
              <p className="text-gray-600">
                Welcome back{volunteer?.fullName ? `, ${volunteer.fullName}` : ''}! Track your research progress and manage nominees.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Target Progress</div>
                <div className="text-lg font-semibold text-[#ea580c]">
                  {dashboardStats.totalNominees}/{dashboardStats.targetNominees}
                </div>
              </div>
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
              { id: 'nominees', label: 'My Nominees', icon: Users },
              { id: 'upload', label: 'Add Nominee', icon: Plus }
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
        {activeTab === 'nominees' && <NomineesTab />}
        {activeTab === 'upload' && <UploadTab />}
      </div>
    </div>
  );
};

export default NRCDashboard;
