'use client';
import { ArrowRight, Zap, Users, Award, BarChart, TrendingUp, TrendingDown, Minus, Flame, Trophy } from 'lucide-react';
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  value?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  actionText?: string;
  icon?: 'users' | 'award' | 'activity' | 'zap';
  category?: 'trending' | 'top' | 'new';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  value,
  trend,
  actionText = 'View details',
  icon,
  category
}) => {
  const iconMap = {
    users: <Users className="w-5 h-5" />,
    award: <Award className="w-5 h-5" />,
    activity: <BarChart className="w-5 h-5" />,
    zap: <Zap className="w-5 h-5" />
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    neutral: <Minus className="w-4 h-4" />
  };

  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  const categoryStyles = {
    trending: {
      icon: <Flame className="w-4 h-4" />,
      bg: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400'
    },
    top: {
      icon: <Trophy className="w-4 h-4" />,
      bg: 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400'
    },
    new: {
      icon: <span className="w-4 h-4 flex items-center justify-center text-xs">NEW</span>,
      bg: 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400'
    }
  };

  return (
    <div className="group bg-[#191307] rounded-lg overflow-hidden w-full h-auto flex flex-col border border-[#2A2108] hover:border-[#E48900]/30 transition-all duration-300 relative">
      {/* Category badge */}
      {category && (
        <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryStyles[category].bg} ${categoryStyles[category].border} ${categoryStyles[category].text}`}>
          {categoryStyles[category].icon}
          <span className="capitalize">{category}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b border-[#2A2108]">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {icon && (
                <div className="p-2 rounded-lg" style={{ background: 'rgba(255, 194, 71, 0.1)' }}>
                  {React.cloneElement(iconMap[icon], { style: { color: '#FFC247' } })}
                </div>
              )}
              <h2 className="text-lg font-bold text-white">{title}</h2>
            </div>
            {value && (
              <p className="text-2xl font-bold text-white flex items-center">
                {value}
                {trend && (
                  <span className={`ml-2 text-sm font-medium flex items-center gap-1 ${trendColors[trend]}`}>
                    {trendIcons[trend]}
                    {trend === 'up' && '12%'}
                    {trend === 'down' && '5%'}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow">
        <p className="text-gray-400 mb-4">{description}</p>
        
        {/* Voting progress bar (new addition) */}
        <div className="mt-4 mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Voting progress</span>
            <span>72%</span>
          </div>
          <div className="w-full bg-[#1E1A0F] rounded-full h-2">
            <div 
              className="h-2 rounded-full" 
              style={{
                width: '72%',
                background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#2A2108] flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users className="w-4 h-4" />
          <span>1,428 voters</span>
        </div>
        <button 
          className="flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-colors"
          style={{ 
            background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
            color: 'black'
          }}
        >
          {actionText}
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>

      {/* Hover effect accent */}
      <div className="h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default DashboardCard;