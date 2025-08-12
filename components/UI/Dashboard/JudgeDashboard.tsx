"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
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

const JudgeDashboard: React.FC = () => {
  const { user } = useAuthContext();

  // Mock data - replace with real API calls
  const dashboardData = {
    assignedNominations: 15,
    completedEvaluations: 8,
    pendingEvaluations: 7,
    averageScore: 8.2,
    upcomingDeadlines: [
      { id: 1, nominee: "Dr. Sarah Johnson", category: "Outstanding Teacher", deadline: "Dec 18, 2024", priority: "high" },
      { id: 2, nominee: "Innovation Academy", category: "Best School", deadline: "Dec 22, 2024", priority: "medium" },
      { id: 3, nominee: "Michael Chen", category: "Student Excellence", deadline: "Dec 25, 2024", priority: "low" }
    ],
    recentEvaluations: [
      { id: 1, nominee: "Alice Williams", category: "Leadership Excellence", score: 9.1, date: "2 days ago", status: "completed" },
      { id: 2, nominee: "Tech Solutions School", category: "Innovation Award", score: 8.7, date: "5 days ago", status: "completed" },
      { id: 3, nominee: "David Brown", category: "Community Impact", score: 8.9, date: "1 week ago", status: "completed" }
    ],
    judgingCategories: [
      "Outstanding Teacher Award",
      "Innovation in Education",
      "Leadership Excellence",
      "Community Impact",
      "Student Achievement"
    ],
    trainingModules: [
      { id: 1, title: "Evaluation Criteria Guidelines", progress: 100, status: "completed" },
      { id: 2, title: "Bias-Free Assessment Techniques", progress: 75, status: "in_progress" },
      { id: 3, title: "Advanced Scoring Methods", progress: 0, status: "not_started" }
    ]
  };

  const quickActions: QuickAction[] = [
    {
      title: "Pending Evaluations",
      description: "Review and score assigned nominations",
      icon: Scale,
      color: "blue" as const,
      href: "/judge/evaluations"
    },
    {
      title: "Judging Guidelines",
      description: "Access criteria and evaluation standards",
      icon: BookOpen,
      color: "green" as const,
      href: "/judge/guidelines"
    },
    {
      title: "Training Resources",
      description: "Complete judge certification modules",
      icon: Target,
      color: "purple" as const,
      href: "/judge/training"
    },
    {
      title: "Evaluation History",
      description: "Review your past evaluations and scores",
      icon: FileText,
      color: "orange" as const,
      href: "/judge/history"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTrainingStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "in_progress": return "text-blue-600 bg-blue-50";
      case "not_started": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title={`Judge ${user?.fullName || user?.name || 'User'} Dashboard`}
        subtitle="Evaluate nominations and maintain judging excellence"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Assigned Nominations"
            value={dashboardData.assignedNominations}
            icon={FileText}
            color="blue"
            description="Total assignments"
          />
          <DashboardCard
            title="Completed"
            value={dashboardData.completedEvaluations}
            icon={CheckCircle}
            color="green"
            description="Evaluations done"
          />
          <DashboardCard
            title="Pending"
            value={dashboardData.pendingEvaluations}
            icon={Clock}
            color="orange"
            description="Awaiting review"
          />
          <DashboardCard
            title="Average Score"
            value={dashboardData.averageScore}
            suffix="/10"
            icon={Star}
            color="purple"
            description="Your scoring average"
          />
        </div>

        {/* Urgent Deadlines Alert */}
        {dashboardData.upcomingDeadlines.some(d => d.priority === "high") && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Urgent Evaluations Due</h3>
                <p className="text-sm text-red-700 mt-1">
                  You have {dashboardData.upcomingDeadlines.filter(d => d.priority === "high").length} high-priority evaluations due soon.
                </p>
              </div>
              <button className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Review Now
              </button>
            </div>
          </div>
        )}

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
          {/* Upcoming Deadlines */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {dashboardData.upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className={`p-4 rounded-lg border ${getPriorityColor(deadline.priority)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{deadline.nominee}</p>
                        <p className="text-xs text-gray-600">{deadline.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{deadline.deadline}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getPriorityColor(deadline.priority)}`}>
                          {deadline.priority} Priority
                        </span>
                      </div>
                    </div>
                    <button className="mt-3 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Start Evaluation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Evaluations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Evaluations</h3>
              <div className="space-y-3">
                {dashboardData.recentEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{evaluation.nominee}</p>
                      <span className="text-sm font-bold text-green-600">{evaluation.score}/10</span>
                    </div>
                    <p className="text-xs text-gray-600">{evaluation.category}</p>
                    <p className="text-xs text-gray-500">{evaluation.date}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                View All Evaluations
              </button>
            </div>

            {/* Training Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Training Progress</h3>
              </div>
              <div className="space-y-3">
                {dashboardData.trainingModules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{module.title}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTrainingStatusColor(module.status)}`}>
                        {module.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                Continue Training
              </button>
            </div>

            {/* Judging Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Your Categories</h3>
              </div>
              <div className="space-y-2">
                {dashboardData.judgingCategories.map((category, index) => (
                  <div key={index} className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-900">{category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;
