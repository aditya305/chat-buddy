import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import React, {useState} from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Alert, Text, TextInput, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/app/_layout";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


interface LoginState {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<LoginState['email']>('');
    const [password, setPassword] = useState<LoginState['password']>('');

    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation<LoginScreenNavigationProp>();

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    console.log('Login Button Pressed'); 
    try {
      const response = await axios.post(
        "https://chat-buddy-api.onrender.com/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        Alert.alert("Logged in successfully");
        navigation.navigate('Chat');
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>Chat Buddy</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress= {handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    marginLeft: 10,
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 48,
  },
  input: {
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderColor: "#dfdfdf",
    borderWidth: 1,
    borderRadius: 7,
  },
  button: {
    backgroundColor: "#00134a",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonView: {
    width: "100%",
    paddingTop: 30,
    paddingHorizontal: 50,
  },
});

export default Login;