'use client';

import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import AdminLayout from './AdminLayout';
import Link from 'next/link';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description = "This page is under development. Please check back later." 
}) => {
  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Button 
            component={Link} 
            href="/admin/dashboard" 
            variant="contained" 
            color="primary"
          >
            Return to Dashboard
          </Button>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default PlaceholderPage;