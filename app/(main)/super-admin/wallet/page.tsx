import AGCWalletOverview from '@/components/UI/SuperAdmin/AGCWalletOverview'
import React from 'react'


import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import OverviewCard from "@/components/UI/SuperAdmin/OverviewCard";
import ChartCard from "@/components/UI/SuperAdmin/ChartCard";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Wallet, Coins, Gift, Users, Download } from "lucide-react";

// Sample mock data
const usageData = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 200 },
  { day: "Wed", usage: 150 },
  { day: "Thu", usage: 250 },
  { day: "Fri", usage: 300 },
  { day: "Sat", usage: 180 },
  { day: "Sun", usage: 220 },
];

const distributionData = [
  { name: "Nominee", value: 400 },
  { name: "Public", value: 300 },
  { name: "Ambassador", value: 200 },
  { name: "Sponsor", value: 100 },
];

const votingFlowData = [
  { nominee: "Nominee A", votes: 120 },
  { nominee: "Nominee B", votes: 90 },
  { nominee: "Nominee C", votes: 150 },
  { nominee: "Nominee D", votes: 70 },
  { nominee: "Nominee E", votes: 200 },
];

const COLORS = ["#2563eb", "#facc15", "#22c55e", "#ef4444"];

export default function WalletActivityPanel() {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">AGC Wallet Activity Panel</h1>

        {/* Daily/Weekly Usage Chart */}
        <ChartCard
          title="Daily / Weekly AGC Usage"
          subtitle="Usage trends over the last 7 days"
          height="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Coin Distribution */}
        <ChartCard
          title="AGC Coin Distribution"
          subtitle="By wallet type"
          height="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {distributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Voting Coin Flow (Bar Chart Example) */}
        <ChartCard
          title="Voting Coin Flow"
          subtitle="Nominee-specific voting logs"
          height="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={votingFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nominee" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Withdrawable vs Non-Withdrawable */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Withdrawable vs Non-Withdrawable
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OverviewCard
              title="Withdrawable"
              value="2,500 AGC"
              color="green"
              icon={<Download />}
            />
            <OverviewCard
              title="Non-Withdrawable"
              value="7,200 AGC"
              color="red"
              icon={<Wallet />}
            />
          </div>
        </section>

        {/* Purchase Summary */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Purchase Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard
              title="Flutterwave"
              value="₦1.5M"
              color="blue"
              icon={<Coins />}
            />
            <OverviewCard
              title="TapTap"
              value="₦800k"
              color="yellow"
              icon={<Coins />}
            />
            <OverviewCard
              title="Paystack"
              value="₦2.2M"
              color="green"
              icon={<Coins />}
            />
          </div>
        </section>

        {/* Other Trackers */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Additional Logs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard
              title="Bonus Coin Tracker"
              value="450 AGC"
              color="yellow"
              icon={<Gift />}
            />
            <OverviewCard
              title="Referral Coin Tracker"
              value="1,200 AGC"
              color="green"
              icon={<Gift />}
            />
            <OverviewCard
              title="Admin Disbursement Logs"
              value="23 Records"
              color="red"
              icon={<Wallet />}
            />
          </div>
        </section>
      </div>
    </SuperAdminLayout>
  );

