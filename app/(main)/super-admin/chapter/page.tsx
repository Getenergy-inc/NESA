"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import AppTable from "@/components/UI/SuperAdmin/AppTable";
import AppButton from "@/components/UI/SuperAdmin/AppButton";
import AppSelect from "@/components/UI/SuperAdmin/AppSelect";
import AppInput from "@/components/UI/SuperAdmin/AppInput";
import { Upload, Coins, CheckCircle, Wallet, Users } from "lucide-react";

const ChapterAmbassadorTracker = () => {
  // Filter states
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedAmbassador, setSelectedAmbassador] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");

  // Chapter Performance Data
  const chapterColumns = [
    { key: "chapter", label: "Chapter" },
    { key: "nominations", label: "Nominations" },
    { key: "approvals", label: "Approved Nominations" },
    { key: "engagement", label: "Engagement" },
    { key: "media", label: "Media Uploads" },
    { key: "revenue", label: "Revenue" },
  ];

  const chapterData = [
    {
      chapter: "Nigeria",
      nominations: 120,
      approvals: 93,
      engagement: "85%",
      media: 42,
      revenue: "₦5.2M",
    },
    {
      chapter: "Kenya",
      nominations: 90,
      approvals: 61,
      engagement: "78%",
      media: 28,
      revenue: "₦3.8M",
    },
    {
      chapter: "South Africa",
      nominations: 150,
      approvals: 119,
      engagement: "92%",
      media: 67,
      revenue: "₦7.1M",
    },
  ];

  // Ambassador Referral Tracking
  const ambassadorColumns = [
    { key: "ambassador", label: "Ambassador" },
    { key: "referrals", label: "Referrals" },
    { key: "earnings", label: "AGC Earnings" },
    { key: "auto_bonus", label: "Auto-Bonus Status" },
  ];

  const ambassadorData = [
    {
      ambassador: "John Doe",
      referrals: 18,
      earnings: "500 AGC",
      auto_bonus: "Credited ✔",
    },
    {
      ambassador: "Jane Smith",
      referrals: 12,
      earnings: "350 AGC",
      auto_bonus: "Credited ✔",
    },
  ];

  // Settlement Logs
  const settlementColumns = [
    { key: "chapter", label: "Chapter" },
    { key: "amount", label: "Amount Settled" },
    { key: "wallet", label: "Wallet Address" },
    { key: "date", label: "Date" },
  ];

  const settlementData = [
    { chapter: "Nigeria", amount: "₦2.5M", wallet: "NGR-1442-AGC", date: "2025-09-01" },
    { chapter: "Kenya", amount: "₦1.8M", wallet: "KEN-9822-AGC", date: "2025-09-05" },
  ];

  // Fundraising Records
  const fundraisingColumns = [
    { key: "chapter", label: "Chapter" },
    { key: "campaign", label: "Campaign Name" },
    { key: "raised", label: "Total Raised" },
    { key: "date", label: "Date" },
  ];

  const fundraisingData = [
    { chapter: "Nigeria", campaign: "Back-to-School", raised: "₦1.3M", date: "2025-08-12" },
    { chapter: "Kenya", campaign: "Girl Child Fund", raised: "₦900k", date: "2025-08-18" },
  ];

  // Media Uploads
  const handleUpload = () => {
    alert("Upload media (Video/Photo) clicked!");
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          Chapter & Ambassador Division Panel
        </h1>

        {/* Filters */}
        <AppCard title="Filters">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <AppSelect
              label="Select Chapter"
              options={["Nigeria", "Kenya", "South Africa"]}
              value={selectedChapter}
              onChange={setSelectedChapter}
            />
            <AppSelect
              label="Ambassador"
              options={["John Doe", "Jane Smith"]}
              value={selectedAmbassador}
              onChange={setSelectedAmbassador}
            />
            <AppInput
              label="Date Range"
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
            <AppButton
              label="Apply Filters"
              variant="primary"
              size="md"
              onClick={() =>
                console.log({
                  selectedChapter,
                  selectedAmbassador,
                  dateRange,
                })
              }
            />
          </div>
        </AppCard>

        {/* CHAPTER PERFORMANCE */}
        <AppCard title="📊 Chapter Performance Overview">
          <AppTable columns={chapterColumns} data={chapterData} />
        </AppCard>

        {/* NOMINATION APPROVALS */}
        <AppCard title="✔ Nomination Approvals">
          <AppTable
            columns={[
              { key: "chapter", label: "Chapter" },
              { key: "approvals", label: "Approved Nominations" },
              { key: "revenue", label: "Funding from Approvals" },
            ]}
            data={chapterData.map((c) => ({
              chapter: c.chapter,
              approvals: c.approvals,
              revenue: c.revenue,
            }))}
          />
        </AppCard>

        {/* AMBASSADOR TRACKING */}
        <AppCard title="🎖 Ambassador Referral & Bonus Tracking">
          <AppTable columns={ambassadorColumns} data={ambassadorData} />
        </AppCard>

        {/* WALLET SETTLEMENTS */}
        <AppCard title="💰 Wallet Settlement Logs">
          <AppTable columns={settlementColumns} data={settlementData} />
        </AppCard>

        {/* FUNDRAISING */}
        <AppCard title="📈 Local Fundraising Records">
          <AppTable columns={fundraisingColumns} data={fundraisingData} />
        </AppCard>

        {/* MEDIA */}
        <AppCard title="📸 Media Uploads">
          <AppButton
            label="Upload Media"
            icon={Upload}
            size="md"
            variant="primary"
            onClick={handleUpload}
          />
        </AppCard>
      </div>
    </SuperAdminLayout>
  );
};

export default ChapterAmbassadorTracker;
