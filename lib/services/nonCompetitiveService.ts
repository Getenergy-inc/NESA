import apiClient from "./apiClient";

interface NonCompetitiveNominationData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics: string;
  profileImage: File | null;
  supportingDocuments: File | null;
}

export const createNonCompetitiveNomination = async (data: NonCompetitiveNominationData): Promise<any> => {
  try {
    // Validate required fields
    if (!data.fullName || !data.email || !data.category || !data.subcategory) {
      throw new Error('Required fields are missing');
    }

    // Create FormData for file uploads
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('organizationName', data.organizationName || '');
    formData.append('email', data.email);
    formData.append('phone', data.phone || '');
    formData.append('country', data.country);
    formData.append('category', data.category);
    formData.append('subcategory', data.subcategory);
    formData.append('achievementSummary', data.achievementSummary);
    formData.append('impactMetrics', data.impactMetrics);
    
    // Add files if they exist
    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    }
    
    if (data.supportingDocuments) {
      formData.append('supportingDocuments', data.supportingDocuments);
    }

    // Send the request with FormData
    const response = await apiClient.post(
      "/api/nominations/non-competitive",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const getNonCompetitiveNominations = async (category?: string, subcategory?: string): Promise<any> => {
  try {
    let url = "/api/nominations/non-competitive";
    
    // Add query parameters if provided
    if (category || subcategory) {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (subcategory) params.append('subcategory', subcategory);
      url += `?${params.toString()}`;
    }
    
    const response = await apiClient.get(url);
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

export const getNonCompetitiveNominationById = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/api/nominations/non-competitive/${id}`);
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