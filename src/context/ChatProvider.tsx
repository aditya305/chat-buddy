import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChatHistory, sendMessage } from '../services/chatService';

interface ChatContextProps {
  messages: IMessage[];
  loadMessages: () => void;
  handleSend: (newMessages: IMessage[]) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages) as IMessage[]);
      } else {
        const chatHistory = await getChatHistory();
        setMessages(chatHistory);
        await AsyncStorage.setItem('messages', JSON.stringify(chatHistory));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleSend = async (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    await AsyncStorage.setItem('messages', JSON.stringify(GiftedChat.append(messages, newMessages)));
    try {
      const response = await sendMessage(newMessages[0].text);
      setMessages((previousMessages) => GiftedChat.append(previousMessages, response));
      await AsyncStorage.setItem('messages', JSON.stringify(GiftedChat.append(messages, response)));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, loadMessages, handleSend }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
