'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Paper, Container, Button } from '@mui/material';

export default function AdminTestPage() {
  const router = useRouter();
  
  // No authentication checks needed

  // Show admin content without authentication
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Admin Test Page
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
            sx={{ mt: 3 }}
          >
            Go to Admin Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}