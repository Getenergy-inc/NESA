import React from 'react';

interface PlaceholderTabProps {
  tab: {
    id: string;
    icon: React.ReactNode;
    label: string;
  };
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ tab }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          {tab.label} Settings
        </h2>
        <p className="text-gray-600">Manage your {tab.label.toLowerCase()} settings</p>
      </div>
      <div className="p-6 text-center py-12">
        <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-4">
          {tab.icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {tab.label} Section
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          This section is under development. You'll be able to manage your {tab.label.toLowerCase()} settings here soon.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderTab;