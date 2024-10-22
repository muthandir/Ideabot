import React, { useState, useEffect } from "react";
import axios from "axios";
import { Idea } from "../types/idea";

interface Message {
  text: string;
  sender: "user" | "bot";
  chatId?: number;
}

interface ChatInterfaceProps {
  onSaveIdea: (idea: Idea) => Promise<void>;
}

function ChatInterface({ onSaveIdea }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage: Message = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await axios.post<{ response: string; chatId: number }>(
        "http://localhost:3001/chat",
        {
          message: input,
        }
      );
      const botMessage: Message = {
        text: response.data.response,
        chatId: response.data.chatId,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSaveIdea = async (messageText: string, chatId: number) => {
    const textToSave = selectedText || messageText;

    const ideaDto: Idea = {
      content: textToSave,
      chatId: chatId,
    };

    await onSaveIdea(ideaDto);
    setSelectedText("");
  };

  const handleMouseUp = () => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      setSelectedText(selection);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-history" onMouseUp={handleMouseUp}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
            {message.sender === "bot" && message.chatId && (
              <button
                onClick={() => handleSaveIdea(message.text, message.chatId!)}
              >
                Save {selectedText ? "Selected" : "Idea"}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
