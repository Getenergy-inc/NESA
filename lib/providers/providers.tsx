"use client";

import { PropsWithChildren } from "react";
import ChakraProvider from "./chakra-provider";

// Simplified providers to focus on fixing Chakra UI
const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};

export default Providers;
