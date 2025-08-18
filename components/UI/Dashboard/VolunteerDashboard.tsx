"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  Award,
  MessageSquare,
  FileText,
  Target
} from 'lucide-react';
import Button from '@/components/Common/Button';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  category: string;
}

interface VolunteerMetrics {
  tasksCompleted: number;
  hoursContributed: number;
  eventsSupported: number;
  impactScore: number;
}

const VolunteerDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<VolunteerMetrics | null>(null);
  const [tasks, setTasks] = useState<VolunteerTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with real API calls
    setTimeout(() => {
      setMetrics({
        tasksCompleted: 24,
        hoursContributed: 156,
        eventsSupported: 8,
        impactScore: 92
      });

      setTasks([
        {
          id: '1',
          title: 'Review Nomination Applications',
          description: 'Review and validate 15 nomination applications for completeness',
          priority: 'high',
          status: 'pending',
          dueDate: '2025-01-25',
          category: 'Review'
        },
        {
          id: '2',
          title: 'Event Setup Support',
          description: 'Help with setup for the regional awards ceremony',
          priority: 'medium',
          status: 'in_progress',
          dueDate: '2025-01-30',
          category: 'Events'
        },
        {
          id: '3',
          title: 'Social Media Content Creation',
          description: 'Create promotional content for upcoming webinar',
          priority: 'medium',
          status: 'pending',
          dueDate: '2025-02-01',
          category: 'Marketing'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const updateTaskStatus = (taskId: string, newStatus: VolunteerTask['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
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
              <h1 className="text-2xl font-bold text-gray-900">Volunteer Dashboard</h1>
              <p className="text-gray-600">
                Welcome back! Here are your current assignments and impact metrics.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                text="Team Chat"
                variant="outline"
                className="flex items-center gap-2"
                icon={<MessageSquare className="w-4 h-4" />}
              />
              <Button
                text="View Guidelines"
                className="flex items-center gap-2"
                icon={<FileText className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.tasksCompleted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours Contributed</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.hoursContributed}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Events Supported</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.eventsSupported}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.impactScore}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Current Tasks */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Current Tasks</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: {task.category}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {task.status === 'pending' && (
                        <Button
                          text="Start Task"
                          size="small"
                          onClick={() => updateTaskStatus(task.id, 'in_progress')}
                        />
                      )}
                      {task.status === 'in_progress' && (
                        <Button
                          text="Mark Complete"
                          size="small"
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                        />
                      )}
                      {task.status === 'completed' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <Button
                  text="Join Team Meeting"
                  variant="outline"
                  className="w-full justify-start"
                  icon={<Users className="w-4 h-4 mr-2" />}
                />
                <Button
                  text="Submit Time Report"
                  variant="outline"
                  className="w-full justify-start"
                  icon={<FileText className="w-4 h-4 mr-2" />}
                />
                <Button
                  text="View Recognition"
                  variant="outline"
                  className="w-full justify-start"
                  icon={<Award className="w-4 h-4 mr-2" />}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Completed nomination review</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Attended team meeting</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Received volunteer recognition</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
