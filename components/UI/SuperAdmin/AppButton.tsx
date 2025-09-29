"use client";

import { Button } from "@/components/U-I/button";
import { LucideIcon } from "lucide-react";

interface AppButtonProps {
  label: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const styles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const AppButton: React.FC<AppButtonProps> = ({
  label,
  icon: Icon,
  variant = "primary",
  size = "md",
  onClick,
}) => {
  return (
    <Button
    onClick={onClick}
    className={`${styles[variant]} ${sizes[size]} flex items-center gap-2`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </Button>
  );
};

export default AppButton;
