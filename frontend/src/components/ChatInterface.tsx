import React, { useState, useEffect } from "react";
import axios from "axios";
import { Idea } from "../types/idea";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Message {
  text: string;
  sender: "user" | "bot";
  chatId?: number;
}

interface ChatInterfaceProps {
  onSaveIdea: (idea: Idea) => Promise<void>;
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required("Please enter a message before sending."),
});

function ChatInterface({ onSaveIdea }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async (text: string) => {
    if (text.trim() === "") return;

    const newMessage: Message = { text, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await axios.post<{ response: string; chatId: number }>(
        "http://localhost:3001/chat",
        {
          message: text,
        }
      );
      const botMessage: Message = {
        text: response.data.response,
        chatId: response.data.chatId,
        sender: "bot",
      };
      console.log("Bot message:", botMessage);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSaveIdea = async (messageText: string, chatId: number) => {
    const ideaDto: Idea = {
      content: messageText,
      chatId: chatId,
    };

    await onSaveIdea(ideaDto);
  };

  return (
    <div className="chat-interface">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
            {message.sender === "bot" && message.chatId && (
              <button
                onClick={() => handleSaveIdea(message.text, message.chatId!)}
              >
                Save Idea
              </button>
            )}
          </div>
        ))}
      </div>
      <Formik
        initialValues={{ message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          sendMessage(values.message);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="chat-input">
            <Field type="text" name="message" />
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
            <ErrorMessage
              name="message"
              component="p"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatInterface;
