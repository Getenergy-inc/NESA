// "use client"
// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/U-I/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/U-I/tabs";
// import { Button } from "@/components/U-I/button";
// import { Input } from "@/components/U-I/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/U-I/select";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, LineChart } from "recharts";

const GlobalOverview: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>("blue-garnet");

//   const kpis = [
//     { name: "Total Nominations", value: 2847 },
//     { name: "Approved Nominees", value: 1924 },
//     { name: "Votes Cast", value: 89432 },
//     { name: "Total Revenue (₦)", value: 4200000 },
//   ];

//   const revenueData = [
//     { name: "₦", value: 3000000 },
//     { name: "$", value: 5000 },
//     { name: "AGC", value: 200000 },
//   ];

//   const walletData = [
//     { day: "Mon", nominee: 300, public: 200, sponsor: 150, ambassador: 80 },
//     { day: "Tue", nominee: 400, public: 250, sponsor: 200, ambassador: 120 },
//     { day: "Wed", nominee: 350, public: 300, sponsor: 180, ambassador: 90 },
//     { day: "Thu", nominee: 500, public: 280, sponsor: 220, ambassador: 160 },
//     { day: "Fri", nominee: 450, public: 320, sponsor: 210, ambassador: 140 },
//   ];

//   const chapterPerf = [
//     { chapter: "Lagos", nominations: 560, revenue: 920000 },
//     { chapter: "Abuja", nominations: 440, revenue: 670000 },
//     { chapter: "Accra", nominations: 300, revenue: 520000 },
//     { chapter: "Nairobi", nominations: 380, revenue: 610000 },
//   ];

//   const tableUsers = [
//     { name: "Ada Lovelace", role: "Public", nominations: 7, votes: 132, wallet: 420 },
//     { name: "Chinedu Obi", role: "Nominee", nominations: 2, votes: 980, wallet: 1150 },
//     { name: "Zara Bello", role: "Judge", nominations: 0, votes: 0, wallet: 0 },
//     { name: "Kweku Mensah", role: "Sponsor", nominations: 0, votes: 0, wallet: 250000 },
//   ];

//   const nominations = [
//     { id: "BG-001", name: "Tech Innovation – Drone Health", country: "NG", status: "Submitted" },
//     { id: "BG-045", name: "Edu Excellence – STEM Queens", country: "GH", status: "Verified" },
//     { id: "PC-012", name: "Institutional – Green Campus", country: "KE", status: "Draft" },
//     { id: "GC-077", name: "Leadership – Rural Care", country: "NG", status: "Flagged" },
//   ];

