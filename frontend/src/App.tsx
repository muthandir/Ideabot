import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import IdeaList from './components/IdeaList';
import ResetButton from './components/ResetButton';
import { Idea } from './types/idea';
import './chat.css'; // Import the CSS file
import { Message } from './types/message';
import {
  fetchIdeas,
  saveIdea as apiSaveIdea,
  resetIdeas,
} from './services/api'; // Import the API functions

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'bot'; chatId?: number }[]
  >([]);

  useEffect(() => {
    const loadIdeas = async () => {
      const fetchedIdeas = await fetchIdeas();
      setIdeas(fetchedIdeas);
    };
    loadIdeas();
  }, []);

  const handleSaveIdea = async (idea: Idea) => {
    try {
      const savedIdea = await apiSaveIdea(idea); // Use the API function
      console.log('Saved idea:', savedIdea);
      setIdeas((prevIdeas) => [{ ...idea, ...savedIdea }, ...prevIdeas]);
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  const handleSaveMessage = async (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleReset = async () => {
    try {
      console.log('Resetting');
      await resetIdeas(); // Use the API function
      setIdeas([]);
      setMessages([]); // Clear chat messages
    } catch (error) {
      console.error('Error resetting:', error);
    }
  };

  const handleDeleteIdea = (id: number) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
  };

  return (
    <div className="App">
      <h1>Idea Brainstorming Chatbot</h1>
      <ChatInterface
        onSaveIdea={handleSaveIdea}
        messages={messages}
        onSaveMessage={handleSaveMessage}
      />
      <ResetButton onReset={handleReset} />
      <IdeaList ideas={ideas} onDeleteIdea={handleDeleteIdea} />
    </div>
  );
}

export default App;
