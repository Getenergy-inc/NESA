// hooks/useAuth.js
import { useState } from 'react';
import { login, signup } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signIn = async (credentials) => {
    try {
      const data = await login(credentials);
      // Save token and user data as needed (e.g., localStorage or global state)
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.message || 'Login error');
    }
  };

  const register = async (userData) => {
    try {
      const data = await signup(userData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.message || 'Signup error');
    }
  };

  return { user, error, signIn, register };
};
