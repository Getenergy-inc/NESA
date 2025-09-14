"use client";
import Sidebar from "@/components/UI/SuperAdmin/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-6">{children}</main>
    </div>
  );
}
