import apiClient from "./apiClient";

export const getJudgeDetail = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/dashboard/judges/application/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};
