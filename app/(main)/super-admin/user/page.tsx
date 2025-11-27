// Updated User Profile Management Panel with Financial Tabs Integrated
"use client";
import React from "react";
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
  Gift,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function UserProfileManagementPanel() {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          User Profile Management
        </h1>

        {/* ─── PUBLIC USERS ───────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Public Users</h2>
          {/* Added Financial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <OverviewCard title="Total Users" value="12,540" color="blue" icon={<Users />} />
            <OverviewCard title="Nominations" value="3,420" color="green" icon={<Award />} />
            <OverviewCard title="Voting History" value="58,120" color="yellow" icon={<ClipboardList />} />
            <OverviewCard title="Wallet Activity" value="₦45.2M" color="purple" icon={<Wallet />} />
            <OverviewCard title="Referral Bonuses" value="₦4.1M" color="indigo" icon={<Gift />} />
          </div>
        </section>

        {/* ─── NOMINEES ───────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Nominees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <OverviewCard title="Pending" value="220" color="yellow" icon={<Activity />} />
            <OverviewCard title="Accepted" value="180" color="green" icon={<CheckCircle />} />
            <OverviewCard title="Verified" value="150" color="blue" icon={<CheckCircle />} />
            <OverviewCard title="Votes" value="12,800" color="purple" icon={<ClipboardList />} />
            <OverviewCard title="Certificates" value="130" color="indigo" icon={<Award />} />
            {/* Added Financial Card */}
            <OverviewCard title="Earnings" value="₦3.8M" color="green" icon={<TrendingUp />} />
          </div>
        </section>

        {/* ─── JUDGES ───────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Judges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <OverviewCard title="Total Judges" value="65" color="blue" icon={<Users />} />
            <OverviewCard title="Categories Assigned" value="120" color="green" icon={<BookOpen />} />
            <OverviewCard title="Reviews Submitted" value="72" color="yellow" icon={<ClipboardList />} />
            <OverviewCard title="Pending Reviews" value="48" color="red" icon={<Activity />} />
            {/* Added Financial Card */}
            <OverviewCard title="Commissions" value="₦2.4M" color="purple" icon={<Coins />} />
          </div>
        </section>

        {/* ─── VOLUNTEERS ───────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Volunteers (NRC)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard title="Entries Submitted" value="310" color="blue" icon={<ClipboardList />} />
            <OverviewCard title="Verified / Approved" value="270" color="green" icon={<CheckCircle />} />
            {/* Added Financial Card */}
            <OverviewCard title="Bonuses Earned" value="₦950K" color="yellow" icon={<Gift />} />
          </div>
        </section>

        {/* ─── SPONSORS ───────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Sponsors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <OverviewCard title="Category Sponsorships" value="32" color="blue" icon={<Building2 />} />
            <OverviewCard title="Disbursed Amounts" value="₦18.5M" color="green" icon={<Coins />} />
            <OverviewCard title="Active Branding" value="28" color="yellow" icon={<Award />} />
            {/* Added Financial Card */}
            <OverviewCard title="Funding Wallet" value="₦9.3M" color="purple" icon={<Wallet />} />
          </div>
        </section>

        {/* ─── GLOBAL FINANCIAL OVERVIEW ───────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-[#ea580c]">Financial Overview (All User Types)</h2>
          <p className="text-sm text-gray-500 mb-3">
            Unified overview of financial activities across every user profile: public users, nominees, judges, volunteers, and sponsors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverviewCard title="Wallet Activity" value="₦63.7M" color="blue" icon={<Wallet />} />
            <OverviewCard title="Earnings" value="₦18.2M" color="green" icon={<TrendingUp />} />
            <OverviewCard title="Sponsorship Disbursements" value="₦22.4M" color="yellow" icon={<DollarSign />} />
            <OverviewCard title="Referral Bonuses" value="₦6.5M" color="purple" icon={<Gift />} />
          </div>
        </section>
      </div>
    </SuperAdminLayout>
  );
}
