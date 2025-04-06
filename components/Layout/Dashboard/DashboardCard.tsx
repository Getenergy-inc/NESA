// components/Dashboard/DashboardCard.tsx
'use client';
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      <div className="px-6 py-5">
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;