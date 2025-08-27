// app/components/admin/SystemSettings.tsx
"use client";

import React, { useState } from "react";

interface ApiLog {
  id: number;
  endpoint: string;
  status: string;
  timestamp: string;
}

const integrations = [
  { id: 1, name: "Slack", status: "Connected" },
  { id: 2, name: "Mailgun", status: "Connected" },
  { id: 3, name: "Twilio", status: "Disconnected" },
];

const auditLogs = [
  { id: 1, action: "Create Nominee", user: "Admin #12", time: "1h ago", status: "Success" },
  { id: 2, action: "Update Judge", user: "Admin #03", time: "3h ago", status: "Failed" },
  { id: 3, action: "Sync Campaign", user: "System", time: "5h ago", status: "Success" },
  { id: 4, action: "Delete Log", user: "Admin #09", time: "1d ago", status: "Success" },
];

const mockApiLogs: ApiLog[] = [
  { id: 1, endpoint: "/api/nominees", status: "200 OK", timestamp: "2025-08-20 10:15" },
  { id: 2, endpoint: "/api/votes", status: "500 Error", timestamp: "2025-08-19 18:44" },
  { id: 3, endpoint: "/api/certificates", status: "200 OK", timestamp: "2025-08-19 14:22" },
];

const SystemSettings: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [votingStart, setVotingStart] = useState("2025-09-01");
  const [votingEnd, setVotingEnd] = useState("2025-09-30");
  const [bonusCampaign, setBonusCampaign] = useState(true);
  const [integrations, setIntegrations] = useState({
    zoom: true,
    paystack: false,
    slack: true,
  });

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 space-y-6"
          style={{
          backgroundImage: "url('/images/bg/about_.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        ⚙️ System Settings & Integrations
      </h2>

      {/* Voting Period */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-[#17120a dark:text-gray-200">🗳️ Voting Period</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <button
          onClick={() => alert(`Voting period set: ${startDate} → ${endDate}`)}
          className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-indigo-700"
        >
          Save Voting Period
        </button>
      </div>

            {/* Organization Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#17120a] dark:text-gray-200">
          Organization Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1a140b] dark:text-gray-300">
              Voting Start
            </label>
            <input
              type="date"
              value={votingStart}
              onChange={(e) => setVotingStart(e.target.value)}
              className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
                    <div>
            <label className="block text-sm font-medium text-[#1a140b] dark:text-gray-300">
              Voting End
            </label>
            <input
              type="date"
              value={votingEnd}
              onChange={(e) => setVotingEnd(e.target.value)}
              className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bonusCampaign}
            onChange={() => setBonusCampaign(!bonusCampaign)}
            className="h-4 w-4"
          />
          <span className="text-gray-400 dark:text-gray-300">
            Enable Bonus Campaigns
          </span>
        </div>
      </div>

      {/* Bonus Campaigns */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-[#17120a] dark:text-gray-200">🎁 Bonus Campaigns</h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={() => {
              if (campaignName) {
                alert(`Campaign "${campaignName}" created!`);
                setCampaignName("");
              }
            }}
            className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-green-700"
          >
            Create Campaign
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Active Campaign: “Double Votes Week”</p>
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">65% complete</p>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">🔌 Integrations</h3>
        {/* <ul className="space-y-2">
          {integrations.map((int) => (
            <li
              key={int.id}
              className="flex justify-between items-center p-3 rounded-lg border dark:border-gray-700"
            >
              <span className="text-gray-800 dark:text-gray-200">{int.name}</span>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  int.status === "Connected"
                    ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                    : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                }`}
              >
                {int.status}
              </span>
            </li>
          ))}
        </ul> */}

        <div className="space-y-3">
          {Object.entries(integrations).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 border rounded-lg dark:border-gray-700"
            >
              <span className="capitalize text-gray-800 dark:text-gray-200">{key}</span>
              <button
                onClick={() => toggleIntegration(key as keyof typeof integrations)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  value
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {value ? "Enabled" : "Disabled"}
              </button>
            </div>
          ))}
          </div>
      </div>

      {/* API Audit Logs */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">📜 API Audit Logs</h3>
                <div className="overflow-x-auto">
          <table className="min-w-full border dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Endpoint
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Status
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Timestamp
                </th>
              </tr>
            </thead>
                        <tbody>
              {mockApiLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.endpoint}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      log.status.includes("200")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {log.status}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-2">Action</th>
              <th className="p-2">User</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="border-t dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{log.action}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{log.user}</td>
                <td className="p-2 text-gray-600 dark:text-gray-400">{log.time}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                        : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
};

export default SystemSettings;
