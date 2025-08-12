import apiClient from "./apiClient";

interface NominationData {
  category: string;
   categoryType: string;
  subCategory: string;
  name: string;
  linkedinProfile: string;
  email: string;
  achievements: string;
  document: File | null;
}

export const createNomination = async (data: NominationData): Promise<any> => {
  try {
    // Validate required fields
     // Debug: Verify category_id exists
    console.log('Service Layer - Received category_id:', data.category);
    
    if (!data.category) {
      throw new Error('Category  is required');
    }

    const payload = {
      category: data.category,
       categoryType: data. categoryType,
      subCategory: data.subCategory,
      name: data.name,
      linkedinProfile: data.linkedinProfile,
      email: data.email,
      achievements: data.achievements,
      document: data.document
    };

    const response = await apiClient.post(
      "/api/nominations/create-nominate",
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