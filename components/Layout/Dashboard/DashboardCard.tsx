'use client';
import { ArrowRight, Zap, Users, Award, BarChart } from 'lucide-react';
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  value?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  actionText?: string;
  icon?: 'users' | 'award' | 'activity' | 'zap';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  value,
  trend,
  actionText = 'View more',
  icon
}) => {
  const iconMap = {
    users: <Users className="w-5 h-5 text-yellow-400" />,
    award: <Award className="w-5 h-5 text-yellow-400" />,
    activity: <BarChart className="w-5 h-5 text-yellow-400" />,
    zap: <Zap className="w-5 h-5 text-yellow-400" />
  };

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <div className="group bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="bg-gray-900 px-6 py-5 border-b border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {icon && (
                <div className="bg-yellow-600 p-2 rounded-lg">
                  {iconMap[icon]}
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
            </div>
            {value && (
              <p className="text-2xl font-bold text-gray-100 flex items-center">
                {value}
                {trend && (
                  <span className={`ml-2 text-sm font-medium ${trendColors[trend]}`}>
                    {trend === 'up' ? '↑ 12%' : trend === 'down' ? '↓ 5%' : '→'}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="text-white mb-4">{description}</p>
        <button className="inline-flex items-center bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-medium px-4 py-2 rounded-lg transition-colors">
          {actionText}
          <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      {/* Hover effect accent */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default DashboardCard;