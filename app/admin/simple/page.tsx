'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container, Button, CircularProgress } from '@mui/material';

export default function SimpleAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Give NextAuth a moment to initialize
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Redirect to login if not authenticated
      if (status === 'unauthenticated') {
        router.push('/account/login?callbackUrl=/admin/simple');
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [status, router]);

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  // Show unauthorized message if not admin
  if (session && !(session.user as any)?.isAdmin) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" color="error" gutterBottom>
              Unauthorized Access
            </Typography>
            <Typography variant="body1" paragraph>
              You do not have admin privileges to access this page.
            </Typography>
            <Button variant="contained" onClick={() => router.push('/')}>
              Return to Home
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Show admin content if authenticated and admin
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Simple Admin Page
          </Typography>
          <Typography variant="h6" gutterBottom>
            Authentication Status: {status}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Session Information:
          </Typography>
          
          <Box component="pre" sx={{ 
            bgcolor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1,
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {JSON.stringify(session, null, 2)}
          </Box>
          
          <Button 
            variant="contained" 
            onClick={() => router.push('/admin')}
            sx={{ mt: 3, mr: 2 }}
          >
            Go to Admin Dashboard
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push('/')}
            sx={{ mt: 3 }}
          >
            Return to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}