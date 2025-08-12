// Progress Tracking Service for NRC System
// Handles milestone management, performance indicators, and progress analytics

export interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string; // 'nominees', 'applications', 'days', etc.
  category: 'individual' | 'team' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  reward?: string;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  category: 'productivity' | 'quality' | 'engagement' | 'completion';
  period: 'daily' | 'weekly' | 'monthly' | 'total';
  lastUpdated: string;
}

export interface ProgressSnapshot {
  id: string;
  userId: string;
  date: string;
  metrics: {
    nomineesSubmitted: number;
    nomineesApproved: number;
    qualityScore: number;
    completionRate: number;
    timeSpent: number; // in minutes
    activeDays: number;
  };
  milestones: string[]; // milestone IDs achieved
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'streak' | 'quality' | 'speed' | 'collaboration';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
  progress?: number;
  maxProgress?: number;
}

// Storage keys
const MILESTONES_STORAGE_KEY = 'nrc_milestones';
const METRICS_STORAGE_KEY = 'nrc_performance_metrics';
const SNAPSHOTS_STORAGE_KEY = 'nrc_progress_snapshots';
const ACHIEVEMENTS_STORAGE_KEY = 'nrc_achievements';

// Helper functions for localStorage
const getMilestonesFromStorage = (): Milestone[] => {
  try {
    const data = localStorage.getItem(MILESTONES_STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultMilestones();
  } catch (error) {
    console.error('Error reading milestones from localStorage:', error);
    return getDefaultMilestones();
  }
};

const saveMilestonesToStorage = (milestones: Milestone[]): void => {
  try {
    localStorage.setItem(MILESTONES_STORAGE_KEY, JSON.stringify(milestones));
  } catch (error) {
    console.error('Error saving milestones to localStorage:', error);
  }
};

const getMetricsFromStorage = (): PerformanceMetric[] => {
  try {
    const data = localStorage.getItem(METRICS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading metrics from localStorage:', error);
    return [];
  }
};

const saveMetricsToStorage = (metrics: PerformanceMetric[]): void => {
  try {
    localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(metrics));
  } catch (error) {
    console.error('Error saving metrics to localStorage:', error);
  }
};

const getSnapshotsFromStorage = (): ProgressSnapshot[] => {
  try {
    const data = localStorage.getItem(SNAPSHOTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading snapshots from localStorage:', error);
    return [];
  }
};

const saveSnapshotsToStorage = (snapshots: ProgressSnapshot[]): void => {
  try {
    localStorage.setItem(SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshots));
  } catch (error) {
    console.error('Error saving snapshots to localStorage:', error);
  }
};

const getAchievementsFromStorage = (): Achievement[] => {
  try {
    const data = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading achievements from localStorage:', error);
    return [];
  }
};

const saveAchievementsToStorage = (achievements: Achievement[]): void => {
  try {
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
  } catch (error) {
    console.error('Error saving achievements to localStorage:', error);
  }
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Default milestones
const getDefaultMilestones = (): Milestone[] => [
  {
    id: 'first-nominee',
    title: 'First Nominee',
    description: 'Submit your first nominee profile',
    target: 1,
    current: 0,
    unit: 'nominees',
    category: 'individual',
    priority: 'high',
    reward: 'Welcome Badge',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ten-nominees',
    title: 'Getting Started',
    description: 'Submit 10 nominee profiles',
    target: 10,
    current: 0,
    unit: 'nominees',
    category: 'individual',
    priority: 'medium',
    reward: 'Contributor Badge',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fifty-nominees',
    title: 'Dedicated Volunteer',
    description: 'Submit 50 nominee profiles',
    target: 50,
    current: 0,
    unit: 'nominees',
    category: 'individual',
    priority: 'medium',
    reward: 'Dedication Badge',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hundred-nominees',
    title: 'Champion Researcher',
    description: 'Submit 100 nominee profiles',
    target: 100,
    current: 0,
    unit: 'nominees',
    category: 'individual',
    priority: 'high',
    reward: 'Champion Badge',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'quality-expert',
    title: 'Quality Expert',
    description: 'Maintain 90%+ quality score for 10 nominees',
    target: 10,
    current: 0,
    unit: 'high-quality nominees',
    category: 'individual',
    priority: 'high',
    reward: 'Quality Expert Badge',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'weekly-streak',
    title: 'Weekly Warrior',
    description: 'Submit nominees for 7 consecutive days',
    target: 7,
    current: 0,
    unit: 'consecutive days',
    category: 'individual',
    priority: 'medium',
    reward: 'Consistency Badge',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Milestone Management
export const getUserMilestones = (userId: string): Milestone[] => {
  const milestones = getMilestonesFromStorage();
  return milestones.filter(m => m.category === 'individual');
};

export const updateMilestoneProgress = (milestoneId: string, progress: number): void => {
  const milestones = getMilestonesFromStorage();
  const milestoneIndex = milestones.findIndex(m => m.id === milestoneId);
  
  if (milestoneIndex !== -1) {
    milestones[milestoneIndex].current = progress;
    milestones[milestoneIndex].updatedAt = new Date().toISOString();
    
    // Check if milestone is completed
    if (progress >= milestones[milestoneIndex].target && !milestones[milestoneIndex].isCompleted) {
      milestones[milestoneIndex].isCompleted = true;
      milestones[milestoneIndex].completedAt = new Date().toISOString();
      
      // Trigger achievement unlock
      unlockAchievement(milestoneId, milestones[milestoneIndex].title);
    }
    
    saveMilestonesToStorage(milestones);
  }
};

export const createCustomMilestone = (milestone: Omit<Milestone, 'id' | 'createdAt' | 'updatedAt'>): string => {
  const milestones = getMilestonesFromStorage();
  const newMilestone: Milestone = {
    ...milestone,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  milestones.push(newMilestone);
  saveMilestonesToStorage(milestones);
  
  return newMilestone.id;
};

// Performance Metrics
export const updatePerformanceMetrics = (userId: string, metrics: Partial<PerformanceMetric>[]): void => {
  const allMetrics = getMetricsFromStorage();
  const now = new Date().toISOString();
  
  metrics.forEach(metric => {
    const existingIndex = allMetrics.findIndex(m => m.id === metric.id);
    
    if (existingIndex !== -1) {
      // Update existing metric
      allMetrics[existingIndex] = {
        ...allMetrics[existingIndex],
        ...metric,
        lastUpdated: now
      };
    } else if (metric.id) {
      // Add new metric
      allMetrics.push({
        ...metric,
        lastUpdated: now
      } as PerformanceMetric);
    }
  });
  
  saveMetricsToStorage(allMetrics);
};

export const getUserPerformanceMetrics = (userId: string): PerformanceMetric[] => {
  return getMetricsFromStorage();
};

// Progress Snapshots
export const createProgressSnapshot = (userId: string, metrics: ProgressSnapshot['metrics'], notes?: string): void => {
  const snapshots = getSnapshotsFromStorage();
  const today = new Date().toISOString().split('T')[0];
  
  // Check if snapshot for today already exists
  const existingIndex = snapshots.findIndex(s => s.userId === userId && s.date === today);
  
  const snapshot: ProgressSnapshot = {
    id: generateId(),
    userId,
    date: today,
    metrics,
    milestones: [], // Will be populated based on current milestones
    notes
  };
  
  if (existingIndex !== -1) {
    snapshots[existingIndex] = snapshot;
  } else {
    snapshots.push(snapshot);
  }
  
  saveSnapshotsToStorage(snapshots);
};

export const getUserProgressSnapshots = (userId: string, days?: number): ProgressSnapshot[] => {
  const snapshots = getSnapshotsFromStorage();
  let userSnapshots = snapshots.filter(s => s.userId === userId);
  
  if (days) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffString = cutoffDate.toISOString().split('T')[0];
    
    userSnapshots = userSnapshots.filter(s => s.date >= cutoffString);
  }
  
  return userSnapshots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Achievement System
export const unlockAchievement = (achievementId: string, title: string): void => {
  const achievements = getAchievementsFromStorage();
  
  // Check if achievement already exists
  const existingIndex = achievements.findIndex(a => a.id === achievementId);
  if (existingIndex !== -1) return;
  
  const achievement: Achievement = {
    id: achievementId,
    title,
    description: `Completed: ${title}`,
    icon: '🏆',
    category: 'milestone',
    rarity: 'common',
    unlockedAt: new Date().toISOString()
  };
  
  achievements.push(achievement);
  saveAchievementsToStorage(achievements);
  
  // Trigger notification
  window.dispatchEvent(new CustomEvent('achievement-unlocked', { detail: achievement }));
};

export const getUserAchievements = (userId: string): Achievement[] => {
  return getAchievementsFromStorage();
};

// Analytics and Insights
export const calculateProgressInsights = (userId: string): {
  weeklyGrowth: number;
  averageQuality: number;
  productivityTrend: 'up' | 'down' | 'stable';
  streakDays: number;
  projectedCompletion: string;
} => {
  const snapshots = getUserProgressSnapshots(userId, 30);
  
  if (snapshots.length === 0) {
    return {
      weeklyGrowth: 0,
      averageQuality: 0,
      productivityTrend: 'stable',
      streakDays: 0,
      projectedCompletion: 'Unknown'
    };
  }
  
  // Calculate weekly growth
  const thisWeek = snapshots.slice(0, 7);
  const lastWeek = snapshots.slice(7, 14);
  
  const thisWeekTotal = thisWeek.reduce((sum, s) => sum + s.metrics.nomineesSubmitted, 0);
  const lastWeekTotal = lastWeek.reduce((sum, s) => sum + s.metrics.nomineesSubmitted, 0);
  
  const weeklyGrowth = lastWeekTotal > 0 ? ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100 : 0;
  
  // Calculate average quality
  const averageQuality = snapshots.reduce((sum, s) => sum + s.metrics.qualityScore, 0) / snapshots.length;
  
  // Determine productivity trend
  const recentAvg = snapshots.slice(0, 7).reduce((sum, s) => sum + s.metrics.nomineesSubmitted, 0) / 7;
  const olderAvg = snapshots.slice(7, 14).reduce((sum, s) => sum + s.metrics.nomineesSubmitted, 0) / 7;
  
  let productivityTrend: 'up' | 'down' | 'stable' = 'stable';
  if (recentAvg > olderAvg * 1.1) productivityTrend = 'up';
  else if (recentAvg < olderAvg * 0.9) productivityTrend = 'down';
  
  // Calculate streak days
  let streakDays = 0;
  for (const snapshot of snapshots) {
    if (snapshot.metrics.nomineesSubmitted > 0) {
      streakDays++;
    } else {
      break;
    }
  }
  
  // Project completion (simplified)
  const currentTotal = snapshots[0]?.metrics.nomineesSubmitted || 0;
  const target = 200; // Default target
  const dailyRate = thisWeekTotal / 7;
  const remainingDays = dailyRate > 0 ? Math.ceil((target - currentTotal) / dailyRate) : 0;
  
  const projectedDate = new Date();
  projectedDate.setDate(projectedDate.getDate() + remainingDays);
  
  return {
    weeklyGrowth: Math.round(weeklyGrowth * 100) / 100,
    averageQuality: Math.round(averageQuality * 100) / 100,
    productivityTrend,
    streakDays,
    projectedCompletion: remainingDays > 0 ? projectedDate.toLocaleDateString() : 'Target reached!'
  };
};

// Milestone progress tracking based on actual data
export const updateMilestonesFromData = (userId: string, nomineesData: any[]): void => {
  const milestones = getMilestonesFromStorage();

  // Update nominee count milestones
  const totalNominees = nomineesData.length;
  const highQualityNominees = nomineesData.filter(n => n.completionScore >= 90).length;

  updateMilestoneProgress('first-nominee', Math.min(1, totalNominees));
  updateMilestoneProgress('ten-nominees', Math.min(10, totalNominees));
  updateMilestoneProgress('fifty-nominees', Math.min(50, totalNominees));
  updateMilestoneProgress('hundred-nominees', Math.min(100, totalNominees));
  updateMilestoneProgress('quality-expert', Math.min(10, highQualityNominees));

  // Calculate streak (simplified - would need actual date tracking)
  const recentDays = 7; // Mock calculation
  updateMilestoneProgress('weekly-streak', recentDays);
};

// Get milestone completion percentage
export const getMilestoneCompletionRate = (userId: string): number => {
  const milestones = getUserMilestones(userId);
  if (milestones.length === 0) return 0;

  const completedCount = milestones.filter(m => m.isCompleted).length;
  return Math.round((completedCount / milestones.length) * 100);
};

// Get next milestone to focus on
export const getNextMilestone = (userId: string): Milestone | null => {
  const milestones = getUserMilestones(userId);
  const incompleteMilestones = milestones
    .filter(m => !m.isCompleted)
    .sort((a, b) => {
      // Sort by priority and progress
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];

      if (aPriority !== bPriority) return bPriority - aPriority;

      // If same priority, sort by progress percentage
      const aProgress = (a.current / a.target) * 100;
      const bProgress = (b.current / b.target) * 100;

      return bProgress - aProgress;
    });

  return incompleteMilestones[0] || null;
};

// Performance scoring
export const calculatePerformanceScore = (userId: string): {
  overall: number;
  productivity: number;
  quality: number;
  consistency: number;
  engagement: number;
} => {
  const snapshots = getUserProgressSnapshots(userId, 30);
  const milestones = getUserMilestones(userId);

  if (snapshots.length === 0) {
    return { overall: 0, productivity: 0, quality: 0, consistency: 0, engagement: 0 };
  }

  // Productivity score (based on nominees submitted)
  const avgDaily = snapshots.reduce((sum, s) => sum + s.metrics.nomineesSubmitted, 0) / snapshots.length;
  const productivity = Math.min(100, (avgDaily / 10) * 100); // 10 nominees per day = 100%

  // Quality score (average quality)
  const quality = snapshots.reduce((sum, s) => sum + s.metrics.qualityScore, 0) / snapshots.length;

  // Consistency score (based on active days)
  const activeDays = snapshots.filter(s => s.metrics.nomineesSubmitted > 0).length;
  const consistency = Math.min(100, (activeDays / 30) * 100);

  // Engagement score (based on milestones completed)
  const completedMilestones = milestones.filter(m => m.isCompleted).length;
  const engagement = Math.min(100, (completedMilestones / milestones.length) * 100);

  // Overall score (weighted average)
  const overall = Math.round(
    (productivity * 0.3 + quality * 0.3 + consistency * 0.2 + engagement * 0.2)
  );

  return {
    overall,
    productivity: Math.round(productivity),
    quality: Math.round(quality),
    consistency: Math.round(consistency),
    engagement: Math.round(engagement)
  };
};
