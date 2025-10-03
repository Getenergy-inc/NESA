import React from "react";
import { Card, CardContent } from "@/components/U-I/card";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import {
  BookOpen,
  CheckCircle,
  Activity,
  ClipboardList,
  Bell,
  Flag,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

type OverviewCardProps = {
  title: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
};

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  color,
  icon,
}) => {


const reviewCompletionData = [
  { category: "Arts", completed: 85, pending: 15 },
  { category: "Science", completed: 92, pending: 8 },
  { category: "Tech", completed: 76, pending: 24 },
  { category: "Business", completed: 64, pending: 36 },
];

const commentsTrendData = [
  { day: "Mon", comments: 35 },
  { day: "Tue", comments: 50 },
  { day: "Wed", comments: 42 },
  { day: "Thu", comments: 60 },
  { day: "Fri", comments: 38 },
];

const JudgingArenaPanel = () => {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">Judging Arena Module
        </h1>
        <p className="text-gray-600">
          Manage judge assignments, review progress, scoring, and flags.
        </p>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <OverviewCard
            title="Category Assignments"
            value="120"
            color="blue"
            icon={<BookOpen />}
          />
          <OverviewCard
            title="Review Completion Rate"
            value="85%"
            color="green"
            icon={<CheckCircle />}
          />
          <OverviewCard
            title="Weighted Scoring Panel"
            value="Active"
            color="purple"
            icon={<Activity />}
          />
          <OverviewCard
            title="Comments per Nominee"
            value="450"
            color="yellow"
            icon={<ClipboardList />}
          />
          <OverviewCard
            title="Auto-Notify Incomplete Reviews"
            value="Enabled"
            color="indigo"
            icon={<Bell />}
          />
          <OverviewCard
            title="Judge Flagging System"
            value="12 Flags"
            color="red"
            icon={<Flag />}
          />
        </div>
          {/* Review Completion Chart */}
      <Card className="shadow-md rounded-2xl border border-gray-100">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Review Completion by Category
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={reviewCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#16a34a" name="Completed %" />
                <Bar dataKey="pending" fill="#dc2626" name="Pending %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comments Trend Chart */}
      <Card className="shadow-md rounded-2xl border border-gray-100">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Comments Trend (This Week)
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={commentsTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="comments" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Judge Activity Log */}
      <Card className="shadow-md rounded-2xl border border-gray-100">
        <CardContent className="p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Judge Activity Log
          </h2>
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Judge</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Reviews Submitted</th>
                <th className="px-4 py-2">Flags</th>
                <th className="px-4 py-2">Last Active</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Dr. Amina</td>
                <td className="px-4 py-2">Arts</td>
                <td className="px-4 py-2">45</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2">2h ago</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Mr. Johnson</td>
                <td className="px-4 py-2">Science</td>
                <td className="px-4 py-2">32</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">5h ago</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Prof. Ade</td>
                <td className="px-4 py-2">Tech</td>
                <td className="px-4 py-2">27</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">1d ago</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
    
    </SuperAdminLayout>
  );
};

export default JudgingArenaPanel;
