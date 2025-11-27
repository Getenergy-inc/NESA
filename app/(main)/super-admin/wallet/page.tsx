"use client";
import React, { useMemo, useEffect } from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import OverviewCard from "@/components/UI/SuperAdmin/OverviewCard";
import ChartCard from "@/components/UI/SuperAdmin/ChartCard";
import TransactionLogTable from "@/components/UI/SuperAdmin/TransactionTable";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Wallet, Coins, Gift, Download, Percent } from "lucide-react";

// SAMPLE DATA
const usageData = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 200 },
  { day: "Wed", usage: 150 },
  { day: "Thu", usage: 250 },
  { day: "Fri", usage: 300 },
  { day: "Sat", usage: 180 },
  { day: "Sun", usage: 220 },
];

const votingFlowData = [
  { nominee: "Nominee A", votes: 120 },
  { nominee: "Nominee B", votes: 90 },
  { nominee: "Nominee C", votes: 150 },
  { nominee: "Nominee D", votes: 70 },
  { nominee: "Nominee E", votes: 200 },
];

const COLORS = [
  "#2563eb",
  "#facc15",
  "#22c55e",
  "#ef4444",
  "#a855f7",
  "#f97316",
];

// ⭐ 1. REVENUE SPLIT ENGINE
const getDistributionPolicy = (raisedByChapter: boolean = false) => {
  return [
    { name: "NESA HQ", percent: 65 },
    { name: "SCEF", percent: 5 },
    { name: "EduAid", percent: 5 },
    { name: "Local Chapters", percent: raisedByChapter ? 20 : 5 },
    { name: "Referral Bonuses", percent: 5 },
    { name: "CVO Discretionary Fund", percent: 5 },
    { name: "Fundraising Commissions", percent: 5 },
  ];
};

// ⭐ 2. PER-TRANSACTION SPLIT LOGIC
const splitFunds = (amount: number, raisedByChapter: boolean = false) => {
  const commission = 5; // static policy
  const totalAfterCommission = amount * (1 - commission / 100);

  const policy = getDistributionPolicy(raisedByChapter);

  const splits = policy.map((entry) => ({
    name: entry.name,
    percent: entry.percent,
    amount: parseFloat(((entry.percent / 100) * totalAfterCommission).toFixed(2)),
  }));

  return {
    gross: amount,
    commission,
    net: totalAfterCommission,
    splits,
  };
};

export default function WalletActivityPanel() {
  const raisedByChapter = false;

  // ⭐ 3. INTERNAL TRANSACTION LOG STATE
  const [transactionLogs, setTransactionLogs] = React.useState<any[]>([]);

  // ⭐ 4. Simulate automatic wallet-splitting every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const amount = Math.floor(Math.random() * 90000) + 10000; // random 10k - 100k
      const result = splitFunds(amount, raisedByChapter);

      const tx = {
        id: "TX-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        grossAmount: result.gross,
        netAmount: result.net,
        commission: result.commission,
        raisedByChapter,
        splits: result.splits,
      };

      setTransactionLogs((prev) => [tx, ...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, [raisedByChapter]);

  // ⭐ 5. AGGREGATED POLICY FOR PIE-CHART
  const distributionData = useMemo(() => {
    return getDistributionPolicy(raisedByChapter).map((item) => ({
      name: item.name,
      percent: item.percent,
    }));
  }, [raisedByChapter]);

  const total = distributionData.reduce((sum, d) => sum + d.percent, 0);

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          AGC Wallet Activity Panel
        </h1>

        {/* USAGE CHART */}
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
              <Line type="monotone" dataKey="usage" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* VOTING FLOW */}
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

        {/* AUTO-SPLIT PIE GRAPH */}
        <ChartCard
          title="Revenue Distribution Dashboard"
          subtitle="Policy-based distribution of AGC funds"
          height="h-96"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                dataKey="percent"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                // ensure TypeScript won't complain about implicit any by typing the label param
                label={(entry: any) => `${entry.name}: ${entry.percent}%`}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* SUMMARY CARDS */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Fund Distribution Summary ({total}%)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {distributionData.map((item, i) => (
              <OverviewCard
                key={i}
                title={item.name}
                value={`${item.percent}%`}
                color={["blue", "yellow", "green", "red", "purple", "orange"][i % 6]}
                icon={<Percent />}
              />
            ))}
          </div>
        </section>

        {/* ⭐ LIVE TRANSACTION LOGS */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Automated Wallet Split Logs</h2>
          <TransactionLogTable logs={transactionLogs} />
        </section>

        {/* SUMMARY BREAKDOWN */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Withdrawable vs Non-Withdrawable</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OverviewCard title="Withdrawable" value="2,500 AGC" color="green" icon={<Download />} />
            <OverviewCard title="Non-Withdrawable" value="7,200 AGC" color="red" icon={<Wallet />} />
          </div>
        </section>

        {/* PURCHASE SUMMARY */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Purchase Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard title="Flutterwave" value="₦1.5M" color="blue" icon={<Coins />} />
            <OverviewCard title="TapTap" value="₦800k" color="yellow" icon={<Coins />} />
            <OverviewCard title="Paystack" value="₦2.2M" color="green" icon={<Coins />} />
          </div>
        </section>

        {/* ADDITIONAL TRACKERS */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Additional Logs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard title="Bonus Coin Tracker" value="450 AGC" color="yellow" icon={<Gift />} />
            <OverviewCard title="Referral Coin Tracker" value="1,200 AGC" color="green" icon={<Gift />} />
            <OverviewCard title="Admin Disbursement Logs" value="23 Records" color="red" icon={<Wallet />} />
          </div>
        </section>
      </div>
    </SuperAdminLayout>
  );
}