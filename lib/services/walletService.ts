import apiClient from './apiClient';

// Types
export interface WalletBalance {
  agcWithdrawableBalance: number;
  agcLockedBalance: number;
  lastUpdated: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'CREDIT' | 'DEBIT' | 'PURCHASE_USER' | 'PURCHASE_COMPANY' | 'TRANSFER';
  amount: number;
  reason: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseInitiateResponse {
  success?: boolean;
  message: string;
  data?: {
    reference: string;
    authorizationUrl: string;
    accessCode: string;
    amount?: number;
    currency?: string;
    agcAmount?: number;
  };
  // Support both nested and flat response structures
  authorizationUrl?: string;
  reference?: string;
}

export interface PurchaseVerifyResponse {
  success: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    agcAmount: number;
  };
}

export interface TransferRequest {
  recipientEmail: string;
  amount: number;
  description?: string;
}

export interface WalletConfig {
  agcToUsdRate: number;
  minPurchaseAmount: number;
  maxPurchaseAmount: number;
  minTransferAmount: number;
  maxTransferAmount: number;
  purchaseFeePercentage: number;
  transferFeePercentage: number;
}

class WalletService {
  private baseUrl = '/api/v1/wallet';

  /**
   * Get wallet configuration (public endpoint)
   */
  async getConfig(): Promise<WalletConfig> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/config`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get wallet config:', error);
      throw new Error(error.response?.data?.message || 'Failed to get wallet configuration');
    }
  }

  /**
   * Get user's wallet balance
   */
  async getBalance(): Promise<WalletBalance> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/balance`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get wallet balance:', error);
      throw new Error(error.response?.data?.message || 'Failed to get wallet balance');
    }
  }

  /**
   * Get wallet transactions with pagination
   */
  async getTransactions(page: number = 1, limit: number = 10): Promise<{
    transactions: WalletTransaction[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/transactions`, {
        params: { page, limit }
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get transactions:', error);
      throw new Error(error.response?.data?.message || 'Failed to get transactions');
    }
  }

  /**
   * Initiate AGC purchase
   */
  async initiatePurchase(amount: number, currency: string = 'USD'): Promise<PurchaseInitiateResponse> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/purchase/initiate`, {
        amount,
        currency
      });
      return response.data;
    } catch (error: any) {
      console.error('Failed to initiate purchase:', error);
      throw new Error(error.response?.data?.message || 'Failed to initiate purchase');
    }
  }

  /**
   * Verify purchase after payment
   */
  async verifyPurchase(reference: string): Promise<PurchaseVerifyResponse> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/purchase/verify/${reference}`);
      return response.data;
    } catch (error: any) {
      console.error('Failed to verify purchase:', error);
      throw new Error(error.response?.data?.message || 'Failed to verify purchase');
    }
  }

  /**
   * Get purchase history
   */
  async getPurchaseHistory(page: number = 1, limit: number = 10): Promise<{
    purchases: any[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/purchases`, {
        params: { page, limit }
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get purchase history:', error);
      throw new Error(error.response?.data?.message || 'Failed to get purchase history');
    }
  }

  /**
   * Transfer AGC to another user
   */
  async transfer(transferData: TransferRequest): Promise<{
    success: boolean;
    message: string;
    data: {
      transactionId: string;
      amount: number;
      recipient: string;
    };
  }> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/transfer`, transferData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to transfer AGC:', error);
      throw new Error(error.response?.data?.message || 'Failed to transfer AGC');
    }
  }

  /**
   * Calculate AGC amount from USD
   */
  calculateAGCFromUSD(usdAmount: number, rate: number = 20): number {
    return usdAmount * rate;
  }

  /**
   * Calculate USD amount from AGC
   */
  calculateUSDFromAGC(agcAmount: number, rate: number = 20): number {
    return agcAmount / rate;
  }

  /**
   * Format AGC amount for display
   */
  formatAGC(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  /**
   * Format USD amount for display
   */
  formatUSD(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}

export const walletService = new WalletService();
export default walletService;
