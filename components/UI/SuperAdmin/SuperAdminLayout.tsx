"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./SideBar";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Don't render sidebar on login page
  const isLoginPage = pathname === "/super-admin/login";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!isLoginPage && (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md">
          <Sidebar />
        </aside>
      )}
      <main
        className={`flex-1 p-6 overflow-y-auto ${
          !isLoginPage ? "ml-36" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
