import React from 'react';
import { User } from "lucide-react";

interface ProfileTabProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ formData, handleInputChange }) => {
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
              <img
                src="/avatars/mujeeb.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <div className="flex justify-end">
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium mr-3 hover:bg-gray-300 transition">
            Cancel
          </button>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;