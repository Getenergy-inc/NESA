'use client';

import { ReactNode } from 'react';
import ChakraProvider from '../lib/providers/chakra-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
}