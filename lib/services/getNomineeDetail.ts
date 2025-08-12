import apiClient from "./apiClient";

 type NomineeDetailResponse = {
    success: boolean;
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        category: string;
        categoryType: string | null;
        subCategory: string;
        achievements: string;
        document: string | null;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
};


export const getNomineeDetail = async (id: string): Promise<NomineeDetailResponse> => {
  try {
    const response = await apiClient.get(`/api/dashboard/nomination/${id}`, {
          headers: {
        "Content-Type": "application/json",
      },
    });

    // Return the data directly     
    console.log("response!", response.data)
    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
    });
    throw error;
  }
};
