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
      
      if (response.success) {
        setSuccess(true);
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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