'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle, Target, Award } from 'lucide-react';

export default function TimelinePage() {
  const timelineEvents = [
    {
      id: 1,
      title: 'NRC Program Launch',
      date: '2025-07-15',
      status: 'upcoming',
      description: 'Official launch of the NESA Research Corps program. Volunteer onboarding begins.',
      icon: <Award className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 2,
      title: 'First Milestone Check',
      date: '2025-07-22',
      status: 'upcoming',
      description: 'First week progress review. Target: 25+ verified profiles per volunteer.',
      icon: <Target className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 3,
      title: 'Mid-Program Review',
      date: '2025-08-01',
      status: 'upcoming',
      description: 'Halfway point assessment. Target: 100+ verified profiles per volunteer.',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'yellow'
    },
    {
      id: 4,
      title: 'Final Sprint Begins',
      date: '2025-08-10',
      status: 'upcoming',
      description: 'Last 10 days push to reach the 200+ profile target.',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'orange'
    },
    {
      id: 5,
      title: 'Program Completion',
      date: '2025-08-20',
      status: 'upcoming',
      description: 'Final submissions deadline. Target: 200+ verified profiles per volunteer.',
      icon: <Award className="w-5 h-5" />,
      color: 'red'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      case 'orange': return 'bg-orange-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#ea580c]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Program Timeline</h1>
              <p className="text-gray-600 mt-2">Key dates and milestones for the NRC program</p>
            </div>
          </div>
        </motion.div>

        {/* Program Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Program Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Duration</h3>
              <p className="text-gray-600">36 days</p>
              <p className="text-sm text-gray-500">July 15 - August 20, 2025</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Target</h3>
              <p className="text-gray-600">200+ Profiles</p>
              <p className="text-sm text-gray-500">Per volunteer</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Reward</h3>
              <p className="text-gray-600">AGC Tokens</p>
              <p className="text-sm text-gray-500">Based on performance</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Key Milestones</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start"
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getIconColor(event.color)} shadow-lg`}>
                    {event.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <div className={`border rounded-lg p-4 ${getStatusColor(event.status)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <div className="text-right">
                          <div className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</div>
                          <div className="text-xs opacity-75">{getDaysUntil(event.date)}</div>
                        </div>
                      </div>
                      <p className="text-sm opacity-90">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Weekly Targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Targets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Week 1</h3>
              <p className="text-blue-700">50 profiles</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Week 2</h3>
              <p className="text-green-700">50 profiles</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold text-yellow-900">Week 3</h3>
              <p className="text-yellow-700">50 profiles</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-red-900">Week 4-5</h3>
              <p className="text-red-700">50+ profiles</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}