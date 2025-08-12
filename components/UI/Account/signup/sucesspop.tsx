import React from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SuccessPopupProps {
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleNominate = () => {
    router.push('/categories');
  };

  const gradientStyle = {
    background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={gradientStyle}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Congratulations</h2>
          <p className="text-gray-600 mb-6">
            You have successfully created your account as a nominee, you can also visit other categories to nominate yourself or other people striving for the empowerment of education for all in Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoHome}
              className="bg-white font-semibold py-2 px-4 border border-gray-400 rounded-lg flex-1"
              style={{ color: '#E48900' }}
            >
              Go to homepage
            </button>
            <button
              onClick={handleNominate}
              className="text-black font-semibold py-2 px-4 rounded-lg flex-1"
              style={gradientStyle}
            >
              Nominate in other categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;