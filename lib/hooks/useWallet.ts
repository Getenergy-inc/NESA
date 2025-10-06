import { useState, useEffect, useCallback } from 'react';
import walletService, { WalletBalance, WalletTransaction, WalletConfig } from '../services/walletService';

export const useWallet = () => {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [config, setConfig] = useState<WalletConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  // Fetch wallet balance
  const fetchBalance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await walletService.getBalance();
      setBalance(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch wallet balance');
      console.error('Error fetching balance:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch wallet configuration
  const fetchConfig = useCallback(async () => {
    try {
      const data = await walletService.getConfig();
      setConfig(data);
    } catch (err: any) {
      console.error('Error fetching config:', err);
    }
  }, []);

  // Fetch transactions
  const fetchTransactions = useCallback(async (page: number = 1, limit: number = 10) => {
    setTransactionsLoading(true);
    setError(null);
    try {
      const data = await walletService.getTransactions(page, limit);
      setTransactions(data.transactions || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setTransactionsLoading(false);
    }
  }, []);

  // Initiate purchase
  const initiatePurchase = async (amountInUSD: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.initiatePurchase(amountInUSD);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to initiate purchase');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify purchase
  const verifyPurchase = async (reference: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.verifyPurchase(reference);
      // Refresh balance after successful purchase
      if (response.success) {
        await fetchBalance();
      }
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to verify purchase');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Transfer AGC
  const transfer = async (recipientEmail: string, amount: number, description?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.transfer({
        recipientEmail,
        amount,
        description
      });
      // Refresh balance and transactions after successful transfer
      if (response.success) {
        await Promise.all([fetchBalance(), fetchTransactions()]);
      }
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to transfer AGC');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh all wallet data
  const refresh = useCallback(async () => {
    await Promise.all([
      fetchBalance(),
      fetchTransactions(),
      fetchConfig()
    ]);
  }, [fetchBalance, fetchTransactions, fetchConfig]);

  // Initial load
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Computed values
  const totalBalance = balance 
    ? balance.agcWithdrawableBalance + balance.agcLockedBalance 
    : 0;

  const withdrawableBalance = balance?.agcWithdrawableBalance || 0;
  const lockedBalance = balance?.agcLockedBalance || 0;

  return {
    balance,
    transactions,
    config,
    loading,
    transactionsLoading,
    error,
    totalBalance,
    withdrawableBalance,
    lockedBalance,
    fetchBalance,
    fetchTransactions,
    fetchConfig,
    initiatePurchase,
    verifyPurchase,
    transfer,
    refresh
  };
};
