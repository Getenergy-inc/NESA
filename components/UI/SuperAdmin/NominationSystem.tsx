
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

const nominees = [
  { name: "Nominee A", category: "Blue Garnet", sub: "Leadership", country: "Nigeria", status: "Submitted" },
  { name: "Nominee B", category: "Gold Certificate", sub: "Innovation", country: "Kenya", status: "Verified" },
  { name: "Nominee C", category: "Platinum", sub: "Institutional Excellence", country: "South Africa", status: "Flagged" },
  { name: "Nominee D", category: "Blue Garnet", sub: "Arts", country: "Ghana", status: "Draft" },
];

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

const statusColors: Record<string, string> = {
  Draft: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  Submitted: "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100",
  Verified: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
  Flagged: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
};

const NominationSystem: React.FC = () => {
  const [nominees, setNominees] = useState(initialNominees);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filter, setFilter] = useState<Status | "All">("All");

  const filtered = nominees.filter((n) => {
    const matchesSearch =
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCat === "All" || n.category === filterCat;
    return matchesSearch && matchesCategory;
  });

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
    <div className="p-6 space-y-6"
          style={{
          backgroundImage: "url('/images/bg/about_.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        📂 Nomination Management
      </h2>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search nominees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-whiteGold rounded-lg px-4 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg bg-whiteGold text-[#17120a] border-gray-300 px-4 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option>All</option>
          <option>Blue Garnet</option>
          <option>Gold Certificate</option>
          <option>Platinum</option>
        </select>
        <button className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-yellow-900">
          Import Nominations
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search nominees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg flex-1 bg-whiteGold dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Status | "All")}
          className="p-2 border text-[#17120a] rounded-lg bg-whiteGold dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="All">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Verified">Verified</option>
          <option value="Flagged">Flagged</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => bulkAction("Approve")}
            className="px-3 py-1  text-white rounded-lg hover:text-green-200 hover:border-y-green-300"
          >
            Approve
          </button>
          <button
            onClick={() => bulkAction("Reject")}
            className="px-3 py-1 bg-[#ea580c] text-white rounded-lg hover:bg-red-700"
          >
            Reject
          </button>
          <button
            onClick={() => bulkAction("Export")}
            className="px-3 py-1 text-white rounded-lg hover:text-blue-700"
          >
            Export
          </button>
        </div>
      </div>

      {/* Nominee Table */}
      <div className=" p-4 dark:bg-gray-800 rounded-2xl      overflow-x-auto">
        <table className="w-full text-left text-gray-700 dark:text-gray-200">
          <thead>
            <tr className="border-b text-[#fff] border-gray-200 dark:border-gray-700">
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Subcategory</th>
              <th className="p-2">Country</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n, idx) => (
              <tr key={idx} className="border-b text-whiteGold border-gray-100 dark:border-gray-700">
                <td className="p-2">{n.name}</td>
                <td className="p-2">{n.category}</td>
                {/* <td className="p-2">{n.sub}</td>
                <td className="p-2">{n.country}</td> */}
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[n.status]}`}
                  >
                    {n.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button className="px-3 py-1 border-deepGold-300 text-deepGold rounded-lg text-sm">
                    View
                  </button>
                  <button className="px-3 py-1 bg-[#ea580c] text-white rounded-lg text-sm hover:bg-red-700">
                    Flag
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No nominees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        <div className="overflow-x-auto bg-whiteGold text-[#17120a] dark:bg-gray-800 rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
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
