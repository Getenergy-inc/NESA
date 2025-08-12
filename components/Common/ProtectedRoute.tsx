"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/account/login',
  allowedRoles = []
}) => {
  const { isAuthenticated, isLoading, user, userRole } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If authentication is required but user is not authenticated
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // If user is authenticated but accessing auth pages, redirect to dashboard
      if (!requireAuth && isAuthenticated && (redirectTo === '/account/login' || redirectTo === '/signup')) {
        router.push('/dashboard');
        return;
      }

      // Check role-based access
      if (requireAuth && isAuthenticated && allowedRoles.length > 0) {
        const hasAllowedRole = allowedRoles.some(role => 
          userRole === role || 
          user?.role === role || 
          user?.intents?.includes(role)
        );

        if (!hasAllowedRole) {
          router.push('/dashboard'); // Redirect to main dashboard if role not allowed
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, allowedRoles, router, user, userRole]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Don't render children while redirecting
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Don't render auth pages if already authenticated
  if (!requireAuth && isAuthenticated && (redirectTo === '/account/login' || redirectTo === '/signup')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
