import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  color?: "blue" | "yellow" | "green" | "red" | "gray" | "indigo" | "purple" | "orange";
  icon?: ReactNode;
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
  gray: "bg-gray-50 text-gray-700 border-gray-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function OverviewCard({ title, value, color = "gray", icon }: Props) {
  return (
    <div
      className={`rounded-lg border shadow-sm p-4 flex flex-col gap-2 ${colorMap[color]}`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}
