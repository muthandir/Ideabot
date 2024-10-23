import React, { useState } from "react";
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
  const [loadingSend, setLoadingSend] = useState(false); // Loading state for send button
  const [loadingSave, setLoadingSave] = useState<number | null>(null); // Loading state for save button

  const sendMessage = async (text: string) => {
    if (text.trim() === "") return;

    const newMessage: Message = { text, sender: "user" };
    await onSaveMessage(newMessage);

    setLoadingSend(true); // Set loading state for send button

    try {
      const response = await axios.post<{ response: string; chatId: number }>(
        "https://ideabot-vo2n.onrender.com/chat",
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
      await onSaveMessage(botMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoadingSend(false); // Reset loading state
    }
  };

  const handleSaveIdea = async (messageText: string, chatId: number) => {
    const ideaDto: Idea = {
      content: messageText,
      chatId: chatId,
      isRecent: true,
    };

    setLoadingSave(chatId); // Set loading state for the specific chatId

    await onSaveIdea(ideaDto);

    setLoadingSave(null); // Reset loading state
  };

  return (
    <div className="chat-interface">
      <div className="chat-history">
        {messages.length === 0 ? (
          <p>Ready to do some brainstorming?</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
              {message.sender === "bot" && message.chatId && (
                <button
                  type="button"
                  onClick={() => handleSaveIdea(message.text, message.chatId!)}
                  disabled={loadingSave === message.chatId} // Disable if loading
                >
                  {loadingSave === message.chatId ? (
                    <span className="spinner" /> // Show spinner
                  ) : (
                    "Save Idea"
                  )}
                </button>
              )}
            </div>
          ))
        )}
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
            <button type="submit" disabled={isSubmitting || loadingSend}>
              {loadingSend ? <span className="spinner" /> : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatInterface;
