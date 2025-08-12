"use client";

import React from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import PublicLayout from './PublicLayout';
import AuthenticatedLayout from './AuthenticatedLayout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { useScrollToTop } from '@/lib/hooks/useScrollToTop';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  forcePublic?: boolean; // Force public layout even if authenticated (for signup/login flows)
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ 
  children, 
  forcePublic = false 
}) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  // Automatically scroll to top on route changes
  useScrollToTop();

  // Show loading spinner while determining authentication state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Force public layout for signup/login flows
  if (forcePublic) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  // Use authenticated layout for verified users
  if (isAuthenticated) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }

  // Default to public layout for unauthenticated users
  return <PublicLayout>{children}</PublicLayout>;
};

export default ConditionalLayout;
