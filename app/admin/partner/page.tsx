'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export default function AdminPartnerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new admin dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}
