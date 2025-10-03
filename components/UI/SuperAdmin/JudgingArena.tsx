"use client";

import React, { useState } from "react";

interface Nominee {
  id: number;
  name: string;
  category: string;
  score?: number;
  comment?: string;
}

const initialNominees: Nominee[] = [
  { id: 1, name: "Ngozi Okonjo-Iweala", category: "Leadership" },
  { id: 2, name: "Wole Soyinka", category: "Literature" },
  { id: 3, name: "Ellen Johnson Sirleaf", category: "Governance" },
];

const judges = [
  { nominee: "Nominee A", judge: "Judge 1", status: "Completed", score: 85 },
  { nominee: "Nominee B", judge: "Judge 2", status: "Pending", score: null },
  { nominee: "Nominee C", judge: "Judge 3", status: "Completed", score: 92 },
];

const feedback = [
  { judge: "Judge 1", nominee: "Nominee A", comment: "Strong leadership impact" },
  { judge: "Judge 3", nominee: "Nominee C", comment: "Excellent innovation" },
];

const JudgingArena: React.FC = () => {
  const [nominees, setNominees] = useState(initialNominees);

  const handleScoreChange = (id: number, score: number) => {
    setNominees((prev) =>
      prev.map((n) => (n.id === id ? { ...n, score } : n))
    );
  };

  const handleCommentChange = (id: number, comment: string) => {
    setNominees((prev) =>
      prev.map((n) => (n.id === id ? { ...n, comment } : n))
    );
  };

  const completedReviews = nominees.filter((n) => n.score !== undefined).length;
  const progress = Math.round((completedReviews / nominees.length) * 100);

  return (
    <div
      className="p-6 space-y-6"
      style={{
        backgroundImage: "url('/images/bg/about_.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        ⚖️ Judging Arena
      </h2>

      {/* Assignments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 overflow-x-auto">
        <h3 className="text-lg text-[#ea580c] font-semibold mb-3">Assignments</h3>
        <table className="min-w-full text-left text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">Nominee</th>
              <th className="p-2">Judge</th>
              <th className="p-2">Score</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {judges.map((j, idx) => (
              <tr key={idx} className="border-b dark:border-gray-700">
                <td className="p-2">{j.nominee}</td>
                <td className="p-2">{j.judge}</td>
                <td className="p-2">{j.score ?? "-"}</td>
                <td className="p-2">
                  {j.status === "Completed" ? (
                    <span className="text-green-600 font-medium">{j.status}</span>
                  ) : (
                    <span className="text-yellow-500 font-medium">{j.status}</span>
                  )}
                </td>
                <td className="p-2">
                  {j.status === "Pending" ? (
                    <button className="px-3 py-1 bg-[#1a140b] text-white rounded-lg text-xs sm:text-sm">
                      Notify Judge
                    </button>
                  ) : (
                    <button className="px-3 py-1 bg-[#ffbe4f] dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-xs sm:text-sm">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scoring Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 space-y-4">
        <h3 className="text-lg font-semibold">Scoring Panel</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Criteria: Impact
            </label>
            <input
              type="number"
              max={100}
              className="w-full p-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter score"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Comments
            </label>
            <textarea
              className="w-full p-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Judge’s comments"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#ea580c] text-white rounded-lg w-full sm:w-auto"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="font-semibold text-[#17120a] dark:text-gray-200 mb-2">
          📊 Review Progress
        </h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full text-xs text-white text-center"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {completedReviews} of {nominees.length} reviews completed
        </p>
      </div>

      {/* Review Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-[#17120a] dark:text-gray-200">
          📝 Scoring & Comments
        </h3>
        {nominees.map((nominee) => (
          <div
            key={nominee.id}
            className="p-3 border dark:border-gray-700 rounded-lg space-y-3"
          >
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {nominee.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Category: {nominee.category}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                placeholder="Score (0-100)"
                value={nominee.score ?? ""}
                onChange={(e) =>
                  handleScoreChange(nominee.id, Number(e.target.value))
                }
                className="w-full sm:w-28 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
              <textarea
                placeholder="Judge’s comments..."
                value={nominee.comment ?? ""}
                onChange={(e) => handleCommentChange(nominee.id, e.target.value)}
                className="flex-1 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <button className="px-3 py-1 bg-[#ea580c] text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto">
              Submit Review
            </button>
          </div>
        ))}
      </div>

      {/* Auto Notify */}
      {progress < 100 && (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg text-yellow-800 dark:text-yellow-200">
          ⚠ Some reviews are incomplete. Please finish before deadline.
        </div>
      )}

      {/* Feedback Log */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#17120a] dark:text-gray-200">
          Judges’ Feedback
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-200">
          {feedback.map((f, idx) => (
            <li
              key={idx}
              className="border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              <span className="font-semibold">{f.judge}</span> on{" "}
              <span className="italic">{f.nominee}</span>: {f.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JudgingArena;
