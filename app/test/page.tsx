'use client';

import { Box, Heading, Text, Button } from '@chakra-ui/react';

export default function TestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Basic HTML Test</h1>
      <p>This is a simple test page using basic HTML elements.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Chakra UI Components</h2>
        <Box p={4} bg="gray.100" borderRadius="md" mt={4}>
          <Heading size="md">Chakra UI Box</Heading>
          <Text mt={2}>This is text inside a Chakra UI Box component.</Text>
          <Button colorScheme="blue" mt={4}>Chakra Button</Button>
        </Box>
      </div>
    </div>
  );
}