import apiClient from "./apiClient";

export const approveJudge = async (id: string) => {
  const response = await apiClient.post(`/api/dashboard/judges/approve/${id}`);
  return response.data;
};
