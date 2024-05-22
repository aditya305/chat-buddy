import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Appbar, Drawer } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useChat } from '../context/ChatProvider';
import ChatHistoryDrawer from './ChatHistoryDrawer';

const Chat: React.FC = () => {
  const { messages, handleSend } = useChat();
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <Appbar.Content title="ChatGPT Mobile" />
      </Appbar.Header>
      <View style={styles.container}>
        {/* <ChatHistoryDrawer visible={drawerVisible} onDismiss={toggleDrawer} /> */}
        <GiftedChat
          messages={messages}
          onSend={(messages) => handleSend(messages)}
          user={{
            _id: 1,
            name: 'User',
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
