'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Award,
  FileText,
  Calendar,
  Globe,
  Target,
  Activity,
  Download,
  RefreshCw
} from 'lucide-react';
import Button from '@/components/Common/Button';
import {
  getAllNRCApplications,
  getAllNRCVolunteers,
  getVolunteerNominees,
  type NRCApplication,
  type NRCVolunteer,
  type NomineeProfile
} from '@/lib/services/mockNRCService';
import { generateSummaryReport } from '@/lib/services/exportService';

interface ReportingDashboardProps {
  userRole?: 'admin' | 'volunteer';
  volunteerId?: string;
}

const ReportingDashboard: React.FC<ReportingDashboardProps> = ({ 
  userRole = 'admin', 
  volunteerId 
}) => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<NRCApplication[]>([]);
  const [volunteers, setVolunteers] = useState<NRCVolunteer[]>([]);
  const [nominees, setNominees] = useState<NomineeProfile[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    loadData();
  }, [userRole, volunteerId]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (userRole === 'admin') {
        // Load all data for admin
        const [applicationsResponse, volunteersResponse] = await Promise.all([
          getAllNRCApplications(),
          getAllNRCVolunteers()
        ]);

        if (applicationsResponse.success) {
          setApplications(applicationsResponse.data || []);
        }

        if (volunteersResponse.success) {
          setVolunteers(volunteersResponse.data || []);
          
          // Load all nominees
          const allNominees = [];
          for (const volunteer of volunteersResponse.data || []) {
            const nomineesResponse = await getVolunteerNominees(volunteer.id);
            if (nomineesResponse.success) {
              allNominees.push(...(nomineesResponse.data || []));
            }
          }
          setNominees(allNominees);
        }
      } else if (volunteerId) {
        // Load only volunteer's data
        const nomineesResponse = await getVolunteerNominees(volunteerId);
        if (nomineesResponse.success) {
          setNominees(nomineesResponse.data || []);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const now = new Date();
    let cutoffDate: Date;

    switch (timeRange) {
      case '7d':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(0); // All time
    }

    return {
      applications: applications.filter(a => new Date(a.applicationDate) >= cutoffDate),
      nominees: nominees.filter(n => new Date(n.dateCreated) >= cutoffDate)
    };
  }, [applications, nominees, timeRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalApplications = filteredData.applications.length;
    const pendingApplications = filteredData.applications.filter(a => a.status === 'pending').length;
    const approvedApplications = filteredData.applications.filter(a => a.status === 'approved').length;
    
    const totalNominees = filteredData.nominees.length;
    const approvedNominees = filteredData.nominees.filter(n => n.status === 'approved').length;
    const pendingNominees = filteredData.nominees.filter(n => n.status === 'submitted').length;
    
    const activeVolunteers = volunteers.filter(v => v.status === 'active').length;
    const totalTarget = volunteers.length * 200; // 200 per volunteer
    const completionRate = totalTarget > 0 ? (nominees.length / totalTarget) * 100 : 0;

    // Country distribution
    const countryStats = filteredData.nominees.reduce((acc, nominee) => {
      acc[nominee.country] = (acc[nominee.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Category distribution
    const categoryStats = filteredData.nominees.reduce((acc, nominee) => {
      acc[nominee.awardCategory] = (acc[nominee.awardCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Weekly progress (mock data for demonstration)
    const now = new Date();
    const weeklyProgress = Array.from({ length: 8 }, (_, i) => {
      const weekStart = new Date(now.getTime() - (7 - i) * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const weekNominees = nominees.filter(n => {
        const date = new Date(n.dateCreated);
        return date >= weekStart && date < weekEnd;
      }).length;

      return {
        week: `Week ${i + 1}`,
        nominees: weekNominees,
        date: weekStart.toLocaleDateString()
      };
    });

    return {
      overview: {
        totalApplications,
        pendingApplications,
        approvedApplications,
        totalVolunteers: volunteers.length,
        activeVolunteers,
        totalNominees,
        approvedNominees,
        pendingNominees,
        completionRate
      },
      distributions: {
        countries: Object.entries(countryStats).sort(([,a], [,b]) => b - a).slice(0, 10),
        categories: Object.entries(categoryStats).sort(([,a], [,b]) => b - a).slice(0, 10)
      },
      trends: {
        weeklyProgress
      }
    };
  }, [filteredData, volunteers, nominees]);

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

  const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-[#ea580c]" />
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'admin' ? 'NRC Analytics Dashboard' : 'My Performance Dashboard'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          
          <Button
            text="Refresh"
            onClick={loadData}
            variant="outline"
            className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userRole === 'admin' ? (
          <>
            <StatCard
              icon={FileText}
              title="Total Applications"
              value={metrics.overview.totalApplications}
              subtitle={`${metrics.overview.pendingApplications} pending`}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              icon={Users}
              title="Active Volunteers"
              value={metrics.overview.activeVolunteers}
              subtitle={`of ${metrics.overview.totalVolunteers} total`}
              color="text-blue-600"
            />
            <StatCard
              icon={Award}
              title="Total Nominees"
              value={metrics.overview.totalNominees}
              subtitle={`${metrics.overview.approvedNominees} approved`}
              color="text-green-600"
            />
            <StatCard
              icon={Target}
              title="Completion Rate"
              value={`${Math.round(metrics.overview.completionRate)}%`}
              subtitle="of target reached"
              color="text-purple-600"
              trend={{ value: 8, isPositive: true }}
            />
          </>
        ) : (
          <>
            <StatCard
              icon={Award}
              title="My Nominees"
              value={filteredData.nominees.length}
              subtitle="submitted"
            />
            <StatCard
              icon={Activity}
              title="Approved"
              value={filteredData.nominees.filter(n => n.status === 'approved').length}
              color="text-green-600"
            />
            <StatCard
              icon={Calendar}
              title="Pending Review"
              value={filteredData.nominees.filter(n => n.status === 'submitted').length}
              color="text-blue-600"
            />
            <StatCard
              icon={Target}
              title="Quality Score"
              value={`${Math.round(filteredData.nominees.reduce((sum, n) => sum + n.completionScore, 0) / Math.max(1, filteredData.nominees.length))}%`}
              color="text-purple-600"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Distribution */}
        <ChartCard title="Top Countries">
          <div className="space-y-3">
            {metrics.distributions.countries.slice(0, 8).map(([country, count], index) => (
              <div key={country} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{country}</span>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / Math.max(...metrics.distributions.countries.map(([,c]) => c))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Category Distribution */}
        <ChartCard title="Top Categories">
          <div className="space-y-3">
            {metrics.distributions.categories.slice(0, 8).map(([category, count], index) => (
              <div key={category} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 truncate">{category}</span>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / Math.max(...metrics.distributions.categories.map(([,c]) => c))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Weekly Progress */}
      {userRole === 'admin' && (
        <ChartCard title="Weekly Progress Trend">
          <div className="space-y-3">
            {metrics.trends.weeklyProgress.map((week, index) => (
              <div key={week.week} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{week.week}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (week.nominees / 50) * 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full"
                    />
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 font-medium text-right">
                  {week.nominees}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      )}
    </div>
  );
};

export default ReportingDashboard;
