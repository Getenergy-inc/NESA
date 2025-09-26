"use client";

import { PropsWithChildren } from "react";
import AuthProvider from "./auth-provider";
import NextAuthProvider from "./next-auth-provider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DefaultToastOptions, Toaster } from "react-hot-toast";
import ModalProvider from "./modal-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Temporarily comment out the ReactQueryDevtools import to fix build error
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// register gsap basic plugins
gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

// All providers should placed into this file
const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const toastOptions: DefaultToastOptions = {
    style: {
      minWidth: "250px",
    },
    duration: 3000,
    position: "bottom-right",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>
        <AuthProvider>
          <Toaster toastOptions={toastOptions} />
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </NextAuthProvider>

      {/* Temporarily comment out ReactQueryDevtools to fix build error */}
      {/* <ReactQueryDevtools client={queryClient} /> */}
    </QueryClientProvider>
  );
};

export default Providers;
