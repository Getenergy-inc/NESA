"use client";

import React, { useState } from "react";

type Status = "Draft" | "Submitted" | "Verified" | "Flagged";

interface Nominee {
  id: number;
  name: string;
  category: string;
  submissionDate: string;
  status: Status;
}

const initialNominees: Nominee[] = [
  {
    id: 1,
    name: "Ngozi Okonjo-Iweala",
    category: "Leadership",
    submissionDate: "2025-08-01",
    status: "Verified",
  },
  {
    id: 2,
    name: "Chimamanda Adichie",
    category: "Literature",
    submissionDate: "2025-08-05",
    status: "Submitted",
  },
  {
    id: 3,
    name: "Aliko Dangote",
    category: "Business",
    submissionDate: "2025-08-10",
    status: "Draft",
  },
  {
    id: 4,
    name: "Wangari Maathai",
    category: "Environment",
    submissionDate: "2025-08-15",
    status: "Flagged",
  },
];

const statusColors: Record<Status, string> = {
  Draft: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  Submitted: "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100",
  Verified: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
  Flagged: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
};

const NominationSystem: React.FC = () => {
  const [nominees, setNominees] = useState(initialNominees);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "All">("All");

  const filteredNominees = nominees.filter(
    (n) =>
      (n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.category.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || n.status === filter)
  );

  const bulkAction = (action: "Approve" | "Reject" | "Export") => {
    if (action === "Approve") {
      setNominees((prev) =>
        prev.map((n) =>
          n.status === "Submitted" ? { ...n, status: "Verified" } : n
        )
      );
    } else if (action === "Reject") {
      setNominees((prev) =>
        prev.map((n) =>
          n.status === "Submitted" ? { ...n, status: "Flagged" } : n
        )
      );
    } else if (action === "Export") {
      alert("📁 Exporting nominees as CSV...");
    }
  };

  return (
    <div
      className="p-6 space-y-6"
      style={{
        backgroundImage: "url('/images/bg/about_.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        📂 Nomination Management
      </h2>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            type="text"
            placeholder="Search nominees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-whiteGold dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Status | "All")}
            className="px-4 py-2 rounded-lg bg-whiteGold text-[#17120a] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Verified">Verified</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => bulkAction("Approve")}
            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Approve
          </button>
          <button
            onClick={() => bulkAction("Reject")}
            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Reject
          </button>
          <button
            onClick={() => bulkAction("Export")}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Export
          </button>
        </div>
      </div>

      {/* Nominee Table */}
      <div className="overflow-x-auto bg-whiteGold text-[#17120a] dark:bg-gray-800 rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Submission Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredNominees.map((n) => (
              <tr
                key={n.id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{n.name}</td>
                <td className="px-4 py-2">{n.category}</td>
                <td className="px-4 py-2">{n.submissionDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${statusColors[n.status]}`}
                  >
                    {n.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredNominees.length === 0 && (
          <p className="text-center text-[#17120a] dark:text-gray-400 p-4">
            No nominees found.
          </p>
        )}
      </div>
    </div>
  );
};

export default NominationSystem;
