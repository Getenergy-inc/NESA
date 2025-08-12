"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  userRole: string | null;
  accountType: string | null;
  error: string | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<any>;
  verifyEmail: (email: string, otp: string) => Promise<any>;
  register: (userData: any) => Promise<any>;
  getUserId: () => string | null;
  getToken: () => string | null;
  logout: () => void;
  updateUser: (userData: any) => Promise<any>;
  setAuthenticationState: (user: any, isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};