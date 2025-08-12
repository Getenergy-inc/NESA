'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useNRCStatus } from '@/lib/hooks/useNRCStatus';
import { motion } from 'framer-motion';
import { Clock, XCircle, CheckCircle } from 'lucide-react';
import Button from './Button';

interface NRCProtectedRouteProps {
  children: React.ReactNode;
}

const NRCProtectedRoute: React.FC<NRCProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuthContext();
  const { loading, canAccessDashboard, isPending, isRejected, hasApplication } = useNRCStatus();
  const router = useRouter();

  // TODO: Re-enable authentication protection when backend is ready
  // Authentication temporarily disabled for testing purposes

  /* ORIGINAL AUTHENTICATION LOGIC - COMMENTED FOR TESTING
  // Show loading state
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    router.push('/account/login');
    return null;
  }

  // User has access to dashboard
  if (canAccessDashboard) {
    return <>{children}</>;
  }
  */

  // For testing: Direct access to protected content
  console.log('NRCProtectedRoute - Testing mode: Allowing direct access');
  return <>{children}</>;

  /* REMAINING AUTHENTICATION LOGIC - COMMENTED FOR TESTING
  // User has pending application
  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Under Review</h2>
          <p className="text-gray-600 mb-6">
            Your NRC volunteer application is currently being reviewed by our team.
            You'll receive an email notification once a decision has been made.
          </p>
          <Button
            text="Back to NRC Info"
            onClick={() => router.push('/get-involved/nrc-volunteer')}
            variant="outline"
            className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
          />
        </motion.div>
      </div>
    );
  }

  // User application was rejected
  if (isRejected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Not Approved</h2>
          <p className="text-gray-600 mb-6">
            Unfortunately, your NRC volunteer application was not approved at this time.
            Thank you for your interest in the program.
          </p>
          <Button
            text="Back to NRC Info"
            onClick={() => router.push('/get-involved/nrc-volunteer')}
            variant="outline"
            className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
          />
        </motion.div>
      </div>
    );
  }

  // User has no application - redirect to apply
  if (!hasApplication) {
    router.push('/get-involved/nrc-volunteer/apply');
    return null;
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-[#ea580c] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          You need to be an approved NRC volunteer to access this area.
        </p>
        <Button
          text="Apply as NRC Volunteer"
          onClick={() => router.push('/get-involved/nrc-volunteer/apply')}
          variant="filled"
          className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
        />
      </motion.div>
    </div>
  );
  */
};

export default NRCProtectedRoute;
