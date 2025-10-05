"use client";

import React from "react";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...props}
        className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default AppInput;
