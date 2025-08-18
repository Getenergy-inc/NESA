"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getDashboardRoute, hasPermission, getDashboardFeatures } from '@/lib/utils/roleBasedAccess';
import IndividualDashboard from './IndividualDashboard';
import OrganizationDashboard from './OrganizationDashboard';
import AmbassadorDashboard from './AmbassadorDashboard';
import JudgeDashboard from './JudgeDashboard';
import SponsorDashboard from './SponsorDashboard';
import VolunteerDashboard from './VolunteerDashboard';
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

  // Determine dashboard based on user role using RBAC system
  const getDashboardComponent = () => {
    if (!user?.role) {
      return <IndividualDashboard />;
    }

    // Normalize role to uppercase for consistency
    const normalizedRole = user.role.toUpperCase();

    // Use RBAC system to determine dashboard
    switch (normalizedRole) {
      case 'JUDGE':
        if (hasPermission(normalizedRole as any, 'judge_nominations')) {
          return <JudgeDashboard />;
        }
        break;

      case 'AMBASSADOR':
        if (hasPermission(normalizedRole as any, 'manage_chapter')) {
          return <AmbassadorDashboard />;
        }
        break;

      case 'NRC_VOLUNTEER':
        if (hasPermission(normalizedRole as any, 'manage_nrc')) {
          // Redirect to specialized NRC dashboard
          const nrcRoute = getDashboardRoute(normalizedRole as any);
          window.location.href = nrcRoute;
          return <div>Redirecting to NRC Dashboard...</div>;
        }
        break;

      case 'SPONSOR':
        if (hasPermission(normalizedRole as any, 'sponsor_events')) {
          return <SponsorDashboard />;
        }
        break;

      case 'VOLUNTEER':
      case 'INTERN':
        if (hasPermission(normalizedRole as any, 'volunteer_tasks')) {
          return <VolunteerDashboard />;
        }
        break;

      case 'ADMIN':
      case 'SUPER_ADMIN':
        if (hasPermission(normalizedRole as any, 'admin_access')) {
          const adminRoute = getDashboardRoute(normalizedRole as any);
          window.location.href = adminRoute;
          return <div>Redirecting to Admin Dashboard...</div>;
        }
        break;

      case 'CHAPTER_LEADER':
        if (hasPermission(normalizedRole as any, 'manage_chapter')) {
          return <AmbassadorDashboard />; // Reuse ambassador dashboard for chapter leaders
        }
        break;
    }

    // Priority 2: Check user intents (fallback for legacy users)
    if (user?.intents?.includes('Apply as Judge')) {
      return <JudgeDashboard />;
    }
    if (user?.intents?.includes('Become Ambassador')) {
      return <AmbassadorDashboard />;
    }
    if (user?.intents?.includes('Apply as NRC Volunteer')) {
      window.location.href = '/get-involved/nrc-volunteer/dashboard';
      return <div>Redirecting to NRC Dashboard...</div>;
    }
    if (user?.intents?.includes('Sponsor or CSR Partner')) {
      return <SponsorDashboard />;
    }
    if (user?.intents?.includes('Join NESA Team')) {
      return <VolunteerDashboard />;
    }

    // Priority 3: Route based on account type
    switch (accountType || user?.accountType) {
      case 'Individual':
      case 'INDIVIDUAL':
        return <IndividualDashboard />;

      case 'NGO':
      case 'Corporation':
      case 'Government':
      case 'School':
      case 'Diaspora Group':
      case 'DIASPORA_GROUP':
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
