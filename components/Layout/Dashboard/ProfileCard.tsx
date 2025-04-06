// components/Dashboard/ProfileCard.tsx
'use client';
import React from 'react';
import { FiUser, FiEdit, FiMapPin, FiMail, FiSliders } from 'react-icons/fi';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiUser className="mr-2 text-indigo-600" size={20} />
          Profile Management
        </h2>
      </div>
      
      <div className="px-6 py-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <FiUser className="text-indigo-600" size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Account Status</p>
            <p className="text-sm font-semibold text-gray-800">Verified Member</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <FiMapPin className="text-indigo-600" size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Region</p>
            <p className="text-sm font-semibold text-gray-800">North America</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <FiSliders className="text-indigo-600" size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Preferences</p>
            <p className="text-sm font-semibold text-gray-800">Email Notifications</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <button className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors">
          <FiEdit className="mr-2" size={16} />
          Edit Profile Settings
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;