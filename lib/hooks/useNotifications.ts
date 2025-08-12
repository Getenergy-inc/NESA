'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUserNotificationPreferences,
  updateNotificationPreferences,
  type Notification,
  type NotificationPreferences
} from '@/lib/services/mockNotificationService';

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  loading: boolean;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  updatePreferences: (preferences: NotificationPreferences) => void;
  refreshNotifications: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);

  const loadNotifications = useCallback(() => {
    if (!user?.email) {
      setNotifications([]);
      setUnreadCount(0);
      setPreferences(null);
      return;
    }

    setLoading(true);
    try {
      const userNotifications = getUserNotifications(user.email);
      const unread = getUnreadNotificationCount(user.email);
      const userPreferences = getUserNotificationPreferences(user.email);

      setNotifications(userNotifications);
      setUnreadCount(unread);
      setPreferences(userPreferences);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    // Listen for real-time notifications
    const handleNewNotification = (event: CustomEvent) => {
      const newNotification = event.detail as Notification;
      if (newNotification.userId === user?.email) {
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    };

    window.addEventListener('nrc-notification', handleNewNotification as EventListener);
    return () => {
      window.removeEventListener('nrc-notification', handleNewNotification as EventListener);
    };
  }, [user?.email]);

  const markAsRead = useCallback((notificationId: string) => {
    markNotificationAsRead(notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    if (!user?.email) return;
    
    markAllNotificationsAsRead(user.email);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, [user?.email]);

  const handleDeleteNotification = useCallback((notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    deleteNotification(notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  }, [notifications]);

  const handleUpdatePreferences = useCallback((newPreferences: NotificationPreferences) => {
    updateNotificationPreferences(newPreferences);
    setPreferences(newPreferences);
  }, []);

  const refreshNotifications = useCallback(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    unreadCount,
    preferences,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification: handleDeleteNotification,
    updatePreferences: handleUpdatePreferences,
    refreshNotifications
  };
};

// Hook for notification preferences management
export const useNotificationPreferences = () => {
  const { user } = useAuthContext();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      try {
        const userPreferences = getUserNotificationPreferences(user.email);
        setPreferences(userPreferences);
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [user?.email]);

  const updatePrefs = useCallback((newPreferences: NotificationPreferences) => {
    updateNotificationPreferences(newPreferences);
    setPreferences(newPreferences);
  }, []);

  return {
    preferences,
    loading,
    updatePreferences: updatePrefs
  };
};

// Hook for real-time notification listening
export const useNotificationListener = (onNewNotification?: (notification: Notification) => void) => {
  const { user } = useAuthContext();

  useEffect(() => {
    const handleNewNotification = (event: CustomEvent) => {
      const newNotification = event.detail as Notification;
      if (newNotification.userId === user?.email) {
        onNewNotification?.(newNotification);
      }
    };

    window.addEventListener('nrc-notification', handleNewNotification as EventListener);
    return () => {
      window.removeEventListener('nrc-notification', handleNewNotification as EventListener);
    };
  }, [user?.email, onNewNotification]);
};

// Hook for notification statistics
export const useNotificationStats = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    byCategory: {
      application: 0,
      nominee: 0,
      system: 0,
      reminder: 0,
      achievement: 0
    },
    byPriority: {
      urgent: 0,
      high: 0,
      medium: 0,
      low: 0
    }
  });

  useEffect(() => {
    if (!user?.email) return;

    const notifications = getUserNotifications(user.email);
    const unread = getUnreadNotificationCount(user.email);

    const byCategory = notifications.reduce((acc, notification) => {
      acc[notification.category] = (acc[notification.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byPriority = notifications.reduce((acc, notification) => {
      acc[notification.priority] = (acc[notification.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({
      total: notifications.length,
      unread,
      byCategory: {
        application: byCategory.application || 0,
        nominee: byCategory.nominee || 0,
        system: byCategory.system || 0,
        reminder: byCategory.reminder || 0,
        achievement: byCategory.achievement || 0
      },
      byPriority: {
        urgent: byPriority.urgent || 0,
        high: byPriority.high || 0,
        medium: byPriority.medium || 0,
        low: byPriority.low || 0
      }
    });
  }, [user?.email]);

  return stats;
};
