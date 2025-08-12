"use client";
import React, { useState } from 'react';

interface DonationModalProps {
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose }) => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [fullName, setFullName] = useState('');

interface DonationFormData {
    donationType: string;
    amount: string;
    fullName: string;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle donation submission
    const formData: DonationFormData = {
        donationType,
        amount: customAmount || amount,
        fullName,
    };
    console.log(formData);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Toggle Buttons */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-3 ${donationType === 'once' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => setDonationType('once')}
          >
            Give Once
          </button>
          <button
            className={`flex-1 py-3 ${donationType === 'monthly' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => setDonationType('monthly')}
          >
            Give Monthly
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Amount Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select amount to donate
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <button
                type="button"
                className={`py-2 ${amount === '2,000' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} rounded`}
                onClick={() => setAmount('2,000')}
              >
                2,000
              </button>
              <button
                type="button"
                className={`py-2 ${amount === '5,000' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} rounded`}
                onClick={() => setAmount('5,000')}
              >
                5,000
              </button>
              <button
                type="button"
                className={`py-2 ${amount === '8,000' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} rounded`}
                onClick={() => setAmount('8,000')}
              >
                8,000
              </button>
              <button
                type="button"
                className={`py-2 ${amount === '10,000' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} rounded`}
                onClick={() => setAmount('10,000')}
              >
                10,000
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 mb-2">or</div>

            {/* Custom Amount Input */}
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter an amount to donate"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount('');
              }}
            />
          </div>

          {/* Security Note */}
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Donations are secured by GetIn Africa
          </div>

          {/* Donate Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FFC247] text-gray-800 rounded-md hover:bg-[#FFC247] transition duration-300"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;