// // "use client";

// // import React from "react";

// // export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
// //   defaultValue?: string;
// // }

// // export function Tabs({ defaultValue, className = "", children, ...props }: TabsProps) {
// //   const [activeTab, setActiveTab] = React.useState(defaultValue);

// //   return (
// //     <div className={`w-full ${className}`} {...props}>
// //       {React.Children.map(children, (child: any) =>
// //         React.cloneElement(child, { activeTab, setActiveTab })
// //       )}
// //     </div>
// //   );
// // }

// // export function TabsList({
// //   className = "",
// //   children,
// //   ...props
// // }: React.HTMLAttributes<HTMLDivElement>) {
// //   return (
// //     <div
// //       className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300 ${className}`}
// //       {...props}
// //     >
// //       {children}
// //     </div>
// //   );
// // }

// // export function TabsTrigger({
// //   value,
// //   active,
// //   setActive,
// //   className = "",
// //   children,
// //   ...props
// // }: {
// //   value: string;
// //   active?: string;
// //   setActive?: (val: string) => void;
// //   className?: string;
// //   children: React.ReactNode;
// // }) {
// //   const isActive = active === value;
// //   return (
// //     <button
// //       className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
// //         isActive
// //           ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
// //           : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
// //       } ${className}`}
// //       onClick={() => setActive && setActive(value)}
// //       {...props}
// //     >
// //       {children}
// //     </button>
// //   );
// // }

// // export function TabsContent({
// //   value,
// //   active,
// //   className = "",
// //   children,
// //   ...props
// // }: {
// //   value: string;
// //   active?: string;
// //   className?: string;
// //   children: React.ReactNode;
// // }) {
// //   if (active !== value) return null;
// //   return (
// //     <div
// //       className={`mt-2 rounded-md border border-gray-200 p-4 dark:border-gray-700 ${className}`}
// //       {...props}
// //     >
// //       {children}
// //     </div>
// //   );
// // }


// // components/ui/tabs.tsx
// import * as React from "react";

// interface TabsProps {
//   value: string;
//   onValueChange: (value: string) => void;
//   children: React.ReactNode;
// }

// export function Tabs({ value, onValueChange, children }: TabsProps) {
//   return <div>{children}</div>;
// }

// export function TabsList({
//   className = "",
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return <div className={`flex gap-2 ${className}`} {...props} />;
// }

// interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   value: string;
//   isActive?: boolean;
//   onClick?: () => void;
// }

// export function TabsTrigger({
//   children,
//   value,
//   isActive,
//   onClick,
//   className = "",
//   ...props
// }: TabsTriggerProps) {
//   return (
//     <button
//       className={`px-3 py-1 rounded-md ${
//         isActive ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
//       } ${className}`}
//       onClick={onClick}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// interface TabsContentProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   value: string;
//   activeValue?: string; // 👈 NEW prop
// }

// export function TabsContent({
//   children,
//   value,
//   activeValue,
//   className = "",
//   ...props
// }: TabsContentProps) {
//   if (value !== activeValue) return null; // only render if active
//   return (
//     <div className={`mt-2 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// }