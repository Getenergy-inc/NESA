"use client";

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
  return (
    <Card className="shadow-md hover:shadow-lg transition rounded-2xl border border-gray-100">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

const JudgingArenaPanel = () => {
  return (
    <SuperAdminLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🧑‍⚖️ Judging Arena Module
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
      </div>
    </SuperAdminLayout>
  );
};

export default JudgingArenaPanel;
