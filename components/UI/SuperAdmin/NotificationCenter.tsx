"use client";

import React, { useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  recipient: string;
  timestamp: string;
}

const activityData = [
  { id: 1, type: "Approval", user: "Nominee #142", time: "2h ago", status: "Completed" },
  { id: 2, type: "Flag", user: "Volunteer #23", time: "5h ago", status: "Pending" },
  { id: 3, type: "Review", user: "Judge #08", time: "1d ago", status: "Completed" },
  { id: 4, type: "Message", user: "All Judges", time: "2d ago", status: "Sent" },
];

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Judging Arena Update",
    message: "New criteria uploaded for Category B.",
    recipient: "Judges",
    timestamp: "2025-08-18 14:32",
  },
  {
    id: 2,
    title: "Chapter Leadership Call",
    message: "Reminder: Monthly leadership call tomorrow.",
    recipient: "Ambassadors",
    timestamp: "2025-08-17 10:15",
  },
  {
    id: 3,
    title: "Voting Opens",
    message: "Public voting is now live across all categories.",
    recipient: "All Users",
    timestamp: "2025-08-15 09:00",
  },
];

const NotificationsMessaging: React.FC = () => {
  const [group, setGroup] = useState("judges");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("All Users");

  const handleSend = () => {
    if (!title || !message) return;
    const newNotification: Notification = {
      id: notifications.length + 1,
      title,
      message,
      recipient,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications([newNotification, ...notifications]);
    setTitle("");
    setMessage("");
    setRecipient("All Users");
  };

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
        📬 Notifications & Messaging
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Notifications Sent", value: "1,248" },
          { label: "Pending Approvals", value: "36" },
          { label: "Bulk Messages Sent", value: "182" },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-whiteGold dark:bg-gray-800 p-4 rounded-2xl shadow"
          >
            <p className="text-xs sm:text-sm text-[#2a1f15] dark:text-gray-400">{kpi.label}</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bulk Messaging Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-[#ea580c] dark:text-gray-200 text-sm sm:text-base">
          ✉️ Send Bulk Message
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="p-2 w-full sm:w-auto rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="judges">Judges</option>
            <option value="volunteers">Volunteers</option>
            <option value="nominees">Nominees</option>
          </select>
          <input
            type="text"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={() => {
              if (message) {
                alert(`Message sent to ${group}: ${message}`);
                setMessage("");
              }
            }}
            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full sm:w-auto"
          >
            Send
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="dark:bg-gray-800 p-4 rounded-2xl overflow-x-auto">
        <h3 className="font-semibold text-white dark:text-gray-200 mb-4 text-sm sm:text-base">
          📝 Activity Feed
        </h3>
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr className="text-whiteGold dark:text-gray-400 text-xs sm:text-sm">
              <th className="p-2">Type</th>
              <th className="p-2">User</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((item) => (
              <tr key={item.id} className="border-t dark:border-gray-700">
                <td className="p-2 text-whiteGold dark:text-gray-200">{item.type}</td>
                <td className="p-2 text-whiteGold dark:text-gray-200">{item.user}</td>
                <td className="p-2 text-gray-300 dark:text-gray-400">{item.time}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Composer */}
      <div className="bg-whiteGold dark:bg-gray-800 rounded-2xl shadow p-4 sm:p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-[#17120a] dark:text-gray-200">
          Send Bulk Notification
        </h3>
        <input
          type="text"
          placeholder="Notification Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <textarea
          placeholder="Notification Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          rows={3}
        />
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          <option>All Users</option>
          <option>Judges</option>
          <option>Nominees</option>
          <option>Ambassadors</option>
        </select>
        <button
          onClick={handleSend}
          className="px-3 sm:px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Send Notification
        </button>
      </div>

      {/* Recent Feed */}
      <div className="bg-whiteGold dark:bg-gray-800 rounded-2xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg text-[#17120a] font-semibold mb-4 dark:text-gray-200">
          Recent Notifications
        </h3>
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="p-4 border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h4 className="font-semibold text-[#2a1f15] dark:text-gray-100">
                  {n.title}
                </h4>
                <span className="text-xs text-[#1a140b] dark:text-gray-400 mt-1 sm:mt-0">
                  {n.timestamp}
                </span>
              </div>
              <p className="text-gray-700 dark:text-[#1a140b] mt-2">{n.message}</p>
              <span className="text-xs font-medium px-2 py-1 mt-2 inline-block rounded bg-blue-200 text-deepGold dark:bg-blue-700 dark:text-blue-200">
                {n.recipient}
              </span>
            </li>
          ))}
          {notifications.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No notifications sent yet.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsMessaging;
