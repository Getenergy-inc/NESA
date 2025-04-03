// services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g., https://api.yourdomain.com
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to each request if available (you may use cookies or state management in a real app)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or another secure storage mechanism
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
