import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { useChat } from '../context/ChatProvider';

const ChatHistoryDrawer: React.FC = (props) => {
  const { messages } = useChat();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Chat History</Text>
      </View>
      {messages.map((message) => (
        <DrawerItem
          key={message._id}
          label={message.text}
          onPress={() => console.log(`Navigating to message ${message._id}`)}
        />
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatHistoryDrawer;
