import { API_BASE_URL } from "../constants/Texts";


export const getChatHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/chat/getAllChats`);
  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }
  return response.json();
};

export const sendMessage = async (message: string) => {
  const response = await fetch(`${API_BASE_URL}/chat/user/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
};
