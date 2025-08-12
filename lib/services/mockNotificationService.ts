// Mock Notification Service for frontend-only demonstration
// This simulates email notifications and in-app notifications

export interface Notification {
  id: string;
  userId: string;
  type: 'application_submitted' | 'application_approved' | 'application_rejected' | 'nominee_submitted' | 'nominee_approved' | 'nominee_rejected' | 'system_update' | 'deadline_reminder' | 'milestone_achieved' | 'weekly_summary';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'application' | 'nominee' | 'system' | 'reminder' | 'achievement';
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  deadlineReminders: boolean;
  achievementNotifications: boolean;
  systemUpdates: boolean;
  categories: {
    application: boolean;
    nominee: boolean;
    system: boolean;
    reminder: boolean;
    achievement: boolean;
  };
}

// Storage keys
const NOTIFICATIONS_STORAGE_KEY = 'nrc_notifications';
const PREFERENCES_STORAGE_KEY = 'nrc_notification_preferences';

// Utility functions
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getNotificationsFromStorage = (): Notification[] => {
  try {
    const data = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading notifications from localStorage:', error);
    return [];
  }
};

const saveNotificationsToStorage = (notifications: Notification[]): void => {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications to localStorage:', error);
  }
};

const getPreferencesFromStorage = (): NotificationPreferences[] => {
  try {
    const data = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading preferences from localStorage:', error);
    return [];
  }
};

const savePreferencesToStorage = (preferences: NotificationPreferences[]): void => {
  try {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences to localStorage:', error);
  }
};

// Enhanced create notification with preferences checking
export const createNotification = (
  userId: string,
  type: Notification['type'],
  title: string,
  message: string,
  actionUrl?: string,
  priority: Notification['priority'] = 'medium',
  metadata?: Record<string, any>
): void => {
  const preferences = getUserNotificationPreferences(userId);
  const category = getCategoryFromType(type);

  // Check if user wants this type of notification
  if (!preferences.categories[category]) {
    console.log(`🔕 Notification blocked by user preferences: ${type}`);
    return;
  }

  const notifications = getNotificationsFromStorage();

  const newNotification: Notification = {
    id: generateId(),
    userId,
    type,
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    actionUrl,
    priority,
    category,
    metadata
  };

  notifications.unshift(newNotification); // Add to beginning
  saveNotificationsToStorage(notifications);

  // Simulate different notification channels based on preferences
  if (preferences.emailNotifications) {
    console.log('📧 Mock Email Sent:', {
      to: userId,
      subject: title,
      body: message,
      priority
    });
  }

  if (preferences.pushNotifications) {
    console.log('🔔 Mock Push Notification:', {
      to: userId,
      title,
      body: message,
      priority
    });
  }

  // Trigger real-time update event (in a real app, this would use WebSockets)
  window.dispatchEvent(new CustomEvent('nrc-notification', {
    detail: newNotification
  }));
};

// Helper function to map notification type to category
const getCategoryFromType = (type: Notification['type']): Notification['category'] => {
  switch (type) {
    case 'application_submitted':
    case 'application_approved':
    case 'application_rejected':
      return 'application';
    case 'nominee_submitted':
    case 'nominee_approved':
    case 'nominee_rejected':
      return 'nominee';
    case 'deadline_reminder':
      return 'reminder';
    case 'milestone_achieved':
    case 'weekly_summary':
      return 'achievement';
    case 'system_update':
    default:
      return 'system';
  }
};

// Get notifications for a user
export const getUserNotifications = (userId: string): Notification[] => {
  const notifications = getNotificationsFromStorage();
  return notifications.filter(notification => notification.userId === userId);
};

// Mark notification as read
export const markNotificationAsRead = (notificationId: string): void => {
  const notifications = getNotificationsFromStorage();
  const notificationIndex = notifications.findIndex(n => n.id === notificationId);
  
  if (notificationIndex !== -1) {
    notifications[notificationIndex].read = true;
    saveNotificationsToStorage(notifications);
  }
};

// Mark all notifications as read for a user
export const markAllNotificationsAsRead = (userId: string): void => {
  const notifications = getNotificationsFromStorage();
  const updatedNotifications = notifications.map(notification =>
    notification.userId === userId
      ? { ...notification, read: true }
      : notification
  );
  saveNotificationsToStorage(updatedNotifications);
};

// Delete notification
export const deleteNotification = (notificationId: string): void => {
  const notifications = getNotificationsFromStorage();
  const filteredNotifications = notifications.filter(n => n.id !== notificationId);
  saveNotificationsToStorage(filteredNotifications);
};

