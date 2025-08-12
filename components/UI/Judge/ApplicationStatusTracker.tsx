"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiX, FiMail, FiUser, FiAward } from 'react-icons/fi';
import { ApplicationStatus, getStatusDisplayInfo, getCompletionPercentage } from '@/lib/services/judgeStatusService';

interface ApplicationStatusTrackerProps {
  currentStatus: ApplicationStatus;
  email: string;
  applicationDate?: string;
  showProgress?: boolean;
  compact?: boolean;
}

const ApplicationStatusTracker: React.FC<ApplicationStatusTrackerProps> = ({
  currentStatus,
  email,
  applicationDate,
  showProgress = true,
  compact = false
}) => {
  const statusSteps: { status: ApplicationStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'submitted', label: 'Application Submitted', icon: <FiMail className="w-4 h-4" /> },
    { status: 'verified', label: 'Email Verified', icon: <FiCheck className="w-4 h-4" /> },
    { status: 'approved', label: 'Application Approved', icon: <FiAward className="w-4 h-4" /> },
    { status: 'account_created', label: 'Account Created', icon: <FiUser className="w-4 h-4" /> },
    { status: 'active', label: 'Active Judge', icon: <FiAward className="w-4 h-4" /> }
  ];

  const currentStatusInfo = getStatusDisplayInfo(currentStatus);
  const completionPercentage = getCompletionPercentage(currentStatus);

  const getStepStatus = (stepStatus: ApplicationStatus) => {
    const statusOrder: ApplicationStatus[] = ['submitted', 'verified', 'approved', 'account_created', 'active'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (currentStatus === 'rejected') {
      return stepIndex === 0 ? 'completed' : 'rejected';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white border-green-500';
      case 'current': return 'bg-orange-500 text-white border-orange-500';
      case 'rejected': return 'bg-red-500 text-white border-red-500';
      default: return 'bg-gray-200 text-gray-500 border-gray-300';
    }
  };

  const getConnectorColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-orange-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
        <div className={`w-3 h-3 rounded-full ${
          currentStatus === 'rejected' ? 'bg-red-500' :
          currentStatus === 'active' ? 'bg-green-500' :
          'bg-orange-500'
        }`}></div>
        <div>
          <div className="text-sm font-medium text-gray-900">
            {currentStatusInfo.icon} {currentStatusInfo.label}
          </div>
          <div className="text-xs text-gray-500">{email}</div>
        </div>
        {showProgress && (
          <div className="ml-auto text-sm font-medium text-gray-600">
            {completionPercentage}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
          <p className="text-sm text-gray-600">{email}</p>
          {applicationDate && (
            <p className="text-xs text-gray-500 mt-1">
              Applied: {new Date(applicationDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            currentStatus === 'rejected' ? 'bg-red-100 text-red-800' :
            currentStatus === 'active' ? 'bg-green-100 text-green-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            <span>{currentStatusInfo.icon}</span>
            {currentStatusInfo.label}
          </div>
          {showProgress && (
            <div className="text-sm text-gray-600 mt-1">
              {completionPercentage}% Complete
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                currentStatus === 'rejected' ? 'bg-red-500' :
                currentStatus === 'active' ? 'bg-green-500' :
                'bg-orange-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Status Steps */}
      <div className="relative">
        {statusSteps.map((step, index) => {
          const stepStatus = getStepStatus(step.status);
          const isLast = index === statusSteps.length - 1;

          return (
            <div key={step.status} className="relative flex items-center">
              {/* Step Circle */}
              <motion.div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStepColor(stepStatus)}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {stepStatus === 'completed' ? (
                  <FiCheck className="w-4 h-4" />
                ) : stepStatus === 'rejected' ? (
                  <FiX className="w-4 h-4" />
                ) : stepStatus === 'current' ? (
                  <FiClock className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </motion.div>

              {/* Step Label */}
              <div className="ml-4 flex-1">
                <div className={`text-sm font-medium ${
                  stepStatus === 'completed' || stepStatus === 'current' 
                    ? 'text-gray-900' 
                    : 'text-gray-500'
                }`}>
                  {step.label}
                </div>
                {stepStatus === 'current' && (
                  <div className="text-xs text-orange-600 mt-1">
                    {currentStatusInfo.description}
                  </div>
                )}
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div 
                  className={`absolute left-4 top-8 w-0.5 h-8 ${getConnectorColor(
                    getStepStatus(statusSteps[index + 1].status) === 'completed' ? 'completed' : 'pending'
                  )}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Status Description */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-700">
          <strong>Current Status:</strong> {currentStatusInfo.description}
        </div>
        {currentStatus === 'submitted' && (
          <div className="text-xs text-gray-600 mt-2">
            💡 Check your email for verification instructions
          </div>
        )}
        {currentStatus === 'verified' && (
          <div className="text-xs text-gray-600 mt-2">
            ⏳ Your application is being reviewed by our team
          </div>
        )}
        {currentStatus === 'approved' && (
          <div className="text-xs text-green-700 mt-2">
            🎉 Congratulations! Check your email for account creation instructions
          </div>
        )}
        {currentStatus === 'rejected' && (
          <div className="text-xs text-red-700 mt-2">
            📧 Please contact support for more information
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatusTracker;
