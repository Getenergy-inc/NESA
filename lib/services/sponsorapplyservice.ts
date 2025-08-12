import apiClient from "./apiClient";

// Validation schema
interface ApplicationData {
    company_name: string;
    name: string;
    email: string;
    phone: string;
    Business_reg_no: string;
}



export const sponsorapplication = async (data: ApplicationData): Promise<any> => {
    try {
  
        // Prepare payload
        const payload = {
            company_name: data.company_name,
            name: data.name,
            email: data.email,
            phone: data.phone,
            Business_reg_no: data.Business_reg_no
        };

    const response = await apiClient.post(
      "/api/judges/judge",
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