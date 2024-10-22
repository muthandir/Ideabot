import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import IdeaList from './components/IdeaList';
import ResetButton from './components/ResetButton';
import axios from 'axios';
import { Idea } from './types/idea';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleSaveIdea = async (idea: Idea) => {
    try {
      console.log("Saving idea:", idea);
      const response = await axios.post<Idea>("http://localhost:3001/ideas", idea);
      setIdeas(prevIdeas => [...prevIdeas, response.data]);
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:3001/reset");
      setIdeas([]);
    } catch (error) {
      console.error("Error resetting:", error);
    }
  };

  const fetchIdeas = async () => {
    try {
      console.log("Fetching ideas");
      const response = await axios.get<Idea[]>("http://localhost:3001/ideas");
      setIdeas(prevIdeas => [...prevIdeas, ...response.data]);
    } catch (error) {
      console.error("Error fetching ideas:", error);
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
