"use client";

import * as React from "react";

interface ProgressProps {
  value: number; // 0–100
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 ${className || ""}`}>
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
