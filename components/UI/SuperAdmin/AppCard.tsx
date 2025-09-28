"use client";

import React from "react";

interface AppCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean; // optional gradient background
  hoverEffect?: boolean; // optional hover lift
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  children,
  className = "",
  gradient = false,
  hoverEffect = true,
}) => {
  return (
    <div
      className={`
        mb-6 rounded-2xl shadow-md border border-gray-200 transition-all
        ${gradient ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white" : "bg-white"}
        ${hoverEffect ? "hover:shadow-xl hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {title && (
        <div
          className={`px-5 py-3 border-b ${
            gradient ? "border-white/30" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              gradient ? "text-white" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};

export default AppCard;

