"use client";

import { PropsWithChildren, useState, useEffect } from "react";
import AuthProvider from "./auth-provider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DefaultToastOptions, Toaster } from "react-hot-toast";
import ModalProvider from "./modal-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Temporarily comment out the ReactQueryDevtools import to fix build error
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// register gsap basic plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// All providers should placed into this file
const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  // Create a client instance that persists across renders but is unique for each client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }));

  const toastOptions: DefaultToastOptions = {
    style: {
      minWidth: "250px",
    },
    duration: 3000,
    position: "bottom-right",
  };

  // Handle hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a minimal version during SSR to prevent hydration mismatch
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster toastOptions={toastOptions} />
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>

      {/* Temporarily comment out ReactQueryDevtools to fix build error */}
      {/* <ReactQueryDevtools client={queryClient} /> */}
    </QueryClientProvider>
  );
};

export default Providers;
