import axios from 'axios';
import { Idea } from '../types/idea';

const API_URL = process.env.REACT_APP_API_URL; // Ensure you have this in your .env file

export const sendChatMessage = async (
  message: string,
): Promise<{ response: string; chatId: number }> => {
  const response = await axios.post<{ response: string; chatId: number }>(
    `${API_URL}/chat`,
    {
      message,
    },
  );
  return response.data;
};

export const saveIdea = async (idea: Idea): Promise<Idea> => {
  const response = await axios.post<Idea>(`${API_URL}/ideas`, idea);
  return response.data; // Return the saved idea
};

export const fetchIdeas = async (): Promise<Idea[]> => {
  const response = await axios.get<Idea[]>(`${API_URL}/ideas`);
  return response.data; // Return the fetched ideas
};

export const resetIdeas = async (): Promise<void> => {
  await axios.post(`${API_URL}/ideas/reset`);
};
