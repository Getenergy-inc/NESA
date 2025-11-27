// "use client";

// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// interface WalletLog {
//   id: string;
//   timestamp: string;
//   grossAmount: number;
//   netAmount: number;
//   commission: number;
//   splits: {
//     name: string;
//     percent: number;
//     amount: number;
//   }[];
// }

// export default function TransactionLogTableWallet({
//   logs,
// }: {
//   logs: WalletLog[];
// }) {
//   const [expanded, setExpanded] = useState<string | null>(null);

//   return (
//     <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
//       <h3 className="text-xl font-semibold mb-4">
//         💰 Wallet Split Logs
//       </h3>

//       {logs.length === 0 ? (
//         <p className="text-gray-500 text-sm">No transactions yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
//                 <th className="py-2 px-3 text-left">Gross (₦)</th>
//                 <th className="py-2 px-3 text-left">Commission</th>
//                 <th className="py-2 px-3 text-left">Net Distributed</th>
//                 <th className="py-2 px-3 text-left">Date</th>
//                 <th className="py-2 px-3"></th>
//               </tr>
//             </thead>

//             <tbody>
//               {logs.map((log) => (
//                 <React.Fragment key={log.id}>
//                   <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
//                     <td className="py-2 px-3">
//                       ₦{log.grossAmount.toLocaleString()}
//                     </td>

//                     <td className="py-2 px-3 text-red-500">
//                       {log.commission}%
//                     </td>

//                     <td className="py-2 px-3 text-green-600">
//                       ₦{log.netAmount.toLocaleString()}
//                     </td>

//                     <td className="py-2 px-3">
//                       {new Date(log.timestamp).toLocaleString()}
//                     </td>

//                     <td className="py-2 px-3 text-center">
//                       <button
//                         onClick={() =>
//                           setExpanded(expanded === log.id ? null : log.id)
//                         }
//                         className="text-gray-600 hover:text-blue-600"
//                       >
//                         {expanded === log.id ? (
//                           <ChevronUp className="w-4 h-4" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4" />
//                         )}
//                       </button>
//                     </td>
//                   </tr>

//                   {expanded === log.id && (
//                     <tr className="bg-gray-50 dark:bg-gray-800">
//                       <td colSpan={5} className="p-4">
//                         <h4 className="font-semibold mb-2">Distribution Breakdown:</h4>
//                         {expanded === log.id && (
//   <tr className="bg-gray-50 dark:bg-gray-800">
//     <td colSpan={5} className="p-4">
//       <h4 className="font-semibold mb-2">Distribution Breakdown:</h4>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm border-collapse">
//           <thead>
//             <tr className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
//               <th className="py-2 px-3 text-left">Recipient</th>
//               <th className="py-2 px-3 text-left">Percent (%)</th>
//               <th className="py-2 px-3 text-left">Amount (₦)</th>
//             </tr>
//           </thead>

//           <tbody>
//             {log.splits.map((split, index) => (
//               <tr
//                 key={index}
//                 className="border-t border-gray-200 dark:border-gray-600"
//               >
//                 <td className="py-2 px-3">{split.name}</td>

//                 <td className="py-2 px-3">
//                   {Number(split.percent ?? 0)}%
//                 </td>

//                 <td className="py-2 px-3 text-green-600">
//                   ₦{Number(split.amount ?? 0).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </td>
//   </tr>
// )}

