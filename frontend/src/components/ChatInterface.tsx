import React, { useState } from 'react';
import { Idea } from '../types/idea';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Message } from '../types/message';
import { sendChatMessage } from '../services/api'; // Import the API functions
import axios from 'axios'; // Import axios for error handling

interface ChatInterfaceProps {
  onSaveIdea: (idea: Idea) => Promise<void>;
  onSaveMessage: (messages: Message) => Promise<void>;
  messages: Message[]; // Accept messages as a prop
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required('Please enter a message before sending.'),
});

function ChatInterface({
  onSaveIdea,
  messages,
  onSaveMessage,
}: ChatInterfaceProps) {
  const [loadingSend, setLoadingSend] = useState(false); // Loading state for send button
  const [loadingSave, setLoadingSave] = useState<number | null>(null); // Loading state for save button
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const sendMessage = async (text: string) => {
    if (text.trim() === '') return;

    const newMessage: Message = { text, sender: 'user' };
    await onSaveMessage(newMessage);

    setLoadingSend(true); // Set loading state for send button
    setErrorMessage(null); // Reset error message

    try {
      const response = await sendChatMessage(text); // Use the API function
      const botMessage: Message = {
        text: response.response,
        chatId: response.chatId,
        sender: 'bot',
      };
      await onSaveMessage(botMessage);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        setErrorMessage(
          'You are sending messages too quickly. Please wait a moment before trying again.',
        ); // Set error message for 429
      } else {
        console.error('Error sending message:', error);
        setErrorMessage(
          'An error occurred while sending your message. Please try again later.',
        ); // Set error message for other errors
      }
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
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <div className="max-h-96 overflow-y-auto mb-4 p-2 bg-gray-800 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-400">Ready to do some brainstorming?</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`relative p-3 rounded-lg transition-all duration-300 ease-in-out ${
                  message.sender === 'user'
                    ? 'bg-[#833d3d6b] text-white rounded-br-none' // Updated background color for user messages
                    : 'bg-gray-600 text-white rounded-bl-none'
                }`}
              >
                {message.text}
                {message.sender === 'bot' && message.chatId && (
                  <div className="absolute right-2 bottom-2">
                    <button
                      type="button"
                      className="group w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-500 hover:w-32"
                      onClick={() =>
                        handleSaveIdea(message.text, message.chatId!)
                      }
                      disabled={loadingSave === message.chatId} // Disable if loading
                    >
                      <span className="text-lg group-hover:hidden">⭐</span>{' '}
                      {/* Star icon */}
                      <span className="text-sm absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                        Save Idea
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}{' '}
        {/* Display error message */}
      </div>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await sendMessage(values.message);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex items-center">
            <Field
              type="text"
              name="message"
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
            />
            <ErrorMessage
              name="message"
              component="p"
              className="text-red-500"
            />
            <button
              type="submit"
              disabled={isSubmitting || loadingSend}
              className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500"
            >
              {loadingSend ? <span className="spinner" /> : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatInterface;
