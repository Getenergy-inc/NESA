"use client";

import React from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import OverviewCard from "@/components/UI/SuperAdmin/OverviewCard";
import Accordion from "@/components/UI/SuperAdmin/Accordion";
import Acceptance from "@/components/UI/SuperAdmin/Acceptance";
import VoteToRevenueTracker from "@/components/UI/SuperAdmin/VoteToRevenue";
import CertificateEligibilityRule from "@/components/UI/SuperAdmin/EligibilityRule";

import {
  Award,
  Users,
  FileText,
  Coins,
  MailCheck,
  Link,
  Trophy,
  TrendingUp,
  ShieldCheck,

} from "lucide-react";

const AwardSuperCategoryControlCenter: React.FC = () => {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          Award Super Category Control Center
        </h1>

        {/* 🔷 BLUE GARNET */}
        <Accordion title="🔷 Blue Garnet (African Icon Lifetime Awards)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Total Nominations" value={56} color="blue" icon={<Award />} />
            <OverviewCard title="Public vs Internal Nominations" value="40 / 16" color="yellow" icon={<Users />} />
            <OverviewCard title="Acceptance Status" value="70% Accepted" color="green" icon={<FileText />} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OverviewCard title="Judge Assignment & Panel" value="12 Judges Assigned" color="indigo" icon={<ShieldCheck />} />
            <OverviewCard title="Editable Nominee Profiles" value="Open" color="red" icon={<FileText />} />
          </div>
            <Acceptance />
        </Accordion>

        {/* 🟨 GOLD CERTIFICATE */}
        <Accordion title="🟨 Blue Garnet–Gold Certificate Awards (Competitive)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Award Categories" value="8" color="blue" icon={<Award />} />
            <OverviewCard title="Subcategories" value="101" color="red" icon={<Trophy />} />
            <OverviewCard title="Nominee Count" value={420} color="yellow" icon={<Users />} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Votes per Nominee" value="Avg. 85" color="green" icon={<TrendingUp />} />
            <OverviewCard
              title="AGC Revenue Tracker"
              value="Real-time Linked"
              color="indigo"
              icon={<Coins />}
            />
            <OverviewCard
              title="Judge Assignment & Comments"
              value="In Progress"
              color="blue"
              icon={<ShieldCheck />}
            />
          </div>

            <VoteToRevenueTracker />
        </Accordion>

        {/* 🟩 PLATINUM CERTIFICATE */}
        <Accordion title="🟩 Platinum Certificate Awards (Non-Competitive)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Institutional Categories" value="8" color="blue" icon={<Award />} />
            <OverviewCard title="Subcategories" value="53" color="red" icon={<Trophy />} />
            <OverviewCard title="Nominee Submissions" value={150} color="yellow" icon={<Users />} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Documentation Score" value="82%" color="indigo" icon={<FileText />} />
            <OverviewCard title="ESG & SDG Alignment" value="High Compliance" color="green" icon={<ShieldCheck />} />
            <OverviewCard title="Final Jury/Board Review" value="Pending" color="purple" icon={<FileText />} />
          </div>

            <CertificateEligibilityRule />
        </Accordion>
      </div>
    </SuperAdminLayout>
  );
};

export default AwardSuperCategoryControlCenter;
