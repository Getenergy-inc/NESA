import apiClient from "./apiClient";

export type Volunteer = {
  id: string;
  fullName: string;
  nomineeType: string;
  email: string;
  role: string;
  stateOrRegion: string;
  image?: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};

export const getVolunteers = async (): Promise<Volunteer[]> => {
  try {
    const response = await apiClient.get("/api/user/user-list", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Filter for volunteers only
    return (response.data as Volunteer[]).filter(
      (u) => u.role && u.role.toLowerCase() === "volunteer"
    );
  } catch (error: any) {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};
