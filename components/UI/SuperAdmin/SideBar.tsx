"use client";
import Link from "next/link";
import { useAuthContext } from "@/lib/context/AuthContext";
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
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

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
  { href: "/super-admin/security", label: "Security & Compliance", icon: ShieldCheck },
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
      <div className="flex items-center gap-3 p-4 border-b">
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
      <div className="p-2 border-t mt-2">
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
