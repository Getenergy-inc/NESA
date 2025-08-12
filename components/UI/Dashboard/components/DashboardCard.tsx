"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  color: 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  suffix = '',
  prefix = '',
  icon: Icon,
  color,
  description,
  trend
}) => {
  const colorClasses = {
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-1">
            {prefix && <span className="text-lg text-gray-500">{prefix}</span>}
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {suffix && <span className="text-lg text-gray-500">{suffix}</span>}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
