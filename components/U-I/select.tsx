// "use client";

// import * as React from "react";

// interface SelectProps {
//   value?: string;
//   onValueChange?: (value: string) => void;
//   children: React.ReactNode;
// }

// export function Select({ value, onValueChange, children }: SelectProps) {
//   const [internalValue, setInternalValue] = React.useState(value || "");

//   const handleChange = (newValue: string) => {
//     setInternalValue(newValue);
//     onValueChange?.(newValue);
//   };

//   return (
//     <SelectContext.Provider value={{ value: internalValue, onChange: handleChange }}>
//       {children}
//     </SelectContext.Provider>
//   );
// }

// // ✅ Context to share value across components
// interface SelectContextProps {
//   value: string;
//   onChange: (value: string) => void;
// }
// const SelectContext = React.createContext<SelectContextProps | null>(null);

// export function SelectTrigger({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
//   const ctx = React.useContext(SelectContext);
//   if (!ctx) throw new Error("SelectTrigger must be used inside <Select>");

//   return (
//     <button
//       type="button"
//       className={`px-3 py-2 border rounded-md bg-white dark:bg-gray-800 flex justify-between items-center w-full ${className}`}
//     >
//       {ctx.value || children || <span className="text-gray-400">Select...</span>}
//       <span className="ml-2">▾</span>
//     </button>
//   );
// }

// export function SelectContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`mt-1 border rounded-md shadow bg-white dark:bg-gray-800 p-2 ${className}`}>
//       {children}
//     </div>
//   );
// }

// export function SelectItem({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
//   const ctx = React.useContext(SelectContext);
//   if (!ctx) throw new Error("SelectItem must be used inside <Select>");

//   return (
//     <div
//       className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${className}`}
//       onClick={() => ctx.onChange(value)}
//     >
//       {children}
//     </div>
//   );
// }

// export function SelectValue({ placeholder }: { placeholder?: string }) {
//   const ctx = React.useContext(SelectContext);
//   if (!ctx) throw new Error("SelectValue must be used inside <Select>");
//   return <span>{ctx.value || placeholder || "Select..."}</span>;
// }