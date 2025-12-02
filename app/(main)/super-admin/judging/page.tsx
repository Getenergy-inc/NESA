"use client";

import React from "react";
import { Card, CardContent } from "@/components/U-I/card";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
// import JudgingAssignmentMatrix from "@/components/UI/SuperAdmin/JudgingAssignmentMatrix";
import {
  BookOpen,
  CheckCircle,
  Activity,
  ClipboardList,
  Bell,
  Flag,
  Users,
  Scale,
  Timer,
  FileCheck,
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
      <div className="space-y-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
           Judging Arena Module
        </h1>
        

        {/* SUMMARY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Judges Assigned */}
          <OverviewCard
            title="Judges Assigned to Categories"
            value="65"
            color="blue"
            icon={<Users />}
          />

          {/* Category Assignments */}
          <OverviewCard
            title="Active Category Assignments"
            value="120"
            color="indigo"
            icon={<BookOpen />}
          />

          {/* Review Progress */}
          <OverviewCard
            title="Review Completion Rate"
            value="85%"
            color="green"
            icon={<CheckCircle />}
          />

          {/* Scores Submitted */}
          <OverviewCard
            title="Scores Submitted"
            value="1,120"
            color="purple"
            icon={<FileCheck />}
          />

          {/* Comments */}
          <OverviewCard
            title="Reviewer Comments Logged"
            value="450"
            color="yellow"
            icon={<ClipboardList />}
          />

          {/* Pending Reviews */}
          <OverviewCard
            title="Pending / Incomplete Reviews"
            value="48"
            color="red"
            icon={<Timer />}
          />

          {/* Compliance Log */}
          <OverviewCard
            title="Compliance Logs (Sponsor-Neutrality)"
            value="324 Logs"
            color="orange"
            icon={<Scale />}
          />

          {/* Automated Review Reminders */}
          <OverviewCard
            title="Auto-Reminders for Incomplete Reviews"
            value="Enabled"
            color="green"
            icon={<Bell />}
          />

          {/* Judge Flags */}
          <OverviewCard
            title="Judge Flagging System"
            value="12 Flags"
            color="rose"
            icon={<Flag />}
          />
        </div>
        {/* <JudgingAssignmentMatrix /> */}
      </div>
    </SuperAdminLayout>
  );
};

export default JudgingArenaPanel;
