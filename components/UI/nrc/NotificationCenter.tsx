'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Filter,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadNotificationCount,
  type Notification
} from '@/lib/services/mockNotificationService';
import { useAuthContext } from '@/lib/context/AuthContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'application' | 'nominee' | 'system' | 'reminder' | 'achievement'>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?.email) {
      loadNotifications();
    }
  }, [isOpen, user?.email]);

  useEffect(() => {
    // Listen for real-time notifications
    const handleNewNotification = (event: CustomEvent) => {
      const newNotification = event.detail as Notification;
      if (newNotification.userId === user?.email) {
        setNotifications(prev => [newNotification, ...prev]);
      }
    };

    window.addEventListener('nrc-notification', handleNewNotification as EventListener);
    return () => {
      window.removeEventListener('nrc-notification', handleNewNotification as EventListener);
    };
  }, [user?.email]);

  const loadNotifications = () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      const userNotifications = getUserNotifications(user.email);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    if (!user?.email) return;
    
    markAllNotificationsAsRead(user.email);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (notificationId: string) => {
    deleteNotification(notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'application':
      case 'nominee':
      case 'system':
      case 'reminder':
      case 'achievement':
        return notification.category === filter;
      default:
        return true;
    }
  });

  const getNotificationIcon = (type: Notification['type'], priority: Notification['priority']) => {
    const iconClass = `w-5 h-5 ${
      priority === 'urgent' ? 'text-red-600' :
      priority === 'high' ? 'text-orange-600' :
      priority === 'medium' ? 'text-blue-600' :
      'text-gray-600'
    }`;

    switch (type) {
      case 'application_submitted':
      case 'application_approved':
      case 'application_rejected':
        return <CheckCircle className={iconClass} />;
      case 'nominee_submitted':
      case 'nominee_approved':
      case 'nominee_rejected':
        return <Award className={iconClass} />;
      case 'deadline_reminder':
        return <Clock className={iconClass} />;
      case 'milestone_achieved':
      case 'weekly_summary':
        return <TrendingUp className={iconClass} />;
      case 'system_update':
      default:
        return <Info className={iconClass} />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-blue-500 bg-blue-50';
      case 'low':
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end pt-16 pr-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#ea580c] text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'application', label: 'Apps' },
              { key: 'nominee', label: 'Nominees' },
              { key: 'reminder', label: 'Reminders' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  filter === key 
                    ? 'bg-white text-[#ea580c] font-medium' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        {notifications.some(n => !n.read) && (
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 text-sm text-[#ea580c] hover:text-[#dc2626] font-medium"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#ea580c] mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                      !notification.read ? getPriorityColor(notification.priority) : 'border-l-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="Mark as read"
                              >
                                <Check className="w-3 h-3 text-gray-600" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="p-1 hover:bg-red-100 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3 text-gray-600 hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                        
                        <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-xs text-[#ea580c] hover:text-[#dc2626] font-medium"
                              onClick={onClose}
                            >
                              View →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationCenter;
