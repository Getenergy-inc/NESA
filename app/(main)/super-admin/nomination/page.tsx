"use client";

import React from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import {
  Users,
  CheckCircle,
  Flag,
  Edit3,
  ClipboardList,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/U-I/card";

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
}) => (
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

export default function NominationSystemPanel() {
  return (
    <SuperAdminLayout>
      <div className=" space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
           Nomination System Panel
        </h1>
        

        {/* ───────────────────── NOMINATION STATUSES ───────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Nominee Lifecycle Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverviewCard
              title="Draft"
              value="310"
              color="gray"
              icon={<Edit3 />}
            />
            <OverviewCard
              title="Submitted"
              value="820"
              color="blue"
              icon={<ClipboardList />}
            />
            <OverviewCard
              title="Verified"
              value="540"
              color="green"
              icon={<CheckCircle />}
            />
            <OverviewCard
              title="Flagged"
              value="28"
              color="red"
              icon={<Flag />}
            />
          </div>
        </section>

        {/* ───────────────────── NOMINATION SOURCES ───────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Nomination Sources Breakdown
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard
              title="Public Nominations"
              value="720"
              color="purple"
              icon={<Users />}
            />
            <OverviewCard
              title="NRC Volunteers Submitted"
              value="260"
              color="yellow"
              icon={<UserPlus />}
            />
            <OverviewCard
              title="Staff Initiated"
              value="98"
              color="indigo"
              icon={<ClipboardList />}
            />
          </div>
        </section>

        {/* ───────────────────── DUPLICATE DETECTION ───────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Duplicate Detection</h2>

          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <AlertTriangle />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    Duplicate Nominees Found
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    System auto-detects duplicates using:
                  </p>

                  <ul className="mt-2 text-sm text-gray-700 space-y-1 list-disc ml-5">
                    <li>Matching full name + date of birth</li>
                    <li>Matching email or phone number</li>
                    <li>Similar social media links</li>
                  </ul>

                  <p className="mt-3 text-sm font-medium text-gray-800">
                    <span className="text-red-600 font-bold">19</span> potential
                    duplicates flagged for manual review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </SuperAdminLayout>
  );
}
