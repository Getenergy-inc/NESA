
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
    <div className="p-6 space-y-6"
          style={{
          backgroundImage: "url('/images/bg/about_.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        📬 Notifications & Messaging
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-whiteGold dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#2a1f15] dark:text-gray-400">Total Notifications Sent</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">1,248</p>
        </div>
        <div className="bg-whiteGold dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#2a1f15] dark:text-gray-400">Pending Approvals</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">36</p>
        </div>
        <div className="bg-whiteGold dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-[#2a1f15] dark:text-gray-400">Bulk Messages Sent</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">182</p>
        </div>
      </div>

      {/* Bulk Messaging Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-[#ea580c] dark:text-gray-200">
          ✉️ Send Bulk Message
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
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
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className=" dark:bg-gray-800 p-4 rounded-2xl ">
        <h3 className="font-semibold text-white dark:text-gray-200 mb-4">
          📝 Activity Feed
        </h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-whiteGold dark:text-gray-400 text-sm">
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
      <div className="bg-whiteGold dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#17120a] dark:text-gray-200">
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
          className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-blue-700"
        >
          Send Notification
        </button>
      </div>

      {/* Recent Feed */}
      <div className="bg-whiteGold dark:bg-gray-800 rounded-2xl p-6">
        <h3 className="text-lg text-[#17120a] font-semibold mb-4 dark:text-gray-200">
          Recent Notifications
        </h3>
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="p-4 border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-[#2a1f15] dark:text-gray-100">
                  {n.title}
                </h4>
                <span className="text-xs text-[#1a140b] dark:text-gray-400">
                  {n.timestamp}
                </span>
              </div>
              <p className="text-gray-700 dark:text-[#1a140b]">{n.message}</p>
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
