import apiClient from "./apiClient";

export type Nomination = {
    id: string
    fullName: string;
    email: string;
    subCategory: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    nominationCount: string;
    latestCreatedAt: string;
};

export type NominationsResponse = {
    totalNominations: number;
    totalAccepted: number;
    totalPending: number;
    nominations: Nomination[];
};

export const getNominations = async (): Promise<NominationsResponse> => {
    try {
        const response = await apiClient.get("/api/dashboard/nominations", {
            headers: {
                "Content-Type": "application/json",
            },
        });

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
