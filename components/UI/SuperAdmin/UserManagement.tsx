"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/U-I/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/U-I/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/U-I/table";

export default function UserManagement() {
  return (
    <div
      className="p-4 md:p-6 space-y-6 min-h-screen"
      style={{
        backgroundImage: "url('/images/nesa-card.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-xl md:text-2xl text-white font-bold drop-shadow-lg">
        👥 User Profile Management
      </h1>

      <Tabs defaultValue="public-users" className="w-full">
        {/* Tabs navigation - scrollable on mobile */}
        <div className="overflow-x-auto">
          <TabsList className="flex flex-nowrap gap-2 bg-white/50 p-2 rounded-lg shadow-md min-w-max">
            <TabsTrigger
              value="public-users"
              className="px-4 py-2 whitespace-nowrap rounded-lg font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Public Users
            </TabsTrigger>
            <TabsTrigger
              value="nominees"
              className="px-4 py-2 whitespace-nowrap rounded-lg font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Nominees
            </TabsTrigger>
            <TabsTrigger
              value="judges"
              className="px-4 py-2 whitespace-nowrap rounded-lg font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Judges
            </TabsTrigger>
            <TabsTrigger
              value="volunteers"
              className="px-4 py-2 whitespace-nowrap rounded-lg font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Volunteers (NRC)
            </TabsTrigger>
            <TabsTrigger
              value="sponsors"
              className="px-4 py-2 whitespace-nowrap rounded-lg font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Sponsors
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Public Users */}
        <TabsContent value="public-users" className="mt-6 space-y-6">
          {/* Responsive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl hover:scale-[1.02] transition">
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-3xl font-extrabold text-orange-600">1,245</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl hover:scale-[1.02] transition">
              <CardHeader>
                <CardTitle>Nominations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-3xl font-extrabold text-orange-600">530</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl hover:scale-[1.02] transition">
              <CardHeader>
                <CardTitle>Active Voters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-3xl font-extrabold text-orange-600">890</p>
              </CardContent>
            </Card>
          </div>

          {/* Responsive Table */}
          <div className="mt-8 bg-white/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Email</TableHead>
                    <TableHead className="font-semibold text-gray-700">Nominations</TableHead>
                    <TableHead className="font-semibold text-gray-700">Voting History</TableHead>
                    <TableHead className="font-semibold text-gray-700">Wallet Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>Ada Lovelace</TableCell>
                    <TableCell className="text-gray-500">ada@example.com</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>12 Votes</TableCell>
                    <TableCell className="font-bold text-green-600">₦2,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Nominees */}
        <TabsContent value="nominees" className="mt-6">
          <div className="bg-white/50 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Certificate Issued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>Nelson Mandela</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                        Verified
                      </span>
                    </TableCell>
                    <TableCell>150</TableCell>
                    <TableCell className="text-blue-600 font-medium">Yes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Judges */}
        <TabsContent value="judges" className="mt-6">
          <div className="bg-white/60 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Categories Assigned</TableHead>
                    <TableHead>Reviews Submitted</TableHead>
                    <TableHead>Pending Reviews</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>Prof. Ayo Bamidele</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell className="text-orange-500 font-medium">5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Volunteers */}
        <TabsContent value="volunteers" className="mt-6">
          <div className="bg-white/60 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Entries Submitted</TableHead>
                    <TableHead>Verified Submissions</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>Chinwe Okafor</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell className="text-green-600 font-medium">🎯 90%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Sponsors */}
        <TabsContent value="sponsors" className="mt-6">
          <div className="bg-white/60 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Sponsorship Category</TableHead>
                    <TableHead>Disbursed Amount</TableHead>
                    <TableHead>Branding Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>UBA Foundation</TableCell>
                    <TableCell className="font-semibold text-orange-600">Gold</TableCell>
                    <TableCell className="text-green-600 font-bold">$50,000</TableCell>
                    <TableCell>Active ✅</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
