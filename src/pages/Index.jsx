import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack, useToast, Textarea, FormControl, FormLabel } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
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

  const addNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, currentNote.trim()]);
      setCurrentNote('');
      toast({
        title: 'Note Added',
        description: "Your note has been added successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    toast({
      title: 'Note Deleted',
      description: "Your note has been deleted successfully.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const editNote = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value.trim();
    setNotes(newNotes);
  };

  const saveNote = (index) => {
    toast({
      title: 'Note Saved',
      description: "Your note has been saved successfully.",
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      {user ? (
        <Box>
          <Text>Welcome, {user && user.user_metadata ? user.user_metadata.email : 'Guest'}</Text>
          <Button onClick={handleLogout}>Logout</Button>
          <FormControl mt={4}>
            <FormLabel>Add a Note</FormLabel>
            <Textarea
              placeholder="Type your note here..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            />
            <Button mt={4} onClick={addNote}>Add Note</Button>
          </FormControl>
          {notes.map((note, index) => (
            <Box key={index} p={4} bg="gray.100" borderRadius="md" mt={4}>
              <Textarea
                value={note}
                onChange={(e) => editNote(index, e.target.value)}
              />
              <Button mt={2} colorScheme="teal" onClick={() => saveNote(index)}>Save</Button>
              <Button mt={2} colorScheme="red" onClick={() => deleteNote(index)}>Delete</Button>
            </Box>
          ))}
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