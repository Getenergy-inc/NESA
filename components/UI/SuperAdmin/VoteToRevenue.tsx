"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, Coins, BarChart3, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function VoteToRevenueTracker() {
  const [votes, setVotes] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes((v) => v + Math.floor(Math.random() * 10));
      setRevenue((r) => parseFloat((r + Math.random() * 5).toFixed(2)));
      setGrowth((g) => Math.min(g + Math.random() * 2, 100));
      setLoading(false);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <BarChart3 className="text-blue-600" />
          Vote–AGC Revenue Tracker
        </h2>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
        {/* Votes */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-xl p-4 bg-blue-50 border border-blue-300 text-center"
        >
          <TrendingUp className="mx-auto mb-2 text-blue-600 w-6 h-6" />
          <p className="text-sm text-gray-600 ">
            Total Votes
          </p>
          <h3 className="text-2xl font-bold text-blue-700 ">
            {votes}
          </h3>
        </motion.div>

        {/* Revenue */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-xl p-4 bg-amber-50 border border-amber-300 text-center"
        >
          <Coins className="mx-auto mb-2 text-amber-600 w-6 h-6" />
          <p className="text-sm text-gray-600 ">
            AGC Earned
          </p>
          <h3 className="text-2xl font-bold text-amber-700 ">
            {revenue.toFixed(2)} AGC
          </h3>
        </motion.div>

        {/* Growth */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-xl p-4 bg-green-50 border border-green-300 text-center"
        >
          <TrendingUp className="mx-auto mb-2 text-green-600 w-6 h-6" />
          <p className="text-sm text-gray-600 ">Growth</p>
          <h3 className="text-2xl font-bold text-green-700 ">
            +{growth.toFixed(1)}%
          </h3>
        </motion.div>
      </div>

      {/* Animated Progress Bar */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-600  mb-2">
          Real-Time Growth Progress
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-green-500"
            initial={{ width: "0%" }}
            animate={{ width: `${growth}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <p className="text-xs text-gray-500  mt-2">
          Updated live every 2 seconds
        </p>
      </div>
    </motion.div>
  );
}
