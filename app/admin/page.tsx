'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as any)?.isAdmin) {
      // Redirect to the admin dashboard
      router.push('/admin/dashboard');
    } else if (status === 'unauthenticated') {
      router.push('/account/login?callbackUrl=/admin/dashboard');
    }
  }, [session, status, router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}