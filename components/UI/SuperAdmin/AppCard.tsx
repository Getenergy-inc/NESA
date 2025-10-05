"use client";

import React from "react";

interface AppCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const AppCard: React.FC<AppCardProps> = ({ title, children, className }) => {
  return (
    <div
      className={`mb-6 rounded-2xl shadow-md bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 ${className || ""}`}
    >
      {title && (
        <div className="px-4 py-3 border-b border-indigo-100">
          <h3 className="text-indigo-700 text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default AppCard;
