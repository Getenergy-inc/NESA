'use client';
import { useState } from 'react';
import nrcService, { type NRCVolunteerRegistration } from '@/lib/services/nrcService';

export interface NRCRegistrationHook {
  loading: boolean;
  error: string | null;
  success: boolean;
  registerVolunteer: (data: NRCVolunteerRegistration) => Promise<boolean>;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useNRCRegistration = (): NRCRegistrationHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerVolunteer = async (data: NRCVolunteerRegistration): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await nrcService.registerVolunteer(data);
      
      // The service returns the volunteer data directly, not wrapped in success response
      if (response && response.id) {
        setSuccess(true);
        return true;
      } else {
        setError('Registration failed - invalid response');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      
      // If user is already registered, treat it as success
      if (errorMessage.includes('already registered')) {
        console.log('User already registered, treating as success in hook');
        setSuccess(true);
        return true;
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    loading,
    error,
    success,
    registerVolunteer,
    clearError,
    clearSuccess
  };
};