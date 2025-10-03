'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, logout as logoutService, getMe } from '@/lib/services/authService';

// Define the user type
type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isAdmin?: boolean;
  [key: string]: any;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token and user on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in cookies
        const storedToken = getCookie('token');
        
        if (storedToken) {
          setToken(storedToken);
          
          // Fetch user data
          const userData = await getMe();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear any invalid auth state
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginService({ email, password });
      
      if (response.token && response.user) {
        // Set token in cookie
        document.cookie = `token=${response.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
        
        // Store user ID in cookie for API client
        document.cookie = `userId=${response.user.id}; path=/; max-age=${60 * 60 * 24 * 7}`;
        
        setToken(response.token);
        setUser(response.user);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await logoutService();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear cookies and state regardless of API success
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setUser(null);
      setToken(null);
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const userData = await getMe();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login: loginUser,
        logout: logoutUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}