//   const notifications = [
//     { id: 1, type: "Approval", msg: "10 nominees approved by Jury Board" },
//     { id: 2, type: "Flag", msg: "Duplicate found for BG-045" },
//     { id: 3, type: "Review", msg: "5 pending judge reviews in Healthcare Leadership" },
//   ];

  return (
    <></>
//     <div className="flex h-screen">
//       {/* Sidebar
//       <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col gap-3">
//         <h1 className="text-lg font-bold mb-4">NESA Africa</h1>
//         <nav className="flex flex-col gap-2">
//           <Button variant="ghost" className="justify-start text-white">Global Overview</Button>
//           <Button variant="ghost" className="justify-start text-white">Award Categories</Button>
//           <Button variant="ghost" className="justify-start text-white">AGC Wallet</Button>
//           <Button variant="ghost" className="justify-start text-white">User Management</Button>
//           <Button variant="ghost" className="justify-start text-white">Judging Arena</Button>
//           <Button variant="ghost" className="justify-start text-white">Nominations</Button>
//           <Button variant="ghost" className="justify-start text-white">Certificates</Button>
//           <Button variant="ghost" className="justify-start text-white">Chapters</Button>
//           <Button variant="ghost" className="justify-start text-white">Notifications</Button>
//           <Button variant="ghost" className="justify-start text-white">Settings</Button>
//         </nav>
//       </aside> */}

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-scroll p-6 bg-gray-50 space-y-6">
//         {/* Global Overview */}
//         <section>
//           <h2 className="text-2xl font-bold mb-4">Global Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             {kpis.map((d, idx) => (
//               <Card key={idx} className="shadow-md rounded-2xl">
//                 <CardContent className="p-4">
//                   <h3 className="text-sm font-medium">{d.name}</h3>
//                   <p className="text-xl font-bold">{d.value.toLocaleString()}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Award Super Category Control Center */}
//           <Card className="shadow-md rounded-2xl mb-6">
//             <CardContent className="p-4">
//               <h3 className="font-semibold text-lg mb-3">Award Super Category Control Center</h3>
//               <Tabs value={activeTab} onValueChange={setActiveTab}>
//                 <TabsList className="flex gap-2 mb-4 overflow-x-auto rounded-full">
//                   <TabsTrigger value="blue-garnet" className="rounded-full">Blue Garnet</TabsTrigger>
//                   <TabsTrigger value="blue-gold" className="rounded-full">Blue Garnet – Gold Certificate</TabsTrigger>
//                   <TabsTrigger value="platinum" className="rounded-full">Platinum Certificate</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="blue-garnet" className="space-y-2">
//                   <p>Total Nominations (per award): 24</p>
//                   <p>Public vs Internal: 18 / 6</p>
//                   <p>Acceptance Status: 87.5%</p>
//                   <p>Judge Assignment & Recommendation Panel • Editable Nominee Profiles</p>
//                 </TabsContent>
//                 <TabsContent value="blue-gold" className="space-y-2">
//                   <p>8 Award Categories • View 101 Subcategories</p>
//                   <p>Nominee Count, Votes per Nominee, AGC Earned</p>
//                   <p>Judge Assignment & Comment • Public Nomination Trends</p>
//                 </TabsContent>
//                 <TabsContent value="platinum" className="space-y-2">
//                   <p>8 Institutional Categories • View 53 Subcategories</p>
//                   <p>Nominee Submission Records • Documentation Score</p>
//                   <p>ESG & SDG Tags • Jury/Board Final Review Status</p>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>

//           {/* Charts Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="shadow-md rounded-2xl">
//               <CardContent className="p-4 h-72">
//                 <h3 className="font-semibold mb-3">AGC Coin Usage Trend</h3>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={walletData}>
//                     <XAxis dataKey="day" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="nominee" fill="#3b82f6" />
//                     <Bar dataKey="public" fill="#10b981" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             <Card className="shadow-md rounded-2xl">
//               <CardContent className="p-4 h-72">
//                 <h3 className="font-semibold mb-3">Revenue Summary (₦ / $ / AGC)</h3>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={revenueData} dataKey="value" nameKey="name" outerRadius={95}>
//                       {revenueData.map((_, idx) => (
//                         <Cell key={idx} fill={["#3b82f6", "#10b981", "#f59e0b"][idx % 3]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
//         </section>

//         {/* AGC Wallet Activity Panel */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4 space-y-4">
//               <h3 className="font-semibold text-lg">AGC Wallet Activity</h3>
//               <ResponsiveContainer width="100%" height={260}>
//                 <LineChart data={walletData}>
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="nominee" stroke="#3b82f6" />
//                   <Line type="monotone" dataKey="public" stroke="#10b981" />
//                   <Line type="monotone" dataKey="sponsor" stroke="#f59e0b" />
//                   <Line type="monotone" dataKey="ambassador" stroke="#8b5cf6" />
//                 </LineChart>
//               </ResponsiveContainer>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Withdrawable</p><p className="font-bold">42,000 AGC</p></div>
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Non-Withdrawable</p><p className="font-bold">180,000 AGC</p></div>
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Purchases</p><p className="font-bold">Flutterwave • TapTap • Paystack</p></div>
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Bonus & Referral</p><p className="font-bold">+12,450 AGC</p></div>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* User Profile Management */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4">
//               <h3 className="font-semibold text-lg mb-4">User Profile Management</h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm">
//                   <thead>
//                     <tr className="text-left border-b">
//                       <th className="py-2 pr-4">Name</th>
//                       <th className="py-2 pr-4">Role</th>
//                       <th className="py-2 pr-4">Nominations</th>
//                       <th className="py-2 pr-4">Votes</th>
//                       <th className="py-2 pr-4">Wallet</th>
//                       <th className="py-2 pr-4">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableUsers.map((u, i) => (
//                       <tr key={i} className="border-b">
//                         <td className="py-2 pr-4">{u.name}</td>
//                         <td className="py-2 pr-4">{u.role}</td>
//                         <td className="py-2 pr-4">{u.nominations}</td>
//                         <td className="py-2 pr-4">{u.votes}</td>
//                         <td className="py-2 pr-4">{u.wallet.toLocaleString()}</td>
//                         <td className="py-2 pr-4"><Button >View</Button></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Judging Arena */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4">
//               <h3 className="font-semibold text-lg mb-3">Judging Arena Module</h3>
//               <ul className="list-disc ml-6 text-sm grid grid-cols-1 md:grid-cols-2 gap-y-1">
//                 <li>Category Assignments</li>
//                 <li>Review Completion Rate</li>
//                 <li>Weighted Scoring Panel</li>
//                 <li>Comments per Nominee</li>
//                 <li>Auto-Notify Incomplete Reviews</li>
//                 <li>Judge Flagging System</li>
//               </ul>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Nomination Management System */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4 space-y-4">
//               <h3 className="font-semibold text-lg">Nomination Management</h3>
//               <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
//                 <Input placeholder="Search by title or ID" className="md:col-span-2" />
//                 <Select>
//                   <SelectTrigger><SelectValue placeholder="Super Category" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="bg">Blue Garnet</SelectItem>
//                     <SelectItem value="gc">Blue Garnet – Gold</SelectItem>
//                     <SelectItem value="pc">Platinum Certificate</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select>
//                   <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="draft">Draft</SelectItem>
//                     <SelectItem value="submitted">Submitted</SelectItem>
//                     <SelectItem value="verified">Verified</SelectItem>
//                     <SelectItem value="flagged">Flagged</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Button>Filter</Button>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm">
//                   <thead>
//                     <tr className="text-left border-b">
//                       <th className="py-2 pr-4">ID</th>
//                       <th className="py-2 pr-4">Title</th>
//                       <th className="py-2 pr-4">Country</th>
//                       <th className="py-2 pr-4">Status</th>
//                       <th className="py-2 pr-4">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {nominations.map((n, i) => (
//                       <tr key={i} className="border-b">
//                         <td className="py-2 pr-4 font-mono">{n.id}</td>
//                         <td className="py-2 pr-4">{n.name}</td>
//                         <td className="py-2 pr-4">{n.country}</td>
//                         <td className="py-2 pr-4">{n.status}</td>
//                         <td className="py-2 pr-4"><Button >Open</Button></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="text-xs text-slate-600">Auto-Duplicate Check • Pre-Nomination Import (NRC Portal) • Public Nomination Counter</div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Digital Certificate Hub */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4">
//               <h3 className="font-semibold text-lg mb-3">Digital Certificate & Document Hub</h3>
//               <ul className="list-disc ml-6 text-sm grid grid-cols-1 md:grid-cols-2 gap-y-1">
//                 <li>Certificates of Nomination / Recognition</li>
//                 <li>Judge & Volunteer Service Certificates</li>
//                 <li>Status Tracker: Requested / Approved / Downloaded</li>
//                 <li>DOI Verification Generator (Institutional)</li>
//               </ul>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Chapter & Ambassador Tracker */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4 space-y-4">
//               <h3 className="font-semibold text-lg">Chapter & Ambassador Tracker</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="h-72">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chapterPerf}>
//                       <XAxis dataKey="chapter" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="nominations" fill="#3b82f6" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="h-72">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chapterPerf}>
//                       <XAxis dataKey="chapter" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="revenue" fill="#10b981" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Ambassador AGC Earnings</p><p className="font-bold">+56,200 AGC</p></div>
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Settlement Log</p><p className="font-bold">Q3 Pending: ₦240,000</p></div>
//                 <div className="p-3 bg-white rounded-xl shadow"><p className="text-sm">Media Uploads</p><p className="font-bold">42 Files</p></div>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Notifications & Messaging */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4 space-y-4">
//               <h3 className="font-semibold text-lg">Notifications & Messaging</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="md:col-span-2 p-3 bg-white rounded-xl shadow">
//                   <div className="flex items-center gap-2 mb-3">
//                     <Select>
//                       <SelectTrigger className="w-40"><SelectValue placeholder="Channel" /></SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="email">Email</SelectItem>
//                         <SelectItem value="whatsapp">WhatsApp</SelectItem>
//                         <SelectItem value="dashboard">Dashboard</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <Input placeholder="Recipients: Judges / Volunteers / Nominees" />
//                     <Button>Send</Button>
//                   </div>
//                   <Input placeholder="Message subject" className="mb-2" />
//                   <textarea className="w-full h-28 p-3 border rounded-xl" placeholder="Type your bulk message..." />
//                 </div>
//                 <div className="p-3 bg-white rounded-xl shadow">
//                   <h4 className="font-medium mb-2">Recent</h4>
//                   <ul className="text-sm space-y-2">
//                     {notifications.map(n => (
//                       <li key={n.id} className="border rounded-lg p-2">
//                         <span className="font-semibold mr-2">{n.type}:</span>{n.msg}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* System Settings & Integrations */}
//         <section>
//           <Card className="shadow-md rounded-2xl">
//             <CardContent className="p-4 space-y-4">
//               <h3 className="font-semibold text-lg">System Settings & Integrations</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="p-3 bg-white rounded-xl shadow">
//                   <p className="text-sm">Voting Period</p>
//                   <div className="mt-2 flex gap-2">
//                     <Input placeholder="Start" />
//                     <Input placeholder="End" />
//                   </div>
//                   <Button className="mt-2" >Update</Button>
//                 </div>
//                 <div className="p-3 bg-white rounded-xl shadow">
//                   <p className="text-sm">Bonus Campaigns</p>
//                   <div className="mt-2 flex gap-2">
//                     <Input placeholder="Title" />
//                     <Input placeholder="AGC Bonus" />
//                   </div>
//                   <Button className="mt-2" >Create</Button>
//                 </div>
//                 <div className="p-3 bg-white rounded-xl shadow">
//                   <p className="text-sm">Integrations</p>
//                   <ul className="text-sm list-disc ml-5 mt-2">
//                     <li>Eventbrite</li>
//                     <li>LemFi</li>
//                     <li>TapTap</li>
//                     <li>Flutterwave</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="p-3 bg-white rounded-xl shadow">
//                 <p className="text-sm">API Logs (GFA Wallet, Voting Engine) • Audit Trail</p>
//                 <div className="mt-2 overflow-x-auto">
//                   <table className="min-w-full text-xs">
//                     <thead>
//                       <tr className="text-left border-b">
//                         <th className="py-2 pr-4">Timestamp</th>
//                         <th className="py-2 pr-4">Service</th>
//                         <th className="py-2 pr-4">Event</th>
//                         <th className="py-2 pr-4">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-b"><td className="py-2 pr-4">2025-08-22 18:32</td><td className="py-2 pr-4">Wallet</td><td className="py-2 pr-4">Disbursement</td><td className="py-2 pr-4">200 OK</td></tr>
//                       <tr className="border-b"><td className="py-2 pr-4">2025-08-22 18:10</td><td className="py-2 pr-4">Voting</td><td className="py-2 pr-4">Vote Cast</td><td className="py-2 pr-4">200 OK</td></tr>
//                       <tr className="border-b"><td className="py-2 pr-4">2025-08-22 17:58</td><td className="py-2 pr-4">Webhook</td><td className="py-2 pr-4">Payment Confirmed</td><td className="py-2 pr-4">201 Created</td></tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </section>
//       </main>
//     </div>
  );
};

export default GlobalOverview;
