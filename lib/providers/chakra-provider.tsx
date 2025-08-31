'use client';

import { ChakraProvider as ChakraUIProvider, defaultSystem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

// Chakra UI v3 uses a system object instead of theme
const ChakraProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraUIProvider value={defaultSystem}>
      {children}
    </ChakraUIProvider>
  );
};

export default ChakraProvider;