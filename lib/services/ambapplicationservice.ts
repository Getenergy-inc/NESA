import apiClient from "./apiClient";

interface NominationData {
  full_name: string;
  age_range: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  socials: string;
}

export const ambapplication = async (data: NominationData): Promise<any> => {
  try {
    // Validate required fields
     // Debug: Verify category_id exists
    console.log('Service Layer - Received category_id:', data.full_name);
    
    if (!data.full_name) {
      throw new Error('Category  is required');
    }

    const payload = {
      full_name: data.full_name,
      age_range: data.age_range,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      country: data.country,
      socials: data.socials
    };

    const response = await apiClient.post(
      "/api/ambassadors/ambassador",
      payload, // Send as JSON
      {
        headers: {
          'Content-Type': 'application/json', 
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