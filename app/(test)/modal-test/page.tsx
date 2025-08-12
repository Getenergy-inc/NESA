"use client";

import React, { useState } from 'react';
import { FiCheckCircle, FiX, FiAlertTriangle } from 'react-icons/fi';
import Modal, { ConfirmationModal, SuccessModal, ErrorModal } from '@/components/UI/Common/Modal';

const ModalTestPage: React.FC = () => {
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showLargeModal, setShowLargeModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowConfirmationModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Modal Component Testing</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test All Modal Types</h2>
          <p className="text-gray-600 mb-6">
            Click the buttons below to test different modal types and ensure they are properly positioned 
            and responsive across all screen sizes.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setShowBasicModal(true)}
              className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Basic Modal
            </button>
            
            <button
              onClick={() => setShowConfirmationModal(true)}
              className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Confirmation Modal
            </button>
            
            <button
              onClick={() => setShowSuccessModal(true)}
              className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Success Modal
            </button>
            
            <button
              onClick={() => setShowErrorModal(true)}
              className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Error Modal
            </button>
            
            <button
              onClick={() => setShowLargeModal(true)}
              className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Large Modal
            </button>
            
            <button
              onClick={() => setShowSmallModal(true)}
              className="p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              Small Modal
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Testing Checklist</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="center" className="rounded" />
              <label htmlFor="center">Modals are centered horizontally and vertically</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="backdrop" className="rounded" />
              <label htmlFor="backdrop">Backdrop covers entire viewport</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="responsive" className="rounded" />
              <label htmlFor="responsive">Modals are responsive on mobile devices</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="scroll" className="rounded" />
              <label htmlFor="scroll">Long content scrolls properly within modal</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="zindex" className="rounded" />
              <label htmlFor="zindex">Modals appear above all other content</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="escape" className="rounded" />
              <label htmlFor="escape">Escape key closes modals</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="backdrop-click" className="rounded" />
              <label htmlFor="backdrop-click">Clicking backdrop closes modal</label>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={showBasicModal}
        onClose={() => setShowBasicModal(false)}
        title="Basic Modal"
        size="md"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            This is a basic modal with standard content. It should be properly centered 
            and responsive across all screen sizes.
          </p>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris.
          </p>
          <button
            onClick={() => setShowBasicModal(false)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Close Modal
          </button>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirm}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action? This will simulate a loading state."
        confirmText="Yes, Proceed"
        cancelText="Cancel"
        isLoading={isLoading}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success!"
        message="Your action has been completed successfully. This modal demonstrates the success state."
        buttonText="Great!"
        icon={
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <FiCheckCircle className="w-10 h-10 text-white" />
          </div>
        }
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Something went wrong"
        message="An error occurred while processing your request. Please try again or contact support if the problem persists."
        buttonText="Try Again"
      />

      {/* Large Modal */}
      <Modal
        isOpen={showLargeModal}
        onClose={() => setShowLargeModal(false)}
        title="Large Modal with Scrollable Content"
        size="lg"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            This is a large modal that demonstrates scrollable content when the content 
            exceeds the viewport height.
          </p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-gray-600 mb-3">
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat.
            </p>
          ))}
          <button
            onClick={() => setShowLargeModal(false)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Close Large Modal
          </button>
        </div>
      </Modal>

      {/* Small Modal */}
      <Modal
        isOpen={showSmallModal}
        onClose={() => setShowSmallModal(false)}
        title="Small Modal"
        size="sm"
      >
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertTriangle className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-700 mb-4">
            This is a small modal for simple messages or confirmations.
          </p>
          <button
            onClick={() => setShowSmallModal(false)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalTestPage;
