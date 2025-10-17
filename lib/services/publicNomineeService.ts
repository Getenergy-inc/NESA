import axios from 'axios';

export interface PublicNominee {
  name: string;
  image: string;
  achievement: string;
  state?: string;
  country?: string;
  organization?: string;
  source?: string;
}

class PublicNomineeService {
  private baseURL = '/api/v1/public';

  /**
   * Fetch verified/published nominees by category and subcategory
   */
  async getNominees(awardCategory?: string, subcategory?: string): Promise<PublicNominee[]> {
    try {
      const params = new URLSearchParams();
      
      if (awardCategory) {
        params.append('awardCategory', awardCategory);
      }
      
      if (subcategory) {
        params.append('subcategory', subcategory);
      }

      const response = await axios.get(`${this.baseURL}/nominees?${params.toString()}`);
      
      if (response.data.success) {
        return response.data.nominees;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching public nominees:', error);
      return [];
    }
  }
}

export default new PublicNomineeService();
