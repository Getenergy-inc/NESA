// services/authService.js
import apiClient from './apiClient';

// Login function
export const login = async (credentials) => {
  // credentials should include { email, password }
  try {
    const response = await apiClient.post('/login', credentials);
    // Expected response: { status, message, user, token }
    return response.data;
  } catch (error) {
    // Handle error appropriately (show notification, log, etc.)
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// Signup function
export const signup = async (userData) => {
  // userData should include: name, email, password, role, referral, region, KYC, GFA_wallet_id
  try {
    const response = await apiClient.post('/signup', userData);
    // Expected response: { status, message, user, token }
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error.response ? error.response.data : new Error('Signup failed');
  }
};
