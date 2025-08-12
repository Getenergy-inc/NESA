import apiClient from "./apiClient";

type Judge = {
  id: string; 
  fullName: string;
  email: string;
  phoneNumber: string;
  region: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicationCount: string;
  latestCreatedAt: string;
};

type GetJudgesResponse = {
  totalApplications: number;
  totalApproved: number;
  totalPending: number;
  totalDenied: number;
  applicants: Judge[];
};

export const getjudgesapplicants = async (): Promise<GetJudgesResponse> => {
  try {
    const response = await apiClient.get("/api/dashboard/judges/applicants", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response!", response.data);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};
