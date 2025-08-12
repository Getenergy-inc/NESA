"use client";

import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  href: string;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  href,
  onClick
}) => {
  const colorClasses = {
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      hover: 'hover:bg-orange-100'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:bg-green-100'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-100'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:bg-red-100'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-200',
      hover: 'hover:bg-yellow-100'
    }
  };

  const colors = colorClasses[color];

  const CardContent = () => (
    <div className={`
      p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer group
      ${colors.bg} ${colors.border} ${colors.hover}
      hover:shadow-md hover:scale-105
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-white ${colors.border} border`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <ArrowRight className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>
      
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        <CardContent />
      </button>
    );
  }

  return (
    <Link href={href} className="block">
      <CardContent />
    </Link>
  );
};

export default QuickActionCard;
