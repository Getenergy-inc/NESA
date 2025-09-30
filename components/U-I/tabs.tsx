
// "use client";

// import * as React from "react";

// interface TabsContextProps {
//   value: string;
//   setValue: (val: string) => void;
// }

// const TabsContext = React.createContext<TabsContextProps | null>(null);

// interface TabsProps {
//   defaultValue: string;
//   value?: string;
//   onValueChange?: (val: string) => void;
//   children: React.ReactNode;
//   className?: string;
// }

// export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }: TabsProps) {
//   const [value, setValue] = React.useState(defaultValue);

//   const currentValue = controlledValue !== undefined ? controlledValue : value;

//   const handleChange = (val: string) => {
//     if (controlledValue === undefined) {
//       setValue(val);
//     }
//     onValueChange?.(val);
//   };

//   return (
//     <TabsContext.Provider value={{ value: currentValue, setValue: handleChange }}>
//       <div className={className}>{children}</div>
//     </TabsContext.Provider>
//   );
// }

// export function TabsList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return <div className={`flex gap-2 ${className}`}>{children}</div>;
// }

// export function TabsTrigger({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
//   const ctx = React.useContext(TabsContext);
//   if (!ctx) throw new Error("TabsTrigger must be used inside <Tabs>");

//   const isActive = ctx.value === value;

//   return (
//     <button
//       onClick={() => ctx.setValue(value)}
//       className={`px-4 py-2 rounded-md border text-sm ${
//         isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
//       } ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// export function TabsContent({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
//   const ctx = React.useContext(TabsContext);
//   if (!ctx) throw new Error("TabsContent must be used inside <Tabs>");

//   if (ctx.value !== value) return null;

//   return <div className={`mt-4 ${className}`}>{children}</div>;
// }
"use client";

import * as React from "react";

interface TabsContextProps {
  value: string;
  setValue: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

interface TabsProps {
  defaultValue?: string; // make optional
  value?: string; // for controlled mode
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue ?? ""); // safe default

  const currentValue = controlledValue !== undefined ? controlledValue : value;

  const handleChange = (val: string) => {
    if (controlledValue === undefined) {
      setValue(val); // uncontrolled mode
    }
    onValueChange?.(val); // notify parent
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex gap-2 border-b pb-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used inside <Tabs>");

  const isActive = ctx.value === value;

  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used inside <Tabs>");

  if (ctx.value !== value) return null;

  return <div className={`mt-4 ${className}`}>{children}</div>;
}
