import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack, useToast, Textarea, FormControl, FormLabel } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState('');
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const toast = useToast();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const handleLogin = async () => {
    // Login logic here
  };

  const handleLogout = () => {
    // Logout logic here
  };

  const saveApp = () => {
    // Save app logic here
    toast({
      title: 'App Created',
      description: "Your new app has been created successfully.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      {user ? (
        <Box>
          <Text>Welcome, {user && user.user_metadata ? user.user_metadata.email : 'Guest'}</Text>
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
          <FormControl mt={4}>
            <FormLabel>App Name</FormLabel>
            <Input placeholder="Enter app name" value={appName} onChange={(e) => setAppName(e.target.value)} />
            <FormLabel mt={2}>App Description</FormLabel>
            <Textarea placeholder="Enter app description" value={appDescription} onChange={(e) => setAppDescription(e.target.value)} />
            <Button mt={4} onClick={saveApp}>Create App</Button>
          </FormControl>
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