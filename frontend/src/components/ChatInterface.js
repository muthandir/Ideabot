import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatInterface({ onSaveIdea }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:3001/chat', { message: input });
      const botMessage = { text: response.data.message, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSaveIdea = (messageText) => {
    const textToSave = selectedText || messageText;
    onSaveIdea(textToSave);
    setSelectedText(''); // Clear the selection after saving
  };

  const handleMouseUp = () => {
    const selection = window.getSelection().toString();
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
            {message.sender === 'bot' && (
              <button onClick={() => handleSaveIdea(message.text)}>
                Save {selectedText ? 'Selected' : 'Idea'}
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
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
