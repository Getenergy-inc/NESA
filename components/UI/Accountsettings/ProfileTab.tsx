import React, { useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import { useModal } from "@/lib/store/modal";

interface ProfileTabProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    region: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ formData, handleInputChange, handleSave }) => {
  const { showModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

 const handleSaveWithModal = async () => {
  setIsLoading(true); // Show loading spinner
  try {
    await handleSave();
    // Pass content and type as separate arguments
    showModal(
      <p>Your profile has been updated successfully!</p>,
      "success"
    );
  } catch (error) {
    // Pass content and type as separate arguments
    showModal(
      <p>Failed to update profile. Please try again.</p>,
      "error"
    );
  } finally {
    setIsLoading(false); // Hide loading spinner
  }
};

  const getInitials = (name: string) => {
    if (!name.trim()) return <User className="w-8 h-8" />;
    const names = name.split(' ');
    return names.map(n => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
        <p className="text-gray-600">Update your personal details and profile information</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="w-20 h-20 rounded-lg bg-deepGold flex items-center justify-center text-black text-2xl font-bold">
                {getInitials(formData.name)}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white text-deepGold px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button 
            className="px-6 py-2.5 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveWithModal}
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-lg font-medium bg-deepGold text-black hover:bg-deepGold/90 transition flex items-center justify-center gap-2 min-w-[120px] ${
              isLoading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;