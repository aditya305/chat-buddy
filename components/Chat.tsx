import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const storedMessages = await AsyncStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages) as IMessage[]);
    }
  };

  const handleSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    AsyncStorage.setItem('messages', JSON.stringify(GiftedChat.append(messages, newMessages)));
  }, [messages]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="ChatGPT Mobile" />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        user={{
          _id: 1,
          name: 'User',
        }}
      />
    </>
  );
};

export default ChatScreen;
