import React from "react";
import axios from "axios";
import { Idea } from "../types/idea";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Message } from "../types/message";

interface ChatInterfaceProps {
  onSaveIdea: (idea: Idea) => Promise<void>;
  onSaveMessage: (messages: Message) => Promise<void>;
  messages: Message[]; // Accept messages as a prop
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required("Please enter a message before sending."),
});

function ChatInterface({
  onSaveIdea,
  messages,
  onSaveMessage,
}: ChatInterfaceProps) {
  const sendMessage = async (text: string) => {
    if (text.trim() === "") return;

    const newMessage: Message = { text, sender: "user" };
    //  setMessages((prevMessages) => [...prevMessages, newMessage]);
    await onSaveMessage(newMessage);

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
      //setMessages((prevMessages) => [...prevMessages, botMessage]);
      await onSaveMessage(botMessage);
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
            <div className="input-wrapper">
              <Field
                type="text"
                name="message"
                placeholder="Type your message..."
              />
              <ErrorMessage
                name="message"
                component="p"
                className="error-message"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatInterface;
