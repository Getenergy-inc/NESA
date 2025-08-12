// components/Dashboard/NominationStatus.tsx
'use client';
import React from 'react';
import { FiUserPlus, FiCheckCircle, FiClock, FiUser, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const NominationStatus: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-[#191307] rounded-lg overflow-hidden w-full h-auto flex flex-col">
      <div className="p-4 flex-grow">
        <div className="mb-4 flex items-center">
          <FiUserPlus className="mr-2 text-white" size={20} />
          <h2 className="text-white text-lg font-bold">Nomination Status</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className={`mt-1 p-1 rounded-full ${true ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <FiCheckCircle size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">Nominee 1</p>
                  <p className="text-sm text-gray-400">John Smith</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                  Approved
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">Submitted: 15 Jan 2023</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className={`mt-1 p-1 rounded-full ${false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <FiClock size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">Nominee 2</p>
                  <p className="text-sm text-gray-400">Sarah Johnson</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                  Pending Review
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">Submitted: 28 Feb 2023</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex space-x-3">
        <button 
          onClick={() => router.push('/nominations')}
          className="flex-1 flex items-center justify-center bg-transparent hover:bg-gray-800 text-white border border-gray-600 py-2 px-4 rounded-full text-sm font-medium transition-colors"
        >
          <FiEye className="mr-2" size={16} />
          View All
        </button>
        <button 
          className="flex-1 flex items-center justify-center text-black font-semibold py-2 px-4 rounded-full text-sm transition-colors"
          style={{background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'}}
        >
          <FiUserPlus className="mr-2" size={16} />
          Nominate
        </button>
      </div>
    </div>
  );
};

export default NominationStatus;