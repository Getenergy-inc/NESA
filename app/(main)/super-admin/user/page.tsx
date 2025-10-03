"use client";

import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import OverviewCard from "@/components/UI/SuperAdmin/OverviewCard";
import {
  Users,
  Award,
  Coins,
  CheckCircle,
  ClipboardList,
  Star,
  BookOpen,
  Activity,
  Building2,
  Wallet,
} from "lucide-react";

export default function UserProfileManagementPanel() {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">User Profile Management</h1>

        {/* Public Users */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Public Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverviewCard
              title="Total Users"
              value="12,540"
              color="blue"
              icon={<Users />}
            />
            <OverviewCard
              title="Nomination Count"
              value="3,420"
              color="green"
              icon={<Award />}
            />
            <OverviewCard
              title="Voting History"
              value="58,120"
              color="yellow"
              icon={<ClipboardList />}
            />
            <OverviewCard
              title="Wallet Activity"
              value="₦45.2M"
              color="purple"
              icon={<Wallet />}
            />
          </div>
        </section>

        {/* Nominees */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Nominees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <OverviewCard
              title="Pending"
              value="220"
              color="yellow"
              icon={<Activity />}
            />
            <OverviewCard
              title="Accepted"
              value="180"
              color="green"
              icon={<CheckCircle />}
            />
            <OverviewCard
              title="Verified"
              value="150"
              color="blue"
              icon={<CheckCircle />}
            />
            <OverviewCard
              title="Vote Count"
              value="12,800"
              color="purple"
              icon={<ClipboardList />}
            />
            <OverviewCard
              title="Certificates Issued"
              value="130"
              color="indigo"
              icon={<Award />}
            />
          </div>
        </section>

        {/* Judges */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Judges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard
              title="Total Judges"
              value="65"
              color="blue"
              icon={<Users />}
            />
            <OverviewCard
              title="Categories Assigned"
              value="120"
              color="green"
              icon={<BookOpen />}
            />
            <OverviewCard
              title="Reviews Submitted"
              value="72"
              color="yellow"
              icon={<ClipboardList />}
            />
            <OverviewCard
              title="Pending Reviews"
              value="48"
              color="red"
              icon={<Activity />}
            />
          </div>
        </section>

        {/* Volunteers */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Volunteers (NRC)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OverviewCard
              title="Entries Submitted"
              value="310"
              color="blue"
              icon={<ClipboardList />}
            />
            <OverviewCard
              title="Verified / Approved"
              value="270"
              color="green"
              icon={<CheckCircle />}
            />
          </div>
        </section>

        {/* Gamification */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Gamified Progress Tracker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OverviewCard
              title="Badges Earned"
              value="1,450"
              color="yellow"
              icon={<Star />}
            />
            <OverviewCard
              title="Levels Completed"
              value="580"
              color="purple"
              icon={<Activity />}
            />
          </div>
        </section>

        {/* Sponsors */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Sponsors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard
              title="Category Sponsorships"
              value="32"
              color="blue"
              icon={<Building2 />}
            />
            <OverviewCard
              title="Disbursed Amounts"
              value="₦18.5M"
              color="green"
              icon={<Coins />}
            />
            <OverviewCard
              title="Branding / Logo Display"
              value="28 Active"
              color="yellow"
              icon={<Award />}
            />
          </div>
        </section>
      </div>
    </SuperAdminLayout>
  );
}
