'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

// This component ensures NextAuth only runs on the client side
// to prevent "Cannot read properties of null (reading 'useContext')" errors
export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  // State to track if we're on the client side
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run this effect on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // During SSR or static generation, render children without SessionProvider
  if (!isMounted) {
    return <>{children}</>;
  }
  
  // Only render SessionProvider on the client side after mounting
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}