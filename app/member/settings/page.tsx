"use client";
import Header from "@/components/UI/Accountsettings/Header";
import Sidebar from "@/components/UI/Accountsettings/Sidebar";
import ProfileTab from "@/components/UI/Accountsettings/ProfileTab";
import SecurityTab from "@/components/UI/Accountsettings/SecurityTab";
import NotificationsTab from "@/components/UI/Accountsettings/NotificationsTab";
import PlaceholderTab from "@/components/UI/Accountsettings/PlaceholderTab";
import { User, Lock, Bell, CreditCard, Shield, Globe, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";

const AccountSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Mujeeb Rahman",
    email: "mujeeb@example.com",
    phone: "+234 812 345 6789",
    bio: "Digital creator and community builder",
    location: "Lagos, Nigeria"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const tabs = [
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { id: "security", icon: <Lock className="w-5 h-5" />, label: "Security" },
    { id: "notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    { id: "billing", icon: <CreditCard className="w-5 h-5" />, label: "Billing" },
    { id: "privacy", icon: <Shield className="w-5 h-5" />, label: "Privacy" },
    { id: "preferences", icon: <Globe className="w-5 h-5" />, label: "Preferences" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1">
            {activeTab === "profile" && (
              <ProfileTab formData={formData} handleInputChange={handleInputChange} />
            )}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab !== "profile" && activeTab !== "security" && activeTab !== "notifications" && (
              <PlaceholderTab tab={tabs.find(t => t.id === activeTab)!} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;