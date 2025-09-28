'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  // This prevents the "Cannot read properties of null (reading 'useState')" error
  // during static site generation by only rendering the SessionProvider on the client
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // During static generation or server-side rendering, return children without SessionProvider
  if (!mounted && typeof window === 'undefined') {
    return <>{children}</>;
  }
  
  // On the client side or after mounting, use SessionProvider
  // Use a try-catch block to prevent any potential errors during rendering
  try {
    return <SessionProvider>{children}</SessionProvider>;
  } catch (error) {
    console.error('Error in SessionProvider:', error);
    // Fallback to rendering without SessionProvider if there's an error
    return <>{children}</>;
  }
}