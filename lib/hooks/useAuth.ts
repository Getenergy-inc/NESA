import { useState, useEffect } from "react";
import { login, verifyOTP, signup, resetPassword as resetPasswordService } from "../services/authService";
import { getUserById, updateUserById } from "../services/userService";

interface Credentials {
  email: string;
  password: string;
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

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const token = getCookie("token");
      const userId = getCookie("userId");
      const isVerified = getCookie("emailVerified");

      if (token && userId && isVerified === "true") {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
          setIsAuthenticated(true);
          setUserRole(userData.role || null);
          setAccountType(userData.accountType || null);
        } catch (err) {
          if (err instanceof Error) setError(err.message);
          // Clear invalid tokens
          deleteCookie("token");
          deleteCookie("userId");
          deleteCookie("emailVerified");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = async (credentials: Credentials) => {
    try {
      const data = await login(credentials);
      if (data.token) {
        // Store temporary login data, but don't set authenticated state yet
        setCookie("tempToken", data.token, 1);
        setCookie("tempUserId", data.user.id, 1);
        setUser(data.user);
        // Authentication state will be set after OTP verification
        setIsAuthenticated(false);
      }
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Login failed");
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    try {
      const data = await verifyOTP({ email, otp });
      if (data.token) {
        // Clear temporary tokens and set permanent ones
        deleteCookie("tempToken");
        deleteCookie("tempUserId");

        // Set permanent authentication tokens
        setCookie("token", data.token, 7); // Store token for 7 days
        setCookie("userId", data.user.id, 7);
        setCookie("emailVerified", "true", 7);

        // Set authentication state
        setUser(data.user);
        setIsAuthenticated(true);
        setUserRole(data.user.role || null);
        setAccountType(data.user.accountType || null);
      }
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("OTP verification failed");
    }
  };

  const register = async (userData: UserData) => {
    try {
      const data = await signup(userData);
      if (data.token) {
        setCookie("token", data.token, 1); // Store token in cookies for 1 day
        setCookie("userId", data.user.id, 1); // Store userId in cookies for 1 day
        setUser(data.user);
      }
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Registration failed");
    }
  };

  const updateUser = async (userData: any) => {
    try {
      const userId = getUserId(); // Use utility function
      const data = await updateUserById(userId, userData);
      setUser(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Failed to update user details");
    }
  };

  const getUserId = (): string => {
    const userId = getCookie("userId");
    if (!userId) {
      throw new Error("User ID not found"); // Handle null case
    }
    return userId;
  };

  const getToken = (): string => {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token not found"); // Handle null case
    }
    return token;
  };

  const logout = () => {
    // Clear all authentication cookies
    deleteCookie("token");
    deleteCookie("userId");
    deleteCookie("emailVerified");
    deleteCookie("tempToken");
    deleteCookie("tempUserId");

    // Reset all authentication state
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    setAccountType(null);
    setError(null);

    // Redirect to home page to show public layout
    window.location.href = "/";
  };

  const resetPassword = async (email: string) => {
    try {
      const data = await resetPasswordService(email);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Failed to reset password");
    }
  };

  // Function to manually set authentication state (useful for signup flow)
  const setAuthenticationState = (userData: any, authenticated: boolean) => {
    setUser(userData);
    setIsAuthenticated(authenticated);
    setUserRole(userData?.role || null);
    setAccountType(userData?.accountType || null);

    if (authenticated && userData) {
      setCookie("emailVerified", "true", 7);
    }
  };

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
    updateUser,
    getUserId,
    getToken,
    logout,
    resetPassword,
    setAuthenticationState
  };
};

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; secure`;
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure`;
};