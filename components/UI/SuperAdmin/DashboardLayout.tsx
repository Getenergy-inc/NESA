"use client"
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/components/Context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // show nothing until redirect
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <Sidebar />

      
      <main className="flex-1 p-4 ml-64 overflow-y-auto">{children}</main>
    </div>
  );
}
