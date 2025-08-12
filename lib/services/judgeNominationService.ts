import apiClient from "./apiClient";

interface NominationData {
    fullName: string;
    currentRole: string;
    email: string;
    linkedinProfile: string;
    country: string;
    reason: string;
    documents: File | null;
}

export const createJudgeNomination = async (data: NominationData): Promise<any> => {
  try {
    // Validate required fields
     // Debug: Verify category_id exists
    console.log('Service Layer - Received email:', data.email);
    
    if (!data.email) {
      throw new Error('email is required');
    }

    const payload = {
    full_name: data.fullName,
    current_role: data.currentRole,
    email: data.email,
    linkedin_profile: data.linkedinProfile,
    country: data.country,
    reason: data.reason,
    document: data.documents ? data.documents.name : null, 
     
    };

    const response = await apiClient.post(
      "/api/judges/judge",
      payload, // Send as JSON
      {
        headers: {
          'Content-Type': 'application/json', // Ensure JSON content type
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};