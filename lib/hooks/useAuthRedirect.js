// hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/account/login'); // Redirect to login if no token is found
    }
  }, [router]);
};