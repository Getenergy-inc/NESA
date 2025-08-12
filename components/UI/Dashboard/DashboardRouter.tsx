"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import IndividualDashboard from './IndividualDashboard';
import OrganizationDashboard from './OrganizationDashboard';
import AmbassadorDashboard from './AmbassadorDashboard';
import JudgeDashboard from './JudgeDashboard';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { DashboardErrorBoundary } from '@/components/Common/ErrorBoundary';

const DashboardRouter: React.FC = () => {
  const { user, isAuthenticated, isLoading, accountType } = useAuthContext();
  const router = useRouter();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push('/account/login');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Determine dashboard based on account type and user intents
  const getDashboardComponent = () => {
    // Check if user has judge intent
    if (user?.intents?.includes('Apply as Judge') || user?.role === 'judge') {
      return <JudgeDashboard />;
    }

    // Check if user has ambassador intent
    if (user?.intents?.includes('Become Ambassador') || user?.role === 'ambassador') {
      return <AmbassadorDashboard />;
    }

    // Check if user has NRC Volunteer intent
    if (user?.intents?.includes('Apply as NRC Volunteer') || user?.role === 'NRC Volunteer') {
      // Redirect to NRC dashboard instead of showing a component here
      window.location.href = '/get-involved/nrc-volunteer/dashboard';
      return <div>Redirecting to NRC Dashboard...</div>;
    }

    // Route based on account type
    switch (accountType || user?.accountType) {
      case 'Individual':
        return <IndividualDashboard />;
      
      case 'NGO':
      case 'Corporation':
      case 'Government':
      case 'School':
      case 'Diaspora Group':
        return <OrganizationDashboard />;
      
      default:
        // Default to individual dashboard
        return <IndividualDashboard />;
    }
  };

  return (
    <DashboardErrorBoundary>
      {getDashboardComponent()}
    </DashboardErrorBoundary>
  );
};

export default DashboardRouter;
