
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import OverviewCard from "@/components/UI/SuperAdmin/OverviewCard";

import {
  CheckCircle,
  AlertTriangle,
  Users,
  Award,
  BarChart,
  HandCoins,
  Star,
  ArrowLeftRight,
  EqualApproximately,
} from "lucide-react";

export default function GlobalOverviewPage() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">Global Overview Panel</h1>

        {/* Nominations */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Total Nominations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard title="Lifetime (Blue Garnet)" value={120} color="blue" icon={<Award />}/>
            <OverviewCard title="Competitive (Blue Garnet-Gold)" value={340} color="yellow" icon={<Award />}/>
            <OverviewCard title="Non-Competitive (Platinum)" value={75} color="purple" icon={<Award />}/>
          </div>
        </section>

        {/* Nominee Status */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Nominee Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard title="Approved Nominees" value={210} color="green" icon={<CheckCircle />}/>
            <OverviewCard title="Pending Reviews" value={45} color="yellow" icon={<AlertTriangle />}/>
          </div>
        </section>

        {/* Votes */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Votes Cast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard title="Total Votes" value={1500} color="indigo" icon={<BarChart />}/>
            <OverviewCard title="By Category" value="See breakdown →" color="blue" icon={<Star />}/>
          </div>
        </section>

        {/* AGC Coins */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Total AGC Coins Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard title="Purchased" value="5,000" color="green" icon={<CheckCircle />}/>
            <OverviewCard title="Earned (Bonus/Referral)" value="2,300" color="purple" icon={<HandCoins />}/>
            <OverviewCard title="Transferred" value="1,200" color="indigo" icon={<ArrowLeftRight />}/>
          </div>
        </section>

        {/* Revenue */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Revenue Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard title="₦ (Naira)" value="₦12,000,000" color="yellow"/>
            <OverviewCard title="$ (USD)" value="$25,000" color="indigo"/>
            <OverviewCard title="AGC Equivalent" value="8,500 AGC" color="red" icon={<EqualApproximately />}/>
          </div>
        </section>

        {/* Top Performing */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Top Performing Subcategories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OverviewCard title="Music – Afrobeats" value="540 votes" />
            <OverviewCard title="Film – Documentary" value="320 votes" />
            <OverviewCard title="Tech – Health Innovation" value="280 votes" />
          </div>
        </section>
      </div>
    </SuperAdminLayout>
  );

