import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import OverviewCard from "@/components/UI/SuperAdmin/OverviewCard";
import Accordion from "@/components/UI/SuperAdmin/Accordion";
import { Award, Users, FileText } from "lucide-react";

export default function AwardSuperCategoryControlCenter() {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">Award Super Category Control Center</h1>

        {/* 🔷 Blue Garnet */}
        <Accordion title="🔷 Blue Garnet (African Icon Lifetime Awards)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Total Nominations (per award)" value={56} color="blue" icon={<Award />}/>
            <OverviewCard title="Public vs Internal Nominations" value="40 / 16" color="yellow" icon={<Users />}  />
            <OverviewCard title="Acceptance Status" value="70% Accepted"  color="green" icon={<FileText />}  />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OverviewCard title="Judge Assignment & Panel" value="12 Judges Assigned" color="indigo" />
            <OverviewCard title="Editable Nominee Profiles" value="Open" color="red" />
          </div>
        </Accordion>

        {/* 🟨 Blue Garnet–Gold Certificate Awards */}
        <Accordion title="🟨 Blue Garnet–Gold Certificate Awards (Competitive)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Award Categories" value="8" color="blue" />
            <OverviewCard title="Subcategories" value="101" color="red" />
            <OverviewCard title="Nominee Count" value={420} color="yellow"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Votes per Nominee" value="Avg. 85" color="green" />
            <OverviewCard title="AGC Earned" value="12,400 AGC" color="indigo" />
            <OverviewCard title="Judge Assignment & Comments" value="In Progress" color="blue"/>
          </div>
          <div className="grid grid-cols-1">
            <OverviewCard title="Public Nomination Trends" value="Rising in Tech & Music" color="gray"/>
          </div>
        </Accordion>

        {/* 🟩 Platinum Certificate Awards */}
        <Accordion title="🟩 Platinum Certificate Awards (Non-Competitive)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Institutional Categories" value="8" color="blue"/>
            <OverviewCard title="Subcategories" value="53" color="red"/>
            <OverviewCard title="Nominee Submissions" value={150} color="yellow"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <OverviewCard title="Documentation Score" value="82%" color="indigo"/>
            <OverviewCard title="ESG & SDG Alignment" value="High Compliance" color="green"/>
            <OverviewCard title="Final Jury/Board Review" value="Pending" color="purple"/>
          </div>
        </Accordion>
      </div>
    </SuperAdminLayout>
  );
}
