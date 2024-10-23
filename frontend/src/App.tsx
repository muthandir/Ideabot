import React, { useState, useEffect } from "react";
import ChatInterface from "./components/ChatInterface";
import IdeaList from "./components/IdeaList";
import ResetButton from "./components/ResetButton";
import axios from "axios";
import { Idea } from "./types/idea";
import "./chat.css"; // Import the CSS file
import { Message } from "./types/message";

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot"; chatId?: number }[]
  >([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleSaveIdea = async (idea: Idea) => {
    try {
      console.log("Saving idea:", idea);
      const response = await axios.post<Idea>(
        "http://localhost:3001/ideas",
        idea
      );
      console.log("Idea saved:", { ...idea, ...response.data });
      setIdeas((prevIdeas) => [{ ...idea, ...response.data }, ...prevIdeas]);
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  const handleSaveMessage = async (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleReset = async () => {
    try {
      console.log("Resetting");
      //await axios.post("http://localhost:3001/reset");
      setIdeas([]);
      setMessages([]); // Clear chat messages
    } catch (error) {
      console.error("Error resetting:", error);
    }
  };

  const fetchIdeas = async () => {
    try {
      console.log("Fetching ideas");
      const response = await axios.get<Idea[]>("http://localhost:3001/ideas");
      setIdeas((prevIdeas) => response.data);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
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
      <IdeaList ideas={ideas} />
    </div>
  );
}

export default App;
