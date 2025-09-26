'use client';

import { useSearchParams } from 'next/navigation';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get the error from the search parameters
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Authentication Error
          </Typography>
          
          {error && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              Error: {error}
            </Typography>
          )}
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            There was a problem with your authentication. Please try again.
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              onClick={() => router.push('/account/login')}
            >
              Try Again
            </Button>
            
            <Button 
              variant="outlined" 
              onClick={() => router.push('/')}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}