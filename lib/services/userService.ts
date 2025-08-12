import apiClient from './apiClient';

export const getUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`/api/user/${userId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message ||
                       error.message ||
                       'Failed to fetch user details';
    throw new Error(errorMessage);
  }
};

export const updateUserById = async (userId: string, userData: any) => {
  try {
    const response = await apiClient.put(`/api/user/update/${userId}`, userData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message ||
                       error.message ||
                       'Failed to update user details';
    throw new Error(errorMessage);
  }
};