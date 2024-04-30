import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack, useToast, Textarea } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState('');
  const toast = useToast();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch('https://mnwefvnykbgyhbdzpleh.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.access_token) {
      sessionStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      toast({
        title: 'Login Successful',
        description: "You're now logged in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Login Failed',
        description: data.error_description || 'Something went wrong.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    toast({
      title: 'Logged Out',
      description: "You've been logged out successfully.",
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      {user ? (
        <Box>
          <Text>Welcome, {user.user_metadata.email}</Text>
          <Button onClick={handleLogout}>Logout</Button>
          <Textarea
            placeholder="Your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            mt={4}
          />
          <Text mt={4} p={4} bg="gray.100" borderRadius="md">
            {notes}
          </Text>
        </Box>
      ) : (
        <Box>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </Box>
      )}
    </VStack>
  );
};

export default Index;