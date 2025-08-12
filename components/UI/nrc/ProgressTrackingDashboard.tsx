'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  Award,
  Calendar,
  Star,
  Zap,
  Trophy,
  Clock,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Flame,
  Medal,
  Activity
} from 'lucide-react';
import {
  getUserMilestones,
  getUserProgressSnapshots,
  getUserAchievements,
  calculateProgressInsights,
  calculatePerformanceScore,
  getNextMilestone,
  getMilestoneCompletionRate,
  updateMilestonesFromData,
  type Milestone,
  type Achievement,
  type PerformanceMetric
} from '@/lib/services/progressTrackingService';
import { useAuthContext } from '@/lib/context/AuthContext';
import { getVolunteerNominees } from '@/lib/services/mockNRCService';
import { ProgressBar, AnimatedCounter } from './UXEnhancer';

interface ProgressTrackingDashboardProps {
  volunteerId?: string;
  compact?: boolean;
}

const ProgressTrackingDashboard: React.FC<ProgressTrackingDashboardProps> = ({ 
  volunteerId, 
  compact = false 
}) => {
  const { user } = useAuthContext();
  const userId = volunteerId || user?.email || '';
  
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [performanceScore, setPerformanceScore] = useState<any>(null);
  const [nextMilestone, setNextMilestone] = useState<Milestone | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadProgressData();
    }
  }, [userId]);

  const loadProgressData = async () => {
    setLoading(true);
    try {
      // Load nominees data to update milestones
      if (volunteerId) {
        const nomineesResponse = await getVolunteerNominees(volunteerId);
        if (nomineesResponse.success) {
          updateMilestonesFromData(userId, nomineesResponse.data || []);
        }
      }

      // Load all progress data
      const userMilestones = getUserMilestones(userId);
      const userAchievements = getUserAchievements(userId);
      const progressInsights = calculateProgressInsights(userId);
      const performance = calculatePerformanceScore(userId);
      const next = getNextMilestone(userId);

      setMilestones(userMilestones);
      setAchievements(userAchievements);
      setInsights(progressInsights);
      setPerformanceScore(performance);
      setNextMilestone(next);
    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMilestoneIcon = (milestone: Milestone) => {
    if (milestone.isCompleted) return <CheckCircle className="w-5 h-5 text-green-600" />;
    
    const progress = (milestone.current / milestone.target) * 100;
    if (progress >= 75) return <Target className="w-5 h-5 text-orange-600" />;
    if (progress >= 50) return <Activity className="w-5 h-5 text-blue-600" />;
    return <Clock className="w-5 h-5 text-gray-600" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      case 'low': return 'border-gray-500 bg-gray-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ea580c]" />
            Progress Overview
          </h3>
          <span className="text-sm text-gray-600">
            {getMilestoneCompletionRate(userId)}% Complete
          </span>
        </div>

        {/* Performance Score */}
        {performanceScore && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Performance</span>
              <span className={`text-lg font-bold ${getPerformanceColor(performanceScore.overall)}`}>
                {performanceScore.overall}%
              </span>
            </div>
            <ProgressBar progress={performanceScore.overall} height="h-2" />
          </div>
        )}

        {/* Next Milestone */}
        {nextMilestone && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              {getMilestoneIcon(nextMilestone)}
              <span className="text-sm font-medium text-gray-900">{nextMilestone.title}</span>
            </div>
            <ProgressBar 
              progress={(nextMilestone.current / nextMilestone.target) * 100} 
              height="h-1.5"
              showPercentage={false}
            />
            <div className="text-xs text-gray-600 mt-1">
              {nextMilestone.current} / {nextMilestone.target} {nextMilestone.unit}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-[#ea580c]" />
          Progress & Achievements
        </h2>
        <div className="text-right">
          <div className="text-sm text-gray-600">Overall Completion</div>
          <div className="text-2xl font-bold text-[#ea580c]">
            {getMilestoneCompletionRate(userId)}%
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      {performanceScore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className={`text-2xl font-bold ${getPerformanceColor(performanceScore.overall)}`}>
              <AnimatedCounter end={performanceScore.overall} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className={`text-2xl font-bold ${getPerformanceColor(performanceScore.productivity)}`}>
              <AnimatedCounter end={performanceScore.productivity} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">Productivity</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className={`text-2xl font-bold ${getPerformanceColor(performanceScore.quality)}`}>
              <AnimatedCounter end={performanceScore.quality} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">Quality</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className={`text-2xl font-bold ${getPerformanceColor(performanceScore.consistency)}`}>
              <AnimatedCounter end={performanceScore.consistency} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">Consistency</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className={`text-2xl font-bold ${getPerformanceColor(performanceScore.engagement)}`}>
              <AnimatedCounter end={performanceScore.engagement} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">Engagement</div>
          </div>
        </div>
      )}

      {/* Insights Cards */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Weekly Growth</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {insights.weeklyGrowth > 0 ? '+' : ''}{insights.weeklyGrowth}%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Avg. Quality</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {insights.averageQuality}%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Streak Days</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              <AnimatedCounter end={insights.streakDays} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Projected Completion</span>
            </div>
            <div className="text-sm font-bold text-blue-600">
              {insights.projectedCompletion}
            </div>
          </motion.div>
        </div>
      )}

      {/* Milestones and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Milestones */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#ea580c]" />
              Active Milestones
            </h3>
            <span className="text-sm text-gray-600">
              {milestones.filter(m => m.isCompleted).length} / {milestones.length} completed
            </span>
          </div>

          <div className="space-y-3">
            {milestones.slice(0, 5).map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border-l-4 p-3 rounded-lg ${getPriorityColor(milestone.priority)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getMilestoneIcon(milestone)}
                    <span className="font-medium text-gray-900">{milestone.title}</span>
                  </div>
                  <span className="text-xs text-gray-600 capitalize">{milestone.priority}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">
                    {milestone.current} / {milestone.target} {milestone.unit}
                  </span>
                  <span className="text-xs font-medium text-gray-900">
                    {Math.round((milestone.current / milestone.target) * 100)}%
                  </span>
                </div>
                
                <ProgressBar 
                  progress={(milestone.current / milestone.target) * 100}
                  height="h-2"
                  showPercentage={false}
                />
                
                {milestone.reward && (
                  <div className="text-xs text-[#ea580c] mt-1 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Reward: {milestone.reward}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Medal className="w-5 h-5 text-[#ea580c]" />
            Recent Achievements
          </h3>

          {achievements.length > 0 ? (
            <div className="space-y-3">
              {achievements.slice(0, 5).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    achievement.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                    achievement.rarity === 'epic' ? 'bg-orange-100 text-orange-800' :
                    achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {achievement.rarity}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Medal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>No achievements yet</p>
              <p className="text-sm">Complete milestones to unlock achievements!</p>
            </div>
          )}
        </div>
      </div>

      {/* Next Milestone Focus */}
      {nextMilestone && (
        <div className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Next Milestone Focus
              </h3>
              <h4 className="text-xl font-bold mb-1">{nextMilestone.title}</h4>
              <p className="text-orange-100 mb-3">{nextMilestone.description}</p>
              
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-medium">{nextMilestone.current}</span>
                  <span className="text-orange-200"> / {nextMilestone.target} {nextMilestone.unit}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">
                    {Math.round((nextMilestone.current / nextMilestone.target) * 100)}%
                  </span>
                  <span className="text-orange-200"> complete</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold mb-2">
                {nextMilestone.target - nextMilestone.current}
              </div>
              <div className="text-sm text-orange-200">
                {nextMilestone.unit} to go
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <ProgressBar 
              progress={(nextMilestone.current / nextMilestone.target) * 100}
              color="bg-white"
              height="h-3"
              showPercentage={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTrackingDashboard;
