"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  generateTransactionLog,
  TransactionLog,
} from "@/lib/utils/walletUtils";
import { ChevronDown, ChevronUp, Download, Filter } from "lucide-react";

export default function TransactionLogTable() {
  const [logs, setLogs] = useState<TransactionLog[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  // 🔹 Filters
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // 🔹 Load logs from localStorage
  useEffect(() => {
    const storedLogs = localStorage.getItem("transactionLogs");
    if (storedLogs) {
      try {
        setLogs(JSON.parse(storedLogs));
      } catch (error) {
        console.error("Error parsing stored transaction logs:", error);
      }
    }
  }, []);

  // 🔹 Persist logs to localStorage whenever they change
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem("transactionLogs", JSON.stringify(logs));
    }
  }, [logs]);

  // 🔹 Add random transaction (for demo)
  const handleAddTransaction = () => {
    const sources = [
      "Voting Revenue",
      "Nomination Fee",
      "Sponsorship",
      "Chapter Contribution",
    ];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const newLog = generateTransactionLog(
      randomSource,
      Math.floor(Math.random() * 10000) + 1000,
      Math.random() < 0.5
    );
    setLogs((prev) => [newLog, ...prev]);
  };

  // 🔹 Clear all logs
  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear all transaction logs?")) {
      setLogs([]);
      localStorage.removeItem("transactionLogs");
    }
  };

  // 🔹 Export CSV
  const handleExportCSV = () => {
    if (logs.length === 0) {
      alert("No transactions to export.");
      return;
    }

    const csvRows: string[] = [];
    csvRows.push(
      [
        "Transaction ID",
        "Source",
        "Amount (₦)",
        "Commission (₦)",
        "Net Distributed (₦)",
        "Date",
        "Distribution Breakdown",
      ].join(",")
    );

    logs.forEach((log) => {
      const breakdown = log.distribution
        .map((d) => `${d.name}: ₦${d.amount} (${d.percent}%)`)
        .join(" | ");
      csvRows.push(
        [
          log.id,
          `"${log.source}"`,
          log.amount,
          log.commission,
          log.totalDistributed,
          new Date(log.timestamp).toLocaleString(),
          `"${breakdown}"`,
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `TransactionLogs_${Date.now()}.csv`);
    link.click();
  };

  // 🔹 Apply filters
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const logDate = new Date(log.timestamp);

      const matchesSource =
        sourceFilter === "all" || log.source === sourceFilter;

      const matchesStart =
        !startDate || logDate >= new Date(startDate + "T00:00:00");

      const matchesEnd =
        !endDate || logDate <= new Date(endDate + "T23:59:59");

      return matchesSource && matchesStart && matchesEnd;
    });
  }, [logs, sourceFilter, startDate, endDate]);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          💰 AGC Transaction Log
        </h3>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAddTransaction}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + Add Transaction
          </button>

          {logs.length > 0 && (
            <>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              <button
                onClick={handleClearLogs}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-800/40">
        <div className="flex items-center gap-3 mb-3">
          <Filter className="w-4 h-4 text-blue-500" />
          <h4 className="font-semibold text-gray-700 dark:text-gray-300">
            Filters
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Source
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm bg-white dark:bg-gray-900"
            >
              <option value="all">All Sources</option>
              <option value="Voting Revenue">Voting Revenue</option>
              <option value="Nomination Fee">Nomination Fee</option>
              <option value="Sponsorship">Sponsorship</option>
              <option value="Chapter Contribution">Chapter Contribution</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredLogs.length === 0 ? (
        <p className="text-gray-500 text-sm">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <th className="py-2 px-3 text-left">Source</th>
                <th className="py-2 px-3 text-left">Amount (₦)</th>
                <th className="py-2 px-3 text-left">Commission</th>
                <th className="py-2 px-3 text-left">Net Distributed</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-2 px-3">{log.source}</td>
                    <td className="py-2 px-3">₦{log.amount.toLocaleString()}</td>
                    <td className="py-2 px-3 text-red-500">
                      ₦{log.commission.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-green-600">
                      ₦{log.totalDistributed.toLocaleString()}
                    </td>
                    <td className="py-2 px-3">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() =>
                          setExpanded(expanded === log.id ? null : log.id)
                        }
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {expanded === log.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expanded === log.id && (
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={6} className="p-3">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <h4 className="font-semibold mb-2">
                            Distribution Breakdown:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {log.distribution.map((d, i) => (
                              <div
                                key={i}
                                className="flex justify-between border border-gray-200 dark:border-gray-700 rounded-md p-2"
                              >
                                <span>{d.name}</span>
                                <span>
                                  ₦{d.amount?.toLocaleString()} ({d.percent}%)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

