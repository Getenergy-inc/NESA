import { useState, useEffect } from "react";
import { login, verifyOTP, signup, resetPassword as resetPasswordService, signupFlow, sendOTP, getMe } from "../services/authService";
import { getUserById, updateUserById } from "../services/userService";

interface Credentials {
  email: string;
  password: string;
}

interface OTPData {
  email: string;
  otp: string;
}

interface UserData {
  fullName: string;
  nomineeType: string;
  email: string;
  password: string;
  role: string;
  state: string;
  region: string;
  phoneNumber: string;
  image?: string;
  [key: string]: any;
}

interface User {
  id: string;
  email: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  accountType?: string;
  emailVerified?: boolean;
  [key: string]: any;
}

// Cookie utility functions
const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from cookies
  useEffect(() => {
    const token = getCookie("token");
    const userId = getCookie("userId");
    const emailVerified = getCookie("emailVerified");
    
    if (token && userId) {
      setIsAuthenticated(true);
      // Try to get user data from cookie or fetch from API
      const userData = {
        id: userId,
        emailVerified: emailVerified === "true"
      };
      setUser(userData as User);
    }
  }, []);

  // Utility functions
  const getUserId = (): string => {
    return getCookie("userId") || "";
  };

  const getToken = (): string | null => {
    return getCookie("token");
  };

  const setAuthenticationState = (userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCookie("token", token, 7); // 7 days
    setCookie("userId", userData.id, 7);
    setCookie("emailVerified", userData.emailVerified ? "true" : "false", 7);
  };

  // Auth functions
  const signIn = async (credentials: Credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await login(credentials);
      if (data.token) {
        setAuthenticationState(data.user, data.token);
      }
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await verifyOTP({ email, otp });
      if (data.token) {
        setAuthenticationState(data.user, data.token);
        // Clear temp cookies if they exist
        deleteCookie("tempToken");
        deleteCookie("tempUserId");
      }
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "OTP verification failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await signup(userData);
      if (data.token) {
        setCookie("token", data.token, 1); // Store token in cookies for 1 day
        setCookie("userId", data.user.id, 1); // Store userId in cookies for 1 day
        setUser(data.user);
      }
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced signup flow with comprehensive data
  const registerWithFlow = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await signupFlow(userData);
      if (data.token) {
        // Don't set authenticated state yet - user needs email verification
        setCookie("tempToken", data.token, 1);
        setCookie("tempUserId", data.user?.id || "", 1);
        setUser(data.user as User || null);
        setIsAuthenticated(false); // Requires email verification
      }
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP for various purposes
  const sendOTPCode = async (email: string, purpose: 'LOGIN' | 'VERIFY_EMAIL' | 'PASSWORD_RESET' = 'LOGIN') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await sendOTP(email, purpose);
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send OTP";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get enhanced user profile
  const getEnhancedProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getMe();
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch profile";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userId = getUserId(); // Use utility function
      const data = await updateUserById(userId, userData);
      setUser(data.user || data);
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Update failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    // Clear all auth cookies
    deleteCookie("token");
    deleteCookie("userId");
    deleteCookie("emailVerified");
    deleteCookie("tempToken");
    deleteCookie("tempUserId");
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await resetPasswordService(email);
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Password reset failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Computed properties
  const userRole = user?.role || null;
  const accountType = user?.accountType || null;

  return {
    user,
    isAuthenticated,
    userRole,
    accountType,
    error,
    isLoading,
    signIn,
    verifyEmail,
    register,
    registerWithFlow,
    sendOTPCode,
    getEnhancedProfile,
    updateUser,
    getUserId,
    getToken,
    logout,
    resetPassword,
    setAuthenticationState
  };
};