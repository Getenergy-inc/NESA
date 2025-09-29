"use client"
import Link from "next/link";
import { useAuth } from "@/components/Context/AuthContext";
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

const menu = [
  { href: "/super-admin", label: "Global Overview", icon: Home },
  { href: "/super-admin/awards", label: "Award Control Center", icon: Award },
  { href: "/super-admin/wallet", label: "GFAWzip", icon: Wallet },
  { href: "/super-admin/user", label: "User Management", icon: Users },
  { href: "/super-admin/judging", label: "Judging Arena", icon: Scale },
  { href: "/super-admin/nomination", label: "Nomination System", icon: ThumbsUp },
  { href: "/super-admin/certificate", label: "Certificate Hub", icon: BadgeCheck },
  { href: "/super-admin/chapter", label: "Chapter Tracker", icon: Footprints },
  { href: "/super-admin/notification", label: "Notifications", icon: Bell },
  { href: "/super-admin/settings", label: "System Settings", icon: Settings },
];

export default function Sidebar() {
    const { logout } = useAuth();
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-md flex flex-col gap-10">
      {/* Logo / Header */}
      <div className="p-4 font-extrabold text-xl border-b text-[#ea580c]">Dashboard</div>

      {/* Nav */}
      <nav className="overflow-y-auto font-bold p-2 space-y-1">
        {menu.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:text-gray-700  hover:bg-[#f59e0b] bg-indigo-50  text-indigo-700 transition"
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
            
          }}
          className="w-full flex items-center gap-2 p-2 rounded font-extrabold text-red-600 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
