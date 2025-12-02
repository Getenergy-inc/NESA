"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/U-I/card";
import { DollarSign } from "lucide-react";

interface RevenueItem {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; 
}

const data: RevenueItem[] = [
  { name: "NESA Headquarters (HQ)", value: 65, color: "#2563eb" },
  { name: "SCEF", value: 5, color: "#16a34a" },
  { name: "EduAid", value: 5, color: "#f59e0b" },
  { name: "Local Chapters", value: 5, color: "#ef4444" },
  { name: "Referral Bonuses", value: 5, color: "#f59e0b" },
  { name: "CVO Discretionary Fund", value: 5, color: "#9333ea" },
  {name: "Fundraising Commissions", value: 10, color: "#14b8a6" },
];

const RevenueDistributionDashboard: React.FC = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  return (
    <Card className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
      <CardHeader className="flex justify-between items-start p-6 pb-0">
        <CardTitle className="flex items-center gap-2 text-gray-800 text-lg font-semibold mb-2">
          <DollarSign className="text-green-600" />
          Revenue Distribution Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* 🎯 Interactive Pie Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                paddingAngle={4}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#fff"
                    strokeWidth={activeIndex === index ? 3 : 1}
                    style={{
                      cursor: "pointer",
                      transform:
                        activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.3s ease, stroke-width 0.3s ease",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 Breakdown List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Revenue Allocation Breakdown
          </h3>
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li
                key={item.name}
                className={`flex justify-between items-center border-b pb-2 transition-all ${
                  activeIndex === index ? "bg-gray-50 rounded-md px-2" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {item.value}% of total
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t mt-2">
            <p className="text-sm text-gray-500">
              Total Distribution:{" "}
              <span className="font-semibold text-gray-800">{total}%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueDistributionDashboard;
