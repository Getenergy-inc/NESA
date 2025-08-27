// import * as React from "react";

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "default" | "outline" | "destructive";
// }

// export function Button({
//   className = "",
//   variant = "default",
//   children,
//   ...props
// }: ButtonProps) {
//   let baseClasses =
//     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

//   let variantClasses = "";
//   switch (variant) {
//     case "outline":
//       variantClasses =
//         "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800";
//       break;
//     case "destructive":
//       variantClasses =
//         "bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-800";
//       break;
//     default:
//       variantClasses =
//         "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600";
//       break;
//   }

//   return (
//     <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// }
