'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Paper, Container, Button } from '@mui/material';

export default function SimpleAdminPage() {
  const router = useRouter();
  
  // No authentication checks needed

  // Show admin content without authentication
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Simple Admin Page
          </Typography>
          <Typography variant="h6" gutterBottom>
            Authentication Status: Public Access
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            No Authentication Required
          </Typography>
          
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