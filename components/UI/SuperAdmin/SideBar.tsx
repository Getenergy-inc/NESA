"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Global Overview", path: "/global-overview" },
  { name: "Award Categories", path: "/super-admin/award-categories" },
  { name: "AGC Wallet", path: "/super-admin/wallet" },
  { name: "User Management", path: "/super-admin/user" },
  { name: "Judging Arena", path: "/super-admin/judging" },
  { name: "Nominations", path: "/super-admin/nominations" },
  { name: "Certificates", path: "/super-admin/certifications" },
  { name: "Chapters", path: "/super-admin/chapters" },
  { name: "Notifications", path: "/super-admin/notifications" },
  { name: "Settings", path: "/super-admin/settings" }
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-[#17120a] dark:bg-gray-800 shadow min-h-screen px-4 py-6">
      <h1 className="text-xl font-bold mb-6 text-[#f59e0b] ">NESA Africa</h1>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block px-3 py-2 rounded-lg transition ${
                pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-deepGold dark:text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
