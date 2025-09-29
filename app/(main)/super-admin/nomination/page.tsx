"use client";

import DashboardLayout from "@/components/UI/SuperAdmin/DashboardLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import AppTable from "@/components/UI/SuperAdmin/AppTable";
import AppSelect from "@/components/UI/SuperAdmin/AppSelect";
import { useState } from "react";

const NominationSystemPage = () => {
  const [filter, setFilter] = useState({ category: "", subcategory: "", country: "" });

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nominee" },
    { key: "category", label: "Category" },
    { key: "subcategory", label: "Subcategory" },
    { key: "country", label: "Country" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: 1,
      name: "Nominee A",
      category: "Blue Garnet",
      subcategory: "Leadership",
      country: "Nigeria",
      status: "Submitted",
    },
    {
      id: 2,
      name: "Nominee B",
      category: "Platinum",
      subcategory: "ESG",
      country: "Kenya",
      status: "Verified",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Page Header */}
        <div className="rounded-2xl p-6 text-black shadow-md">
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            📂 Nomination Management System
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage submissions, filter nominees, and track verification status in real time.
          </p>
        </div>

        {/* Filter Section */}
        <AppCard title="Filter Nominations" >
          <div className="grid md:grid-cols-3 gap-4">
            <AppSelect
              options={[
                { value: "blue", label: "Blue Garnet" },
                { value: "gold", label: "Gold Certificate" },
              ]}
              placeholder="Filter by Category"
              onChange={(val) => setFilter((f) => ({ ...f, category: val }))}
            />
            <AppSelect
              options={[
                { value: "leadership", label: "Leadership" },
                { value: "esg", label: "ESG" },
              ]}
              placeholder="Filter by Subcategory"
              onChange={(val) => setFilter((f) => ({ ...f, subcategory: val }))}
            />
            <AppSelect
              options={[
                { value: "nigeria", label: "Nigeria" },
                { value: "kenya", label: "Kenya" },
              ]}
              placeholder="Filter by Country"
              onChange={(val) => setFilter((f) => ({ ...f, country: val }))}
            />
          </div>
        </AppCard>

        {/* Table Section */}
        <AppCard title="📑 Nominee Submissions">
          <AppTable columns={columns} data={data} />
        </AppCard>
      </div>
    </DashboardLayout>
  );
};

export default NominationSystemPage;
