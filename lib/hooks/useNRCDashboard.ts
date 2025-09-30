'use client';
import { useState, useEffect } from 'react';
import nrcService, { type NRCDashboardData, type NRCTask, type AGCTransaction } from '@/lib/services/nrcService';

export interface NRCDashboardHook {
  // Dashboard data
  dashboardData: NRCDashboardData | null;
  nominees: any[];
  tasks: NRCTask[];
  transactions: AGCTransaction[];
  leaderboard: any[];
  
  // Loading states
  loading: boolean;
  tasksLoading: boolean;
  transactionsLoading: boolean;
  leaderboardLoading: boolean;
  
  // Error states
  error: string | null;
  tasksError: string | null;
  transactionsError: string | null;
  leaderboardError: string | null;
  
  // Actions
  refreshDashboard: () => Promise<void>;
  refreshTasks: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  createTask: (taskData: any) => Promise<boolean>;
  completeTask: (taskId: string, notes?: string) => Promise<boolean>;
  updateNomineeStatus: (nomineeId: string, status: string) => Promise<boolean>;
  withdrawAGC: (amount: number, walletAddress: string) => Promise<boolean>;
}

export const useNRCDashboard = (volunteerId?: string): NRCDashboardHook => {
  // Dashboard data state
  const [dashboardData, setDashboardData] = useState<NRCDashboardData | null>(null);
  const [nominees, setNominees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<NRCTask[]>([]);
  const [transactions, setTransactions] = useState<AGCTransaction[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  
  // Error states
  const [error, setError] = useState<string | null>(null);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  // Fetch dashboard data
  const refreshDashboard = async () => {
    if (!volunteerId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const dashboardData = await nrcService.getVolunteerDashboard(volunteerId);
      setDashboardData(dashboardData);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks
  const refreshTasks = async () => {
    if (!volunteerId) return;
    
    setTasksLoading(true);
    setTasksError(null);
    
    try {
      const tasks = await nrcService.getVolunteerTasks(volunteerId, {
        page: 1,
        limit: 20
      });
      
      setTasks(tasks || []);
    } catch (err: any) {
      setTasksError(err.message || 'Failed to load tasks');
    } finally {
      setTasksLoading(false);
    }
  };

  // Fetch transactions
  const refreshTransactions = async () => {
    if (!volunteerId) return;
    
    setTransactionsLoading(true);
    setTransactionsError(null);
    
    try {
      const transactions = await nrcService.getAGCTransactions(volunteerId, {
        page: 1,
        limit: 20
      });
      
      setTransactions(transactions || []);
    } catch (err: any) {
      setTransactionsError(err.message || 'Failed to load transactions');
    } finally {
      setTransactionsLoading(false);
    }
  };

  // Fetch leaderboard
  const refreshLeaderboard = async () => {
    setLeaderboardLoading(true);
    setLeaderboardError(null);
    
    try {
      const leaderboardData = await nrcService.getLeaderboard('monthly', 10);
      setLeaderboard(leaderboardData || []);
    } catch (err: any) {
      setLeaderboardError(err.message || 'Failed to load leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  // Complete a task
  const completeTask = async (taskId: string, notes?: string): Promise<boolean> => {
    try {
      await nrcService.completeTask(taskId, notes);
      
      // Refresh tasks and dashboard data
      await Promise.all([refreshTasks(), refreshDashboard()]);
      return true;
    } catch (err: any) {
      setTasksError(err.message || 'Failed to complete task');
      return false;
    }
  };

  // Withdraw AGC
  const withdrawAGC = async (amount: number, walletAddress: string): Promise<boolean> => {
    if (!volunteerId) return false;
    
    try {
      await nrcService.withdrawAGC(volunteerId, amount, walletAddress);
      
      // Refresh dashboard and transactions
      await Promise.all([refreshDashboard(), refreshTransactions()]);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to withdraw AGC');
      return false;
    }
  };

  // Load initial data when volunteerId changes
  useEffect(() => {
    if (volunteerId) {
      Promise.all([
        refreshDashboard(),
        refreshTasks(),
        refreshTransactions(),
        refreshLeaderboard()
      ]);
    }
  }, [volunteerId]);

  // Fetch nominees
  const refreshNominees = async () => {
    if (!volunteerId) return;
    
    try {
      const nominees = await nrcService.getVolunteerNominees(volunteerId);
      setNominees(nominees || []);
    } catch (err: any) {
      console.error('Failed to load nominees:', err);
    }
  };

  // Update nominee status
  const updateNomineeStatus = async (nomineeId: string, status: string): Promise<boolean> => {
    try {
      await nrcService.updateNomineeStatus(nomineeId, status);
      // Refresh nominees to get updated data
      await refreshNominees();
      return true;
    } catch (err: any) {
      console.error('Failed to update nominee status:', err);
      return false;
    }
  };

  // Create task
  const createTask = async (taskData: any): Promise<boolean> => {
    try {
      await nrcService.createTask({
        volunteerId: volunteerId!,
        ...taskData
      });
      // Refresh tasks to get updated data
      await refreshTasks();
      return true;
    } catch (err: any) {
      console.error('Failed to create task:', err);
      return false;
    }
  };

  return {
    // Data
    dashboardData,
    nominees,
    tasks,
    transactions,
    leaderboard,
    
    // Loading states
    loading,
    tasksLoading,
    transactionsLoading,
    leaderboardLoading,
    
    // Error states
    error,
    tasksError,
    transactionsError,
    leaderboardError,
    
    // Actions
    refreshDashboard,
    refreshTasks,
    refreshTransactions,
    refreshLeaderboard,
    createTask,
    completeTask,
    updateNomineeStatus,
    withdrawAGC
  };
};