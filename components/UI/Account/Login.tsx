'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Link as MuiLink
} from '@mui/material';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || (searchParams?.get('redirect') || '/dashboard');
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('Attempting login with:', { email, callbackUrl });

      // Use the login function from auth context
      await login(email, password);

      console.log('Login successful, redirecting to:', callbackUrl);

      // Use a slight delay to ensure the auth state is properly set
      setTimeout(() => {
        router.push(callbackUrl);
      }, 500);
    } catch (err) {
      // Check if this is an admin login attempt
      if (callbackUrl.includes('/admin')) {
        setError('Admin login failed. Please check your credentials and try again.');
        console.error('Admin login failed:', err);
      } else {
        setError('Invalid email or password');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {callbackUrl.includes('/admin') ? 'NESA Africa Admin Login' : 'NESA Africa Login'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {callbackUrl.includes('/admin')
                ? 'Enter admin credentials to access the dashboard'
                : 'Enter your credentials to access your account'}
            </Typography>
            {callbackUrl.includes('/admin') && (
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                Admin access only
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Grid container justifyContent="center">
              <Grid size={{ xs: 12, sm: 12 }} >
                <Box textAlign="center">
                  <MuiLink component={Link} href="/" variant="body2">
                    Return to Home Page
                  </MuiLink>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;