// Get notification preferences for a user
export const getUserNotificationPreferences = (userId: string): NotificationPreferences => {
  const preferences = getPreferencesFromStorage();
  const userPrefs = preferences.find(p => p.userId === userId);

  // Return default preferences if none exist
  if (!userPrefs) {
    return {
      userId,
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: true,
      deadlineReminders: true,
      achievementNotifications: true,
      systemUpdates: true,
      categories: {
        application: true,
        nominee: true,
        system: true,
        reminder: true,
        achievement: true
      }
    };
  }

  return userPrefs;
};

// Update notification preferences
export const updateNotificationPreferences = (preferences: NotificationPreferences): void => {
  const allPreferences = getPreferencesFromStorage();
  const existingIndex = allPreferences.findIndex(p => p.userId === preferences.userId);

  if (existingIndex !== -1) {
    allPreferences[existingIndex] = preferences;
  } else {
    allPreferences.push(preferences);
  }

  savePreferencesToStorage(allPreferences);
};

// Get unread notification count
export const getUnreadNotificationCount = (userId: string): number => {
  const notifications = getUserNotifications(userId);
  return notifications.filter(n => !n.read).length;
};

// Get notifications by category
export const getNotificationsByCategory = (userId: string, category: Notification['category']): Notification[] => {
  const notifications = getUserNotifications(userId);
  return notifications.filter(n => n.category === category);
};

// Get notifications by priority
export const getNotificationsByPriority = (userId: string, priority: Notification['priority']): Notification[] => {
  const notifications = getUserNotifications(userId);
  return notifications.filter(n => n.priority === priority);
};

// Enhanced notification templates
export const NotificationTemplates = {
  applicationSubmitted: (applicantName: string) => ({
    title: 'NRC Application Submitted',
    message: `Thank you for applying to the NESA Nominee Research Corps, ${applicantName}! Your application is now under review. We'll notify you once a decision has been made.`,
    priority: 'medium' as const,
    category: 'application' as const
  }),

  applicationApproved: (applicantName: string) => ({
    title: 'NRC Application Approved! 🎉',
    message: `Congratulations ${applicantName}! Your NRC volunteer application has been approved. You can now access your dashboard and start uploading nominee profiles.`,
    priority: 'high' as const,
    category: 'application' as const
  }),

  applicationRejected: (applicantName: string) => ({
    title: 'NRC Application Update',
    message: `Thank you for your interest in the NRC program, ${applicantName}. Unfortunately, your application was not approved at this time. We appreciate your enthusiasm for education in Africa.`,
    priority: 'medium' as const,
    category: 'application' as const
  }),

  nomineeSubmitted: (nomineeName: string) => ({
    title: 'Nominee Profile Submitted',
    message: `Your nominee profile for "${nomineeName}" has been successfully submitted and is now under review.`,
    priority: 'medium' as const,
    category: 'nominee' as const
  }),

  nomineeApproved: (nomineeName: string) => ({
    title: 'Nominee Approved! ✅',
    message: `Great news! Your nominee "${nomineeName}" has been approved and added to the NESA-Africa 2025 database.`,
    priority: 'high' as const,
    category: 'nominee' as const
  }),

  nomineeRejected: (nomineeName: string, reason?: string) => ({
    title: 'Nominee Requires Revision',
    message: `Your nominee "${nomineeName}" needs some updates before approval. ${reason ? `Reason: ${reason}` : 'Please review the feedback and resubmit.'}`,
    priority: 'medium' as const,
    category: 'nominee' as const
  }),

  deadlineReminder: (daysLeft: number, target: string) => ({
    title: `⏰ Deadline Reminder - ${daysLeft} days left`,
    message: `You have ${daysLeft} days remaining to ${target}. Don't miss out on contributing to NESA-Africa 2025!`,
    priority: daysLeft <= 3 ? 'urgent' as const : 'high' as const,
    category: 'reminder' as const
  }),

  milestoneAchieved: (milestone: string, count: number) => ({
    title: `🎯 Milestone Achieved!`,
    message: `Congratulations! You've reached ${count} ${milestone}. Keep up the excellent work!`,
    priority: 'medium' as const,
    category: 'achievement' as const
  }),

  weeklyDigest: (stats: { nominees: number; approved: number; pending: number }) => ({
    title: '📊 Your Weekly NRC Summary',
    message: `This week: ${stats.nominees} nominees submitted, ${stats.approved} approved, ${stats.pending} pending review. Great progress!`,
    priority: 'low' as const,
    category: 'achievement' as const
  }),

  systemUpdate: (updateMessage: string, priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium') => ({
    title: 'NRC System Update',
    message: updateMessage,
    priority,
    category: 'system' as const
  })
};

