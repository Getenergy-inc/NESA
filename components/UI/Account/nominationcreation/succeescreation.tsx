import React from 'react';
import { X } from 'lucide-react';

interface SuccessCreationProps {
  onClose: () => void;
  onViewWallet: () => void;
  onStartNominating: () => void;
}

const SuccessCreation: React.FC<SuccessCreationProps> = ({ onClose, onViewWallet, onStartNominating }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={24} />
        </button>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{
            background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Account Creation Successful!</h2>
        <p className="text-center mb-6">
          Your Nomination account has been successfully created and you have been given 3 Afrigold-coin to vote when voting starts
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onViewWallet}
            className="px-4 py-2 border border-[#FFC247] text-[#FFC247] rounded-lg hover:bg-[#FFF9ED]"
          >
            View wallet balance
          </button>
          <button
            onClick={onStartNominating}
            className="px-4 py-2 text-black font-bold rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
            }}
          >
            Start nominating
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessCreation;