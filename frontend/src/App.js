import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import IdeaList from './components/IdeaList';
import ResetButton from './components/ResetButton';
import axios from 'axios';

function App() {
  const [ideas, setIdeas] = useState([]);

  const handleSaveIdea = async (idea) => {
    try {
      await axios.post('http://localhost:3001/ideas', { idea });
      setIdeas([...ideas, idea]);
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post('http://localhost:3001/reset');
      setIdeas([]);
    } catch (error) {
      console.error('Error resetting:', error);
    }
  };

  return (
    <div className="App">
      <h1>Idea Brainstorming Chatbot</h1>
      <ChatInterface onSaveIdea={handleSaveIdea} />
      <IdeaList ideas={ideas} />
      <ResetButton onReset={handleReset} />
    </div>
  );
}

export default App;
