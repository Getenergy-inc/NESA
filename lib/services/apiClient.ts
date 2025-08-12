import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_ENV === 'development' 
    ? 'https://nesa-africa-backend-7sio.onrender.com' 
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Enhanced cookie retrieval with debugging
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    console.warn('Document is not available (server-side)');
    return null;
  }

  const cookies = document.cookie.split('; ');
  console.log('All cookies:', cookies); // Debug log
  
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      console.log(`Found ${name} cookie`); // Debug log
      return decodeURIComponent(value);
    }
  }
  
  console.warn(`Cookie ${name} not found`); // Debug log
  return null;
};

apiClient.interceptors.request.use((config) => {
  const token = getCookie('token');
  const userId = getCookie('userId');
  console.log('Request Interceptor - Token:', token); // Debug log
  console.log('Request Interceptor - userId:', userId); // Debug log
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set with token'); // Debug log
  } else {
    console.warn('No token available for authorization'); // Debug log
  }
  
  return config;
}, (error) => {
  console.error('Request Interceptor Error:', error);
  return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
  console.log('Response Interceptor - Success:', response.config.url, response.status);
  return response;
}, (error) => {
  console.error('Response Interceptor - Error:', {
    url: error.config?.url,
    status: error.response?.status,
    message: error.message,
    response: error.response?.data
  });
  return Promise.reject(error);
});

export default apiClient;