import apiClient from "./apiClient";

export const declineJudge = async (id: string) => {
  const response = await apiClient.post(`/api/dashboard/judges/denied/${id}`);
  return response.data;
};
