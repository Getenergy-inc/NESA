"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#17120a] text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#17120a] dark:bg-gray-800 shadow px-4 py-6 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-6 text-[#f59e0b]">
          NESA Africa
        </h1>
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
                onClick={() => setIsOpen(false)} // close menu on click (mobile)
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