// Enhanced helper functions for common notification scenarios
export const sendApplicationSubmittedNotification = (userEmail: string, applicantName: string): void => {
  const template = NotificationTemplates.applicationSubmitted(applicantName);
  createNotification(
    userEmail,
    'application_submitted',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer',
    template.priority,
    { applicantName }
  );
};

export const sendApplicationApprovedNotification = (userEmail: string, applicantName: string): void => {
  const template = NotificationTemplates.applicationApproved(applicantName);
  createNotification(
    userEmail,
    'application_approved',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { applicantName }
  );
};

export const sendApplicationRejectedNotification = (userEmail: string, applicantName: string): void => {
  const template = NotificationTemplates.applicationRejected(applicantName);
  createNotification(
    userEmail,
    'application_rejected',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer',
    template.priority,
    { applicantName }
  );
};

export const sendNomineeSubmittedNotification = (userEmail: string, nomineeName: string): void => {
  const template = NotificationTemplates.nomineeSubmitted(nomineeName);
  createNotification(
    userEmail,
    'nominee_submitted',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { nomineeName }
  );
};

export const sendNomineeApprovedNotification = (userEmail: string, nomineeName: string): void => {
  const template = NotificationTemplates.nomineeApproved(nomineeName);
  createNotification(
    userEmail,
    'nominee_approved',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { nomineeName }
  );
};

export const sendNomineeRejectedNotification = (userEmail: string, nomineeName: string, reason?: string): void => {
  const template = NotificationTemplates.nomineeRejected(nomineeName, reason);
  createNotification(
    userEmail,
    'nominee_rejected',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { nomineeName, reason }
  );
};

export const sendDeadlineReminderNotification = (userEmail: string, daysLeft: number, target: string): void => {
  const template = NotificationTemplates.deadlineReminder(daysLeft, target);
  createNotification(
    userEmail,
    'deadline_reminder',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { daysLeft, target }
  );
};

export const sendMilestoneAchievedNotification = (userEmail: string, milestone: string, count: number): void => {
  const template = NotificationTemplates.milestoneAchieved(milestone, count);
  createNotification(
    userEmail,
    'milestone_achieved',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { milestone, count }
  );
};

export const sendWeeklyDigestNotification = (userEmail: string, stats: { nominees: number; approved: number; pending: number }): void => {
  const template = NotificationTemplates.weeklyDigest(stats);
  createNotification(
    userEmail,
    'weekly_summary',
    template.title,
    template.message,
    '/get-involved/nrc-volunteer/dashboard',
    template.priority,
    { stats }
  );
};

export const sendSystemUpdateNotification = (userEmail: string, updateMessage: string, priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'): void => {
  const template = NotificationTemplates.systemUpdate(updateMessage, priority);
  createNotification(
    userEmail,
    'system_update',
    template.title,
    template.message,
    undefined,
    template.priority,
    { updateMessage }
  );
};

// Bulk notification functions for admin use
export const sendBulkNotificationToAllVolunteers = (title: string, message: string): void => {
  // In a real implementation, this would query all volunteers from the database
  const volunteers = JSON.parse(localStorage.getItem('nrc_volunteers') || '[]');
  
  volunteers.forEach((volunteer: any) => {
    createNotification(
      volunteer.email,
      'system_update',
      title,
      message
    );
  });
  
  console.log(`📧 Bulk notification sent to ${volunteers.length} volunteers`);
};

// Initialize with sample notifications for demo
export const initializeSampleNotifications = (): void => {
  const notifications = getNotificationsFromStorage();
  
  if (notifications.length === 0) {
    // Add some sample notifications for demo purposes
    const sampleNotifications: Notification[] = [
      {
        id: 'notif-1',
        userId: 'john.doe@email.com',
        type: 'application_submitted',
        title: 'NRC Application Submitted',
        message: 'Thank you for applying to the NESA Nominee Research Corps! Your application is now under review.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        read: false,
        priority: 'medium',
        category: 'application',
        actionUrl: '/get-involved/nrc-volunteer'
      },
      {
        id: 'notif-2',
        userId: 'marie.dubois@email.com',
        type: 'application_submitted',
        title: 'NRC Application Submitted',
        message: 'Thank you for applying to the NESA Nominee Research Corps! Your application is now under review.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        read: false,
        priority: 'medium',
        category: 'application',
        actionUrl: '/get-involved/nrc-volunteer'
      }
    ];
    
    saveNotificationsToStorage(sampleNotifications);
  }
};

// Initialize sample data on module load
if (typeof window !== 'undefined') {
  initializeSampleNotifications();
}
