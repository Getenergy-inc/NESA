// "use client";

import Sidebar from "./side-bar";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ReactNode, useState } from "react";
// import Sidebar from "./side-bar";

// const menu = [
//   { name: "AGC Wallet", path: "/super-admin/agc-wallet" },
//   { name: "Award Control Center", path: "/super-admin/award categories" },
//   { name: "User Management", path: "/super-admin/user" },
//   { name: "Judging Arena", path: "/super-admin/judging-arena" },
//   { name: "Nomination System", path: "/super-admin/nomination-system" },
//   { name: "Certificate Hub", path: "/super-admin/certificate-hub" },
//   { name: "Chapters & Ambassadors", path: "/super-admin/chapters" },
//   { name: "Notifications", path: "/super-admin/notifications" },
//   { name: "System Settings", path: "/super-admin/system-settings" },
// ];

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const pathname = usePathname();
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       <div className="flex h-screen bg-white-100 dark:bg-gray-900">
//         <Sidebar/>
//         <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
//           <div className="px-6 py-4 text-xl font-bold text-[#ea580c] dark:text-gray-100 border-b dark:border-gray-700">
//             NESA Africa Admin
//           </div>
//           <nav className="flex-1 px-4 py-6 space-y-2">
//             {menu.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`block px-4 py-2 rounded-lg font-medium ${
//                   pathname === item.path
//                     ? "bg-blue-600 text-white"
//                     : "text-[#17120a] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>
//           <div className="p-4 border-t dark:border-gray-700">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="w-full px-3 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
//             >
//               {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

// app/admin/layout.tsx


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
