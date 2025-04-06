import React from 'react';
import { Shield } from "lucide-react";

const SecurityTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
        <p className="text-gray-600">Manage your password and account security</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-start">
            <div className="bg-yellow-100 p-2 rounded-full mr-4 text-yellow-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition">
              Enable
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          <div className="p-5">
            <h3 className="font-medium text-gray-900 mb-3">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition">
                Update Password
              </button>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-medium text-gray-900 mb-3">Recent Devices</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">MacBook Pro</p>
                    <p className="text-sm text-gray-500">Lagos, Nigeria • 15 Jun 2025</p>
                  </div>
                </div>
                <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                  Revoke
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">iPhone 13</p>
                    <p className="text-sm text-gray-500">Lagos, Nigeria • 14 Jun 2025</p>
                  </div>
                </div>
                <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
