import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./src/navigation/RootLayout";
import { AuthProvider } from "./src/context/AuthProvider";
import { ChatProvider } from './src/context/ChatProvider';
import React from "react";

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <NavigationContainer>
          <RootLayout />
        </NavigationContainer>
      </ChatProvider>
    </AuthProvider>
  );
}
