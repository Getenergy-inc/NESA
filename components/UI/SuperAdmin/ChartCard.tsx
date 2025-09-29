import { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  height?: string; // e.g. "h-64" or "h-80"
};

export default function ChartCard({
  title,
  subtitle,
  children,
  height = "h-64",
}: ChartCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow flex flex-col ${height}`}>
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Chart container */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
