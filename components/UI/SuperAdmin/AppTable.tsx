"use client";

import React from "react";

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const statusColors: Record<string, string> = {
  Submitted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Verified: "bg-green-100 text-green-700 border-green-200",
  Flagged: "bg-red-100 text-red-700 border-red-200",
  Draft: "bg-gray-100 text-gray-700 border-gray-200",
};

const AppTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition">
              {columns.map((col) => {
                const value = row[col.key];

                // Status column → badge
                if (col.key === "status") {
                  return (
                    <td key={col.key} className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          statusColors[value] || "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {value}
                      </span>
                    </td>
                  );
                }

                // Default cell
                return (
                  <td key={col.key} className="px-4 py-3 text-gray-800">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
