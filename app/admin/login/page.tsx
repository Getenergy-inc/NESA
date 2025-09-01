'use client';

// Define global for browser environment
if (typeof window !== 'undefined' && typeof global === 'undefined') {
  (window as any).global = window;
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
  Flex
} from '@chakra-ui/react';

// Import custom icons
import { ViewIcon, ViewOffIcon } from '@/lib/icons';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Color values consistent with the app's theme
  const bgColor = 'white';
  const borderColor = 'gray.200';

  // Check if already logged in
  useEffect(() => {
    // Only access localStorage in the browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token) {
        router.push('/admin/dashboard');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage for client-side access
      localStorage.setItem('adminToken', data.token);
      
      // Store token in cookies for server-side middleware
      document.cookie = `adminToken=${data.token}; path=/; max-age=86400; SameSite=Strict`;
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <VStack gap={8} align="center">
        <Flex justifyContent="center">
          <Image
            src="/images/logo.png"
            alt="NESA-Africa Logo"
            width={150}
            height={60}
            priority
          />
        </Flex>
        
        <Heading as="h1" size="xl" textAlign="center" color="orange.500">
          Admin Login
        </Heading>
        
        <Text textAlign="center" color="gray.600">
          Enter your credentials to access the admin dashboard
        </Text>
        
        <Box 
          width="100%" 
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="md"
          bg="white"
        >
          <Box p={8}>
            {error && (
              <Box 
                p={3} 
                mb={4} 
                bg="red.100" 
                color="red.700" 
                borderRadius="md"
                display="flex"
                alignItems="center"
              >
                <Box mr={2}>⚠️</Box>
                {error}
              </Box>
            )}
            
            <form onSubmit={handleSubmit}>
              <VStack gap={4}>
                <Box width="100%">
                  <Text fontWeight="medium" mb={1}>Username</Text>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    borderColor="orange.400"
                    _focus={{ borderColor: "orange.400" }}
                    required
                  />
                </Box>
                
                <Box width="100%">
                  <Text fontWeight="medium" mb={1}>Password</Text>
                  <Box position="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      borderColor="orange.400"
                      _focus={{ borderColor: "orange.400" }}
                      required
                      pr="2.5rem"
                    />
                    <Button
                      position="absolute"
                      right="0"
                      top="0"
                      h="100%"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      size="sm"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </Box>
                </Box>
                
                <Button
                  type="submit"
                  bg="orange.500"
                  color="white"
                  _hover={{ bg: "orange.600" }}
                  size="lg"
                  width="full"
                  mt={4}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
        
        <Text fontSize="sm" color="gray.500">
          This area is restricted to authorized administrators only.
        </Text>
      </VStack>
    </Container>
  );
}