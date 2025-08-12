import apiClient from "./apiClient";

// Validation schema
interface ApplicationData {
    full_name: string;
    email: string;
    phone: string;
    state: string;
    education: string;
    experience: string;
    motivation: string;
    profileImage: File | null;
    documents: File | null;
}

export const judgesapplication = async (data: ApplicationData): Promise<any> => {
    try {
  
        // Prepare payload
        const payload = {
            full_name: data.full_name,
            email: data.email,
            phone_number: data.phone,
            state_and_region: data.state,
            education_background: data.education,
            experience: data.experience,
            motivation_statement: data.motivation,
            upload_profile_image: data.profileImage,
            upload_document: data.documents
        };

    const response = await apiClient.post(
      "/api/judge-apply/applicant",
      payload, // Send as JSON
      {
        headers: {
          'Content-Type': 'application/json', 
        }
      }
    );
   alert(response.data);

    return response.data;
  } catch (error: any) {
     alert(error);

    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};