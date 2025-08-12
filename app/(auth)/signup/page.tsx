"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  // Redirect to comprehensive signup by default
  useEffect(() => {
    router.push('/signup/comprehensive');
  }, [router]);

  return null; // This component just redirects
};

export default SignUp;
