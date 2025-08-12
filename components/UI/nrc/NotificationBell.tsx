'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing } from 'lucide-react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import NotificationCenter from './NotificationCenter';

interface NotificationBellProps {
  className?: string;
  showLabel?: boolean;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ 
  className = '', 
  showLabel = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.button
        onClick={handleToggle}
        className={`relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {unreadCount > 0 ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <BellRing className="w-6 h-6 text-[#ea580c]" />
            </motion.div>
          ) : (
            <Bell className="w-6 h-6 text-gray-600" />
          )}
          
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.div>
          )}
        </div>
        
        {showLabel && (
          <span className="text-sm font-medium text-gray-700">
            Notifications
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <NotificationCenter 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationBell;
