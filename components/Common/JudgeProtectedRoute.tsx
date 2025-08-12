"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { AlertTriangle, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface JudgeProtectedRouteProps {
  children: React.ReactNode;
  requireActiveJudge?: boolean;
}

interface JudgeStatus {
  isJudge: boolean;
  isActive: boolean;
  applicationStatus?: string;
  loading: boolean;
  error?: string;
}

const JudgeProtectedRoute: React.FC<JudgeProtectedRouteProps> = ({ 
  children, 
  requireActiveJudge = true 
}) => {
  const { user, isAuthenticated, isLoading, userRole } = useAuthContext();
  const [judgeStatus, setJudgeStatus] = useState<JudgeStatus>({
    isJudge: false,
    isActive: false,
    loading: true
  });
  const router = useRouter();

  useEffect(() => {
    const checkJudgeStatus = async () => {
      if (!isAuthenticated || !user) {
        setJudgeStatus({ isJudge: false, isActive: false, loading: false });
        return;
      }

      // Check if user has Judge role
      const isJudge = userRole === 'Judge' || user.role === 'Judge';
      
      if (!isJudge) {
        setJudgeStatus({ isJudge: false, isActive: false, loading: false });
        return;
      }

      // If requireActiveJudge is false, just being a judge is enough
      if (!requireActiveJudge) {
        setJudgeStatus({ isJudge: true, isActive: true, loading: false });
        return;
      }

      // Check judge application status for active status
      try {
        const response = await fetch(`/api/judge-apply/status?email=${encodeURIComponent(user.email)}`);
        const data = await response.json();

        if (data.success) {
          const isActive = data.application.current_status === 'active' || 
                          data.application.current_status === 'account_created';
          
          setJudgeStatus({
            isJudge: true,
            isActive,
            applicationStatus: data.application.current_status,
            loading: false
          });
        } else {
          // If no application found but user has Judge role, consider them active
          // This handles cases where judges were created through other means
          setJudgeStatus({
            isJudge: true,
            isActive: true,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error checking judge status:', error);
        // On error, if user has Judge role, allow access
        setJudgeStatus({
          isJudge: true,
          isActive: true,
          loading: false,
          error: 'Could not verify judge status'
        });
      }
    };

    if (!isLoading) {
      checkJudgeStatus();
    }
  }, [isAuthenticated, user, userRole, isLoading, requireActiveJudge]);

  // Show loading state
  if (isLoading || judgeStatus.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying judge access...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!isAuthenticated || !user) {
    router.push('/account/login?redirect=' + encodeURIComponent(window.location.pathname));
    return null;
  }

  // User is not a judge
  if (!judgeStatus.isJudge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You need to be a certified NESA-Africa judge to access this area.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/judge-application-form"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Apply as Judge
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is a judge but not active (if required)
  if (requireActiveJudge && !judgeStatus.isActive) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Judge Account Pending</h2>
            <p className="text-gray-600 mb-4">
              Your judge application is still being processed.
            </p>
            {judgeStatus.applicationStatus && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Status:</span> {judgeStatus.applicationStatus.replace('_', ' ')}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/judge-status"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Check Status
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User has proper judge access
  return <>{children}</>;
};

export default JudgeProtectedRoute;
