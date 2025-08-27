// app/components/admin/AGCWalletPanel.tsx
"use client";

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

const usageData = [
  { day: "Mon", coins: 120 },
  { day: "Tue", coins: 300 },
  { day: "Wed", coins: 250 },
  { day: "Thu", coins: 400 },
  { day: "Fri", coins: 150 },
  { day: "Sat", coins: 500 },
  { day: "Sun", coins: 200 },
];

const walletDistribution = [
  { name: "Nominee", value: 400 },
  { name: "Public", value: 300 },
  { name: "Ambassador", value: 200 },
  { name: "Sponsor", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AGCWalletPanel: React.FC = () => {
  return (
    <div className="p-6 space-y-6"
          style={{
          backgroundImage: "url('/images/bg/about_.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>

      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        💰 AGC Wallet Activity
      </h2>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Daily Usage</h3>
          <LineChart width={400} height={250} data={usageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="coins" stroke="#0088FE" strokeWidth={2} />
          </LineChart>
        </div>

        <div className="bg-[#ffe4ab] dark:bg-gray-800 rounded-2xl p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Wallet Distribution</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={walletDistribution}
              cx={200}
              cy={120}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {walletDistribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-gray-500 dark:text-gray-400">Withdrawable</p>
          <h3 className="text-2xl font-bold text-green-500">₦120,000</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-gray-500 dark:text-gray-400">Non-Withdrawable</p>
          <h3 className="text-2xl font-bold text-red-500">₦45,000</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-gray-500 dark:text-gray-400">Total Transactions</p>
          <h3 className="text-2xl font-bold text-blue-500">₦165,000</h3>
        </div>
      </div>

      {/* Tables */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto p-4">
        <h3 className="text-lg font-semibold mb-2">Purchase Summary</h3>
        <table className="w-full text-left text-gray-700 dark:text-gray-200">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="p-2">Platform</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Flutterwave</td>
              <td className="p-2">₦50,000</td>
              <td className="p-2 text-green-500">Completed</td>
            </tr>
            <tr>
              <td className="p-2">TapTap</td>
              <td className="p-2">₦30,000</td>
              <td className="p-2 text-yellow-500">Pending</td>
            </tr>
            <tr>
              <td className="p-2">Paystack</td>
              <td className="p-2">₦20,000</td>
              <td className="p-2 text-green-500">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Voting Coin Flow</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-200">
          <li>Nominee A → 200 coins (Public Votes)</li>
          <li>Nominee B → 150 coins (Referral)</li>
          <li>Nominee C → 75 coins (Bonus)</li>
        </ul>
      </div>
    </div>
  );
};

export default AGCWalletPanel;
