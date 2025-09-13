"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Scale,
  FileText,
  Clock,
  CheckCircle,
  BookOpen,
  Award,
  MessageSquare,
  BarChart3,
  Download,
  Settings,
  Star,
} from "lucide-react";
import Link from "next/link";
import {
  MOCK_JUDGE,
  MOCK_CATEGORIES,
  MOCK_NOMINEES,
  Review,
} from "../data";

type Deadline = {
  id: number;
  nominee: string;
  category: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  timeLeft: string;
};

// this can be changed to the auth judge user or whatever
const CURRENT_JUDGE = Array.isArray(MOCK_JUDGE) ? MOCK_JUDGE[0] : MOCK_JUDGE;

// Upcoming deadline mock
const upcomingDeadlines: Deadline[] = [
  { id: 1, nominee: "Dr. Amina Hassan", category: "Africa Icon", deadline: "Aug 15, 2025", priority: "high", timeLeft: "3 days" },
  { id: 2, nominee: "TechEd Initiative", category: "Innovation in Learning", deadline: "Aug 20, 2025", priority: "medium", timeLeft: "8 days" },
  { id: 3, nominee: "Green Schools Project", category: "Community Impact", deadline: "Aug 25, 2025", priority: "low", timeLeft: "13 days" }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50 border-red-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "low":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export default function JudgesDashboard() {
  // derive stats from nominees (reviews are nested under each nominee)
  // number of nominees assigned to this judge (if assignedCategories exists) i.e it picks the total lenght of nominees in the all the assigned cateogries
  const totalAssigned = Array.isArray(CURRENT_JUDGE.assignedCategories) && CURRENT_JUDGE.assignedCategories.length > 0
    ? MOCK_NOMINEES.filter((n) => CURRENT_JUDGE.assignedCategories.includes(n.category)).length
    : MOCK_NOMINEES.length;

  // how many nominees this judge has reviewed
  // checks all nominees in it assigned category checks their reviews for the current judge id and gets the length
  const completed = MOCK_NOMINEES.filter((n) =>
    Array.isArray(n.reviews) && n.reviews.some((r: Review) => r.judgeId === CURRENT_JUDGE.id)
  ).length;

  //self explanatory
  const pending = totalAssigned - completed;

  // average score for this judge across their reviews (this can be changed for whichever sequence want to be used)
  const judgeScores = MOCK_NOMINEES.flatMap((n) =>
    (n.reviews || []).filter((r: Review) => r.judgeId === CURRENT_JUDGE.id)
  );
  const avgScore =
    judgeScores.length > 0
      ? (judgeScores.reduce((sum, r: any) => sum + ((r.stars ?? r.rating) ?? 0), 0) / judgeScores.length).toFixed(1)
      : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {CURRENT_JUDGE.name}!</h1>
                {/* if judgeLevel/certificationDate exist on the object, show them */}
                <p className="text-orange-100">
                  {CURRENT_JUDGE.judgeLevel ?? "Judge"} {CURRENT_JUDGE.certificationDate ? `• Certified since ${CURRENT_JUDGE.certificationDate}` : ""}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{avgScore}</div>
                  <div className="text-sm text-orange-100">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{completed}</div>
                  <div className="text-sm text-orange-100">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Assigned Nominations" value={totalAssigned} icon={<FileText className="w-6 h-6 text-blue-600" />} bg="bg-blue-50" />
          <StatCard title="Completed" value={completed} icon={<CheckCircle className="w-6 h-6 text-green-600" />} bg="bg-green-50" />
          <StatCard title="Pending" value={pending} icon={<Clock className="w-6 h-6 text-orange-600" />} bg="bg-orange-50" />
          <StatCard title="Average Score" value={avgScore} icon={<Star className="w-6 h-6 text-purple-600" />} bg="bg-purple-50" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Quick Actions + Category Assignments) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
                  <Scale className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Pending Evaluations</div>
                    <div className="text-sm text-gray-600">Review and score nominations</div>
                  </div>
                </button>

                <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                  <BookOpen className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Judging Guidelines</div>
                    <div className="text-sm text-gray-600">Access evaluation criteria</div>
                  </div>
                </button>

                <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                  <MessageSquare className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Judge Chat Room</div>
                    <div className="text-sm text-gray-600">Collaborate with other judges</div>
                  </div>
                </button>

                <button className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                  <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Evaluation History</div>
                    <div className="text-sm text-gray-600">View past evaluations</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Assigned Category */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Category</h2>
              <div className="space-y-4">
                {MOCK_CATEGORIES
                  .filter((c) => Array.isArray(CURRENT_JUDGE.assignedCategories) ? CURRENT_JUDGE.assignedCategories.includes(c.slug) : true)
                  .map((c) => {
                    const nominees = MOCK_NOMINEES.filter((n) => n.category === c.slug);
                    const done = nominees.filter((n) =>
                      Array.isArray(n.reviews) && n.reviews.some((r: Review) => r.judgeId === CURRENT_JUDGE.id)
                    ).length;
                    const progress = nominees.length > 0 ? (done / nominees.length) * 100 : 0;

                    return (
                    <Link
                      key={c.slug}
                      href={`/judge/category/${c.slug}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">{c.title}</h3>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{done}/{nominees.length} completed</span>
                          </div>
                          <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Deadlines + Resources) */}
          <div className="space-y-6">
            {/* Upcoming Deadlines  */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {upcomingDeadlines.map((d) => (
                  <div key={d.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{d.nominee}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(d.priority)}`}>{d.priority}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{d.category}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{d.deadline}</span>
                      <span className="font-medium text-orange-600">{d.timeLeft}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resources  */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Download Judges Charter 2025</span>
                </button>
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Evaluation Guidelines</span>
                </button>
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
                  <Award className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Scoring Templates</span>
                </button>
                <button className="w-full flex items-center p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">Judge Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable stat card */
const StatCard = ({ title, value, icon, bg }: { title: string; value: string | number; icon: React.ReactNode; bg: string; }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
    </div>
  </div>
);
