"use client";

import * as React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "destructive"
    | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  let colorClasses = "";

  switch (variant) {
    case "success":
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "warning":
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "danger":
      colorClasses = "bg-red-100 text-red-800";
      break;
    case "secondary":
      colorClasses = "bg-gray-100 text-gray-800";
      break;
    case "destructive":
      colorClasses = "bg-red-200 text-red-900 font-semibold";
      break;
    case "outline":
      colorClasses =
        "border border-gray-300 text-gray-800 bg-transparent dark:text-gray-200 dark:border-gray-600";
      break;
    default:
      colorClasses = "bg-blue-100 text-blue-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${colorClasses} ${
        className || ""
      }`}
    >
      {children}
    </span>
  );
}
