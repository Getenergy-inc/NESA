import React from 'react';
import { User, Lock, Bell, CreditCard, Shield, Globe, HelpCircle, LogOut } from "lucide-react";
import { useAuthContext } from '@/lib/context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuthContext();

  const tabs = [
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { id: "security", icon: <Lock className="w-5 h-5" />, label: "Security" },
    { id: "notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    { id: "billing", icon: <CreditCard className="w-5 h-5" />, label: "Billing" },
    { id: "privacy", icon: <Shield className="w-5 h-5" />, label: "Privacy" },
    { id: "preferences", icon: <Globe className="w-5 h-5" />, label: "Preferences" }
  ];

  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(name => name.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-deepGold flex items-center justify-center text-black font-bold text-lg">
                {user?.name ? getInitials(user.name) : <User className="w-5 h-5" />}
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-500">{user?.role || 'Member'}</p>
            </div>
          </div>
        </div>

        <nav className="p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition ${
                activeTab === tab.id
                  ? "bg-deepGold/10 text-deepGold font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={`mr-3 ${
                activeTab === tab.id ? "text-deepGold" : "text-gray-400"
              }`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition">
            <HelpCircle className="w-5 h-5 text-gray-400 mr-3" />
            Help & Support
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5 text-red-400 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;