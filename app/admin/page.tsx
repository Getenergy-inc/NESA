'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the admin dashboard without authentication check
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* No loading indicator needed as we're just redirecting */}
    </Box>
  );
}