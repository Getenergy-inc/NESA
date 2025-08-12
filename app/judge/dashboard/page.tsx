"use client";

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import { motion } from 'framer-motion';
import {
  Scale,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  BookOpen,
  Award,
  Users,
  Target,
  TrendingUp,
  Star,
  BarChart3,
  MessageSquare,
  Download,
  Settings
} from 'lucide-react';

interface DashboardStats {
  assignedNominations: number;
  completedEvaluations: number;
  pendingEvaluations: number;
  averageScore: number;
  judgeLevel: string;
  certificationDate: string;
}

interface Deadline {
  id: number;
  nominee: string;
  category: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  timeLeft: string;
}

interface CategoryAssignment {
  name: string;
  assigned: number;
  completed: number;
  weight: string;
  status: 'active' | 'completed' | 'pending';
}

const JudgesDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real API calls
  const mockData: DashboardStats = {
    assignedNominations: 24,
    completedEvaluations: 18,
    pendingEvaluations: 6,
    averageScore: 8.4,
    judgeLevel: "Senior Judge",
    certificationDate: "July 20, 2025"
  };

  const upcomingDeadlines: Deadline[] = [
    { id: 1, nominee: "Dr. Amina Hassan", category: "Africa Icon", deadline: "Aug 15, 2025", priority: "high", timeLeft: "3 days" },
    { id: 2, nominee: "TechEd Initiative", category: "Innovation in Learning", deadline: "Aug 20, 2025", priority: "medium", timeLeft: "8 days" },
    { id: 3, nominee: "Green Schools Project", category: "Community Impact", deadline: "Aug 25, 2025", priority: "low", timeLeft: "13 days" }
  ];

  const categoryAssignments: CategoryAssignment[] = [
    { name: "Africa Icon", assigned: 8, completed: 6, weight: "40%", status: "active" },
    { name: "Competitive (Gold Certificate)", assigned: 10, completed: 8, weight: "50%", status: "active" },
    { name: "Innovation in Learning", assigned: 6, completed: 4, weight: "50%", status: "active" }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      // Replace with actual API call
      setTimeout(() => {
        setDashboardData(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.fullName || user?.name || 'Judge'}!
                </h1>
                <p className="text-orange-100">
                  {dashboardData?.judgeLevel} • Certified since {dashboardData?.certificationDate}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{dashboardData?.averageScore}</div>
                  <div className="text-sm text-orange-100">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{dashboardData?.completedEvaluations}</div>
                  <div className="text-sm text-orange-100">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Nominations</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.assignedNominations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.completedEvaluations}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.pendingEvaluations}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.averageScore}/10</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
                  <Scale className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Pending Evaluations</div>
                    <div className="text-sm text-gray-600">Review and score nominations</div>
                  </div>
                </button>
                
                <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                  <BookOpen className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Judging Guidelines</div>
                    <div className="text-sm text-gray-600">Access evaluation criteria</div>
                  </div>
                </button>
                
                <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                  <MessageSquare className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Judge Chat Room</div>
                    <div className="text-sm text-gray-600">Collaborate with other judges</div>
                  </div>
                </button>
                
                <button className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                  <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Evaluation History</div>
                    <div className="text-sm text-gray-600">View past evaluations</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Category Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Assignments</h2>
              <div className="space-y-4">
                {categoryAssignments.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                          {category.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{category.completed}/{category.assigned} completed</span>
                        <span>Weight: {category.weight}</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(category.completed / category.assigned) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{deadline.nominee}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{deadline.category}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{deadline.deadline}</span>
                      <span className="font-medium text-orange-600">{deadline.timeLeft}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Judge Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Download Judges Charter 2025</span>
                </button>
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Evaluation Guidelines</span>
                </button>
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Award className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Scoring Templates</span>
                </button>
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Judge Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgesDashboard;
