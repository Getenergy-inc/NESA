"use client";

import Link from "next/link";
// import { useAuth } from "@/components/Context/AuthContext";
import {
  Home,
  Award,
  Wallet,
  Users,
  Bell,
  Settings,
  Footprints,
  BadgeCheck,
  ThumbsUp,
  Scale,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Global Overview", path: "/super-admin/global-overview" },
  { name: "Award Categories", path: "/super-admin/award-categories" },
  { name: "AGC Wallet", path: "/super-admin/wallet" },
  { name: "User Management", path: "/super-admin/user" },
  { name: "Judging Arena", path: "/super-admin/judging" },
  { name: "Nominations", path: "/super-admin/nominations" },
  { name: "Certificates", path: "/super-admin/certifications" },
  { name: "Chapters", path: "/super-admin/chapters" },
  { name: "Notifications", path: "/super-admin/notifications" },
  { name: "Settings", path: "/super-admin/settings" },
];

export default function Sidebar() {

  // const { logout, user } = useAuth();
  const user = {
    name: "Super Admin",
    avatar: "/images/admin.jpeg", 
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-80 bg-white border-r shadow-md flex flex-col">

      {/* Welcome Section */}
      <div className="flex items-center gap-3 p-6 border-b">
        <Image
          src={user.avatar}
          alt="Admin Avatar"
          width={40}
          height={40}
          className="rounded-full border"
        />
        <div>
          <p className="text-sm text-gray-500">Welcome,</p>
          <p className="font-semibold text-gray-900">{user.name}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto font-bold p-1 space-y-1">
        {menu.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:text-gray-700 hover:bg-[#f59e0b] bg-indigo-50 text-indigo-700 transition"
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t">
        <button
          onClick={() => {
            // logout();
          }}
          className="w-full flex items-center gap-2 p-2 rounded font-extrabold text-red-600 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>

  );
}
