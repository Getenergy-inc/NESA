"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/U-I/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/U-I/tabs";
import { Button } from "@/components/U-I/button";
import { Input } from "@/components/U-I/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/U-I/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, LineChart } from "recharts";

const GlobalOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("blue-garnet");

  const kpis = [
    { name: "Total Nominations", value: 2847 },
    { name: "Approved Nominees", value: 1924 },
    { name: "Votes Cast", value: 89432 },
    { name: "Total Revenue (₦)", value: 4200000 },
  ];

  const revenueData = [
    { name: "₦", value: 3000000 },
    { name: "$", value: 5000 },
    { name: "AGC", value: 200000 },
  ];

  const walletData = [
    { day: "Mon", nominee: 300, public: 200, sponsor: 150, ambassador: 80 },
    { day: "Tue", nominee: 400, public: 250, sponsor: 200, ambassador: 120 },
    { day: "Wed", nominee: 350, public: 300, sponsor: 180, ambassador: 90 },
    { day: "Thu", nominee: 500, public: 280, sponsor: 220, ambassador: 160 },
    { day: "Fri", nominee: 450, public: 320, sponsor: 210, ambassador: 140 },
  ];

  const chapterPerf = [
    { chapter: "Lagos", nominations: 560, revenue: 920000 },
    { chapter: "Abuja", nominations: 440, revenue: 670000 },
    { chapter: "Accra", nominations: 300, revenue: 520000 },
    { chapter: "Nairobi", nominations: 380, revenue: 610000 },
  ];

  const tableUsers = [
    { name: "Ada Lovelace", role: "Public", nominations: 7, votes: 132, wallet: 420 },
    { name: "Chinedu Obi", role: "Nominee", nominations: 2, votes: 980, wallet: 1150 },
    { name: "Zara Bello", role: "Judge", nominations: 0, votes: 0, wallet: 0 },
    { name: "Kweku Mensah", role: "Sponsor", nominations: 0, votes: 0, wallet: 250000 },
  ];

  const nominations = [
    { id: "BG-001", name: "Tech Innovation – Drone Health", country: "NG", status: "Submitted" },
    { id: "BG-045", name: "Edu Excellence – STEM Queens", country: "GH", status: "Verified" },
    { id: "PC-012", name: "Institutional – Green Campus", country: "KE", status: "Draft" },
    { id: "GC-077", name: "Leadership – Rural Care", country: "NG", status: "Flagged" },
  ];

  const notifications = [
    { id: 1, type: "Approval", msg: "10 nominees approved by Jury Board" },
    { id: 2, type: "Flag", msg: "Duplicate found for BG-045" },
    { id: 3, type: "Review", msg: "5 pending judge reviews in Healthcare Leadership" },
  ];

  return (
    <main
      className="flex-1 overflow-y-auto p-6 space-y-6"
      style={{
        backgroundImage: "url('/images/bg/about_.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Global Overview KPIs */}
      <section>
        <h2 className="text-2xl text-white font-bold mb-4">Global Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((d, idx) => (
            <Card key={idx} className="shadow-md rounded-2xl">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium">{d.name}</h3>
                <p className="text-xl font-bold">{d.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Award Control Center */}
      <section>
        <Card className="shadow-md rounded-2xl mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-3">Award Super Category Control Center</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex gap-2 mb-4 overflow-x-auto rounded-full">
                <TabsTrigger value="blue-garnet" className="rounded-full">Blue Garnet</TabsTrigger>
                <TabsTrigger value="blue-gold" className="rounded-full">Blue Garnet – Gold</TabsTrigger>
                <TabsTrigger value="platinum" className="rounded-full">Platinum Certificate</TabsTrigger>
              </TabsList>

              <TabsContent value="blue-garnet" className="space-y-2">
                <p>Total Nominations (per award): 24</p>
                <p>Public vs Internal: 18 / 6</p>
                <p>Acceptance Status: 87.5%</p>
              </TabsContent>
              <TabsContent value="blue-gold" className="space-y-2">
                <p>8 Award Categories • View 101 Subcategories</p>
                <p>Nominee Count, Votes per Nominee, AGC Earned</p>
              </TabsContent>
              <TabsContent value="platinum" className="space-y-2">
                <p>8 Institutional Categories • View 53 Subcategories</p>
                <p>Nominee Submission Records • Documentation Score</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4 h-72">
            <h3 className="font-semibold mb-3">AGC Coin Usage Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={walletData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nominee" fill="#3b82f6" />
                <Bar dataKey="public" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4 h-72">
            <h3 className="font-semibold mb-3">Revenue Summary</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueData} dataKey="value" nameKey="name" outerRadius={95}>
                  {revenueData.map((_, idx) => (
                    <Cell key={idx} fill={["#3b82f6", "#10b981", "#f59e0b"][idx % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      
    </main>
  );
};

export default GlobalOverview;
