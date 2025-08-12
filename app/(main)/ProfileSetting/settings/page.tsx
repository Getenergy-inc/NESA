"use client";
import Header from "@/components/UI/Accountsettings/Header";
import Sidebar from "@/components/UI/Accountsettings/Sidebar";
import ProfileTab from "@/components/UI/Accountsettings/ProfileTab";
import SecurityTab from "@/components/UI/Accountsettings/SecurityTab";
import NotificationsTab from "@/components/UI/Accountsettings/NotificationsTab";
import PlaceholderTab from "@/components/UI/Accountsettings/PlaceholderTab";
import SkeletonLoader from "@/components/UI/SkeletonLoader"; // Import SkeletonLoader
import { User, Lock, Bell, CreditCard, Shield, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthContext } from '@/lib/context/AuthContext';

const AccountSettingsPage = () => {
  const { user, updateUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    region: ""
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (user) {
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          bio: user.bio || "",
          location: user.location || "",
          region: user.region || ""
        });
      }
      setLoading(false); // Set loading to false after data is fetched
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(formData);
     
    } catch (error) {
     
    }
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
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <Header />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              // Skeleton Loader for the main content
              <div className="space-y-4">
                <SkeletonLoader className="h-8 w-1/3" />
                <SkeletonLoader className="h-6 w-1/2" />
                <SkeletonLoader className="h-6 w-full" />
                <SkeletonLoader className="h-6 w-3/4" />
              </div>
            ) : (
              <>
                {activeTab === "profile" && (
                  <ProfileTab
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                  />
                )}
                {activeTab === "security" && <SecurityTab />}
                {activeTab === "notifications" && <NotificationsTab />}
                {activeTab !== "profile" && activeTab !== "security" && activeTab !== "notifications" && (
                  <PlaceholderTab tab={tabs.find(t => t.id === activeTab)!} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;