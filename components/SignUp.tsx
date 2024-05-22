import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { Alert, Text, TextInput, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/app/_layout";

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpState {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState<SignUpState["name"]>("");
  const [email, setEmail] = useState<SignUpState["email"]>("");
  const [password, setPassword] = useState<SignUpState["password"]>("");

  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<SignUpScreenNavigationProp>();

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    console.log('Button Pressed'); 
    try {
      const response = await axios.post(
        "https://chat-buddy-api.onrender.com/api/v1/user/signup",
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 200) {
        Alert.alert("Account created successfully");
        navigation.navigate('Login');
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>Chat Buddy</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
        <Pressable style={styles.button} onPress= {handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
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

export default SignUp;
