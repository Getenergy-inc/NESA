'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Target,
  Calendar,
  Award,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Flag
} from 'lucide-react';
import Button from '@/components/Common/Button';
import {
  getUserMilestones,
  createCustomMilestone,
  updateMilestoneProgress,
  type Milestone
} from '@/lib/services/progressTrackingService';
import { showToast } from './UXEnhancer';

interface MilestoneManagerProps {
  userId: string;
  onMilestoneUpdate?: () => void;
}

const MilestoneManager: React.FC<MilestoneManagerProps> = ({ userId, onMilestoneUpdate }) => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    title: '',
    description: '',
    target: 1,
    current: 0,
    unit: 'nominees',
    category: 'individual',
    priority: 'medium'
  });

  useEffect(() => {
    loadMilestones();
  }, [userId]);

  const loadMilestones = () => {
    const userMilestones = getUserMilestones(userId);
    setMilestones(userMilestones);
  };

  const handleCreateMilestone = () => {
    if (!newMilestone.title || !newMilestone.description || !newMilestone.target) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    try {
      const milestoneId = createCustomMilestone({
        title: newMilestone.title!,
        description: newMilestone.description!,
        target: newMilestone.target!,
        current: newMilestone.current || 0,
        unit: newMilestone.unit || 'nominees',
        category: newMilestone.category || 'individual',
        priority: newMilestone.priority || 'medium',
        isCompleted: false,
        deadline: newMilestone.deadline,
        reward: newMilestone.reward
      });

      showToast({
        type: 'success',
        title: 'Milestone Created',
        message: `"${newMilestone.title}" has been added to your milestones`
      });

      setNewMilestone({
        title: '',
        description: '',
        target: 1,
        current: 0,
        unit: 'nominees',
        category: 'individual',
        priority: 'medium'
      });
      setIsCreating(false);
      loadMilestones();
      onMilestoneUpdate?.();
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to create milestone'
      });
    }
  };

  const handleUpdateProgress = (milestoneId: string, progress: number) => {
    updateMilestoneProgress(milestoneId, progress);
    loadMilestones();
    onMilestoneUpdate?.();
    
    showToast({
      type: 'success',
      title: 'Progress Updated',
      message: 'Milestone progress has been updated'
    });
  };

  const getMilestoneIcon = (milestone: Milestone) => {
    if (milestone.isCompleted) return <CheckCircle className="w-5 h-5 text-green-600" />;
    
    const progress = (milestone.current / milestone.target) * 100;
    if (progress >= 75) return <Target className="w-5 h-5 text-orange-600" />;
    if (progress >= 50) return <Clock className="w-5 h-5 text-blue-600" />;
    return <Flag className="w-5 h-5 text-gray-600" />;
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

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return <span className="text-red-600">Overdue</span>;
    if (diffDays === 0) return <span className="text-orange-600">Due today</span>;
    if (diffDays <= 7) return <span className="text-yellow-600">{diffDays} days left</span>;
    return <span className="text-gray-600">{date.toLocaleDateString()}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-[#ea580c]" />
          Milestone Manager
        </h2>
        <Button
          text="Add Milestone"
          onClick={() => setIsCreating(true)}
          variant="filled"
          className="bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Create Milestone Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Milestone</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newMilestone.title || ''}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Enter milestone title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newMilestone.priority || 'medium'}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={newMilestone.description || ''}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  rows={3}
                  placeholder="Describe what needs to be accomplished"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target *
                </label>
                <input
                  type="number"
                  min="1"
                  value={newMilestone.target || 1}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, target: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  value={newMilestone.unit || 'nominees'}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, unit: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                >
                  <option value="nominees">Nominees</option>
                  <option value="applications">Applications</option>
                  <option value="days">Days</option>
                  <option value="points">Points</option>
                  <option value="tasks">Tasks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={newMilestone.deadline || ''}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reward (Optional)
                </label>
                <input
                  type="text"
                  value={newMilestone.reward || ''}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, reward: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Badge, recognition, etc."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                text="Create Milestone"
                onClick={handleCreateMilestone}
                variant="filled"
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                text="Cancel"
                onClick={() => setIsCreating(false)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No milestones yet</p>
            <p className="text-sm">Create your first milestone to start tracking progress!</p>
          </div>
        ) : (
          milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-l-4 p-4 rounded-lg ${getPriorityColor(milestone.priority)} ${
                milestone.isCompleted ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getMilestoneIcon(milestone)}
                  <div>
                    <h3 className={`font-medium ${milestone.isCompleted ? 'line-through text-gray-600' : 'text-gray-900'}`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(milestone.priority)}`}>
                    {milestone.priority}
                  </span>
                  {milestone.isCompleted && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    Progress: {milestone.current} / {milestone.target} {milestone.unit}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round((milestone.current / milestone.target) * 100)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      milestone.isCompleted ? 'bg-green-500' : 'bg-[#ea580c]'
                    }`}
                    style={{ width: `${Math.min(100, (milestone.current / milestone.target) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {milestone.deadline && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDeadline(milestone.deadline)}
                    </div>
                  )}
                  {milestone.reward && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {milestone.reward}
                    </div>
                  )}
                </div>

                {!milestone.isCompleted && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={milestone.target}
                      value={milestone.current}
                      onChange={(e) => handleUpdateProgress(milestone.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#ea580c] focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600">/ {milestone.target}</span>
                  </div>
                )}
              </div>

              {milestone.isCompleted && milestone.completedAt && (
                <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Completed on {new Date(milestone.completedAt).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MilestoneManager;
