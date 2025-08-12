'use client';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import { checkUserNRCStatus, type NRCApplication, type NRCVolunteer } from '@/lib/services/mockNRCService';

export interface NRCStatus {
  loading: boolean;
  hasApplication: boolean;
  application?: NRCApplication;
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  volunteer?: NRCVolunteer;
  canAccessDashboard: boolean;
  refresh: () => Promise<void>;
}

export const useNRCStatus = (): NRCStatus => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [hasApplication, setHasApplication] = useState(false);
  const [application, setApplication] = useState<NRCApplication | undefined>();
  const [isApproved, setIsApproved] = useState(false);
  const [volunteer, setVolunteer] = useState<NRCVolunteer | undefined>();

  const checkStatus = async () => {
    // TODO: Re-enable authentication-based status checking when backend is ready
    // Authentication temporarily disabled for testing purposes

    /* ORIGINAL AUTHENTICATION LOGIC - COMMENTED FOR TESTING
    // Debug logging
    console.log('NRC Status Check - User object:', user);

    // Try different email properties that might exist
    const userEmail = user?.email || user?.Email || user?.emailAddress;

    if (!userEmail) {
      console.log('NRC Status Check - No email found, setting loading to false');
      setLoading(false);
      return;
    }

    console.log('NRC Status Check - Using email:', userEmail);
    setLoading(true);
    try {
      const response = await checkUserNRCStatus(userEmail);
      console.log('NRC Status Check - Response:', response);

      if (response.success && response.data) {
        setHasApplication(response.data.hasApplication);
        setApplication(response.data.application);
        setIsApproved(response.data.isApproved);
        setVolunteer(response.data.volunteer);
      }
    } catch (error) {
      console.error('Error checking NRC status:', error);
    } finally {
      setLoading(false);
    }
    */

    // For testing: Mock approved volunteer status
    console.log('NRC Status Check - Testing mode: Using mock data');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setHasApplication(true);
      setIsApproved(true);
      setApplication({
        id: 'test-app-001',
        fullName: 'Test Volunteer',
        email: 'test@example.com',
        phone: '+1234567890',
        country: 'Nigeria',
        motivation: 'Testing the NRC system',
        experience: 'Software testing and quality assurance',
        availability: 'Available for testing',
        skills: ['Research', 'Writing', 'Digital Tools'],
        commitment: true,
        terms: true,
        applicationDate: new Date().toISOString(),
        status: 'approved'
      });
      setVolunteer({
        id: 'test-vol-001',
        applicationId: 'test-app-001',
        fullName: 'Test Volunteer',
        email: 'test@example.com',
        country: 'Nigeria',
        approvalDate: new Date().toISOString(),
        nomineesUploaded: 0,
        targetNominees: 200,
        completionRate: 0,
        lastActive: 'Never',
        status: 'active'
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    checkStatus();

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('NRC Status Check - Timeout reached, forcing loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [user]);

  const isPending = hasApplication && application?.status === 'pending';
  const isRejected = hasApplication && application?.status === 'rejected';
  const canAccessDashboard = isApproved && !!volunteer;

  return {
    loading,
    hasApplication,
    application,
    isApproved,
    isPending,
    isRejected,
    volunteer,
    canAccessDashboard,
    refresh: checkStatus
  };
};
