"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

interface Ambassador {
  id: number;
  name: string;
  chapter: string;
  role: string;
  score: number;
  status: "Active" | "Inactive";
}

const chapterData = [
  { chapter: "Nigeria", ambassadors: 42 },
  { chapter: "Kenya", ambassadors: 28 },
  { chapter: "Ghana", ambassadors: 19 },
  { chapter: "South Africa", ambassadors: 33 },
  { chapter: "Egypt", ambassadors: 25 },
];

const engagementData = [
  { month: "Jan", events: 12, engagement: 78 },
  { month: "Feb", events: 9, engagement: 65 },
  { month: "Mar", events: 15, engagement: 84 },
  { month: "Apr", events: 10, engagement: 71 },
  { month: "May", events: 14, engagement: 89 },
  { month: "Jun", events: 11, engagement: 74 },
];

const ambassadors: Ambassador[] = [
  { id: 1, name: "Amina Bello", chapter: "West Africa", role: "Lead", score: 92, status: "Active" },
  { id: 2, name: "Kwame Mensah", chapter: "West Africa", role: "Coordinator", score: 80, status: "Active" },
  { id: 3, name: "Lerato Dlamini", chapter: "Southern Africa", role: "Lead", score: 75, status: "Inactive" },
  { id: 4, name: "Omar Abdallah", chapter: "North Africa", role: "Coordinator", score: 88, status: "Active" },
];

const chapterStats = [
  { region: "West Africa", chapters: 12 },
  { region: "East Africa", chapters: 9 },
  { region: "North Africa", chapters: 7 },
  { region: "Southern Africa", chapters: 10 },
  { region: "Central Africa", chapters: 5 },
];

const ChapterTracker: React.FC = () => {
  const totalChapters = chapterStats.reduce((sum, c) => sum + c.chapters, 0);
  const activeAmbassadors = ambassadors.filter((a) => a.status === "Active").length;
  const topRegion = chapterStats.reduce((max, c) =>
    c.chapters > max.chapters ? c : max
  ).region;

  return (
    <div
      className="p-4 sm:p-6 space-y-6"
      style={{
        backgroundImage: "url('/images/bg/about_.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-gray-100">
        🌍 Chapter & Ambassador Tracker
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/60 dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#17120a] dark:text-gray-400">Active Chapters</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">15</p>
        </div>
        <div className="bg-white/60 dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#17120a] dark:text-gray-400">Ambassadors</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">147</p>
        </div>
        <div className="bg-white/60 dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#17120a] dark:text-gray-400">Events (YTD)</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">71</p>
        </div>
        <div className="bg-white/60 dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#17120a] dark:text-gray-400">Avg. Engagement Rate</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">82%</p>
        </div>
      </div>

      {/* Extra Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white/60 dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-base sm:text-lg font-bold">Total Chapters</h3>
          <p className="text-xl font-bold text-blue-600">{totalChapters}</p>
        </div>
        <div className="p-4 bg-white/60 dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-base sm:text-lg font-bold">Active Ambassadors</h3>
          <p className="text-xl font-bold text-green-600">{activeAmbassadors}</p>
        </div>
        <div className="p-4 bg-white/60 dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-base sm:text-lg font-bold">Top Region</h3>
          <p className="text-xl font-bold text-purple-600">{topRegion}</p>
        </div>
      </div>

      {/* Charts & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ambassadors by Chapter */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-[#17120a] dark:text-gray-200 mb-4">
            👥 Ambassadors by Chapter
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chapterData}>
              <XAxis dataKey="chapter" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ambassadors" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chapters per Region */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-base sm:text-lg font-semibold text-[#17120a] dark:text-gray-200 mb-4">
            📊 Chapters per Region
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chapterStats}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
              <XAxis dataKey="region" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="chapters" fill="#2a1f15" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ambassadors Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gray-100 dark:bg-gray-700 text-[#17120a] dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Chapter</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Activity Score</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {ambassadors.map((a) => (
              <tr
                key={a.id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2">{a.chapter}</td>
                <td className="px-4 py-2">{a.role}</td>
                <td className="px-4 py-2">{a.score}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      a.status === "Active"
                        ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                        : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {ambassadors.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 p-4">
            No ambassadors found.
          </p>
        )}
      </div>

      {/* Events & Engagement Trends */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="font-semibold text-[#17120a] dark:text-gray-200 mb-4">
          📈 Events & Engagement Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="events" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChapterTracker;
