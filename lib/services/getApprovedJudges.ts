import apiClient from "./apiClient";

type Judge = {
    id: string;
    full_name: string;
    current_role: string;
    linkedin_profile: string;
    email: string;
    country: string;
    reason: string;
    document: string;
    updatedAt: string;
    createdAt: string;
};

export const getApprovedJudges = async (): Promise<Judge[]> => {
try {
    const response = await apiClient.get("/api/judges/judge-list", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    // If the response is a single judge object, wrap it in an array
    if (response.data && !Array.isArray(response.data)) {
        return [response.data as Judge];
    }

    // If the response is already an array, return as is
    return response.data ?? [];
} catch (error: any) {
    console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
    });
    throw error;
}
};
