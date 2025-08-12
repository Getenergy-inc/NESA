'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Mail,
  Smartphone,
  Calendar,
  Award,
  Bell,
  AlertCircle,
  TrendingUp,
  Info,
  Save,
  Check
} from 'lucide-react';
import Button from '@/components/Common/Button';
import { useNotificationPreferences } from '@/lib/hooks/useNotifications';
import type { NotificationPreferences } from '@/lib/services/mockNotificationService';

interface NotificationPreferencesProps {
  onSave?: () => void;
}

const NotificationPreferencesComponent: React.FC<NotificationPreferencesProps> = ({ onSave }) => {
  const { preferences, loading, updatePreferences } = useNotificationPreferences();
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferences | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const handleSave = async () => {
    if (!localPreferences) return;

    setSaving(true);
    try {
      updatePreferences(localPreferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSave?.();
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (key: keyof NotificationPreferences, value: any) => {
    if (!localPreferences) return;
    
    setLocalPreferences({
      ...localPreferences,
      [key]: value
    });
  };

  const updateCategoryPreference = (category: keyof NotificationPreferences['categories'], value: boolean) => {
    if (!localPreferences) return;
    
    setLocalPreferences({
      ...localPreferences,
      categories: {
        ...localPreferences.categories,
        [category]: value
      }
    });
  };

  if (loading || !localPreferences) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-[#ea580c]" />
        <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.emailNotifications}
                  onChange={(e) => updatePreference('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                  <p className="text-xs text-gray-500">Receive real-time push notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.pushNotifications}
                  onChange={(e) => updatePreference('pushNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Weekly Digest</label>
                  <p className="text-xs text-gray-500">Receive weekly summary emails</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.weeklyDigest}
                  onChange={(e) => updatePreference('weeklyDigest', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Deadline Reminders</label>
                  <p className="text-xs text-gray-500">Get notified about upcoming deadlines</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.deadlineReminders}
                  onChange={(e) => updatePreference('deadlineReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Achievement Notifications</label>
                  <p className="text-xs text-gray-500">Celebrate milestones and achievements</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.achievementNotifications}
                  onChange={(e) => updatePreference('achievementNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-700">System Updates</label>
                  <p className="text-xs text-gray-500">Important system announcements</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.systemUpdates}
                  onChange={(e) => updatePreference('systemUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Category Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Categories</h3>
          <div className="space-y-4">
            {[
              { key: 'application', label: 'Application Updates', icon: Bell, description: 'Application status changes' },
              { key: 'nominee', label: 'Nominee Updates', icon: Award, description: 'Nominee submission and review updates' },
              { key: 'system', label: 'System Notifications', icon: Info, description: 'Platform updates and announcements' },
              { key: 'reminder', label: 'Reminders', icon: AlertCircle, description: 'Deadline and task reminders' },
              { key: 'achievement', label: 'Achievements', icon: TrendingUp, description: 'Milestones and progress updates' }
            ].map(({ key, label, icon: Icon, description }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPreferences.categories[key as keyof typeof localPreferences.categories]}
                    onChange={(e) => updateCategoryPreference(key as keyof typeof localPreferences.categories, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ea580c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            text={saved ? "Saved!" : saving ? "Saving..." : "Save Preferences"}
            onClick={handleSave}
            disabled={saving || saved}
            variant="filled"
            className={`w-full ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-[#ea580c] hover:bg-[#dc2626]'} text-white flex items-center justify-center gap-2`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesComponent;
