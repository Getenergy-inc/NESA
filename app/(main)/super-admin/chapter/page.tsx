"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import AppTable from "@/components/UI/SuperAdmin/AppTable";
import AppButton from "@/components/UI/SuperAdmin/AppButton";
import AppSelect from "@/components/UI/SuperAdmin/AppSelect";
import AppInput from "@/components/UI/SuperAdmin/AppInput";
import { Upload } from "lucide-react";

const ChapterAmbassadorTracker = () => {
  // Filter states
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedAmbassador, setSelectedAmbassador] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");

  // Mock Data
  const chapterColumns = [
    { key: "chapter", label: "Chapter" },
    { key: "nominations", label: "Nominations" },
    { key: "engagement", label: "Engagement" },
    { key: "revenue", label: "Revenue" },
  ];

  const chapterData = [
    { chapter: "Nigeria", nominations: 120, engagement: "85%", revenue: "₦5.2M" },
    { chapter: "Kenya", nominations: 90, engagement: "78%", revenue: "₦3.8M" },
    { chapter: "South Africa", nominations: 150, engagement: "92%", revenue: "₦7.1M" },
  ];

  const ambassadorColumns = [
    { key: "ambassador", label: "Ambassador" },
    { key: "earnings", label: "AGC Earnings" },
    { key: "category", label: "Category" },
  ];

  const ambassadorData = [
    { ambassador: "John Doe", earnings: "500 AGC", category: "Nominee Referrals" },
    { ambassador: "Jane Smith", earnings: "350 AGC", category: "Voting Campaigns" },
  ];

  const settlementColumns = [
    { key: "chapter", label: "Chapter" },
    { key: "amount", label: "Amount Settled" },
    { key: "date", label: "Date" },
  ];

  const settlementData = [
    { chapter: "Nigeria", amount: "₦2.5M", date: "2025-09-01" },
    { chapter: "Kenya", amount: "₦1.8M", date: "2025-09-05" },
  ];

  const handleUpload = () => {
    alert("Upload media (Video/Photo) clicked!");
  };

  return (
    <SuperAdminLayout>
        <div className="space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">Chapter & Ambassador Tracker</h1>
      {/* 🔍 Filters */}
      <AppCard title="Filters">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <AppSelect
            label="Chapter"
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
            onClick={() => {
              console.log({
                selectedChapter,
                selectedAmbassador,
                dateRange,
              });
            }}
          />
        </div>
      </AppCard>

      {/* 📊 Chapter Performance */}
      <AppCard title="Chapter Performance">
        <AppTable columns={chapterColumns} data={chapterData} />
      </AppCard>

      {/* 🎖 Ambassador Earnings */}
      <AppCard title="Ambassador AGC Earnings">
        <AppTable columns={ambassadorColumns} data={ambassadorData} />
      </AppCard>

      {/* 💵 Settlement Logs */}
      <AppCard title="Settlement Log for Chapters">
        <AppTable columns={settlementColumns} data={settlementData} />
      </AppCard>

      {/* 📸 Media Uploads */}
      <AppCard title="Media Uploads (Events)">
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
