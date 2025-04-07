// components/Dashboard/NominationStatus.tsx
'use client';
import React from 'react';
import { FiUserPlus, FiCheckCircle, FiClock, FiUser, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const NominationStatus: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiUserPlus className="mr-2 text-teal-600" size={20} />
          Nomination Status
        </h2>
      </div>
      
      <div className="px-6 py-4 space-y-4">
        <div className="flex items-start space-x-3">
          <div className={`mt-1 p-1 rounded-full ${true ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            <FiCheckCircle size={18} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">Nominee 1</p>
                <p className="text-sm text-gray-500">John Smith</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                Approved
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Submitted: 15 Jan 2023</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className={`mt-1 p-1 rounded-full ${false ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            <FiClock size={18} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">Nominee 2</p>
                <p className="text-sm text-gray-500">Sarah Johnson</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Pending Review
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Submitted: 28 Feb 2023</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex space-x-3">
        <button 
          onClick={() => router.push('/nominations')}
          className="flex-1 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          <FiEye className="mr-2" size={16} />
          View All
        </button>
        <button className="flex-1 flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors">
          <FiUserPlus className="mr-2" size={16} />
          Nominate
        </button>
      </div>
    </div>
  );
};

export default NominationStatus;