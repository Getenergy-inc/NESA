"use client";

import React from "react";

type Option = { label: string; value: string } | string;

interface AppSelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  disabled,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) =>
          typeof opt === "string" ? (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default AppSelect;
