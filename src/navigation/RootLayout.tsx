import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Chat from '../components/Chat';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import ChatHistoryDrawer from '../components/ChatHistoryDrawer';

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Chat: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <ChatHistoryDrawer {...props} />}>
        <Drawer.Screen name="Home" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
